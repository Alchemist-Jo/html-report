# HTML 报告 skill

本发行版名称为 `html-report`，版本 1.1.0。适用于研究笔记、技术文档、概念教学、系统与源码讲解、数据分析、方案比较、调研综述和论文解读。采用少量主要章节与连贯段落，保留详细推导和证据；章节由内容决定。

基于 MIT 许可的 [xiaofengShi/paper-reading-skill](https://github.com/xiaofengShi/paper-reading-skill)。固定提交记录于 UPSTREAM.json，原始许可证与入口已保留。上游 README、示例与论文专用参考资料描述上游行为；定制版以 SKILL.md 为入口，通用报告不默认套用论文结构。

用户写作要求原文保存在 references/writing-requirements-original.md，并被入口设为必读。references/technical-explanation.md 补充完整讲解与少分小节的规则。渲染器新增通用报告语言标记与标题、导航、图表标签；旧语言标记继续支持上游示例。依赖和许可证随包附带。

## 使用与安装

在 Codex 中输入：

> 用 $html-report 把这些材料讲清楚，少分小节，按论证自然展开，保留完整推导、例子和证据，输出中文 HTML 报告。

将完整 html-report 目录复制到个人技能目录；Codex 默认目录为 ~/.codex/skills/。下一轮对话可使用。运行环境要求 Node.js 20+，包内已附带锁定的渲染依赖。缺失时执行 `npm ci --ignore-scripts --no-audit --no-fund`。

Markdown 首行为 `<!-- report-lang: zh-CN -->` 或 `<!-- report-lang: en -->`，正文包含一个 # 标题与按内容需要设置的 ## 章节。图片放在 Markdown 所在目录的子目录。

```sh
node scripts/render-report.cjs input.md output.html
npm run doctor
npm test
```

生成文件内嵌数学字体、CSS 和本地图片。工具自检验证格式与渲染；生成报告时仍须核对实际材料、数学步骤和结论。
