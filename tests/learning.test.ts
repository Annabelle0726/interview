import test from 'node:test';
import assert from 'node:assert/strict';
import { filterQuestions, parseBackup, safeLoad, saveProgress } from '../src/learning.ts';
const questions = [
 {id:'a',category:'python',priority:'P0',title:'Python 异步',summary:'I/O 与 CPU',blocks:[{type:'p',text:'事件循环 asyncio'}],focus:['阻塞'],tags:['Python']},
 {id:'b',category:'rag',priority:'P1',title:'文若 RAG',summary:'检索与个人贡献',blocks:[{type:'p',text:'WeKnora'}],focus:[],tags:['RAG']}
];
const data={version:1,records:{a:{status:'review',starred:true,note:'需练习'}},signature:''};
test('Chinese/body/case-insensitive search and whitespace normalization',()=>{
 assert.deepEqual(filterQuestions(questions,{query:'  ASYNCIO  '},data).map(q=>q.id),['a']);
 assert.deepEqual(filterQuestions(questions,{query:'文若'},data).map(q=>q.id),['b']);
 assert.equal(filterQuestions(questions,{query:'不存在'},data).length,0);
});
test('filters combine with starred, review and priority',()=>{
 assert.equal(filterQuestions(questions,{priority:'P0',mode:'starred'},data).length,1);
 assert.equal(filterQuestions(questions,{category:'rag',mode:'starred'},data).length,0);
 assert.equal(filterQuestions(questions,{mode:'review'},data).length,1);
});
test('backup roundtrip retains notes including newlines',()=>{
 const p=parseBackup(JSON.stringify(data),['a','b']);
 assert.equal(p.records.a.note,'需练习');
 assert.equal(p.records.a.starred,true);
});
test('malformed imports never silently erase learning history',()=>{
 for(const invalid of ['{}','null','[]','{"version":2,"records":{}}','{"version":1,"records":{"a":{"status":"bad"}}}']) assert.throws(()=>parseBackup(invalid,['a']));
});
test('unknown question ids retained for forward-compatible backup',()=>{
 assert.equal(parseBackup(JSON.stringify(data),['b']).records.a.note,'需练习');
});
test('invalid signature payload rejected',()=>{
 assert.throws(()=>parseBackup(JSON.stringify({...data,signature:'javascript:alert(1)'}),['a']));
});
test('corrupt storage does not crash and reports error',()=>{
 const loaded=safeLoad({getItem:()=>'{broken'});
 assert.equal(loaded.data.version,1); assert.ok(loaded.error);
});
test('quota errors reported instead of falsely claiming saved',()=>{
 const error=saveProgress({setItem:()=>{throw new Error('Quota exceeded')}},data);
 assert.ok(error);
});
test('a valid large Chinese notebook exported from the app can be restored',()=>{
 const records=Object.fromEntries(Array.from({length:85},(_,i)=>['q'+i,{status:'review',starred:false,note:'证'.repeat(50000)}]));
 const restored=parseBackup(JSON.stringify({version:1,records,signature:''}));
 assert.equal(restored.records.q84.note.length,50000);
});
