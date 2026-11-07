import type {Question,Progress,Filters,RecordState} from './types.ts';
export const STORAGE_KEY='annabelle-interviews-v1';
export const blankProgress=():Progress=>({version:1,records:{},signature:''});
export const blankRecord=():RecordState=>({status:'new',starred:false,note:''});
export function filterQuestions<T extends Pick<Question,'id'|'title'|'summary'|'category'|'priority'|'blocks'|'focus'|'tags'>>(questions:T[], f:Filters, p:Progress):T[]{
 const terms=(f.query||'').trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
 return questions.filter(q=>{
  const r=p.records[q.id];
  if(f.category&&f.category!=='all'&&q.category!==f.category)return false;
  if(f.priority&&f.priority!=='all'&&q.priority!==f.priority)return false;
  if(f.mode==='starred'&&!r?.starred)return false;
  if(f.mode==='review'&&r?.status!=='review')return false;
  if(f.mode==='mastered'&&r?.status!=='mastered')return false;
  if(f.mode==='new'&&r&&r.status!=='new')return false;
  const haystack=JSON.stringify(q).toLocaleLowerCase();
  return terms.every(t=>haystack.includes(t));
 });
}
export function parseBackup(s:string,_ids:string[]=[]):Progress{
 const v=JSON.parse(s);
 if(!v||v.version!==1||!v.records||typeof v.records!=='object'||Array.isArray(v.records))throw new Error('不是有效的面试手册备份。');
 const records:Progress['records']={};
 for(const [id,value] of Object.entries(v.records)){
  const r=value as RecordState;
  if(['__proto__','constructor','prototype'].includes(id)||!r||!['new','review','mastered'].includes(r.status)||typeof r.starred!=='boolean'||typeof r.note!=='string'||r.note.length>50000)throw new Error('备份记录格式有误，未导入。');
  if(r.answerDraft!==undefined && (typeof r.answerDraft!=='string' || r.answerDraft.length>50000))throw new Error('口述稿格式有误，未导入。');
  records[id]={status:r.status,starred:r.starred,note:r.note};
  if(r.answerDraft?.trim())records[id].answerDraft=r.answerDraft;
  if(r.projectDraft!==undefined){
   const draft=r.projectDraft;
   if(!draft||typeof draft!=='object'||Array.isArray(draft)||Object.keys(draft).length>1000||JSON.stringify(draft).length>1_000_000)throw new Error('项目编辑内容格式有误，未导入。');
   for(const [key,text] of Object.entries(draft))if(key.length>200||key.split('.').some(part=>['__proto__','constructor','prototype'].includes(part))||typeof text!=='string'||text.length>50000)throw new Error('项目编辑内容格式有误，未导入。');
   records[id].projectDraft={...draft};
  }
 }
 const signature=v.signature??'';
 if(typeof signature!=='string'||signature.length>2_000_000||(signature&&!/^data:image\/(png|jpeg|webp);base64,[A-Za-z0-9+/=\r\n]+$/.test(signature)))throw new Error('签名图片格式无效。');
 return {version:1,records,signature};
}
export function safeLoad(storage:Pick<Storage,'getItem'>):{data:Progress;error:string}{
 try{const raw=storage.getItem(STORAGE_KEY);return {data:raw?parseBackup(raw):blankProgress(),error:''};}
 catch{return {data:blankProgress(),error:'无法读取已保存记录。原数据未覆盖；请先导入有效备份或下载原始记录。'};}
}
export function saveProgress(storage:Pick<Storage,'setItem'>,data:Progress):string{
 try{storage.setItem(STORAGE_KEY,JSON.stringify(data));return '';}
 catch{return '浏览器未能保存（可能空间不足或已禁用存储）。当前改动仍在页面中，请立即导出备份。';}
}
