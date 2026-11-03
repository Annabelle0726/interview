import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {readQuizAnswers,quizScore} from '../src/quiz.ts';
import type {QuizQuestion} from '../src/quiz.ts';
const read=(name:string)=>JSON.parse(readFileSync(new URL('../src/data/'+name+'.json',import.meta.url),'utf8'));
const lessons=read('p0-core');
const core:QuizQuestion[]=read('p0-quiz');
const methods:QuizQuestion[]=read('engineering-quiz');

test('all seven P0 skills have complete teaching material and three explained scenarios',()=>{
 assert.equal(lessons.length,7);
 assert.deepEqual(lessons.map((l:{title:string})=>l.title),['Context Engineering','Prompt Engineering','Agentic Workflow','Debugging','Code Review','Git Workflow','Testing & CI']);
 assert.equal(new Set([...core,...methods].map(q=>q.id)).size,45);
 for(const lesson of lessons) {
  assert.ok(lesson.summary && lesson.scenario && lesson.template && lesson.attention);
  assert.ok(lesson.skills.length>=4 && lesson.spoken.length>=2 && lesson.followups.length>=2 && lesson.references.length);
  const qs=core.filter(q=>q.topic===lesson.title);
  assert.equal(qs.length,3);
  for(const q of qs) {
   assert.equal(q.options.length,4);
   assert.equal(new Set(q.options.map(o=>o.text)).size,4);
   assert.ok(Number.isInteger(q.correct) && q.correct>=0 && q.correct<4);
   assert.ok(q.options.every(o=>o.text.trim() && o.explanation.trim()));
  }
 }
});

test('shared progress restores both quiz sets while scoring only the current topic',()=>{
 const q=core[0],m=methods[0];
 const answers=readQuizAnswers(JSON.stringify({[q.id]:q.correct,[m.id]:m.correct}),[...methods,...core]);
 assert.equal(Object.keys(answers).length,2);
 assert.deepEqual(quizScore(core.filter(c=>c.topic===q.topic),answers),{attempted:1,correct:1,total:3});
 const reset=Object.fromEntries(Object.entries(answers).filter(([id])=>!core.some(c=>c.id===id)));
 assert.deepEqual(reset,{[m.id]:m.correct});
});
