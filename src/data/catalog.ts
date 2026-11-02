import imported from './questions.json';
import supplement from './supplement.json';
import fullstack from './fullstack.json';
import spokenAnswers from './spoken-answers.json';
import vibeCoding from './vibe-coding.json';
import type {Block, Question} from '../types';

const answers: Record<string, Pick<Question, 'spoken' | 'followups'> & {links?: Question['links'];attention?:string}> = spokenAnswers;
const coreQuestions: Question[] = [...supplement, ...imported, ...fullstack].map(source => {
 const answer = answers[source.id];
 if (!answer) throw new Error('缺少面试回答 ' + source.id);
 const examples = source.blocks.filter(block => block.type !== 'p') as Block[];
 return {...source, ...answer, priority: source.priority as Question['priority'], blocks: examples,
  links: [...source.links, ...(answer.links ?? [])]};
});
export const questions: Question[] = [...coreQuestions,...vibeCoding.map(q=>({...q,priority:q.priority as Question['priority'],blocks:q.blocks as Block[]}))];
export const categories=[
 {id:'intro',name:'自我介绍',hint:'按岗位表达自己的优势'},
 {id:'product',name:'业务与产品判断',hint:'问题、取舍和验证'},
 {id:'ai-coding',name:'Vibe Coding 与工程流程',hint:'Agent 派工、Skills、TDD / SDD / BDD'},
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
 {title:'Vibe Coding · 简历与实战',time:'30 分钟',detail:'先把 HR 要看的 Python 与 Vibe Coding 写进简历，再练 Agent 派工、Skills 和工程方法。',ids:['v01','s01','v02','v03','v04','v06']},
 {title:'01 · 先把自己讲清楚',time:'20 分钟',detail:'用 Python 项目介绍自己，再讲后端实现和 AI 协作方法。',ids:['s01','s20','c07','s04']},
 {title:'02 · 拿出工程判断',time:'30 分钟',detail:'从数据建模、项目规格、Agent Skills 到代码审查讲清技术判断。',ids:['s08','s02','a13','a12','s24','s03']},
 {title:'03 · 准备后端实战',time:'40 分钟',detail:'优先解决异步、接口权限、查询和故障排查。',ids:['s23','c06','s21','c07','s05','d04','s06']},
 {title:'04 · 讲业务与 AI 边界',time:'25 分钟',detail:'把真实任务、RAG 与 Agent 选择和远程安排串起来。',ids:['b03','b06','s13','s14','s15','s22']},
 {title:'05 · 全栈模拟面试八题',time:'30 分钟',detail:'按上轮面试顺序练习登录、租户隔离、SQL、缓存、上传、安全、排障和发布。',ids:['f01','f02','d04','d06','f03','d08','s07','s11']}
];
export const company={name:'川下科技',fullName:'深圳市川下科技有限公司',role:'Vibe Coding · Python / Go 开发',salary:'1–2 万 / 月 · 13 薪',location:'居家远程 · 招聘地点深圳',updated:'2026-11-02',
 description:'招聘介绍涉及自研项目及网站、App、小程序等开发服务，表述中也包含外包业务。自研与客户交付的实际占比、行业客户和项目周期仍需面试确认。',
 facts:[['公司规模','招聘页标注 20–99 人、未融资、软件 / IT 服务'],['学历','本科及以上，计算机相关专业'],['经验','页面标注 1–3 年；任职要求正文写 3 年以上，存在不一致'],['工作地点','深圳南山区田厦金牛广场 A 座 1702；HR 已确认岗位居家远程'],['成立信息','招聘页标注 2023-02-28 成立、注册资本 200 万元；未独立核验工商现状'],['业务方向','业务服务、平台工具、自动化系统；具体在研产品待沟通']],
 hr:'HR 明确要求：这是远程居家办公岗位，需要传统开发经验，Python / Go 至少精通一种，并且熟练使用 Vibe Coding。**简历必须突出 Python 实际项目与 Vibe Coding 工作方式，这是面试官重点看的内容。**',
 requirements:[
 {skill:'Python / Go 至少一门',type:'必备',judgment:'用 Bloom 的 FastAPI / SQLAlchemy、模型接入和 Belay 的事务 / worker 说明实际开发能力。Library 当前为 React / Supabase / TypeScript；Go 按基础了解表达。',match:'重点证明',ids:['s01','s20','c07','c06','s21','s23','c11','c12']},
 {skill:'Vibe Coding 与 Agent 工作流',type:'必备',judgment:'**ChatGPT / Codex 日常协作 + Agent Skills**：把任务规格、上下文、修改边界、分步实现、独立 Review 与验证讲成一个完整案例。简历先写出来，面试再展示。',match:'HR 重点',ids:['v01','s04','v02','v03','v05','a13']},
 {skill:'TDD / SDD / BDD',type:'必备',judgment:'**规格 → 业务场景 → 测试 → 实现 → Review**。用同一项改动展示规格、断言、diff 和结果；TDD 进一步解释先失败、后实现的顺序。',match:'核心实战',ids:['v04','s02','s03']},
 {skill:'数据库与存储',type:'必备',judgment:'先讲 **SQLAlchemy、SQLite / PostgreSQL、关系建模与事务** 的项目实践，再解释 MySQL、Redis、MongoDB 的选型和缓存一致性。',match:'分层准备',ids:['s05','d04','d06','d08']},
 {skill:'Linux 与问题定位',type:'必备',judgment:'讲清 **现象 → 监听 / 进程 → 日志 → 依赖与入口**；curl、ss、进程与容器命令各验证什么，最后回到原入口复测。',match:'实操补强',ids:['s06','s07','d11','d13']},
 {skill:'工程质量、接口、Git、协作',type:'必备',judgment:'用 **Provider 依赖隔离、预算事务、接口模型与小步 Git diff** 说明代码组织；远程交付写清提交、验证、待决策事项和下一步。',match:'已有材料',ids:['s08','s10','v05','s20','s24','b16']},
 {skill:'LLM / RAG / Agent',type:'加分',judgment:'先讲 **Bloom 的模型接入、上下文与用户确认规则**，再讲 Belay 的 Provider 与任务处理；文若补充 RAG 评估。',match:'项目加分',ids:['s20','c06','c07','s13','s14','s15','s16']},
 {skill:'DDD / Clean / Hexagonal',type:'加分',judgment:'能解释业务边界与依赖方向即可；没有实施证据不说全面落地。',match:'理解即可',ids:['s09','d14']},
 {skill:'跨语言、DevOps、CI/CD、K8s',type:'加分',judgment:'了解交付闭环和拆服务代价，现阶段不优先深挖集群细节。',match:'次优先级',ids:['s11','s12','c08','c09','c10']},
 {skill:'开源贡献 / 技术写作',type:'加分',judgment:'可以展示二次开发与文档；只有向上游提交的贡献才能按上游贡献表述。',match:'核对证据',ids:['s17','e02']}
 ],
 questions:['入职前三个月最希望交付什么？自研与客户项目占比如何？','实际使用 Python 还是 Go？需要独立承担哪部分后端？','SDD 在团队里具体指什么？哪些规格、测试和评审是交付必需的？','是否支持长期上海居家、线上面试与入职？是否有到岗或出差要求？','同步在线时间、任务验收与代码 Review 怎样安排？','薪资结构、13 薪条件、试用期安排和 AI 工具费用如何确定？']
};
export const projects=[
 {id:'bloom',name:'Agency Bloom',subtitle:'Python AI 应用后端 · 独立产品设计与开发',status:'已上线',intro:'帮助用户理解自身价值、探索可能并作出自己的选择；以职业探索为首个验证场景，将产品判断落实到小程序与 Python 服务。',contributions:['FastAPI、Pydantic 与 SQLAlchemy：微信登录、探索、会话、消息和用户记忆。','异步 HTTPX 接模型，SSE 传递公开回复，最终校验后再保存。','探索与独立会话分开建模；用户确认的信息才进入记忆与卡片。','数据库条件更新预留模型预算，按实际用量结算。','产品定位、信息结构、视觉与原生小程序交互的完整实现。'],boundaries:['AI 建议不自动成为用户事实；产品方向不等于全部功能已经验证。','用户规模、留存、付费和性能结果按实际数据表达。'],evidence:['apps/api/app/main.py、models.py、schemas.py。','ai.py、chat_stream.py 与流式接入测试。','docs/PRODUCT_DIRECTION.md 与记忆确认流程演示。'],ids:['s01','c07','c06','s05','a06','b01','b05','b06','s04','a13'],note:'适合展示 Python、AI 接入、业务建模与端到端产品能力。'},
 {id:'belay',name:'Belay',subtitle:'Python 学习服务 · 团队协作开发',status:'可展示工程实践',intro:'围绕学生提问、代码练习与 AI 辅导，连接学习工作区、Python API、数据库状态和模型资源管理。',contributions:['参与学习工作区、会话持久化与恢复、权限及模型预算相关工作。','结合 FastAPI、Pydantic、SQLAlchemy 解释接口、任务和用量数据。','预算先在事务内预留，退出事务后调用模型，完成后结算。','理解 Provider 接口、持久队列与独立 worker，区分同步接口与异步任务处理。','结合单元、集成、进程级竞争和 SQLite / PostgreSQL 测试解释验证层次。'],boundaries:['团队架构与本人参与的改动分开说明。','队列、Provider、沙箱等项目能力须结合自己的实际参与范围展开。','测试文件与 CI 配置存在，不代表本轮已在原项目重新运行；不编造吞吐优化成果。'],evidence:['backend/app/main.py 与 agent/llm.py。','controls/runtime.py、ledger.py、admission.py、jobs_worker.py。','test_controls_ledger.py、test_jobs_postgres.py 与 CI 数据库矩阵。'],ids:['s20','s08','s05','s03','s10','s11','s21'],note:'主讲 Python 实现和一个完整设计取舍；恢复与权限留作深入追问。'},
 {id:'somnia',name:'Somnia Library',subtitle:'React / Supabase 阅读应用 · 功能与体验改进',status:'二次开发',intro:'在 Reverie 基础上继续开发，将公共书目、个人阅读状态与账户访问组织成完整阅读流程。',contributions:['首页、书籍界面、认证体验与移动端导航改进。','通过 Supabase 连接公共书目、阅读状态、收藏与标签；添加书籍先查重，再关联个人状态。','认证状态初始化完成后再判断路由；页面并发取数后组合展示。','封面、书名、作者用于识别，搜索、收藏与入库入口围绕内容组织。'],boundaries:['已核对 main 及两个功能分支，当前源码为 React / TypeScript / Supabase，没有 Python 实现。','Reverie 原有能力与本人修改分开介绍。','客户端筛选不说成服务端查询优化；已有 Edge Function 不代表所有模型调用已迁至服务端。'],evidence:['src/auth/AuthProvider.tsx 与 components/layout/ProtectedRoute.tsx。','src/hooks/useBookForm.ts、pages/Library.tsx、types/book.ts。','src/lib/openlibrary.ts 与 Supabase evaluate-book-spice Edge Function。'],ids:['a08','f01','s05','a10','a11'],note:'三个主项目之一；用于说明全栈数据接入与 UX/UI，Python 重点展示 Bloom 和 Belay。'},
 {id:'wenruo',name:'文若 RAG',subtitle:'基于 WeKnora 的品牌定制与技术评估',status:'方向已暂停',intro:'你的价值在于理解现有工程、完成可验证的定制，并评估知识库与业务任务之间的距离。',contributions:['登录页与品牌素材调整、界面细节打磨。','整理验证记录与协作说明，评估 RAG / Agent 平台的业务适配。','比较过 Ragent 路线；比较工作与 WeKnora 定制分别说明。'],boundaries:['RAG 引擎、Agent、MCP、租户等平台能力不全部属于个人研发。','未确认真实客户交付、收入、准确率或性能提升；不能编造。','历史分支 codex/login-xindao-polish、提交 3d11c04e 仅为查证线索，此次未在两个远端仓库找到该短提交，展示前请在本地核对。'],evidence:['登录页前后对比和一个具体交互改动。','个人提交 diff 与对应验证输出。','选择、限制和暂停原因的真实记录。'],ids:['s16','s17','s18','s19','s13','s14','s15'],note:'暂停原因需要你在个人笔记中补充。工业缺料核对与催交属于候选业务方案，并非已有交付。'},
];
