# html-report

[English](README.md) · 简体中文

将视频课程、文档、代码、数据和论文制作成可独立阅读的报告或学习资料。agent 完成取材、长材料分段、机制与证据讲解、图示与交互、构建、检查和具体问题修正。

learning-html 的流程和资源已合并到本仓库。通用报告保留原有用途；学习任务增加完整示例、练习与参考解。入口简短，参考按当前动作加载。

## 安装与使用

~~~sh
npx skills add Alchemist-Jo/html-report --skill html-report -g
~~~

~~~text
使用 $html-report，把这套课程制作成可独立学习的中文 HTML。
讲清机制和执行流程，保留必要图示、来源与视频时间，
加入完整示例、实践变化和有理由的参考解。
~~~

默认不修改真实项目，不生成额外格式；用户明确指定的范围、语言和交付方式优先。

## 构建

~~~sh
npm ci --ignore-scripts --no-audit --no-fund
python3 -m venv .venv
source .venv/bin/activate
python3 -m pip install -r requirements-html.txt
node scripts/build-html.mjs examples/retries.source.html docs/learning-example.html
~~~

构建需要 Node 20+ 和 Python 3.10+。成品内嵌 CSS、脚本、图片与字体子集，可直接离线打开。独立 Python 环境可通过 SKILL_HTML_PYTHON 指定。

[交互示例](docs/learning-example.html) · [可编辑源码](examples/retries.source.html) · [Agent 工作流程](references/agent-workflow.md)

原 Markdown 报告与结构化图表继续使用：

~~~sh
node scripts/render-report.cjs input.md output.html
npm test
npm run doctor
~~~

动画按同一状态更新图形、数值与解释，支持暂停、逐步查看和重播。简短引用连接文末来源区，必要图注与时间保留在图片旁。构建与运行测试、视觉检查和内容正确性分别核实。

## 来源

报告渲染器基于 [paper-reading-skill](https://github.com/xiaofengShi/paper-reading-skill)，取材与教学流程参考 [youtube-render-pdf](https://github.com/wdkns/wdkns-skills/tree/main/skills/youtube-render-pdf)。许可见 [LICENSE](LICENSE) 和 [第三方说明](THIRD_PARTY_NOTICES.md)。
