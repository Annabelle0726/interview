import test from 'node:test';
import assert from 'node:assert/strict';
import {parseBackup,blankRecord} from '../src/learning.ts';

test('project edits including deliberately empty text survive backup without losing notes',()=>{
 const record={...blankRecord(),note:'个人经历',projectDraft:{'project.intro':'我的介绍','guide.pitch.short.0':''}};
 const restored=parseBackup(JSON.stringify({version:1,records:{'project-bloom':record},signature:''}));
 assert.deepEqual(restored.records['project-bloom'],record);
});
test('invalid project edits reject the whole backup instead of silently dropping changes',()=>{
 for(const projectDraft of [[],null,{'project.intro':123},{'project.intro':'x'.repeat(50001)},JSON.parse('{"__proto__":"bad"}')]){
  assert.throws(()=>parseBackup(JSON.stringify({version:1,records:{'project-bloom':{...blankRecord(),projectDraft}},signature:''})));
 }
});
