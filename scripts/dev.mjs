import {createApplication} from '../lib/application.js';
import {createHttpServer} from './http-server.mjs';
const server=createHttpServer(createApplication());
const port=Number(process.env.PORT||3000);
server.listen(port,'127.0.0.1',()=>console.log(`SIAKAD local: http://localhost:${port} (uses real configured Blob and SMTP)`));
