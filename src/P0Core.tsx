import {useState} from 'react';
import {curricula} from './core-curriculum';
import type {Priority} from './types';
import EngineeringQuiz from './EngineeringQuiz';
import {Emphasis} from './Emphasis';

export default function CoreLearning({level='P0'}:{level?:Priority}) {
 const course=curricula[level];
 const lessons=course.lessons;
 const [selection,setSelection]=useState<Partial<Record<Priority,string>>>({});
 const lesson=lessons.find(item=>item.id===selection[level])||lessons[0];
 const id=lesson.id;
 const pickerId=level.toLowerCase()+'-topic';
 const quizId=level.toLowerCase()+'-quiz';
 return <div className="page p0-core">
  <div className="page-heading"><div><h1>{course.title}</h1><p>{course.description}</p><p>{lessons.length} 项能力 · 掌握要点、项目场景、口述稿与 {lessons.length*3} 道选择题。</p></div></div>
  <div className="p0-topic-picker"><label htmlFor={pickerId}>选择学习主题</label><select id={pickerId} value={id} onChange={e=>setSelection(s=>({...s,[level]:e.target.value}))}>{lessons.map(item=><option key={item.id} value={item.id}>{item.title} · {item.subtitle}</option>)}</select></div>
  <article key={level+'-'+id}>
   <section className="p0-lesson">
    <div className="section-title"><div><span className={'badge '+level}>{level} · {course.label}</span><h2>{lesson.title}</h2><p>{lesson.subtitle}</p></div></div>
    <p className="p0-summary"><Emphasis text={lesson.summary}/></p>
    <h3>需要掌握什么</h3><ol className="p0-skills">{lesson.skills.map(skill=><li key={skill}><Emphasis text={skill}/></li>)}</ol>
    <h3>放到你的项目里</h3><p><Emphasis text={lesson.scenario}/></p>
    <h3>面试时这样讲</h3>{lesson.spoken.map(text=><p key={text}><Emphasis text={text}/></p>)}
    <details className="p0-details"><summary>给 Agent 的任务示例</summary><p className="p0-template"><Emphasis text={lesson.template}/></p></details>
    <details className="p0-details"><summary>继续追问 · {lesson.followups.length} 个问题</summary>{lesson.followups.map(item=><div className="followup-pair" key={item.prompt}><h4>{item.prompt}</h4><p><Emphasis text={item.answer}/></p></div>)}</details>
    <div className="sources"><span>参考资料</span>{lesson.references.map(link=><a key={link.url} href={link.url} target="_blank" rel="noreferrer">{link.title} ↗</a>)}</div>
   </section>
   <aside className="interview-attention" aria-label="面试重点"><strong>面试重点</strong><p><Emphasis text={lesson.attention}/></p></aside>
   <button className="primary p0-practice-jump" onClick={()=>document.getElementById(quizId)?.scrollIntoView({block:'start'})}>开始本主题的 3 道选择题</button>
   <section id={quizId} className="p0-quiz-section"><EngineeringQuiz key={level+'-'+id} coreTopic={lesson.title} level={level}/></section>
  </article>
 </div>;
}
