import test from 'node:test';
import assert from 'node:assert/strict';
import {allQuizQuestions,coreQuestions,methodQuestions} from '../src/quiz-bank.ts';
import {readQuizAnswers,quizScore} from '../src/quiz.ts';
import {curricula} from '../src/core-curriculum.ts';

test('each tier has complete lessons mapped to three scenario questions per topic',()=>{
 const titles={
  P0:['Context Engineering','Prompt Engineering','Agentic Workflow','Debugging','Code Review','Git Workflow','Testing & CI'],
  P1:['DDD','API Contract','Clean Architecture','Security','Observability','CI/CD & DevOps'],
  P2:['MCP','Skills','Hooks','AI Evaluation','Agent Orchestration']
 };
 const seen=new Set<string>();
 for(const level of ['P0','P1','P2'] as const) {
  const course=curricula[level];
  assert.deepEqual(course.lessons.map(l=>l.title),titles[level]);
  for(const lesson of course.lessons) {
   assert.ok(!seen.has(lesson.title),lesson.title);
   seen.add(lesson.title);
   assert.ok(lesson.summary && lesson.scenario && lesson.attention && lesson.template,lesson.id);
   assert.ok(lesson.skills.length>=4 && lesson.spoken.length>=2 && lesson.followups.length>=2,lesson.id);
   assert.ok(lesson.references.length && lesson.references.every(r=>r.title && r.url.startsWith('https://')),lesson.id);
   assert.equal(coreQuestions.filter(q=>q.topic===lesson.title).length,3,lesson.title);
  }
 }
});

test('all learning levels share a complete quiz bank without duplicate IDs',()=>{
 assert.equal(methodQuestions.length,24);
 assert.equal(coreQuestions.length,54);
 assert.equal(allQuizQuestions.length,78);
 assert.equal(new Set(allQuizQuestions.map(q=>q.id)).size,allQuizQuestions.length);
 for(const q of allQuizQuestions) {
  assert.ok(q.prompt.trim() && q.topic.trim(),q.id);
  assert.equal(q.options.length,4,q.id);
  assert.equal(new Set(q.options.map(o=>o.text)).size,4,q.id);
  assert.ok(q.options.every(o=>o.text.trim() && o.explanation.trim()),q.id);
  assert.ok(Number.isInteger(q.correct) && q.correct>=0 && q.correct<4,q.id);
 }
});

test('progress from methods, P0, P1 and P2 survives a topic switch and scoped reset',()=>{
 const method=methodQuestions[0],p0=coreQuestions[0];
 const raw=JSON.stringify({[method.id]:0,[p0.id]:1,'p1-ddd-01':2,'p2-mcp-01':3});
 const restored=readQuizAnswers(raw,allQuizQuestions);
 assert.equal(Object.keys(restored).length,4);
 const p1=coreQuestions.filter(q=>q.topic==='DDD');
 assert.deepEqual(quizScore(p1,restored),{attempted:1,correct:restored[p1[0].id]===p1[0].correct?1:0,total:3});
 const reset=Object.fromEntries(Object.entries(restored).filter(([id])=>!p1.some(q=>q.id===id)));
 assert.equal(reset[method.id],0);
 assert.equal(reset[p0.id],1);
 assert.equal(reset['p2-mcp-01'],3);
 assert.ok(!Object.hasOwn(reset,'p1-ddd-01'));
});
