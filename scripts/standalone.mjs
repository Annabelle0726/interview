import {build} from 'esbuild';
import {readFile,writeFile} from 'node:fs/promises';
const result=await build({entryPoints:['src/main.tsx'],bundle:true,minify:true,format:'iife',target:'es2022',write:false,outdir:'out',define:{'process.env.NODE_ENV':'"production"'},loader:{'.png':'dataurl','.svg':'dataurl'}});
const js=result.outputFiles.find(f=>f.path.endsWith('.js')).text.replace(/<\/script/gi,'<\\/script');
const css=result.outputFiles.find(f=>f.path.endsWith('.css'))?.text||'';
const favicon=encodeURIComponent(await readFile('public/favicon.svg','utf8'));
const original=(await readFile('public/Interviews-original.docx')).toString('base64');
await writeFile('interviews.html',`<!doctype html><html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><link rel="icon" type="image/svg+xml" href="data:image/svg+xml,${favicon}"><title>面试准备 · Annabelle</title><style>${css}</style></head><body><div id="root"></div><script type="application/octet-stream" id="original-docx">${original}</script><script>${js}</script></body></html>`);
console.log('Standalone HTML generated: interviews.html (no external assets)');
