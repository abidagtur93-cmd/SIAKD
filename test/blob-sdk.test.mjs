import test from 'node:test';
import assert from 'node:assert/strict';
import * as blob from '@vercel/blob';
import { MockAgent, getGlobalDispatcher, setGlobalDispatcher } from 'undici';
import { createBlobStore } from '../lib/blob-store.js';
import { describeBlobFailure } from '../lib/blob-errors.js';
import { harness } from './fixtures.mjs';

const env = { BLOB_READ_WRITE_TOKEN: 'vercel_blob_rw_teststore_testsecret', BLOB_PREFIX: 'sdk-contract' };
const empty = { schema: 5, revision: 0, count: 0 };

function mockedHttp(t) {
  const previous = getGlobalDispatcher(), agent = new MockAgent();
  const oldRetries = process.env.VERCEL_BLOB_RETRIES;
  process.env.VERCEL_BLOB_RETRIES = '0';
  agent.disableNetConnect(); setGlobalDispatcher(agent);
  t.after(async () => {
    setGlobalDispatcher(previous); await agent.close();
    if (oldRetries === undefined) delete process.env.VERCEL_BLOB_RETRIES;
    else process.env.VERCEL_BLOB_RETRIES = oldRetries;
  });
  return agent;
}

test('real Blob SDK retries HTTP 412 using the new ETag, reads without cache and deletes conditionally', async t => {
  let current = { ...empty }, etag = '"v1"', puts = 0, reads = 0, deleted = false;
  const agent = mockedHttp(t);
  agent.get('https://vercel.com').intercept({ path: '/api/blob?url=sdk-contract%2Fcounter.json', method: 'GET' })
    .reply(() => ({ statusCode: 200, data: { pathname: 'sdk-contract/counter.json', etag } })).persist();
  agent.get('https://teststore.private.blob.vercel-storage.com')
    .intercept({ path: '/sdk-contract/counter.json?cache=0', method: 'GET' }).reply(options => {
    const headers = new Headers(options.headers);
    assert.equal(headers.get('authorization'), `Bearer ${env.BLOB_READ_WRITE_TOKEN}`);
    assert.equal(headers.get('accept-encoding'), 'identity');
    reads++;
    return { statusCode: headers.get('if-none-match') === etag ? 304 : 200, data: JSON.stringify(current),
      responseOptions: { headers: { etag, 'content-type': 'application/json' } } };
  }).persist();
  agent.get('https://vercel.com')
    .intercept({ path: '/api/blob/?pathname=sdk-contract%2Fcounter.json', method: 'PUT' }).reply(options => {
      const headers = new Headers(options.headers);
      assert.equal(headers.get('authorization'), `Bearer ${env.BLOB_READ_WRITE_TOKEN}`);
      puts++;
      assert.equal(headers.get('x-vercel-blob-access'), 'private');
      assert.equal(headers.get('x-if-match'), etag);
      assert.equal(headers.get('x-allow-overwrite'), '1');
      if (puts === 1) {
        // Another server commits between GET and PUT. The *real* SDK creates the exception.
        current = { ...current, count: 10, revision: 1 }; etag = '"v2"';
        return { statusCode: 412, data: { error: { code: 'precondition_failed' } } };
      }
      current = JSON.parse(options.body); etag = '"v3"';
      return { statusCode: 200, data: { pathname: 'sdk-contract/counter.json', etag } };
  }).persist();
  agent.get('https://vercel.com').intercept({ path: '/api/blob/delete', method: 'POST' }).reply(options => {
      const headers = new Headers(options.headers);
      assert.equal(headers.get('x-if-match'), etag); deleted = true;
      return { statusCode: 200, data: {} };
  });
  const store = createBlobStore({ env });
  const saved = await store.mutate('counter', empty, doc => { doc.count++; });
  assert.equal(saved.doc.count, 11); assert.equal(puts, 2); assert.equal(reads, 2);
  assert.equal((await store.read('counter', saved.etag)).unchanged, true);
  await store.remove('counter'); assert.equal(deleted, true);
});

test('real SDK private GET 403 becomes an actionable access error', async t => {
  mockedHttp(t).get('https://teststore.private.blob.vercel-storage.com')
    .intercept({ path: '/sdk-contract/auth.json?cache=0', method: 'GET' }).reply(403, 'Forbidden');
  await assert.rejects(createBlobStore({ env }).read('auth'), e => e.code === 'BLOB_ACCESS_DENIED' && e.diagnostic.providerStatus === 403);
});

test('real SDK recovers when private GET supplies a weak validator and HEAD supplies its strong version', async t => {
  const agent = mockedHttp(t); let puts = 0, heads = 0;
  agent.get('https://teststore.private.blob.vercel-storage.com')
    .intercept({ path:'/sdk-contract/weak.json?cache=0', method:'GET' })
    .reply(200, JSON.stringify(empty), { headers:{etag:'W/"canonical"','content-type':'application/json'} }).persist();
  agent.get('https://vercel.com').intercept({ path:'/api/blob?url=sdk-contract%2Fweak.json', method:'GET' })
    .reply(() => { heads++; return {statusCode:200,data:{pathname:'sdk-contract/weak.json',etag:'"canonical"'}}; }).persist();
  agent.get('https://vercel.com').intercept({ path:'/api/blob/?pathname=sdk-contract%2Fweak.json', method:'PUT' })
    .reply(options => {
      puts++; const headers = new Headers(options.headers);
      if (headers.get('x-if-match') !== '"canonical"') return {statusCode:412,data:{error:{code:'precondition_failed'}}};
      assert.equal(JSON.parse(options.body).count, 1);
      return {statusCode:200,data:{pathname:'sdk-contract/weak.json',etag:'"saved"'}};
    }).persist();
  const result = await createBlobStore({env}).mutate('weak',empty,doc=>{doc.count++;});
  assert.equal(result.etag,'"saved"'); assert.equal(puts,2); assert.equal(heads,2);
});

test('real SDK exception classes distinguish access, suspended store, rate limit and timeout', () => {
  const cases = [
    [new blob.BlobAccessError(), 'BLOB_ACCESS_DENIED'],
    [new blob.BlobStoreNotFoundError(), 'BLOB_STORE_NOT_FOUND'],
    [new blob.BlobStoreSuspendedError(), 'BLOB_STORE_SUSPENDED'],
    [new blob.BlobServiceRateLimited(60), 'BLOB_RATE_LIMITED'],
    [new blob.BlobRequestAbortedError(), 'BLOB_TIMEOUT'],
    [new blob.BlobError('OIDC is enabled for this project, but not for the preview environment.'), 'BLOB_ENVIRONMENT_DENIED'],
    [new blob.BlobError('Invalid token: unable to extract store ID'), 'BLOB_CREDENTIAL_INVALID']
  ];
  for (const [error, code] of cases) {
    assert.equal(error.name, 'Error');
    const safe = describeBlobFailure(error, 'read');
    assert.equal(safe.code, code); assert.equal(safe.status, 503);
  }
});

test('OIDC uses the SDK refresh path; token whitespace is trimmed; mixed stores are refused before I/O', async () => {
  let options, calls = 0;
  const sdk = { async get(key, opts) { options = opts; calls++; return null; } };
  const oidcEnv = { ...env, VERCEL: '1', BLOB_STORE_ID: 'store_teststore' };
  await createBlobStore({ sdk, env: oidcEnv }).read('auth');
  assert.equal(options.token, undefined); assert.equal(options.oidcToken, undefined); assert.equal(options.storeId, 'store_teststore');
  await createBlobStore({ sdk, env: { ...env, BLOB_READ_WRITE_TOKEN: ` ${env.BLOB_READ_WRITE_TOKEN}\n` } }).read('auth');
  assert.equal(options.token, env.BLOB_READ_WRITE_TOKEN);
  await assert.rejects(createBlobStore({ sdk, env: { ...oidcEnv, BLOB_STORE_ID: 'store_different' } }).read('auth'), e => e.code === 'BLOB_CREDENTIAL_MISMATCH');
  assert.equal(calls, 2);
});

test('an existing document without an ETag is never overwritten', async () => {
  let writes = 0;
  const sdk = { async get() { return { statusCode: 200, blob: { etag: '' }, stream: new Response(JSON.stringify(empty)).body }; },
    async put() { writes++; } };
  await assert.rejects(createBlobStore({ sdk, env }).mutate('auth', empty, d => { d.count++; }), e => e.code === 'BLOB_ETAG_MISSING');
  assert.equal(writes, 0);
});

test('repeated real SDK conflicts stop with STORE_BUSY instead of a misleading service outage', async () => {
  let writes = 0;
  const tag = () => `"v${writes}"`;
  const sdk = { async head() { return { etag: tag() }; },
    async get() { return { statusCode: 200, blob: { etag: tag() }, stream: new Response(JSON.stringify(empty)).body }; },
    async put() { writes++; throw new blob.BlobPreconditionFailedError(); } };
  await assert.rejects(createBlobStore({ sdk, env, retries: 2 }).mutate('auth', empty, d => { d.count++; }), e => e.code === 'STORE_BUSY' && e.status === 409);
  assert.equal(writes, 2);
});

test('API diagnostic references match logs and never expose raw SDK secrets or URLs', async t => {
  const h = harness(), logs = [], secret = 'never-log-this-secret';
  t.mock.method(console, 'error', (...parts) => logs.push(parts.join(' ')));
  h.fake.sdk.get = async () => { throw new blob.BlobError(`Failed to fetch blob: 403 Forbidden https://example.invalid/?token=${secret}`); };
  const response = await h.browser().call('session', {}, 'GET');
  assert.equal(response.status, 503); assert.equal(response.body.code, 'BLOB_ACCESS_DENIED');
  assert.match(response.body.reference, /^[a-f0-9]{8}$/);
  assert.ok(logs.some(line => line.includes(response.body.reference) && line.includes('read')));
  assert.equal(JSON.stringify({ response, logs }).includes(secret), false);
});

test('interrupted response bodies are not mistaken for corrupt stored JSON', async () => {
  const sdk = { async get() { return { statusCode: 200, blob: { etag: '"v1"' },
    stream: new ReadableStream({ start(controller) { controller.error(new DOMException('read timed out', 'TimeoutError')); } }) }; } };
  await assert.rejects(createBlobStore({ sdk, env }).read('auth'), e => e.code === 'BLOB_TIMEOUT' && e.diagnostic.operation === 'read-body');
});
