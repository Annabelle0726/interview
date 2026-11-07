import type {Project,ProjectGuide,ProjectInterviewQuestion} from './types';

export type EditableProject={project:Project;guide:ProjectGuide|undefined;interviewQuestions:ProjectInterviewQuestion[]};
const labels:Record<string,string>={project:'项目资料',guide:'介绍与案例',interviewQuestions:'深入追问',name:'项目名称',subtitle:'副标题',status:'项目状态',intro:'项目简介',contributions:'我的贡献与职责',boundaries:'表达边界',evidence:'准备证据',note:'准备提醒',pitch:'面试介绍',short:'30 秒概述',long:'2–3 分钟展开',overview:'介绍重点',architecture:'技术流程',title:'标题',body:'说明',cases:'实现案例',context:'问题',decision:'判断与取舍',implementation:'具体实现',validation:'验证方式',code:'代码依据',commits:'提交记录',followups:'补充追问',prompt:'问题',answer:'回答',demo:'演示顺序'};
export function projectFields(value:unknown,path:string[]=[]):{key:string;label:string;text:string}[]{
 if(typeof value==='string')return [{key:path.join('.'),label:path.map(part=>/^\d+$/.test(part)?String(Number(part)+1):labels[part]??part).join(' · '),text:value}];
 if(!value||typeof value!=='object')return [];
 return Object.entries(value).flatMap(([key,item])=>['id','ids','links'].includes(key)?[]:projectFields(item,[...path,key]));
}
export function applyProjectDraft<T>(value:T,draft:Record<string,string>,path:string[]=[]):T{
 if(typeof value==='string')return (draft[path.join('.')]??value) as T;
 if(Array.isArray(value))return value.map((item,i)=>applyProjectDraft(item,draft,[...path,String(i)])) as T;
 if(value&&typeof value==='object')return Object.fromEntries(Object.entries(value).map(([key,item])=>[key,['id','ids','links'].includes(key)?item:applyProjectDraft(item,draft,[...path,key])])) as T;
 return value;
}
export default function ProjectEditor({source,draft,onChange,onDone}:{source:EditableProject;draft:Record<string,string>;onChange:(draft:Record<string,string>)=>void;onDone:()=>void}){
 const fields=projectFields(source);
 return <section aria-label="编辑项目内容" className="project-pitch">
  <div className="section-title"><h3>编辑项目内容</h3><button onClick={onDone}>完成编辑</button></div>
  <p>修改会保存在当前浏览器，可通过“导出进度”备份。个人笔记单独保留。</p>
  {(['project','guide','interviewQuestions'] as const).map(group=><details className="project-detail" key={group} open={group==='project'}><summary>{labels[group]}</summary><div className="project-detail-body">{fields.filter(field=>field.key.startsWith(group+'.')).map(field=><label className="project-edit-field" key={field.key}>{field.label}<textarea rows={field.text.length>200?5:2} maxLength={50000} value={draft[field.key]??field.text} onChange={event=>onChange({...draft,[field.key]:event.target.value})}/></label>)}</div></details>)}
  <button onClick={()=>{if(window.confirm('恢复此项目的默认内容？你编辑的项目正文将被清除，个人笔记保留。'))onChange({});}}>恢复此项目默认内容</button>
 </section>;
}
