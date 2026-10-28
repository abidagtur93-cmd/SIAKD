// Local test fixture only. Not imported by production and never exposed as static files.
import {mkdir,writeFile} from 'node:fs/promises';
import {createApplication} from '../lib/application.js';
import {createBlobStore} from '../lib/blob-store.js';
import {createHttpServer} from './http-server.mjs';
import {fakeBlobSdk,testEnvironment} from '../test/fixtures.mjs';
const sdk=fakeBlobSdk();
await mkdir('.dev-data',{recursive:true});
await writeFile('.dev-data/mailbox.json','[]');
const mailbox=[];
const handler=createApplication({env:testEnvironment,store:createBlobStore({sdk:sdk.sdk,env:testEnvironment}),sendMail:async message=>{mailbox.push(message);await writeFile('.dev-data/mailbox.json',JSON.stringify(mailbox));}});
createHttpServer(handler).listen(3100,'127.0.0.1',()=>console.log('Local test fixture on http://127.0.0.1:3100; no real emails sent.'));
