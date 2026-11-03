import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {quizScore,readQuizAnswers} from '../src/quiz.ts';
import type {QuizQuestion} from '../src/quiz.ts';
const questions:QuizQuestion[]=JSON.parse(readFileSync(new URL('../src/data/engineering-quiz.json',import.meta.url),'utf8'));

test('each quiz topic has eight complete single-answer questions with per-option explanations',()=>{
 assert.equal(new Set(questions.map(q=>q.id)).size,24);
 for (const topic of ['SDD','BDD','TDD']) assert.equal(questions.filter(q=>q.topic===topic).length,8);
 for (const q of questions) {
  assert.ok(q.prompt.trim());
  assert.equal(q.options.length,4);
  assert.equal(new Set(q.options.map(o=>o.text)).size,4);
  assert.ok(q.options.every(o=>o.text.trim() && o.explanation.trim()));
  assert.ok(Number.isInteger(q.correct) && q.correct>=0 && q.correct<4);
 }
});

test('scoring counts only submitted questions in the selected scope, including answer A',()=>{
 const q=questions[0],other=questions[1];
 assert.deepEqual(quizScore([q],{}),{attempted:0,correct:0,total:1});
 assert.deepEqual(quizScore([q],{[q.id]:q.correct,[other.id]:other.correct}),{attempted:1,correct:1,total:1});
 assert.equal(quizScore([q],{[q.id]:(q.correct+1)%4}).correct,0);
 assert.equal(quizScore([q],{[q.id]:0}).attempted,1);
});

test('restoring quiz progress rejects malformed, stale and out-of-range entries',()=>{
 const id=questions[0].id;
 assert.deepEqual(readQuizAnswers('{bad',questions),{});
 assert.deepEqual(readQuizAnswers('[]',questions),{});
 assert.deepEqual(readQuizAnswers(JSON.stringify({[id]:0,unknown:2,[questions[1].id]:9,[questions[2].id]:'1'}),questions),{[id]:0});
});
