import p0 from './data/p0-core.json' with {type:'json'};
import p1 from './data/p1-core.json' with {type:'json'};
import p2 from './data/p2-core.json' with {type:'json'};
import type {Priority} from './types';

export type CoreLesson={
 id:string;title:string;subtitle:string;summary:string;skills:string[];scenario:string;
 spoken:string[];attention:string;template:string;
 followups:{prompt:string;answer:string}[];references:{title:string;url:string}[];
};
export const curricula:Record<Priority,{title:string;label:string;description:string;lessons:CoreLesson[]}>= {
 P0:{title:'P0 · AI 开发核心能力',label:'必须熟练掌握',description:'先讲清你怎样组织 AI 开发，再用实际代码与验证说明结果。',lessons:p0},
 P1:{title:'P1 · 后端工程师重点掌握',label:'后端工程重点',description:'川下科技高度相关：把业务规则落到模型、接口、分层、安全、可观测性与交付。',lessons:p1},
 P2:{title:'P2 · AI Agent 进阶能力',label:'Agent 进阶能力',description:'形成差异化优势：深入工具接入、工作流封装、自动检查、评估与编排。',lessons:p2}
};
