# 作品介绍与面试材料

核对日期：2026-11-04。内容面向 Python 后端、全栈与 Vibe Coding 面试，三个主作品按不同能力展开，补充作品用于应对具体问题。

## 阅读与练习结构

在“我的项目库”选择作品，一次阅读一个项目。`#projects` 默认进入 Agency Bloom；`#project:bloom`、`#project:belay`、`#project:somnia` 可直接打开对应主作品。其他作品也使用稳定 ID。

每个主作品包含：

1. 一段概述与两种长度的口述稿；自测模式隐藏稿件，复制功能复制当前长度。
2. 个人贡献和四段技术流程，先理解数据和请求怎样穿过系统。
3. 三个实现案例，分别说明问题、取舍、实现、验证与可打开的代码。
4. 本人提供的高频深入追问，加 Docker 学生代码执行追问（Bloom 9 题、Somnia 8 题、Belay 10 题），另保留每个项目五个补充追问，以及演示顺序、材料和表达边界。
5. 原有关联题目与笔记。笔记继续使用 `project-bloom` 等原键，导入导出不迁移、不丢弃旧记录。

## 三个主作品怎样分工

| 作品 | 介绍重点 | 深挖案例 |
| --- | --- | --- |
| Agency Bloom | 独立全栈产品，Vue / TypeScript / uni-app 与 Python / FastAPI | 用户确认和上下文；流式反馈与正式保存；预算预留与结算 |
| Belay | 团队协作，Python 后端、恢复与执行边界 | Docker 资源 / 输出 / 产物 / 清理；未确认请求恢复；共享预算和 worker |
| Somnia Library | 基于 Reverie 的 React / Supabase 二次开发 | 认证初始化；公共书目与个人数据；并发取数与书库展示 |

三份主介绍包含 27 个高频深入追问与原 15 个补充追问，共 42 个项目问答，不改动全站 103 道口述练习和 154 个原题追问的统计。补充条目为文若 RAG、个人作品集、Cupcakes、Travel Discovery、AtHub 异常检测、公共数据可视化、可持续数据中心选址，共 10 个作品条目。

## 本轮核对来源

- Bloom：`C:/Projects/Agency-Bloom` 的 `AGENT.md`、`docs/PRODUCT_DIRECTION.md`、`apps/api/app/main.py`、模型与流式代码；产品当前方向以仓库规则为准，不写成强制四步。查询快照 HEAD `de110f4`，后续变动以新提交为准。
- Belay：`C:/Projects/EduCloud-Ecosystem/belay` 的 runner、共享账本、`docs/reviews/pr7-sandbox.md`、集成说明及引用追问记录。查询快照 HEAD `20e2757`。
- Belay 个人提交：`6c5cfe2`（容器属性）、`84d71d9`（有界输出与产物边界）、`9319670`（首个超出字节与清理确认），实际作者记录为 Annabelle。宿主侧评分是团队已有实现的保留与衔接，不写成从零独立完成。
- Somnia：通过 GitHub 读取 `main` 的 `src/auth/AuthProvider.tsx`（blob `9d7fb7aba7640492f5d280d3efd3fd45738a727b`）、`src/hooks/useBookForm.ts`（`5ae4516610f56edd9120234bd5bf24938d56f39b`）、`src/pages/Library.tsx`（`9c3bfc5a5406f9144ea0c7ee0aa8626951df69b6`），确认认证状态、查重和关系数据组合。系统已有实现不自动等于每项均为本人新增；个人归属仍需 diff。
- 作品展示与其他条目：`C:/Projects/Annabelle-portfolio/src/sections/SomniaCase.jsx`、`WebProjects.jsx`、`data-projects.js` 与原有交互作品资料。作品集和案例统一使用 `https://annabelle0726.github.io/Annabelle0726/`。
- 文若延续 [原核对记录](project-evidence.md)，没有新增客户、营收或查证不到的个人提交。

## 保留的事实边界

本轮追问补充继续读取 Bloom 的 `main.py`、`ai.py`、`conversations.py`、`chat-stream.ts` 与 `native-api.ts`，以及 Belay 的 `auth.py`、会话 repository / router、`conversation-client.js`、`controls/runtime.py`、`ledger.py` 和进程竞争测试。

Somnia 另核对 `package.json`、`src/App.tsx`、`src/main.tsx` 和 `useBookForm.ts`：React Query 有依赖声明，但已读入口没有展示 QueryClientProvider，书库仍为手写取数，因此仅讲清原理和拟采用方式；不据此断言其他未查文件完全没有使用。元数据失败保留组件内 form，成功合并仍可能覆盖人工输入，跨刷新草稿和过期请求保护作为改进建议。

Belay 失败预算按阶段区分：已确认外部调用前失败可零用量结算；供应商调用抛错或用量不可信则以 `None` 结算为 `unknown`，继续保留费用责任，不自动全退。PostgreSQL 预算事务使用 advisory lock，SQLite 本地实现使用 BEGIN IMMEDIATE；真实并发测试依赖独立 CONTROL_TEST_DATABASE_URL。题目回答与这些具体机制保持一致。

本轮阅读源码和既有验证记录，没有重新运行三个原项目的整套服务、真实模型或容器。Belay 的历史验证包含失败、聚焦修复和未验证项，不能压缩成“全部通过并已上线”；Docker 可用性、新镜像、gVisor 和平台集成分别需要证据。

Somnia 的路由保护不等于数据库 RLS；客户端查重不等于数据库并发唯一约束；客户端搜索不等于服务端检索优化。可持续选址只保留能核对的概述，不补写无法读取原稿中的细节。数据作品不包装成投资、因果或真实商业成效。

## 后续维护

- 主项目详细正文只改 `src/data/project-guides.json`，补充作品改 `src/data/other-projects.json`。
- 本人清单对应的高频问题改 `src/data/project-interview-questions.json`；编号由显示顺序生成，正文参与项目搜索。
- `src/data/projects.ts` 保留原元信息与笔记 ID；新增条目 ID 唯一，关联题目必须存在。
- 项目正文也参与搜索，搜索命中直接打开对应项目；案例折叠与介绍长度切换不会改变笔记。
- 更新后运行 `npm test` 与 `npm run build`，构建会同步生成离线 `interviews.html`。检查桌面、手机、项目直达与题目返回路径。
