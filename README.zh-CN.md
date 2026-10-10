# html-report

[English](README.md) · 简体中文

把一份材料讲解成一个可离线打开的 HTML 文件。材料可以是论文、视频或系列课程、文档、代码、数据或方案比较。读者不打开原材料，也能跟随页面、复算其中的例子，并找到每条结论的来源位置。

## Agent 的工作流程

[SKILL.md](SKILL.md) 是面向长程 agent 的分阶段指南：

1. 按固定的回退顺序取材。视频先读元数据和字幕，再下载；论文先找原始图文件，再考虑 PDF 裁剪；官方来源优先于转录稿。
2. 维护四份台账：覆盖、证据、图像和设计。核实之前只用中性标签，候选帧看过原图后才获得语义文件名。
3. 长材料按明确阈值分段：视频超过 20 分钟或字幕超过 300 条，论文超过 30 页，系列课程按讲次。各段可交给并行子代理，按固定格式返回结果。
4. 按教学顺序写作：问题、核心思路、机制、例子或证据、需要记住的结论。公式先说明用途，再列出符号。学习资料加入完整示例、练习和有理由的参考解。
5. 选图先保证召回，再做筛选。画面内容只依据实际查看原图来判断。
6. 构建后在 1440 和 390 两个宽度检查渲染结果，修复失败项。

## 路线

| 材料 | 路线 |
| --- | --- |
| 一篇论文 | 用 Markdown 审计源，经 `scripts/render-reading.cjs` 渲染为阅读图谱，流程见 [paper deep read](references/paper-deep-read.md) |
| 视频、课程或系列 | 用 `scripts/build-html.mjs` 构建 HTML 课程页，取材见 [视频取材](references/video-learning.md) |
| 文档、代码、数据或比较 | HTML 课程页或 Markdown 报告路线 |

需要先修知识、习题和多轮审查的领域或课程教材，使用 [textbook-anything](https://github.com/Alchemist-Jo/textbook-anything)。两个 skill 共用课程主题、构建器和渲染检查脚本。

## 视觉设计与渲染检查

[视觉设计](references/visual-design.md) 规定：每个宽度最多六级字号；中文阅读栏 648px，英文 576px；在 390px 屏幕上图内文字不小于 12px；对比度满足 WCAG AA；只用一个强调色和一个警示色。`scripts/render-audit.mjs` 在渲染后的页面上检查这些约束：

~~~sh
node scripts/render-audit.mjs docs/learning-example.html --widths 1440,390 --out build/audit --print
~~~

脚本通过 DevTools 协议设置真实视口宽度，为每个宽度保存分块截图和总览图。报告内容包括：整页横向溢出、实际字号层级、小于 12px 的文字、按文字背后实际像素测得的对比度、重叠或越界的图内标注、损坏或被放大的图片、残留的 Markdown 或 TeX 标记，以及没有目标的页内链接。运行需要 Node 22 以上和本机 Chrome 或 Chromium。脚本之后，agent 还要逐张查看截图，检查对齐、间距和图像裁剪。

## 安装与使用

~~~sh
npx skills add Alchemist-Jo/html-report --skill html-report -g
~~~

~~~text
使用 $html-report，把这篇论文精读成一个离线 HTML 页面。
~~~

~~~text
使用 $html-report，把这节课做成中文学习资料，加入完整示例、练习和有理由的参考解，
图旁保留视频时间。
~~~

## 构建

~~~sh
npm ci --ignore-scripts --no-audit --no-fund
python3 -m venv .venv
source .venv/bin/activate
python3 -m pip install -r requirements-html.txt
node scripts/build-html.mjs examples/retries.source.html docs/learning-example.html
node scripts/render-reading.cjs examples/attention-is-all-you-need-deep-read.md docs/attention-is-all-you-need-deep-read.html
npm test
npm run doctor
~~~

构建需要 Node 20+ 和 Python 3.10+，渲染检查需要 Node 22+。成品内嵌 CSS、脚本、图片与字体子集，可直接离线打开。独立 Python 环境可通过 SKILL_HTML_PYTHON 指定。

[交互示例](docs/learning-example.html) · [可编辑源码](examples/retries.source.html) · [论文阅读示例](docs/attention-is-all-you-need-deep-read.html)

## 来源

论文渲染器和精读路线改编自 [paper-reading-skill](https://github.com/xiaofengShi/paper-reading-skill)，分阶段 agent 流程参考 [youtube-render-pdf](https://github.com/wdkns/wdkns-skills/tree/main/skills/youtube-render-pdf)。许可见 [LICENSE](LICENSE) 和 [第三方说明](THIRD_PARTY_NOTICES.md)。
