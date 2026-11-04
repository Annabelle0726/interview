import otherProjects from './other-projects.json' with {type:'json'};
import guideData from './project-guides.json' with {type:'json'};
import type {Project,ProjectGuide} from '../types';

const baseProjects:Project[]=[
 {id:'bloom',name:'Agency Bloom',subtitle:'Python AI 应用后端 · 独立产品设计与开发',status:'已上线',intro:'帮助用户理解自身价值、探索可能并作出自己的选择；以职业探索为首个验证场景，将产品判断落实到小程序与 Python 服务。',contributions:['FastAPI、Pydantic 与 SQLAlchemy：微信登录、探索、会话、消息和用户记忆。','异步 HTTPX 接模型，SSE 传递公开回复，最终校验后再保存。','探索与独立会话分开建模；用户确认的信息才进入记忆与卡片。','数据库条件更新预留模型预算，按实际用量结算。','产品定位、信息结构、视觉与原生小程序交互的完整实现。'],boundaries:['AI 建议不自动成为用户事实；产品方向不等于全部功能已经验证。','用户规模、留存、付费和性能结果按实际数据表达。'],evidence:['apps/api/app/main.py、models.py、schemas.py。','ai.py、chat_stream.py 与流式接入测试。','docs/PRODUCT_DIRECTION.md 与记忆确认流程演示。'],ids:['s01','c07','c06','s05','a06','b01','b05','b06','s04','a13'],note:'适合展示 Python、AI 接入、业务建模与端到端产品能力。'},
 {id:'belay',name:'Belay',subtitle:'Python 学习服务 · 团队协作开发',status:'可展示工程实践',intro:'围绕学生提问、代码练习与 AI 辅导，连接学习工作区、Python API、数据库状态和模型资源管理。',contributions:['参与学习工作区、会话持久化与恢复、权限及模型预算相关工作。','结合 FastAPI、Pydantic、SQLAlchemy 解释接口、任务和用量数据。','预算先在事务内预留，退出事务后调用模型，完成后结算。','理解 Provider 接口、持久队列与独立 worker，区分同步接口与异步任务处理。','结合单元、集成、进程级竞争和 SQLite / PostgreSQL 测试解释验证层次。'],boundaries:['团队架构与本人参与的改动分开说明。','队列、Provider、沙箱等项目能力须结合自己的实际参与范围展开。','测试文件与 CI 配置存在，不代表本轮已在原项目重新运行；不编造吞吐优化成果。'],evidence:['backend/app/main.py 与 agent/llm.py。','controls/runtime.py、ledger.py、admission.py、jobs_worker.py。','test_controls_ledger.py、test_jobs_postgres.py 与 CI 数据库矩阵。'],ids:['s20','s08','s05','s03','s10','s11','s21'],note:'主讲 Python 实现和一个完整设计取舍；恢复与权限留作深入追问。'},
 {id:'somnia',name:'Somnia Library',subtitle:'React / Supabase 阅读应用 · 功能与体验改进',status:'二次开发',intro:'在 Reverie 基础上继续开发，将公共书目、个人阅读状态与账户访问组织成完整阅读流程。',contributions:['首页、书籍界面、认证体验与移动端导航改进。','通过 Supabase 连接公共书目、阅读状态、收藏与标签；添加书籍先查重，再关联个人状态。','认证状态初始化完成后再判断路由；页面并发取数后组合展示。','封面、书名、作者用于识别，搜索、收藏与入库入口围绕内容组织。'],boundaries:['已核对 main 及两个功能分支，当前源码为 React / TypeScript / Supabase，没有 Python 实现。','Reverie 原有能力与本人修改分开介绍。','客户端筛选不说成服务端查询优化；已有 Edge Function 不代表所有模型调用已迁至服务端。'],evidence:['src/auth/AuthProvider.tsx 与 components/layout/ProtectedRoute.tsx。','src/hooks/useBookForm.ts、pages/Library.tsx、types/book.ts。','src/lib/openlibrary.ts 与 Supabase evaluate-book-spice Edge Function。'],ids:['a08','f01','s05','a10','a11'],note:'三个主项目之一；用于说明全栈数据接入与 UX/UI，Python 重点展示 Bloom 和 Belay。'},
 {id:'wenruo',name:'文若 RAG',subtitle:'基于 WeKnora 的品牌定制与技术评估',status:'方向已暂停',intro:'你的价值在于理解现有工程、完成可验证的定制，并评估知识库与业务任务之间的距离。',contributions:['登录页与品牌素材调整、界面细节打磨。','整理验证记录与协作说明，评估 RAG / Agent 平台的业务适配。','比较过 Ragent 路线；比较工作与 WeKnora 定制分别说明。'],boundaries:['RAG 引擎、Agent、MCP、租户等平台能力不全部属于个人研发。','未确认真实客户交付、收入、准确率或性能提升；不能编造。','历史分支 codex/login-xindao-polish、提交 3d11c04e 仅为查证线索，此次未在两个远端仓库找到该短提交，展示前请在本地核对。'],evidence:['登录页前后对比和一个具体交互改动。','个人提交 diff 与对应验证输出。','选择、限制和暂停原因的真实记录。'],ids:['s16','s17','s18','s19','s13','s14','s15'],note:'暂停原因需要你在个人笔记中补充。工业缺料核对与催交属于候选业务方案，并非已有交付。'},
];

export const mainProjectIds=['bloom','belay','somnia'];
export const projectGuides:Record<string,ProjectGuide>=guideData;
const updates:Record<string,Partial<Project>>={
 belay:{
  contributions:[
   '参与学习工作区、Markdown / 代码块和引用追问，以及已保存 / 未保存会话的恢复。',
   '参与 Python / FastAPI 的会话持久化、访问控制与模型预算相关实现。',
   '参与 Docker 代码执行沙箱，完善资源限制、有界输出、受限产物提取和容器清理。',
   '通过个人提交和回归记录说明具体工作；结合 Provider、短事务预算与持久 worker 解释团队技术链路。'
  ],
  evidence:['backend/app/core/runner/_sandbox.py、_bounded.py、_artifacts.py。','个人提交 6c5cfe2、84d71d9、9319670 与对应测试差异。','docs/reviews/pr7-sandbox.md；恢复、权限和预算的验证记录。'],
  note:'优先选自己的恢复或沙箱改动，团队已有架构另行解释；测试记录的提交、环境与范围一起说明。'
 },
 somnia:{
  subtitle:'React / Supabase 阅读应用 · 二次开发',
  contributions:['参与首页、书籍界面与认证流程改进，衔接书籍发现、账户访问和个人书库。','调整书封、书名和卡片信息层级，以及搜索、收藏、添加和导航入口。','用作品界面、交互演示与个人 diff 说明具体修改；原系统认证和 Supabase 链路在技术案例中展开。'],
  note:'三个主项目之一；展示前端、账户流程和数据接入。Python 重点使用 Bloom 和 Belay。'
 },
 wenruo:{
  pitch:'文若是基于 WeKnora 做品牌定制和技术评估的项目，后来方向暂停。我参与登录页、品牌素材和界面细节调整，也比较过 Ragent 的路线。我会用具体界面差异、提交和验证记录说明已完成的工作；检索、Agent、MCP 等是原平台能力，不能全部归为个人研发。暂停原因我会按自己的真实经历补充，不编造客户交付或商业成果。',
  demo:['先展示可核对的登录页或品牌定制前后对比。','展示一个个人 diff 和验证记录；历史短 SHA 未在已查远端找到，展示前核对本地记录。','说明选型考虑与项目暂停的真实原因，不把候选业务设想当作完成的交付。'],
  links:[{title:'WeKnora 原项目',url:'https://github.com/Tencent/WeKnora'},{title:'个人 Ragent 仓库',url:'https://github.com/Annabelle0726/wenruo-agent'}]
 }
};
export const projects:Project[]=[...baseProjects.map(project=>({...project,...updates[project.id]})),...otherProjects];
export function searchProjects(query:string):Project[] {
 const term=query.trim().toLocaleLowerCase();
 if(!term)return [];
 return projects.filter(project=>JSON.stringify([project,projectGuides[project.id]]).toLocaleLowerCase().includes(term));
}
