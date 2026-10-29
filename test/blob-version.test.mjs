import test from 'node:test';
import assert from 'node:assert/strict';
import { BlobPreconditionFailedError, BlobAccessError } from '@vercel/blob';
import { createBlobStore } from '../lib/blob-store.js';
import { fakeBlobSdk, testEnvironment } from './fixtures.mjs';

const key = 'private/auth';
const pathname = 'siakad-v5/private/auth.json';
const initial = { schema: 5, revision: 0, count: 0 };
function seeded() {
  const fake = fakeBlobSdk();
  fake.records.set(pathname, { text: JSON.stringify(initial), etag: '"initial"' });
  return fake;
}

test('weak read validators recover using verified strong metadata; deletion keeps its precondition', async () => {
  const fake = seeded(), get = fake.sdk.get;
  fake.sdk.get = async (...args) => {
    const result = await get(...args);
    if (result) result.blob.etag = `W/${result.blob.etag}`;
    return result;
  };
  const store = createBlobStore({ sdk: fake.sdk, env: testEnvironment });
  const saved = await store.mutate(key, initial, doc => { doc.count++; });
  assert.equal(saved.doc.count, 1); assert.equal(fake.metrics().writes, 1);
  assert.ok(!saved.etag.startsWith('W/'));
  await store.remove(key); assert.equal(fake.records.has(pathname), false);
});

test('stale body is never written with newer metadata even if both metadata reads agree', async () => {
  let writes = 0;
  const sdk = {
    async head() { return { etag: '"new"' }; },
    async get() { return { statusCode: 200, blob: { etag: '"old"' }, stream: new Response(JSON.stringify(initial)).body }; },
    async put() { writes++; throw new BlobPreconditionFailedError(); }
  };
  await assert.rejects(createBlobStore({ sdk, env: testEnvironment, retries: 3 }).mutate(key, initial, doc => { doc.count++; }),
    e => e.code === 'BLOB_READ_VERSION_MISMATCH' && e.diagnostic.readMetadataMismatch === 2);
  assert.equal(writes, 1, 'No write is attempted after the body and metadata disagree');
});

test('a concurrent update during the bracketed read is reloaded before the mutation runs', async () => {
  const fake = seeded(), get = fake.sdk.get, put = fake.sdk.put;
  let firstWrite = true, nextReadRaces = false, updates = 0;
  fake.sdk.put = async (...args) => {
    if (firstWrite) {
      firstWrite = false; nextReadRaces = true;
      fake.records.set(pathname, { text: JSON.stringify({ ...initial, count: 10, revision: 1 }), etag: '"other-1"' });
    }
    return put(...args);
  };
  fake.sdk.get = async (...args) => {
    const result = await get(...args);
    if (nextReadRaces) {
      nextReadRaces = false;
      fake.records.set(pathname, { text: JSON.stringify({ ...initial, count: 30, revision: 2 }), etag: '"other-2"' });
    }
    return result;
  };
  const saved = await createBlobStore({ sdk: fake.sdk, env: testEnvironment }).mutate(key, initial, doc => { updates++; doc.count++; });
  assert.equal(saved.doc.count, 31); assert.equal(updates, 2);
});

test('rejection of an unchanged authoritative version gets a separate diagnosis without raw data', async () => {
  const fake = seeded(); fake.sdk.put = async () => { throw new BlobPreconditionFailedError(); };
  await assert.rejects(createBlobStore({ sdk: fake.sdk, env: testEnvironment, retries: 3 }).mutate(key, initial, doc => { doc.count++; }), e => {
    assert.equal(e.code, 'BLOB_CONDITION_REJECTED'); assert.equal(e.status, 503);
    assert.deepEqual(e.diagnostic, { operation: 'conditional-write', documentKind: 'authentication', attempts: 3,
      writesRejected: 3, metadataSnapshots: 2, metadataChanged: 0, readMetadataMismatch: 0, distinctMetadataVersions: 1, weakReadSeen: false });
    assert.equal(JSON.stringify(e).includes('"initial"'), false);
    return true;
  });
  assert.equal(JSON.parse(fake.records.get(pathname).text).count, 0);
});

test('weak metadata is rejected rather than being silently converted to a strong validator', async () => {
  const fake = seeded(); fake.sdk.head = async () => ({ etag: 'W/"initial"' });
  fake.sdk.put = async () => { throw new BlobPreconditionFailedError(); };
  await assert.rejects(createBlobStore({ sdk: fake.sdk, env: testEnvironment }).mutate(key, initial, doc => { doc.count++; }),
    e => e.code === 'BLOB_METADATA_INVALID');
});

test('metadata access failures do not trigger an unconditional overwrite', async () => {
  const fake = seeded(); let writes = 0;
  fake.sdk.head = async () => { throw new BlobAccessError(); };
  fake.sdk.put = async () => { writes++; throw new BlobPreconditionFailedError(); };
  await assert.rejects(createBlobStore({ sdk: fake.sdk, env: testEnvironment }).mutate(key, initial, doc => { doc.count++; }),
    e => e.code === 'BLOB_ACCESS_DENIED' && e.diagnostic.operation === 'metadata');
  assert.equal(writes, 1);
});
