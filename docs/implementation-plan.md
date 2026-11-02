# 面试准备网站实施计划

目标：React 本地学习站，完整保留上传手册、公司专项、重点判断与项目材料。用户已确认功能方案并授权实施，实用优先。
技术：React / TypeScript / Vite；JSON 内容；浏览器本地学习记录。交付源码 ZIP 与无需安装的单文件 HTML。
目标目录 C:\Projects\interviews 的设备离线，先完成可下载工程。已由简历作品集链接定位个人作品集的 SectionHeader 原版 SVG，保留路径与配色，支持本地图片替换。

- [x] 1. 内容整理：将 docx 全部 64 道问题和原始代码/表格导入，唯一 ID、分类、每题重点和准备层级；补充川下公司与文若项目。
- [x] 2. 状态与检索：搜索覆盖题干与正文；分类/优先级/收藏/待复习筛选；导出导入笔记和进度。先测搜索中文及空白、无结果、损坏备份、未知题目 ID、存储失败。
- [x] 3. 页面：Sidebar/Main、首页、公司专项、项目库、知识题目、阅读/练习、笔记、签名导入、数据备份；可键盘操作、窄屏折叠。
- [x] 4. 验证：内容完整性、单元测试、TS检查、生产构建、桌面与移动浏览器检查；打包并保存。

数据约定：Question(id,title,category,priority,summary,focus,blocks,followups,boundary,source,links)；Progress(version=1,records:{id:{status,starred,note}},signature)。
优先级是面向川下的准备建议，不是公司面试题预测。事实、本人贡献与假设示例分开。公司资料依据提供的JD/HR沟通，标注2026-11-02。
范围选择：首版以阅读+笔记为主，公司与题库通过 JSON 扩展，不增加数据库或登录。
