import {defineConfig} from '@playwright/test';
import {readFileSync} from 'node:fs';
const customBrowser=process.env.BROWSER_OPTIONS_FILE?JSON.parse(readFileSync(process.env.BROWSER_OPTIONS_FILE,'utf8')):{};
export default defineConfig({
  testDir:'./test/browser', fullyParallel:false, workers:1, timeout:60000,
  use:{baseURL:'http://127.0.0.1:3100',headless:true,trace:'retain-on-failure',launchOptions:customBrowser},
  webServer:{command:'node scripts/test-server.mjs',url:'http://127.0.0.1:3100',reuseExistingServer:false,timeout:30000},
  reporter:'list'
  ,expect:{timeout:15000}
});
