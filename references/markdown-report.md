# Markdown 报告

保留既有报告渲染路径，适用于连续正文、公式、本地图片和原有结构化图表。富交互学习页使用 HTML 制作路径。

首行声明语言，可选主题：

~~~markdown
<!-- report-lang: zh-CN -->
<!-- paper-reading-theme: cobalt -->
# 实际报告标题

## 主要问题

正文按论证展开。

$$x_{t+1}=x_t+1$$
~~~

~~~sh
node scripts/render-report.cjs input.md output.html
~~~

支持 zh-CN 和 en，以及 cobalt、forest、plum、saffron 主题。本地图片放在 Markdown 所在目录的子目录。已有 paper-reading 标记、结构化图表和原始示例继续由 scripts/render-reading.cjs 处理。

新任务仍遵循主入口中的取材、完整推导、图文一致性与交付要求，不强制使用上游论文结构。
