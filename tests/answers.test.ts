import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {parseBackup} from '../src/learning.ts';

function readData(name:string) {
 return JSON.parse(readFileSync(new URL('../src/data/' + name + '.json',import.meta.url),'utf8'));
}

test('every question has its own spoken answer and replies to every original follow-up',()=>{
 const additions=[...readData('vibe-coding'),...readData('recent-qa'),...readData('frontend-qa')];
 const cards=[...readData('questions'),...readData('supplement'),...readData('fullstack'),...additions];
 const answers={...readData('spoken-answers'),...Object.fromEntries(additions.map((card:{id:string})=>[card.id,card]))};
 assert.equal(new Set(cards.map(card=>card.id)).size,cards.length);
 assert.deepEqual(Object.keys(answers).sort(),cards.map(card=>card.id).sort());
 for(const card of cards) {
  const answer=answers[card.id];
  assert.ok(answer.spoken.length && answer.spoken.every((line:string)=>line.trim()),card.id);
  assert.ok(answer.followups.length,card.id);
  const prompts=new Set(answer.followups.map((pair:{prompt:string;answer:string})=>{
   assert.ok(pair.prompt.trim() && pair.answer.trim(),card.id);
   return pair.prompt;
  }));
  for(const original of card.followups) {
   const prompt=typeof original==='string' ? original : original.prompt;
   assert.ok(prompts.has(prompt.replace(/^(面试官追问|考官可能追问|考官追问)[ ：:]*/,'')),card.id);
  }
 }
});

test('an edited spoken answer and the older personal note survive the same backup round trip',()=>{
 const progress={version:1,records:{s01:{status:'review',starred:true,note:'我的原笔记',answerDraft:'我的第一段。\n\n第二段。'}},signature:''};
 assert.deepEqual(parseBackup(JSON.stringify(progress)),progress);
 progress.records.s01.answerDraft='  ';
 assert.equal(parseBackup(JSON.stringify(progress)).records.s01.answerDraft,undefined);
});
