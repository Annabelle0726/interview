import {useState} from 'react';
import {ArrowRight,Check,Copy,ExternalLink,MessageSquare} from 'lucide-react';
import type {Progress,RecordState} from './types';
import {projects,projectGuides,projectInterviewQuestions,mainProjectIds} from './data/projects';
import {questions} from './data/catalog';
import {blankRecord} from './learning';
import {Emphasis} from './Emphasis';
import './project-library.css';
import ProjectEditor,{applyProjectDraft} from './ProjectEditor';

export default function ProjectLibrary({selectedId,progress,onChange,onQuestion}:{selectedId:string;progress:Progress;onChange:(id:string,record:RecordState)=>void;onQuestion:(id:string,ids:string[])=>void}) {
 const original=projects.find(p=>p.id===selectedId)??projects[0];
 const noteId='project-'+original.id;
 const draft=progress.records[noteId]?.projectDraft??{};
 const source={project:original,guide:projectGuides[original.id],interviewQuestions:projectInterviewQuestions[original.id]??[]};
 const {project,guide,interviewQuestions}=applyProjectDraft(source,draft);
 const [editingId,setEditingId]=useState('');
 const [length,setLength]=useState<'short'|'long'>('short');
 const [practice,setPractice]=useState(false);
 const [copyState,setCopyState]=useState<'idle'|'done'|'failed'>('idle');
 const paragraphs=guide?guide.pitch[length]:[project.pitch??project.intro+' '+project.contributions.join(' ')];
 const links=guide?.links??project.links??[];
 const demo=guide?.demo??project.demo??['准备一个个人改动的前后对比和对应验证记录。','补充项目暂停的真实原因与可分享范围，再开始面试演练。'];
 function updateDraft(projectDraft:Record<string,string>){onChange(noteId,{...(progress.records[noteId]??blankRecord()),projectDraft});}
 async function copyPitch() {
  try {await navigator.clipboard.writeText(paragraphs.join('\n\n'));setCopyState('done');}
  catch {setCopyState('failed');}
 }
 return <div className="page project-library">
  <div className="eyebrow">我的项目库</div>
  <h1>把作品讲成具体的经历。</h1>
  <p className="page-description">三个主作品先练介绍，再展开技术案例与追问。其他作品按岗位需要补充，个人笔记会继续保存在当前浏览器。</p>
  <nav className="main-project-picker" aria-label="三个主作品">
   {mainProjectIds.map((id,index)=>{const p=projects.find(item=>item.id===id)!;return <a key={id} href={'#project:'+id} aria-current={p.id===project.id?'page':undefined}><small>主作品 0{index+1}</small><strong>{p.name}</strong><span>{id==='bloom'?'独立全栈 · AI 产品':id==='belay'?'Python · Docker · 协作':'React · 认证 · 数据接入'}</span></a>;})}
  </nav>
  <nav className="other-project-picker" aria-label="其他作品"><span>其他作品</span>{projects.filter(p=>!mainProjectIds.includes(p.id)).map(p=><a key={p.id} href={'#project:'+p.id} aria-current={p.id===project.id?'page':undefined}>{p.name}</a>)}</nav>
  <article className="project-card project-dossier" id={'project-'+project.id}>
   <header className="section-title"><div><h2>{project.name}</h2><p>{project.subtitle}</p></div><span className="badge neutral">{project.status}</span></header>
   <button onClick={()=>setEditingId(editingId===project.id?'':project.id)} aria-expanded={editingId===project.id}>{editingId===project.id?'收起编辑':'编辑项目内容'}</button>
   {editingId===project.id&&<ProjectEditor key={project.id} source={source} draft={draft} onChange={updateDraft} onDone={()=>setEditingId('')}/>}
   <p className="project-intro">{project.intro}</p>
   {links.length>0&&<div className="project-external-links">{links.map(link=><a key={link.url} href={link.url} target="_blank" rel="noreferrer">{link.title}<ExternalLink size={14}/></a>)}</div>}
   {guide&&<p className="project-orientation">{guide.overview}</p>}
   <section className="project-pitch" aria-label="项目介绍练习">
    <div className="section-title"><h3>面试时，我会这样介绍</h3><button onClick={()=>setPractice(!practice)} aria-pressed={practice}><MessageSquare size={15}/>{practice?'查看介绍稿':'自测介绍'}</button></div>
    {guide&&<div className="segmented project-pitch-length" aria-label="介绍长度"><button aria-pressed={length==='short'} className={length==='short'?'selected':''} onClick={()=>{setLength('short');setCopyState('idle');}}>30 秒概述</button><button aria-pressed={length==='long'} className={length==='long'?'selected':''} onClick={()=>{setLength('long');setCopyState('idle');}}>2–3 分钟展开</button></div>}
    {practice?<div className="project-practice-prompt"><p>先自己讲一遍：这个作品解决什么问题？我负责什么？哪项实现最值得展开？现有证据能证明什么？</p><button onClick={()=>setPractice(false)}>对照介绍稿 <ArrowRight size={14}/></button></div>:<><div className="project-pitch-text">{paragraphs.map((text,i)=><p key={i}><Emphasis text={text}/></p>)}</div><button className="text-button" onClick={copyPitch}>{copyState==='done'?<Check size={14}/>:<Copy size={14}/>} {copyState==='done'?'已复制介绍稿':'复制介绍稿'}</button>{copyState==='failed'&&<p role="status" className="subtle">当前环境无法复制，请选中介绍稿手动复制。</p>}</>}
   </section>
   <section className="project-contributions"><h3>我的贡献与职责</h3><ul>{project.contributions.map(item=><li key={item}><Emphasis text={item}/></li>)}</ul></section>
   {interviewQuestions.length>0&&<section className="project-interview-questions"><h3>高频深入追问 · {interviewQuestions.length} 题</h3><p className="subtle">先自己回答，再展开对照。回答区分当前实现、设计理由和下一步改进，可按代码位置继续准备。</p>{interviewQuestions.map((item,index)=><details className="project-detail" key={item.prompt}><summary><span>{String(index+1).padStart(2,'0')}</span>{item.prompt}</summary><div className="project-detail-body">{item.answer.split(/\n\s*\n/).map((text,i)=><p key={i}><Emphasis text={text}/></p>)}<h4>可以打开的代码或依据</h4><ul className="project-code-refs">{item.code.map(path=><li key={path}><code>{path}</code></li>)}</ul></div></details>)}</section>}
   {guide&&<>
    <section className="project-architecture"><h3>从界面到结果，技术怎样串起来</h3><ol>{guide.architecture.map(step=><li key={step.title}><h4>{step.title}</h4><p>{step.body}</p></li>)}</ol></section>
    <section className="project-cases"><h3>选一个案例，讲到实现与验证</h3><p className="subtle">根据面试官的方向展开一项，不必一次讲完所有实现。</p>{guide.cases.map((item,index)=><details className="project-detail" key={item.title}><summary><span>0{index+1}</span>{item.title}</summary><div className="project-detail-body"><dl><dt>问题出在哪里</dt><dd>{item.context}</dd><dt>我的判断与取舍</dt><dd>{item.decision}</dd></dl><h4>具体实现</h4><ul>{item.implementation.map(text=><li key={text}>{text}</li>)}</ul><h4>怎样验证与解释结果</h4><p>{item.validation}</p><h4>打开这些代码或记录</h4><ul className="project-code-refs">{item.code.map(path=><li key={path}><code>{path}</code></li>)}</ul>{item.commits&&<><h4>可沿个人提交展开</h4><ul>{item.commits.map(commit=><li key={commit}>{commit}</li>)}</ul></>}</div></details>)}</section>
    <section className="project-followups"><h3>补充追问</h3>{guide.followups.map(item=><details className="project-detail" key={item.prompt}><summary>{item.prompt}</summary><div className="project-detail-body"><p>{item.answer}</p></div></details>)}</section>
   </>}
   <section className="project-demo"><h3>面试演示顺序</h3><ol>{demo.map(text=><li key={text}>{text}</li>)}</ol></section>
   <details className="project-detail project-evidence"><summary>源码依据、表达边界与准备材料</summary><div className="project-detail-body"><h4>准备这些证据</h4><ul>{project.evidence.map(text=><li key={text}>{text}</li>)}</ul><h4>需要讲清的边界</h4><ul>{project.boundaries.map(text=><li key={text}>{text}</li>)}</ul><p>{project.note}</p><p className="subtle">内容核对：2026-11-04。这里是面试准备材料，原项目的测试、部署和真实模型效果应按各自记录说明。</p></div></details>
   {project.ids.length>0&&<section className="project-related"><h3>接着练相关题目</h3><div className="related-chips">{project.ids.map(id=><button key={id} className="related-link" onClick={()=>onQuestion(id,project.ids)}>{questions.find(q=>q.id===id)?.title??id.toUpperCase()} <ArrowRight size={14}/></button>)}</div></section>}
   <label className="project-notes-label" htmlFor={'note-'+project.id}>补充我的真实经历与证据</label>
   <textarea id={'note-'+project.id} rows={4} maxLength={50000} placeholder="记录自己的表达、个人提交、演示结果，以及尚未确认的细节……" value={progress.records[noteId]?.note??''} onChange={e=>onChange(noteId,{...(progress.records[noteId]??blankRecord()),note:e.target.value})}/>
  </article>
 </div>;
}
