import { defineConfig } from 'vite';
export default defineConfig({base:'./',esbuild:{jsx:'automatic'},build:{target:'es2022'},server:{allowedHosts:['terminal.local'],host:process.env.SITES_MANAGED_LINUX_CONTAINER==='1'?'0.0.0.0':'127.0.0.1'}});
