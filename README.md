# Annabelle 的面试准备手册

本地 React + TypeScript + Vite 项目。88 道练习（上传手册 64 道、补充 24 道）、12 个主题、川下科技专项与 4 个项目。公司资料来自所提供的 JD 和 HR 沟通，以 2026-11-02 为整理日期。

## 直接使用：不需要安装软件

将压缩包的内容解压至 `C:\Projects\interviews`，双击其中的 **interviews.html**。此文件包含 React、CSS、题库、作品集原版 SVG 签名和上传的 Word 原件，无需联网、无需服务器。单文件也可独立下载。浏览器或文件位置不同，学习记录可能分开保存；定期在“备份与签名”导出 JSON。

## 本地开发

使用 Node.js 22.13+ 或 Node.js 24。打开 CMD：

```bat
cd /d C:\Projects\interviews
npm ci
npm run dev
```

打开终端打印的 localhost 地址。首次安装依赖需要联网。为避免在不同来源之间切换导致看不到原学习记录，选定一种使用方式；需要迁移时导出/导入备份。

```bat
npm test
npm run build
npm run preview
```

`build` 先进行 TypeScript 检查，再生成 `dist/` 和独立文件 `interviews.html`。

## 使用建议

1. 先打开“川下科技”，从每项岗位要求直接进入关联练习。
2. 优先准备开发岗自我介绍、Python 预算判断练习、AI 代码审查、TDD/SDD/BDD 与一个真实项目。
3. 在“我的项目库”优先梳理文若：个人定制、开源平台能力、Ragent 评估、尚未证实的业务假设分开。
4. 打开题目，“自测”隐藏完整答案；在“我的回答与证据”中用自己的话练习。标记待复习或已掌握。
5. Ctrl/Cmd+K 聚焦搜索。支持题干、正文、技能与项目检索。读过的最后一题可从概览继续。
6. 原版签名取自个人作品集 `src/components/SectionHeader.jsx`，按原 viewBox、笔画与配色内嵌。可在设置页换成本机图片。

## 内容维护

- `src/data/questions.json`：上传手册的完整主问题、回答、代码和题内表格。
- `scripts/import_docx.py`：保留代码和附录的导入工具。仅重新导入时需要 Python 与 `python-docx`。
- `src/data/supplement.json`、`scripts/supplement.py`：岗位与项目补充题及其编辑来源。
- `src/data/catalog.ts`：主题、公司、项目、学习路线和题目关系。首版提供内容阅读、进度与笔记，不包含网页内题库编辑器。
- `src/data/import-report.json`：源题号与新编号、分组数量和附录。
- `public/Interviews-original.docx`：原始上传文件。也可在“内容与原始资料”下载。
- `src/learning.ts`、`tests/learning.test.ts`：筛选和备份校验。

## 证据范围

P0/P1/P2 是复习顺序建议，并非该公司真实考题。熟悉 Python，Go 基础了解；AI Coding 从 2025 年初开始，主要使用 ChatGPT 和 Codex。测试经历不自动等于严格 TDD。文若方向已暂停，不虚构商业结果。当前 `wenruo-agent` 默认分支 README 对应 Ragent；WeKnora 定制的历史短提交并未在所查远端找到，面试展示前请核对本地记录。
