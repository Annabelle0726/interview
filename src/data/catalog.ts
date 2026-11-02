import imported from './questions.json';
import supplement from './supplement.json';
import type {Question} from '../types';
export const questions=[...supplement,...imported] as Question[];
export const categories=[
 {id:'intro',name:'自我介绍',hint:'按岗位表达自己的优势'},
 {id:'product',name:'业务与产品判断',hint:'问题、取舍和验证'},
 {id:'ai-coding',name:'AI Coding 与开发流程',hint:'AI 协作、TDD / SDD / BDD'},
 {id:'python',name:'Python 后端',hint:'本岗位的技术准备重点'},
 {id:'frontend',name:'React / Vue 前端',hint:'状态、异步与交互'},
 {id:'database',name:'数据库与存储',hint:'查询、事务、缓存与安全'},
 {id:'linux',name:'Linux 与排障',hint:'日志、进程、网络与性能'},
 {id:'ai-app',name:'RAG / Agent 应用',hint:'证据、工具与评估'},
 {id:'architecture',name:'架构与交付',hint:'模块边界、CI/CD 与架构'},
 {id:'go',name:'Go 基础',hint:'如实表达基础了解'},
 {id:'collaboration',name:'远程协作与反问',hint:'需求对齐与工作安排'},
 {id:'projects',name:'项目表达题',hint:'个人贡献与证据边界'},
];
export const priorities={P0:{label:'优先准备',description:'川下核心筛选条件，或可证明个人能力的关键案例。'},P1:{label:'需要讲清',description:'常见追问与已有经历，理解后用例子回答。'},P2:{label:'了解即可',description:'当前岗位加分或次要内容，不挤占 Python 与项目准备时间。'}};
export const routes=[
 {title:'01 · 先把自己讲清楚',time:'20 分钟',detail:'能用一分钟介绍自己，再展开一个有证据的项目。',ids:['s01','s04','s20','s16']},
 {title:'02 · 拿出工程判断',time:'30 分钟',detail:'解释先定规格、如何验证 AI，以及如何处理失败。',ids:['s02','s03','a03','a12','a14']},
 {title:'03 · 准备后端实战',time:'40 分钟',detail:'优先解决异步、接口权限、查询和故障排查。',ids:['s23','c06','s21','c07','s05','d04','s06']},
 {title:'04 · 讲业务与 AI 边界',time:'25 分钟',detail:'把真实任务、RAG 与 Agent 选择和远程安排串起来。',ids:['b03','b06','s13','s14','s15','s22']}
];
export const company={name:'川下科技',fullName:'深圳市川下科技有限公司',role:'Vibe Coding · Python / Go 开发',salary:'1–2 万 / 月 · 13 薪',location:'居家远程 · 招聘地点深圳',updated:'2026-11-02',
 description:'招聘介绍涉及自研项目及网站、App、小程序等开发服务，表述中也包含外包业务。自研与客户交付的实际占比、行业客户和项目周期仍需面试确认。',
 facts:[['公司规模','招聘页标注 20–99 人、未融资、软件 / IT 服务'],['学历','本科及以上，计算机相关专业'],['经验','页面标注 1–3 年；任职要求正文写 3 年以上，存在不一致'],['工作地点','深圳南山区田厦金牛广场 A 座 1702；HR 已确认岗位居家远程'],['成立信息','招聘页标注 2023-02-28 成立、注册资本 200 万元；未独立核验工商现状'],['业务方向','业务服务、平台工具、自动化系统；具体在研产品待沟通']],
 hr:'HR 沟通要点：岗位支持居家远程；面试官重视传统开发经验、Python 或 Go 至少一门，以及日常 Vibe Coding 的实际使用情况，希望简历能体现。',
 requirements:[
 {skill:'Python / Go 至少一门',type:'必备',judgment:'主攻 Python；Go 如实说明基础了解。准备能解释和调试的 Python 代码，熟悉并不自动满足“精通”。',match:'重点证明',ids:['s23','c06','c07','c11','c12','s21']},
 {skill:'AI Coding 日常实践',type:'必备',judgment:'从 2025 年初持续使用，约一年十个月；ChatGPT 与 Codex。用真实 diff 和验证过程证明。',match:'已有经历',ids:['s04','a02','a03','a12','a14']},
 {skill:'TDD / SDD / BDD',type:'必备',judgment:'已有测试、需求与契约实践；严格 TDD 流程还需用实际记录说明，不能只背定义。',match:'优先补证据',ids:['s02','s03']},
 {skill:'数据库与存储',type:'必备',judgment:'关系模型与 SQL 先讲清，再说明缓存一致性与选型。课程操作和生产经验要区分。',match:'分层准备',ids:['s05','d04','d06','d08']},
 {skill:'Linux 与问题定位',type:'必备',judgment:'至少讲出服务无法访问的排查顺序，知道每条命令要验证什么。',match:'实操补强',ids:['s06','s07','d11','d13']},
 {skill:'工程质量、接口、Git、协作',type:'必备',judgment:'用 Belay 的恢复、权限、预算与契约说明；准备一个可展示的小提交。',match:'已有材料',ids:['s08','s10','s20','s24','b16']},
 {skill:'LLM / RAG / Agent',type:'加分',judgment:'文若可体现平台定制与业务评估；平台原有能力与本人贡献分开。',match:'可突出',ids:['s13','s14','s15','s16','s17']},
 {skill:'DDD / Clean / Hexagonal',type:'加分',judgment:'能解释业务边界与依赖方向即可；没有实施证据不说全面落地。',match:'理解即可',ids:['s09','d14']},
 {skill:'跨语言、DevOps、CI/CD、K8s',type:'加分',judgment:'了解交付闭环和拆服务代价，现阶段不优先深挖集群细节。',match:'次优先级',ids:['s11','s12','c08','c09','c10']},
 {skill:'开源贡献 / 技术写作',type:'加分',judgment:'可以展示二次开发与文档；只有向上游提交的贡献才能按上游贡献表述。',match:'核对证据',ids:['s17','e02']}
 ],
 questions:['入职前三个月最希望交付什么？自研与客户项目占比如何？','实际使用 Python 还是 Go？需要独立承担哪部分后端？','SDD 在团队里具体指什么？哪些规格、测试和评审是交付必需的？','是否支持长期上海居家、线上面试与入职？是否有到岗或出差要求？','同步在线时间、任务验收与代码 Review 怎样安排？','薪资结构、13 薪条件、试用期安排和 AI 工具费用如何确定？']
};
export const projects=[
 {id:'wenruo',name:'文若 RAG',subtitle:'基于 WeKnora 的品牌定制与技术评估',status:'方向已暂停',intro:'你的价值在于理解现有工程、完成可验证的定制，并评估知识库与业务任务之间的距离。',contributions:['登录页与品牌素材调整、界面细节打磨。','整理验证记录与协作说明，评估 RAG / Agent 平台的业务适配。','比较过 Ragent 路线；比较工作与 WeKnora 定制分别说明。'],boundaries:['RAG 引擎、Agent、MCP、租户等平台能力不全部属于个人研发。','未确认真实客户交付、收入、准确率或性能提升；不能编造。','历史分支 codex/login-xindao-polish、提交 3d11c04e 仅为查证线索，此次未在两个远端仓库找到该短提交，展示前请在本地核对。'],evidence:['登录页前后对比和一个具体交互改动。','个人提交 diff 与对应验证输出。','选择、限制和暂停原因的真实记录。'],ids:['s16','s17','s18','s19','s13','s14','s15'],note:'暂停原因需要你在个人笔记中补充。工业缺料核对与催交属于候选业务方案，并非已有交付。'},
 {id:'belay',name:'Belay',subtitle:'AI 学习工具 · 协作设计与开发',status:'可展示工程实践',intro:'选一个会话恢复或权限问题，讲清原问题、你的改动、异常路径与验证。',contributions:['学习工作区、结果反馈与引用追问等界面和体验改进。','已保存与未保存会话恢复，保留草稿和请求标识，避免重复提交。','参与权限、数据隔离、持久化、预算控制与回归验证。'],boundaries:['个人贡献与团队已有实现分别说明。','平台接入契约属于文档交付，未等同于实际平台联通。','历史测试总数不自动等于个人新增或持续通过的测试。'],evidence:['一段可以解释的业务代码。','正常、失败、越权和恢复场景的测试或演示。','契约说明与已知集成边界。'],ids:['s20','a09','s03','s08','s10'],note:'适合回答“传统开发经验”和“AI 生成代码怎么验收”。'},
 {id:'bloom',name:'Agency Bloom',subtitle:'微信小程序 · 独立产品设计与开发',status:'已上线',intro:'围绕梳理困扰、探索方向、决策卡和行动记录，体现从问题到可运行产品的完整过程。',contributions:['产品构思、信息结构、交互设计与前后端衔接。','引导、对话、决策卡与后续记录的完整流程。','数据管理、功能验证与 43 秒操作演示。'],boundaries:['已上线不等于已验证留存、付费或竞争优势。','真实需求、用户规模与商业结果没有数据时明确说明。'],evidence:['43 秒演示或完整任务录屏。','一个真实产品取舍与它的依据。','实际实现与下一步用户验证计划。'],ids:['a06','a07','b02','b05','b06','b09','b10'],note:'适合业务判断、MVP 和端到端交付题。'},
 {id:'somnia',name:'Somnia Library',subtitle:'基于 Reverie 的阅读管理应用改进',status:'二次开发',intro:'关注书籍发现、账户访问和个人书库管理之间的完整任务。',contributions:['首页、书籍界面和认证体验改进。','梳理搜索、收藏、添加入口与信息层级。'],boundaries:['区分 Reverie 原有功能与个人修改。','不要把二次开发描述成全部从零构建。'],evidence:['原版与修改后的流程对照。','对应的代码与操作录屏。'],ids:['a08','a10','a11'],note:'适合设计与前端岗位；川下优先展示 Python 与后端证据。'}
];
