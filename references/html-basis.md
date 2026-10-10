# 方法依据与改进

本文件用于解释指南为何这样设计，常规生成无需读取。以下是官方规范与教学建议，不能作为本 skill 已改善学习效果的实验结论。

## 官方资料

- [Agent Skills specification](https://agentskills.io/specification)：元数据、主指南、按需资源分层加载；参考文件与脚本使用明确路径。
- [Agent Skills best practices](https://agentskills.io/skill-creation/best-practices)：保留 agent 缺少的程序性知识，采用适度细节、明确默认方案与工作示例，通过真实使用修订。
- [OpenAI Build skills](https://learn.chatgpt.com/docs/build-skills)：skill 的目录结构、渐进式披露和清晰范围。来源查阅于 2026-10-10。
- [Anthropic Skill authoring best practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices)：简短入口、条件明确的参考、确定性操作交给脚本。
- [CMU Eberly Center: Alignment](https://www.cmu.edu/teaching/assessment/basics/alignment.html)：学习目标、教学活动和评估任务保持一致。本指南据此要求解释、操作与迁移任务对应正文机制。
- [KaTeX API](https://katex.org/docs/api) 与 [Node usage](https://katex.org/docs/node.html)：构建时生成公式 HTML，提供 CSS 与字体，浏览器无需运行数学库。
- [Quarto HTML basics](https://quarto.org/docs/output-formats/html-basics.html#self-contained)：资源嵌入、自包含交付和章节导航的参考。本 skill 不依赖 Quarto。
- [MDN details](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/details) 与 [figure](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/figure)：参考解和图注使用原生语义结构。
- [W3C WCAG 2.2: Contrast minimum](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)：普通文字对比度基准为 4.5:1。模板采用清晰焦点与减少动态效果的规则；未经完整无障碍审查，不声称全面符合 WCAG。

## 原流程的保留与调整

教学与视频取材方法参考 [youtube-render-pdf](https://github.com/wdkns/wdkns-skills/tree/main/skills/youtube-render-pdf)，尤其保留多模态取材、字幕时间、密集候选、直接看图、完整揭示状态、公式符号说明、代码上下文与结尾综合。

调整为通用学习内容入口；视频规则只在视频任务加载；LaTeX 文档和 PDF 编译替换为语义 HTML、公式预渲染、资源内嵌及浏览器检查。图的页脚来源改为紧邻图注，重绘图和补充教学分别标注。

视觉方向参考用户提供的 PLSD_论文解读.html 中的宽幅开头、悬浮导航和机制演示。模板的颜色、排版、组件与脚本重新编写；未复制参考文件中的正文、图片或原脚本。

根据用户明确指定的 figure-designer 与 pre-submission-reviewer，进一步吸收图的解释任务、流程与系统布局、字体一致性、双重编码、自包含图注和最终尺寸检查。来源为 [HKUSTDial/Supervisor-Skills](https://github.com/HKUSTDial/Supervisor-Skills)，许可为 CC BY-NC-SA 4.0；此处按教学 HTML 场景重新表述。不迁移固定图数、图号、页数、字号阈值或整套投稿审查。

字体依据为 youtube-render-pdf 模板中的 fontset=fandol，并核对了 ctex 的 Fandol 字体映射。HTML 正文使用 FandolSong，标题和图示使用 FandolHei，中文代码使用 FandolFang；这是按网页中的文字职责做的适配。WOFF2 字体来自 Fandol v0.3，仅转换格式，许可与字体例外随包保存。

## 小范围改进方法

先完成一份真实材料，再记录实际遗漏、理解困难或执行浪费。只把可迁移的问题加入指南；实例知识留在教材。若模板或脚本可以解决重复问题，修改资源而非增加长指令。

这次的示例只验证构建、显示、交互和代码行为。未来使用课程录播时，仍需要检验字幕与图示覆盖，不能把示例通过写成全课程流程已验证。
