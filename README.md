<p align="center">
  <img src="public/favicon.svg" width="120" height="64" alt="Annabelle 的蓝金手写签名" />
</p>

<h1 align="center">Annabelle 的面试准备手册</h1>

<p align="center">把知识点练成能说出口的回答，把项目经历整理成有依据的表达。</p>

<p align="center">
  <a href="#开始练习">开始练习</a> ·
  <a href="#怎样练习">怎样练习</a> ·
  <a href="#本地开发">本地开发</a> ·
  <a href="#内容维护">内容维护</a>
</p>

---

一个围绕目标岗位组织知识、回答与项目经历的个人面试工作台。将原始手册、岗位补充、全栈模拟和项目表达放在一起，支持自测、修改口述回答、记录笔记与复习进度。

**103 道口述练习 · 154 个有回答的追问 · 78 道选择题 · 12 个主题 · 10 个作品条目**

覆盖 Python 后端、React / Vue、数据库、Linux、RAG / Agent、AI Coding 与架构交付；包含川下科技岗位专项。公司资料依据所提供的 JD 与 HR 沟通整理，资料日期为 **2026-11-02**。

## 怎样练习

**11.04 · 作品介绍与面试深挖**：项目库新增 Agency Bloom、Belay、Somnia Library 三份完整介绍，包含 30 秒概述、2–3 分钟展开、技术流程、9 个实现案例、15 个带回答的追问和演示顺序；Belay 重点补充 Docker 沙箱、恢复与预算。保留文若，并补充个人作品集、Cupcakes、Travel Discovery 和三组数据作品。支持项目直达链接、正文搜索与介绍自测，原项目笔记继续保留。进入“我的项目库”，或在页面地址后加 `#project:belay`。[内容结构与核对记录](docs/project-dossiers.md)。

**11.03 · AI 应用与前端场景补充**：新增 6 道面经改写模拟题，涵盖 JSON 运行时校验、身份授权、SSE 恢复、加载更多、幂等重试与延期沟通，附 19 个追问和 3 个小练习的验收清单。通过首页同名学习路线进入；[来源时间、技能优先级与练习安排](docs/2026-11-03-qa-sources.md)单独记录，不将整理日期当作面试日期。

**P0 · AI 开发核心能力**：补齐 Context Engineering、Prompt Engineering、Agentic Workflow、Debugging、Code Review、Git Workflow、Testing & CI 七项。每项包含掌握要点、项目场景、口述稿、Agent 任务示例、追问与 3 道带解析的选择题，共 21 道。通过首页或左侧“P0 开发核心能力”进入，切换主题即可学习。

**P1 · 后端工程师重点掌握**：DDD、API Contract、Clean Architecture、Security、Observability、CI/CD & DevOps，共 6 项课程、18 道场景单选。围绕 Bloom 和 Belay 的业务模型、接口、预算事务、依赖边界与运行证据展开。

**P2 · AI Agent 进阶能力**：MCP、Skills、Hooks、AI Evaluation、Agent Orchestration，共 5 项课程、15 道场景单选。日常 Skills 使用仍属于 P0，P2 深入工作流封装、触发与维护评估。通过首页或侧栏进入两个专题；每项都包含掌握要点、项目场景、口述、任务示例、追问和逐项解析。切换主题保留答题记录，重练只重置当前主题。

新增 **SDD / BDD / TDD 选择题**：每类 8 道，共 24 道单选题。通过首页入口或左侧“工程方法选择题”进入，选择并提交后查看正确答案和四个选项的解析。支持分主题练习、题号跳转、计分与重练；结果独立保存在当前浏览器，不包含在面试笔记备份中。

**HR 重点：Python 后端开发 + Vibe Coding。** 首页新增“Vibe Coding · 简历与实战”，覆盖简历表达、Agent 派工、Skills、TDD / SDD / BDD、协作 Review 与现场演示。正文加粗标出能力与动作，红色提示标出面试前应准备的证据。

| 想完成的事 | 在手册里怎么做 |
| --- | --- |
| 围绕岗位准备 | 从公司专项查看岗位要求，进入关联练习 |
| 练习面试表达 | 打开题目，阅读口述稿和追问；用“自测”隐藏完整答案 |
| 写出自己的版本 | 点击“编辑我的回答”，修改现成口述稿并补充个人笔记 |
| 安排下一轮复习 | 收藏题目，标记“待复习”或“已掌握”，从概览继续上次阅读 |
| 保留学习成果 | 导出 JSON 备份，在其他浏览器或使用方式中导入 |

建议从自我介绍、Python 预算判断、AI 代码审查、TDD / SDD / BDD 和一个真实项目开始。按 **Ctrl / Cmd + K** 搜索问题、技能或项目。

## 开始练习

从目标岗位出发，选定一条学习路线，在自测与追问中打磨自己的表达。

**[获取面试手册 →](https://github.com/Annabelle0726/interview/archive/refs/heads/main.zip)**

下载并解压后，打开 `interviews.html`，即可进入完整工作台。

1. **选定方向** — 从岗位专项或主题目录进入，找到当前最需要准备的问题。
2. **练习表达** — 先自测，再对照口述稿与追问，把答案改成自己的版本。
3. **持续复盘** — 标记掌握情况，收藏重点问题，逐步形成个人回答库。

学习记录会保存在当前浏览器中；可在“备份与签名”中导出，方便保存和迁移。

## 本地开发

需要 **Node.js 22.13+ 或 Node.js 24**；首次安装依赖需要联网。在项目目录运行：

```sh
npm ci
npm run dev
```

打开终端显示的本地地址。

| 命令 | 用途 |
| --- | --- |
| `npm test` | 检查学习记录、题库回答及备份相关逻辑 |
| `npm run build` | TypeScript 检查，生成 `dist/` 与独立版 `interviews.html` |
| `npm run preview` | 本地预览构建后的网页 |

采用 React 19、TypeScript、Vite 与 Lucide 图标。签名沿用个人作品集中的原始 SVG 笔画与蓝金配色，也用于网站 favicon。

## 内容维护

Python 与项目回答依据实际源码整理，具体实现与可展示材料见 [项目代码与面试表达依据](docs/project-evidence.md)。

- `src/data/p1-core.json`、`src/data/p1-quiz.json`：6 项后端工程课程与 18 道场景选择题。
- `src/data/p2-core.json`、`src/data/p2-quiz.json`：5 项 Agent 进阶课程与 15 道场景选择题。
- `src/core-curriculum.ts`、`src/quiz-bank.ts`：课程分层与完整选择题数据入口。
- `src/data/p0-core.json`、`src/data/p0-quiz.json`：7 项开发核心能力与 21 道场景单选题。
- `src/data/engineering-quiz.json`：24 道工程方法单选题，含正确选项与逐项解析。
- `src/data/recent-qa.json`：6 道 11.03 场景补充，含口述回答、追问、示例、练习验收与来源链接。
- `src/data/vibe-coding.json`：6 道 Vibe Coding 专题，含简历表达、Agent 工作流和红色重点提示。
- `src/data/spoken-answers.json`：按题号保存面试口述稿、全部追问与答复。重新导入原手册不会覆盖口述稿。
- `src/data/fullstack.json`：本轮新增的登录、隔离和文件上传题。全栈八题的练习顺序在首页第五组。
- `src/data/questions.json`：上传手册的完整主问题、回答、代码和题内表格。
- `scripts/import_docx.py`：保留代码和附录的导入工具。仅重新导入时需要 Python 与 `python-docx`。
- `src/data/supplement.json`、`scripts/supplement.py`：岗位与项目补充题及其编辑来源。
- `src/data/catalog.ts`：主题、公司、项目、学习路线和题目关系。首版提供内容阅读、进度与笔记，不包含网页内题库编辑器。
- `src/data/projects.ts`：项目元信息、原笔记 ID 与搜索入口；`project-guides.json` 是三个主作品的详细介绍，`other-projects.json` 保存补充作品。
- `src/ProjectLibrary.tsx`：项目切换、介绍自测、技术案例、追问与个人笔记；维护内容时参考 `docs/project-dossiers.md`。
- `src/data/import-report.json`：源题号与新编号、分组数量和附录。
- `public/Interviews-original.docx`：原始上传文件。也可在“内容与原始资料”下载。
- `src/learning.ts`、`tests/learning.test.ts`：筛选和备份校验。

## 证据范围

P0/P1/P2 是复习顺序建议，并非该公司真实考题。熟悉 Python，Go 基础了解；AI Coding 从 2025 年初开始，主要使用 ChatGPT 和 Codex。测试经历不自动等于严格 TDD。文若方向已暂停，不虚构商业结果。当前 `wenruo-agent` 默认分支 README 对应 Ragent；WeKnora 定制的历史短提交并未在所查远端找到，面试展示前请核对本地记录。
