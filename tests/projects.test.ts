import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {parseBackup} from '../src/learning.ts';
import {projects,projectGuides,projectInterviewQuestions,mainProjectIds,searchProjects} from '../src/data/projects.ts';

const read=(name:string)=>JSON.parse(readFileSync(new URL('../src/data/'+name+'.json',import.meta.url),'utf8'));

test('project practice keeps existing notebook keys and has valid question destinations',()=>{
 const ids=projects.map(p=>p.id);
 assert.equal(new Set(ids).size,ids.length);
 for(const id of ['bloom','belay','somnia','wenruo'])assert.ok(ids.includes(id));
 const questions=new Set(['questions','supplement','fullstack','vibe-coding','recent-qa','frontend-qa'].flatMap(file=>read(file).map((q:{id:string})=>q.id)));
 for(const project of projects)for(const id of project.ids)assert.ok(questions.has(id),project.id+':'+id);
 const backup={version:1,signature:'',records:{'project-belay':{status:'review',starred:false,note:'我的恢复与沙箱演示记录'}}};
 assert.deepEqual(parseBackup(JSON.stringify(backup)),backup);
});

test('technical searches find material inside cases and supplementary projects',()=>{
 assert.ok(searchProjects('  DOCKER  ').some(p=>p.id==='belay'));
 assert.ok(searchProjects('符号链接').some(p=>p.id==='belay'));
 assert.ok(searchProjects('RLS').some(p=>p.id==='somnia'));
 assert.ok(searchProjects('SHAP').some(p=>p.id==='athub'));
 assert.ok(searchProjects('React Query').some(p=>p.id==='somnia'));
 assert.deepEqual(searchProjects('   '),[]);
 assert.deepEqual(searchProjects('没有这项作品的唯一测试词'),[]);
});

test('all requested deep-dive questions are answered with implementation references',()=>{
 const counts={bloom:9,somnia:8,belay:10};
 assert.deepEqual(Object.keys(projectInterviewQuestions).sort(),Object.keys(counts).sort());
 for(const [id,count] of Object.entries(counts)){
  const items=projectInterviewQuestions[id];
  assert.equal(items.length,count,id);
  assert.equal(new Set(items.map(item=>item.prompt)).size,count,id);
  for(const item of items)assert.ok(item.answer.trim()&&item.code.length,item.prompt);
 }
});

test('budget failure and React Query answers retain their verified implementation limits',()=>{
 const failure=projectInterviewQuestions.belay.find(item=>item.prompt==='如果模型调用失败，已经预留的预算如何处理？')!;
 assert.match(failure.answer,/unknown/);
 assert.match(failure.answer,/零用量/);
 const query=projectInterviewQuestions.somnia.find(item=>item.prompt==='React Query 和普通的 useState 有什么区别？')!;
 assert.match(query.answer,/声明了 React Query/);
 assert.match(query.answer,/不能.*已经完成缓存迁移/);
 const docker=projectInterviewQuestions.belay.find(item=>item.prompt==='你在 Belay 的 Docker 学生代码执行部分具体做了什么？')!;
 assert.match(docker.answer,/学生提交的 Python/);
 assert.ok(docker.code.includes('backend/app/core/runner/_sandbox.py'));
});

test('the three primary dossiers connect intros, technical cases, follow-ups and current portfolio links',()=>{
 assert.equal(mainProjectIds.length,3);
 for(const id of mainProjectIds){
  const guide=projectGuides[id];
  assert.ok(guide.pitch.short.length&&guide.pitch.long.length>1,id);
  assert.ok(guide.architecture.length&&guide.cases.length&&guide.followups.length,id);
  for(const item of guide.cases)assert.ok(item.validation&&item.code.length,id);
  assert.ok(guide.links.some(link=>link.url.startsWith('https://annabelle0726.github.io/Annabelle0726/')),id);
 }
});
