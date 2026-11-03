import {useState,useLayoutEffect,useRef} from 'react';
import {methodQuestions,coreQuestions,allQuizQuestions} from './quiz-bank';
import {quizScore,readQuizAnswers} from './quiz';
import type {QuizQuestion,QuizAnswers} from './quiz';
import type {Priority} from './types';
import {Emphasis} from './Emphasis';

const STORAGE_KEY='interviews-engineering-quiz-v1';
const letters='ABCD';
const topics=[['all','全部'],['SDD','SDD · 规格驱动'],['BDD','BDD · 行为驱动'],['TDD','TDD · 测试驱动']];

function scrollToQuestions(embedded:boolean) {
 if(embedded)document.querySelector('.p0-quiz-section')?.scrollIntoView({block:'start',behavior:'instant'});
 else document.querySelector('.main')?.scrollTo({top:0,behavior:'instant'});
}

function QuizCard({q,answer,onSubmit,level}:{q:QuizQuestion;answer:number|undefined;onSubmit:(value:number)=>void;level:Priority}) {
 const [selected,setSelected]=useState<number|undefined>(answer);
 const submitted=answer!==undefined;
 return <section className="quiz-card">
  <span className={'badge '+level}>{q.topic} · 单选题</span>
  <h2 id="quiz-prompt"><Emphasis text={q.prompt}/></h2>
  <fieldset className="quiz-options" aria-labelledby="quiz-prompt">
   <legend className="quiz-legend">请选择一个答案</legend>
   {q.options.map((option,i)=><label key={option.text} className={'quiz-option '+(submitted&&i===q.correct?'is-correct':submitted&&i===answer?'is-wrong':'')}>
    <input type="radio" name={q.id} value={i} checked={selected===i} disabled={submitted} onChange={()=>setSelected(i)}/>
    <span className="quiz-option-text"><strong>{letters[i]}.</strong> <Emphasis text={option.text}/>
     {submitted && i===q.correct && <small>正确答案</small>}
     {submitted && i===answer && i!==q.correct && <small>你的选择 · 不正确</small>}
    </span>
   </label>)}
  </fieldset>
  {!submitted && <button className="primary" disabled={selected===undefined} onClick={()=>selected!==undefined&&onSubmit(selected)}>提交答案，查看解析</button>}
  {submitted && <div className="quiz-explanation">
   <p className={answer===q.correct?'quiz-success':'quiz-error'} role="status"><strong>{answer===q.correct?'答对了':'这题答错了'} · 正确答案：{letters[q.correct]}</strong></p>
   <h3>逐项解析</h3>
   <ol>{q.options.map((option,i)=><li key={option.text}><strong>{letters[i]} · {i===q.correct?'正确':'不选'}</strong><p><Emphasis text={option.explanation}/></p></li>)}</ol>
  </div>}
 </section>;
}

export default function EngineeringQuiz({coreTopic,level='P0'}:{coreTopic?:string;level?:Priority}) {
 const questions:QuizQuestion[]=coreTopic?coreQuestions.filter(q=>q.topic===coreTopic):methodQuestions;
 const [topic,setTopic]=useState('all');
 const [index,setIndex]=useState(0);
 const scrollAfterJump=useRef(false);
 const [round,setRound]=useState(0);
 const [answers,setAnswers]=useState<QuizAnswers>(()=>{try{return readQuizAnswers(localStorage.getItem(STORAGE_KEY),allQuizQuestions)}catch{return {}}});
 const [storageError,setStorageError]=useState('');
 const filtered=topic==='all'?questions:questions.filter(q=>q.topic===topic);
 const q=filtered[index];
 const score=quizScore(filtered,answers);
 function save(next:QuizAnswers) {
  setAnswers(next);
  try{localStorage.setItem(STORAGE_KEY,JSON.stringify(next));setStorageError('')}catch{setStorageError('本次结果仍可查看，但浏览器未能保存练习记录。')}
 }
 useLayoutEffect(()=>{
  if(!scrollAfterJump.current)return;
  scrollAfterJump.current=false;
  scrollToQuestions(!!coreTopic);
 },[index,coreTopic]);
 function jump(next:number){
  if(next===index){scrollAfterJump.current=false;scrollToQuestions(!!coreTopic);return}
  scrollAfterJump.current=true;setIndex(next);
 }
 return <div className={(coreTopic?'':'page ')+'engineering-quiz'}>
  <div className="page-heading"><div>{coreTopic?<h2>场景选择题 · {questions.length} 道</h2>:<h1>SDD / BDD / TDD 选择题</h1>}<p>{coreTopic?'用场景检查你是否理解本项能力，提交后看四个选项的解析。':'24 道单选 · 概念辨析、Python 场景与 Agent 实践。先选择，再看答案与逐项解析。'}</p></div></div>
  {!coreTopic&&<><p className="quiz-definition"><strong>SDD</strong> 明确规格，<strong>BDD</strong> 用例子对齐行为，<strong>TDD</strong> 用失败测试驱动实现。本组 SDD 指规格驱动开发。</p>
  <div className="quiz-topic-filter" role="group" aria-label="选择练习主题">{topics.map(([value,label])=><button key={value} aria-pressed={topic===value} className={topic===value?'primary':''} onClick={()=>{setTopic(value);setIndex(0)}}>{label}</button>)}</div></>}
  <div className="quiz-score"><p>本组已答 <strong>{score.attempted} / {score.total}</strong> · 答对 <strong>{score.correct}</strong>{score.attempted>0&&<> · 正确率 <strong>{Math.round(score.correct/score.attempted*100)}%</strong></>}</p><button onClick={()=>{save(Object.fromEntries(Object.entries(answers).filter(([id])=>!filtered.some(item=>item.id===id))));setRound(r=>r+1);setIndex(0)}}>重新练习本组</button></div>
  {storageError&&<p role="status" className="quiz-error">{storageError}</p>}
  <nav className="quiz-question-nav" aria-label="选择题号">{filtered.map((item,i)=><button key={item.id} aria-label={`第 ${i+1} 题${answers[item.id]===undefined?'':answers[item.id]===item.correct?'，已答对':'，答错'}`} aria-current={i===index?'step':undefined} className={answers[item.id]===undefined?'':answers[item.id]===item.correct?'is-correct':'is-wrong'} onClick={()=>jump(i)}>{i+1}{answers[item.id]!==undefined&&<span aria-hidden="true">{answers[item.id]===item.correct?' ✓':' ×'}</span>}</button>)}</nav>
  <p className="quiz-position">第 {index+1} / {filtered.length} 题</p>
  <QuizCard key={q.id+'-'+round} q={q} answer={answers[q.id]} onSubmit={value=>save({...answers,[q.id]:value})} level={level}/>
  <div className="question-pagination"><button disabled={index===0} onClick={()=>jump(index-1)}>上一题</button><button disabled={index===filtered.length-1} onClick={()=>jump(index+1)}>下一题</button></div>
  {score.attempted===score.total&&<p className="quiz-complete" role="status">本组已完成，答对 {score.correct} / {score.total} 题。可以点击题号复习解析，或重新练习本组。</p>}
  <p className="quiz-save-note">提交后保存练习结果；未提交的选择不计分。重新练习只重置当前主题，不影响面试笔记。选择题记录独立保存在当前浏览器，不包含在面试笔记备份中。</p>
  {!coreTopic&&<div className="sources"><span>概念参考</span><a href="https://github.com/github/spec-kit" target="_blank" rel="noreferrer">GitHub Spec Kit</a><a href="https://cucumber.io/docs/bdd/" target="_blank" rel="noreferrer">Cucumber · BDD</a><a href="https://martinfowler.com/bliki/TestDrivenDevelopment.html" target="_blank" rel="noreferrer">Martin Fowler · TDD</a></div>}
 </div>;
}
