# html-report

将研究笔记、技术文档、概念、代码与系统、数据分析、方案比较、调研综述和论文讲清楚，输出可离线阅读的 HTML 报告。

正文使用少量主要章节与连贯段落，保留完整推导、证明条件和可复算例子。判断紧接具体依据，图解用于解释关系，交互用于探索变化。用户提供的写作规则原文保存在 `references/writing-requirements-original.md`，入口将其设为必读。

## 安装与使用

```sh
git clone https://github.com/Alchemist-Jo/html-report.git ~/.codex/skills/html-report
cd ~/.codex/skills/html-report
npm ci --ignore-scripts --no-audit --no-fund
npm run doctor
npm test
```

渲染器需要 Node.js 20+。安装后可调用 `$html-report`：

> 用 $html-report 把这些材料讲清楚，少分小节，按论证自然展开，保留完整推导、例子和证据，输出中文 HTML 报告。

Markdown 首行声明 `<!-- report-lang: zh-CN -->` 或 `<!-- report-lang: en -->`，正文使用一个 # 标题和按内容需要设置的 ## 章节。本地图片放在 Markdown 所在目录的子目录。

```sh
node scripts/render-report.cjs input.md output.html
```

页面内嵌 CSS、数学字体与本地图片。具体结构由内容决定，论文是支持的材料类型之一。

## 来源与许可

改编自 [paper-reading-skill](https://github.com/xiaofengShi/paper-reading-skill)，采用 [MIT 许可证](LICENSE)。
