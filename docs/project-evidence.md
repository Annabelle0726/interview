# 项目代码与面试表达依据

核对日期：2026-11-02。用于准备能继续追问到代码的回答。Python 主线是 Agency Bloom 与 Belay；Somnia Library 补充全栈数据接入、认证和 UX/UI。

2026-11-04 补充：三份完整口述、Docker 沙箱个人提交与其他作品的最新核对记录见 [作品介绍与面试材料](project-dossiers.md)。这里保留原核对日期，避免把历史测试结果当作本次实测。

## Agency Bloom

本地仓库：`C:/Projects/Agency-Bloom`。本人独立推进项目的范围依据本人说明；以下是本次实际阅读的代码与设计材料。

| 可以展开的内容 | 代码位置 | 可以解释的判断 |
| --- | --- | --- |
| Python 应用后端 | `apps/api/pyproject.toml`；`app/main.py:131` | FastAPI、Pydantic、SQLAlchemy、HTTPX 各自负责什么 |
| 微信登录与应用身份 | `app/main.py:241`、`:304` | 临时 code 换身份，后续业务请求使用自己的会话令牌 |
| 探索、会话、记忆的数据关系 | `app/models.py:66`、`:83`、`:125`；`app/conversations.py:117` | 一个持续问题可以有多次讨论；只选择本次允许使用的上下文 |
| 用户确认与版本检查 | `app/schemas.py:228`；`app/main.py:546` | AI 推测先作为草稿，确认、修改与停用影响输入模型和存储 |
| 异步模型接入与流式响应 | `app/ai.py:305`、`:346`；`app/chat_stream.py:34` | 异步网络读取、队列、SSE、取消和最终结果校验怎样配合 |
| 预算预留与结算 | `app/main.py:794`、`:918` | 整数金额、条件更新、预留成功后调用、按真实用量结算 |
| 测试与交付配置 | `apps/api/tests/test_chat_stream.py`、`test_postgres.py`；`.github/workflows/check.yml`；`deployment/wechat-api/Dockerfile` | 测试替身、数据库集成、CI 与容器分别验证什么 |

表中 `app/` 路径相对于 `apps/api/`。流式日志记录的是服务端首段回复可输出的耗时，不等同于小程序完成渲染的时间，更不证明模型计算变快。

产品定位依据 `AGENT.md`、`CONTEXT.md`、`docs/PRODUCT_DIRECTION.md`。Bloom 帮助用户理解自身价值、探索可能并作出自己的选择；职业探索是首个验证场景。Understand / Question / Explore / Become 不是强制四步流程，行动记录也不是每次思考的必需结果。

## Belay

本地仓库：`C:/Projects/EduCloud-Ecosystem/belay`。团队项目，口述先说明本人参与的学习工作区、会话持久化、权限和预算相关工作，再展开能解释的实现。

| 可以展开的内容 | 代码位置 | 可以解释的判断 |
| --- | --- | --- |
| Python API 与输入输出 | `backend/app/main.py:124`；`schemas.py:13` | FastAPI、Pydantic 与统一授权怎样连接业务入口 |
| 模型接口隔离 | `backend/app/agent/llm.py:51`、`:102` | Provider Protocol、具体 SDK、fast / strong tier 与测试替身 |
| 预算事务 | `backend/app/controls/runtime.py:63`；`ledger.py:115`、`:163` | 事务内先预留，事务外调用模型，再结算；避免长期占锁 |
| 持久任务与共享调度 | `backend/app/controls/admission.py:108`、`:188`；`jobs_worker.py:52` | 独立 worker、班级间轮转、班内 FIFO 与过期 worker 的写回保护 |
| 数据库存储 | `backend/app/store/db.py:18`；`.github/workflows/ci.yml:11` | SQLite / PostgreSQL 的环境差异和迁移检查 |
| 进程级竞争验证 | `backend/tests/test_controls_ledger.py:88`；`test_jobs_postgres.py:74` | 两个进程争额度、重复请求和多个 worker 竞争领取 |

Belay 的主 API 多为同步 `def`，模型 SDK 也是同步的；长任务由持久队列和独立 worker 处理。不能因为采用 FastAPI 就说成全异步服务。首版账本采用保守锁策略，优先保证正确性和可审计性；没有实测吞吐数据时，不包装成高并发优化成果。SQL 保存带班级范围的数据，不等于存在完整班级管理系统。

## Somnia Library

源码：[Annabelle0726/somnia-library](https://github.com/Annabelle0726/somnia-library)。核对了 `main` 和两个功能分支，当前树中没有 Python 文件、`requirements` 或 `pyproject`；`backend/supabase_schema.sql` 是空文件。当前可查实现为 React、TypeScript、Supabase 和 Deno Edge Function。

| 可以展开的内容 | 源码 | 可以解释的判断 |
| --- | --- | --- |
| 认证初始化与路由 | [AuthProvider](https://github.com/Annabelle0726/somnia-library/blob/main/src/auth/AuthProvider.tsx#L23)、[ProtectedRoute](https://github.com/Annabelle0726/somnia-library/blob/main/src/components/layout/ProtectedRoute.tsx#L14) | 等 session 初始化再决定跳转，区分未知状态与未登录 |
| 公共书目与个人阅读数据 | [数据类型](https://github.com/Annabelle0726/somnia-library/blob/main/src/types/book.ts#L8)、[添加书籍](https://github.com/Annabelle0726/somnia-library/blob/main/src/hooks/useBookForm.ts#L196) | 查重、创建公共书目、关联个人状态和收藏 |
| 页面数据组织 | [Library](https://github.com/Annabelle0726/somnia-library/blob/main/src/pages/Library.tsx#L88) | 并发获取状态、收藏和标签，使用 Map / Set 组合展示 |
| 外部元数据接入 | [OpenLibrary](https://github.com/Annabelle0726/somnia-library/blob/main/src/lib/openlibrary.ts#L13) | ISBN 清洗、元数据查询与并发获取作者 |
| AI 评估函数 | [evaluate-book-spice](https://github.com/Annabelle0726/somnia-library/blob/main/supabase-functions/supabase/functions/evaluate-book-spice/index.ts#L110) | Deno 函数接收请求、补简介、调用模型并写回结果 |

页面里的搜索与分页在浏览器端完成，不能称为服务端检索优化。现有 Edge Function 也不能证明全部模型调用已移到服务端；客户端仍有直接调用路径。前端查询包含用户 ID 不能单独证明数据库授权策略完整。

UX/UI 的个人贡献可结合作品集中的 `SomniaCase.jsx` 和 `WebProjects.jsx`，演示首页、书籍、认证及移动端导航的改进。原项目能力与自己的代码修改用具体 diff 区分。

## AI 工具、Skills 与验证

- 日常工具按本人确认的 ChatGPT、Codex 表达。Agent Skills 说明具体任务中的方法和检查点，项目规则说明产品与代码约束。
- Bloom 的 `AGENTS.md → AGENT.md` 与 Belay 的 `CLAUDE.md`、`.claude/commands/new-cc-prompt.md` 证明仓库存在规范化协作材料；配置存在不自动证明本人使用过每个工具和命令。
- 本次修改实际采用了项目只读调查、口述审稿与技术事实复核。项目的产品判断、方案取舍和结果验收仍需要开发者决定。
- 本次未重新运行 Bloom、Belay 或 Library 的整套服务测试。只把它们作为源码证据；当前面试手册自己的测试与构建另行验证。
- 历史测试存在不自动证明先红后绿。讲 TDD 时展示某次具体改动的失败、实现、通过与重构记录。
