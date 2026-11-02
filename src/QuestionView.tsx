import {useState} from 'react';
import {ArrowLeft,ArrowRight,Star,ChevronDown,Copy,Check,BookOpen,MessageSquare} from 'lucide-react';
import type {Question,Block,RecordState} from './types';
import {priorities,categories} from './data/catalog';
export function Blocks({blocks}:{blocks:Block[]}){
 return <>{blocks.map((b,i)=>b.type==='code'?<Code key={i} text={b.text||''}/>:b.type==='table'?<div className="table-scroll" key={i}><table><tbody>{b.rows?.map((r,n)=><tr key={n}>{r.map((c,k)=>n===0?<th key={k}>{c}</th>:<td key={k}>{c}</td>)}</tr>)}</tbody></table></div>:<p key={i}>{b.text}</p>)}</>;
}
function Code({text}:{text:string}){
 const [copied,setCopied]=useState(false);const [error,setError]=useState(false);
 async function copy(){try{await navigator.clipboard.writeText(text);setCopied(true);setTimeout(()=>setCopied(false),1600);}catch{setError(true);}}
 return <div className="code"><div className="code-head"><span>代码示例</span><button onClick={copy}>{copied?<Check size={14}/>:<Copy size={14}/>} {copied?'已复制':'复制'}</button></div><pre><code>{text}</code></pre>{error&&<small>复制不可用，请选中代码手动复制。</small>}</div>
}
export default function QuestionView({q,record,onChange,backLabel,onBack,onNext,onPrev,index,total}:{q:Question;record:RecordState;onChange:(r:RecordState)=>void;backLabel:string;onBack:()=>void;onNext:()=>void;onPrev:()=>void;index:number;total:number}){
 const [practice,setPractice]=useState(false),[reveal,setReveal]=useState(false);
 return <article className="question-view">
  <div className="detail-nav"><button className="text-button" onClick={onBack}><ArrowLeft size={16}/> 返回{backLabel}</button><span>{index+1} / {total}</span></div>
  <div className="eyebrow">{categories.find(c=>c.id===q.category)?.name} <span> / {q.id.toUpperCase()}</span></div>
  <h1>{q.title}</h1>
  <div className="question-meta"><span className={'badge '+q.priority}>{q.priority} · {priorities[q.priority].label}</span><span className="muted">{q.source}</span></div>
  <div className="focus-box"><strong>这题重点</strong><p>{q.summary}</p><ul>{q.focus.map(f=><li key={f}>{f}</li>)}</ul></div>
  <div className="reader-toolbar"><div className="segmented" aria-label="学习模式"><button className={!practice?'selected':''} onClick={()=>setPractice(false)}><BookOpen size={15}/> 阅读</button><button className={practice?'selected':''} onClick={()=>{setPractice(true);setReveal(false);}}><MessageSquare size={15}/> 自测</button></div><button className={'star-button '+(record.starred?'active':'')} onClick={()=>onChange({...record,starred:!record.starred})} aria-pressed={record.starred}><Star size={16} fill={record.starred?'currentColor':'none'}/>{record.starred?'已收藏':'收藏这题'}</button></div>
  {practice&&!reveal?<div className="practice-box"><h2>先用自己的话讲一分钟</h2><p>按“问题 → 判断依据 → 做法 → 验证”回答。遇到假设场景，用“我会”表达。</p><button className="primary" onClick={()=>setReveal(true)}>查看参考回答 <ChevronDown size={16}/></button></div>:<section className="answer"><h2>参考回答与知识要点</h2><Blocks blocks={q.blocks}/></section>}
  {(!practice||reveal)&&<><section className="followups"><h2>继续追问</h2>{q.followups.length?q.followups.map((f,i)=><p key={i}>{f.replace(/^(面试官追问|考官可能追问|考官追问)[ ：:]*/,'')}</p>):<p>结合一个真实项目，你做了什么选择？有哪些结果或记录支持这个判断？</p>}</section><div className="boundary"><strong>表达边界</strong><p>{q.boundary}</p></div>{q.links.length>0&&<div className="sources"><span>延伸阅读</span>{q.links.map(l=><a key={l.url} href={l.url} target="_blank" rel="noreferrer">{l.title} ↗</a>)}</div>}</>}
  <section className="my-notes"><div className="section-title"><h2>我的回答与证据</h2><label className="status-label">掌握程度 <select aria-label="掌握程度" value={record.status} onChange={e=>onChange({...record,status:e.target.value as RecordState['status']})}><option value="new">未开始</option><option value="review">待复习</option><option value="mastered">已掌握</option></select></label></div><textarea aria-label="我的回答与证据" placeholder="写下自己的回答、具体代码位置、演示链接或需要补充的真实经历……" maxLength={50000} value={record.note} onChange={e=>onChange({...record,note:e.target.value})}/><small>记录保存在当前浏览器；重要内容请定期导出备份。</small></section>
  <div className="question-pagination"><button disabled={index<=0} onClick={onPrev}><ArrowLeft size={16}/> 上一题</button><button disabled={index>=total-1} onClick={onNext}>下一题 <ArrowRight size={16}/></button></div>
 </article>;
}
