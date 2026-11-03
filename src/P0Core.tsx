import {useState} from 'react';
import lessons from './data/p0-core.json';
import EngineeringQuiz from './EngineeringQuiz';
import {Emphasis} from './Emphasis';

export default function P0Core() {
 const [id,setId]=useState(lessons[0].id);
 const lesson=lessons.find(item=>item.id===id)!;
 return <div className="page p0-core">
  <div className="page-heading"><div><h1>P0 · AI 开发核心能力</h1><p>7 项必须讲清的能力 · 掌握要点、项目场景、口述稿与 21 道选择题。</p></div></div>
  <div className="p0-topic-picker"><label htmlFor="p0-topic">选择学习主题</label><select id="p0-topic" value={id} onChange={e=>setId(e.target.value)}>{lessons.map(item=><option key={item.id} value={item.id}>{item.title} · {item.subtitle}</option>)}</select></div>
  <article key={id}>
   <section className="p0-lesson">
    <div className="section-title"><div><span className="badge P0">P0 · 必须熟练掌握</span><h2>{lesson.title}</h2><p>{lesson.subtitle}</p></div></div>
    <p className="p0-summary">{lesson.summary}</p>
    <h3>需要掌握什么</h3><ol className="p0-skills">{lesson.skills.map(skill=><li key={skill}>{skill}</li>)}</ol>
    <h3>放到你的项目里</h3><p>{lesson.scenario}</p>
    <h3>面试时这样讲</h3>{lesson.spoken.map(text=><p key={text}>{text}</p>)}
    <details className="p0-details"><summary>给 Agent 的任务示例</summary><p className="p0-template">{lesson.template}</p></details>
    <details className="p0-details"><summary>继续追问 · {lesson.followups.length} 个问题</summary>{lesson.followups.map(item=><div className="followup-pair" key={item.prompt}><h4>{item.prompt}</h4><p>{item.answer}</p></div>)}</details>
    <div className="sources"><span>参考资料</span>{lesson.references.map(link=><a key={link.url} href={link.url} target="_blank" rel="noreferrer">{link.title} ↗</a>)}</div>
   </section>
   <aside className="interview-attention" aria-label="面试重点"><strong>面试重点</strong><p><Emphasis text={lesson.attention}/></p></aside>
   <button className="primary p0-practice-jump" onClick={()=>document.getElementById('p0-quiz')?.scrollIntoView({block:'start'})}>开始本主题的 3 道选择题</button>
   <section id="p0-quiz" className="p0-quiz-section"><EngineeringQuiz key={id} coreTopic={lesson.title}/></section>
  </article>
 </div>;
}
