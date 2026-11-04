import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {parseBackup} from '../src/learning.ts';
import {projects,projectGuides,mainProjectIds,searchProjects} from '../src/data/projects.ts';

const read=(name:string)=>JSON.parse(readFileSync(new URL('../src/data/'+name+'.json',import.meta.url),'utf8'));

test('project practice keeps existing notebook keys and has valid question destinations',()=>{
 const ids=projects.map(p=>p.id);
 assert.equal(new Set(ids).size,ids.length);
 for(const id of ['bloom','belay','somnia','wenruo'])assert.ok(ids.includes(id));
 const questions=new Set(['questions','supplement','fullstack','vibe-coding','recent-qa'].flatMap(file=>read(file).map((q:{id:string})=>q.id)));
 for(const project of projects)for(const id of project.ids)assert.ok(questions.has(id),project.id+':'+id);
 const backup={version:1,signature:'',records:{'project-belay':{status:'review',starred:false,note:'我的恢复与沙箱演示记录'}}};
 assert.deepEqual(parseBackup(JSON.stringify(backup)),backup);
});

test('technical searches find material inside cases and supplementary projects',()=>{
 assert.ok(searchProjects('  DOCKER  ').some(p=>p.id==='belay'));
 assert.ok(searchProjects('符号链接').some(p=>p.id==='belay'));
 assert.ok(searchProjects('RLS').some(p=>p.id==='somnia'));
 assert.ok(searchProjects('SHAP').some(p=>p.id==='athub'));
 assert.deepEqual(searchProjects('   '),[]);
 assert.deepEqual(searchProjects('没有这项作品的唯一测试词'),[]);
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
