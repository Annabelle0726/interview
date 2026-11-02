"""Rebuild source questions, preserving paragraphs, code and inline tables.
Usage: python scripts/import_docx.py path/to/Interviews.docx
Requires python-docx (only needed to re-import).
"""
import sys,re,json,shutil
from pathlib import Path
from docx import Document
from docx.text.paragraph import Paragraph
from docx.table import Table
root=Path(__file__).resolve().parents[1]
source=Path(sys.argv[1]); doc=Document(source)
items=[];current=None;counts={}; appendix=[]
for child in doc.element.body.iterchildren():
 if child.tag.endswith('}p'):
  p=Paragraph(child,doc);t=p.text.strip()
  if not t:continue
  m=re.match(r'^([ABCDE])(\d+)[｜\s]+(.+)$',t)
  if m:
   group=m[1];counts[group]=counts.get(group,0)+1
   current={'id':f'{group.lower()}{counts[group]:02d}','title':m[3],'originalRef':f'{group}{m[2]}','blocks':[],'followups':[],'source':'Interviews (1).docx','links':[],'tags':[]}
   items.append(current)
  elif p.style.name.startswith('Heading 1') or t=='面试前的项目证据':current=None
  elif current:
   if re.match(r'^(考官追问|考官可能追问)',t):current['blocks'].append({'type':'p','text':t})
   elif re.match(r'^面试官追问',t):current['followups'].append(t)
   else:
    iscode=bool(re.match(r'^(const |let |import |from |def |async function|function |fetch\(|SELECT |select |grep |tail |result, err|func |package |type |ph =|stored_hash|try:|calculate =|git )',t)) or ('\n' in t and bool(re.search(r'(=>|\breturn\b|\bprint\(|\bfunc\b|\byield\b)',t)))
    current['blocks'].append({'type':'code' if iscode else 'p','text':t})
 elif child.tag.endswith('}tbl'):
  rows=[[c.text for c in r.cells] for r in Table(child,doc).rows]
  if current:current['blocks'].append({'type':'table','rows':rows})
  else:appendix.append(rows)
meta={
'A':[
('intro','P1','设计岗自我介绍：把视觉判断、交互与落地连起来。','保留设计岗版本；川下请使用新增的开发岗版本。'),
('ai-coding','P0','讲清 AI 做了什么，以及你如何决定、审查和验收。','不编造 AI 代码占比；用一个可展示的修改说明职责。'),
('ai-coding','P0','构建、自动化测试、浏览器体验各自证明不同的事情。','确认验证命令与结果；关键异常路径需要独立核对。'),
('product','P1','用信息发现和任务完成判断视觉设计是否有效。','设计意图不等于已证实的用户效果。'),
('frontend','P1','动效要让位于关键内容的及时出现。','讲姓名和图片先显示的实际取舍。'),
('product','P0','Bloom 的价值假设是让对话接续到行动记录。','有产品流程；还没有证明优于通用 AI 的用户数据。'),
('product','P1','没有规模数据，就展示流程证据并设计下一轮验证。','观察真实任务；少量体验不能推出市场规模。'),
('projects','P1','Somnia 的贡献集中在界面与认证体验改进。','区分 Reverie 原有能力与个人修改。'),
('projects','P0','恢复体验首先说明请求是否被接收、是否可重试。','结果不确定时不要自动重发；用 Belay 实际改动展开。'),
('frontend','P1','触屏没有可靠的悬停；关键内容要有可发现的入口。','同一次点击不要同时承担展开和跳转。'),
('product','P1','先理解设计成本，再保留核心任务与必要反馈。','团队情境如未真实发生，应作为处理思路表达。'),
('ai-coding','P0','编码前先检查需求、接口、权限、迁移与验收边界。','小功能不应无故引入新框架；高风险处先验证。'),
('ai-coding','P1','项目规则可以复用约束，但不能替代审查。','只有亲自使用过的工具和 Skills 才能算经验。'),
('ai-coding','P0','测试失败先找根因，不能删断言换取通过。','比较改动前后状态，分清实现错误、环境与规格变化。')],
'B':[
('product','P0','人的价值在于确定问题、作出取舍并验证交付结果。','从 Bloom 的一个具体决定展开。'),
('product','P0','真实需求要有近期事件、已有做法与实际损失。','愿意尝试和愿意付费是不同证据。'),
('product','P0','客户要 AI 时，先把诉求改写成可检查的任务。','资料版本混乱不一定能靠聊天机器人解决。'),
('product','P1','先服务问题具体、能接触并愿意验证的一类用户。','熟悉某种处境不代表它能代表全部用户。'),
('product','P1','竞争优势要与通用 AI 加现有工具进行任务对比。','定位是待验证假设，不是已有商业结果。'),
('product','P0','MVP 保留回答核心假设的完整最短流程。','保存与恢复不能为漂亮演示让步。'),
('product','P0','排序依据：核心任务、风险、业务承诺与实现成本。','记录最终取舍；别默认每项客户定制都值得接。'),
('product','P1','低留存先分清场景频率、目标人群和实际卡点。','不要机械套用每日留存评价低频决策工具。'),
('product','P1','产品效果要回到目标任务、行为变化和真实反馈。','上线与使用量不自动证明问题被解决。'),
('product','P1','付费判断看谁获得价值、谁付钱、现在怎样替代。','口头夸奖不能当成付费验证。'),
('product','P0','试点前确认负责人、数据、验收标准与后续付费路径。','愿意试用不等于值得无限定制或已经成交。'),
('ai-app','P0','同时约束 AI 质量、时延和单次成本。','预算控制是工程事实；效果提升需要独立评估数据。'),
('ai-app','P0','自动化程度由授权、操作影响和可撤销性决定。','高影响写操作要有边界；读信息与代用户提交不同。'),
('product','P1','用真实任务观察卡点，而不是只问用户好不好看。','视觉偏好和任务完成证据应分开。'),
('projects','P0','暂停文若方向可以体现判断，但需要真实原因和证据。','不把技术评估包装成商业成功。'),
('product','P0','需求变化先对齐业务原因，再评估范围、成本与验收。','远程团队要留下决定、负责人和验收条件。')],
'C':[
('frontend','P1','State 管理状态；Effect 同步外部系统。','检查依赖、清理和过期请求。'),
('frontend','P1','先定位渲染来源和真实性能瓶颈，再决定缓存。','开发 StrictMode 的额外检查不等于生产故障。'),
('frontend','P1','对象与数组用新引用更新，保护状态快照。','直接修改旧对象可能跳过更新或破坏已有快照。'),
('frontend','P1','理解 Vue 的依赖追踪与触发更新。','reactive 与 ref 的实现和解构行为要分别解释。'),
('frontend','P1','computed 做派生值；watch 做副作用。','不要用 watch 多保存一份可计算状态。'),
('python','P0','async/await 让等待 I/O 的任务交替推进。','异步不是自动多核；阻塞调用会卡住事件循环。'),
('python','P0','API 设计覆盖输入校验、认证授权、错误与测试。','身份已登录不等于有权访问某条数据。'),
('go','P2','Goroutine 由 Go 运行时调度，数量多仍需控制资源。','能说明概念即可；不声称精通并发调优。'),
('go','P2','Channel 用于通信与同步，也可能造成阻塞。','共享状态也可以用 Mutex，不必一律 Channel。'),
('go','P2','Go 显式返回 error；Python 常用异常传播。','保留错误上下文，不吞掉错误。'),
('python','P0','GIL 的讨论需说明 CPython 版本和构建方式。','GIL 不保证业务操作原子；不要泛化所有 Python 实现。'),
('python','P0','装饰器复用横切逻辑，本质是可调用对象包装。','说明 functools.wraps 及异常/异步函数适配。'),
('python','P1','生成器是实现惰性迭代的一种方式。','讲清 yield 暂停恢复、耗尽及大文件应用。')],
'D':[
('frontend','P1','网络响应顺序不等于发出顺序。','只允许最新请求更新结果、错误与 loading。'),
('frontend','P1','取消旧请求同时校验请求版本。','浏览器取消不代表服务端已停止。'),
('frontend','P1','防抖减请求，版本校验解决过期覆盖。','A→B→A 场景不能只比较关键词。'),
('database','P0','先看执行计划与过滤条件，再讨论索引和分区。','一亿行不自动等于慢；避免对过滤列施加函数。'),
('database','P1','控制读取行数、列数、分页和连接池。','先定位 SQL、I/O 还是应用层瓶颈。'),
('database','P0','先写数据库再删缓存仍有并发回填与删除失败风险。','TTL、重试、可靠变更事件是手段，不是严格一致性保证。'),
('database','P1','延迟双删降低某类竞态风险，但不提供严格保证。','固定延迟并不能覆盖所有请求耗时。'),
('database','P0','密码验证与需还原的敏感字段使用不同保护方式。','采用成熟算法和密钥管理，避免日志泄露。'),
('database','P1','密码库保存参数、盐和哈希；登录使用 verify。','还要处理限流、损坏哈希与统一错误响应。'),
('database','P1','是否需要还原决定哈希还是加密。','匹配字段还可考虑受保护索引，先明确业务用途。'),
('linux','P0','大日志先看尾部，不要一次输出全部。','tail、less 与条件过滤配合。'),
('linux','P1','持续观察日志时需要考虑轮转。','tail -f 与 -F 的差异。'),
('linux','P0','用请求标识关联一次调用的日志。','多节点需集中日志，跨服务可用 traceId。'),
('architecture','P2','设计模式解决变化与耦合，不是目录命名比赛。','优先简单组合，按实际复杂度增加抽象。'),
('architecture','P2','策略模式隔离可替换的业务算法。','先判断变化频率；简单分支不一定需要模式。'),
('ai-app','P0','RAG 是检索增强；Agent 增加工具与多步行动。','文若是平台定制评估经历，不能说自研完整引擎。')],
'E':[
('collaboration','P0','反问前三个月要解决的问题和交付成功标准。','确认需求来源及参与业务判断的空间。'),
('collaboration','P0','确认实际技术栈、评审、测试与发布方式。','特别确认 Python 与 Go 占比和 AI 工具规范。'),
('collaboration','P1','确认职责范围、指导与反馈机制。','用来判断双方对岗位级别的预期。'),
('collaboration','P1','问清后续面试流程和沟通节奏。','不默认下一轮已经确定。'),
('collaboration','P0','确认上海长期居家、线上入职和同步时段。','HR 已确认居家，但线上面试与出差要求仍需明确。')]
}
for q in items:
 g=q['id'][0].upper();n=int(q['id'][1:])-1
 cat,priority,summary,focus=meta[g][n]
 q.update(category=cat,priority=priority,summary=summary,focus=[focus],boundary='参考回答中的个人经历需能用演示、代码或记录说明；假设场景和建议指标不代表已取得的成果。',tags=[cat,'原手册'])
core=set(json.loads((root/'src/data/priority-core.json').read_text()))
for card in items:
 if card['priority']=='P0' and card['id'] not in core:card['priority']='P1'
(root/'src/data/questions.json').write_text(json.dumps(items,ensure_ascii=False,indent=2))
(root/'src/data/import-report.json').write_text(json.dumps({'source':source.name,'count':len(items),'groups':counts,'appendix':appendix,'mapping':[{'id':q['id'],'originalRef':q['originalRef'],'title':q['title']} for q in items]},ensure_ascii=False,indent=2))
shutil.copy2(source,root/'public/Interviews-original.docx')
print('Imported',len(items),'questions',counts)
