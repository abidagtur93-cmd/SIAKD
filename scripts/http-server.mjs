import http from 'node:http';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const publicRoot=path.resolve(fileURLToPath(new URL('../public/',import.meta.url)));
const config=JSON.parse(await readFile(new URL('../vercel.json',import.meta.url),'utf8'));
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json','.svg':'image/svg+xml','.png':'image/png','.ico':'image/x-icon'};
export function createHttpServer(handler) {
  return http.createServer(async(req,res)=>{
    for(const {key,value} of config.headers[0].headers)res.setHeader(key,value);
    const url=new URL(req.url,'http://localhost');
    if(url.pathname==='/api/cloud-sync'){
      let bytes=0;const chunks=[];
      try {
        for await(const chunk of req){bytes+=chunk.length;if(bytes>3200000){res.writeHead(413);return res.end('Too large');}chunks.push(chunk);}
        req.body=Buffer.concat(chunks).toString('utf8');
        req.headers['x-vercel-forwarded-for']=req.socket.remoteAddress;
        res.status=status=>{res.statusCode=status;return res;};
        res.json=body=>{res.setHeader('Content-Type','application/json');res.end(JSON.stringify(body));return res;};
        await handler(req,res);
      } catch { if(!res.writableEnded){res.writeHead(500);res.end('Server error');} }
      return;
    }
    let filename;
    try {filename=path.resolve(publicRoot,'.'+decodeURIComponent(url.pathname==='/'?'/index.html':url.pathname));}
    catch {res.writeHead(400);return res.end();}
    if(!filename.startsWith(publicRoot+path.sep)&&filename!==path.join(publicRoot,'index.html')){res.writeHead(403);return res.end();}
    try {const bytes=await readFile(filename);res.setHeader('Content-Type',types[path.extname(filename)]||'application/octet-stream');res.end(bytes);}
    catch {res.writeHead(404);res.end('Not found');}
  });
}
