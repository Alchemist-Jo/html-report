# 源码与构建

准备 HTML 源码、构建和交付时读取。模板与构建器只处理排版和资源，教学判断仍由 agent 完成。

## 最短流程

1. 将 assets/lesson-template.html 复制为输出目录中的 lesson.source.html。
2. 填写标题、导语、元信息、正文与主题图，删除 body 上的 data-template。保持一个 h1。
3. 用少量带唯一 id 的 section 和 h2 组织主章节。data-toc 所在导航由构建器填充。
4. 在 skill 目录安装一次锁定依赖，再调用 scripts/build-html.mjs。相对路径以源码文件目录为基准。

~~~sh
cd /path/to/html-report
npm ci --ignore-scripts --no-audit --no-fund
python3 -m pip install -r requirements-html.txt
node scripts/build-html.mjs /path/to/lesson.source.html /path/to/学习资料.html
~~~

只需执行模板和脚本，不需要读取整个构建器、CSS 或依赖源码。需要组件例子时定位 examples/retries.source.html 中的对应区域。

## 可用组件

assets/lesson-template.html 的导航、开头、正文和页脚均为真实 HTML。替换示例文字，主内容写入 main。以下片段可直接使用：

~~~html
<section id="mechanism">
  <div class="section-label">01 / 机制</div>
  <h2>说明本章解决的问题</h2>
  <p>连续解释放在普通段落，交代条件与中间步骤。</p>
  <div class="math" data-tex="y = f(x)" data-display="true"></div>
  <ul class="symbols">
    <li><var>x</var>：输入，继续说明其范围或单位。</li>
    <li><var>f</var>：本处使用的变换。</li>
    <li><var>y</var>：输出。</li>
  </ul>
  <aside class="callout important">
    <strong>核心结论</strong><p>写出有条件、可解释的结论。</p>
  </aside>
  <figure>
    <img src="assets/frame-001.jpg" alt="准确描述画面中的必要内容">
    <figcaption>图 1。说明图的作用，附讲次、时间区间与来源链接。</figcaption>
  </figure>
  <div class="code-block">
    <div class="code-caption">示例 1 / Python，说明代码作用</div>
    <pre><code class="language-python">print("example")</code></pre>
  </div>
  <div class="exercise">
    <div class="section-label">练习 / 修改条件</div>
    <h3>写明具体任务</h3>
    <p>给出初始条件、操作与可观察结果。</p>
    <details><summary>查看参考解</summary>
      <div class="answer"><p>解释推理，再给结果与验证方法。</p></div>
    </details>
  </div>
</section>
~~~

HTML 属性里的 LaTeX 反斜杠不需要加倍。属性值中的双引号、& 和尖括号按 HTML 转义。数学通过 data-tex 明确标记，构建器不猜测普通文本中的美元符号。

新增图示使用内联 SVG，带 viewBox、title 和必要说明。演示区可用 diagram-panel，双列比较可用 compare-grid，条件标签可用 pill。长表格外包 table-scroll。

正文引用可用 source-ref 链接到文末来源条目的 id。文末用 details.references 与 reference-list 组织来源，点击正文引用时会展开来源区。图注和视频时间不放入折叠来源列表。

机制动画先读 references/animation.md。示例把状态计算和播放分开，分别位于 examples/retry-model.js 与 examples/retry-demo.js；源码用普通本地 script 引用，构建器会内嵌。按内容保留必要控件，避免为了使用组件而增加动画。

## 离线资源

保留模板中的 skill:lesson.css 与 skill:lesson.js。构建器从 skill 的 assets 读取它们；其他本地 CSS、脚本和图片从源码目录读取。构建时全部嵌入结果 HTML。

图片支持 PNG、JPEG、WebP、GIF、SVG。内联 SVG 可直接写入源码。先将需要的远程图片下载到本地；构建器不自动联网取材。不要使用外部 iframe、在线字体或 CDN 作为阅读必需资源。

公式在 Node 中用 KaTeX 预渲染，构建器嵌入其样式和 WOFF2 字体。浏览器不加载数学库。普通外部参考链接保留，点击这些链接需要网络。

Fandol 中文字体随 skill 提供。构建器使用 Python fontTools 按教材字符生成字体子集，再嵌入 HTML，避免每份文档都携带完整中文字库。正文、SVG 与交互脚本中的文字一起纳入字符范围。运行环境需要 Python 3 和 requirements-html.txt 中的依赖，生成文件的读者无需安装它们。

Python 依赖应安装在构建时使用的同一环境。使用虚拟环境时可通过 SKILL_HTML_PYTHON 指定其 Python 可执行文件。

完整练习代码另存文件，并在交付时一起提供。源码可以链接相邻的代码文件，分享时一起打包。大视频、缓存和 node_modules 不放进学习资料 ZIP。

## 验证与完成

构建器会拒绝未填模板、重复 id、无效内部锚点、缺失或远程必需资源、未渲染公式。公式语法有误时显示原公式和具体错误，不输出不完整成品。

构建成功后用浏览器打开结果，检查设计指南列出的可见问题。运行示例代码，确认正文中的输出与实际一致。静态构建通过不能代替浏览器检查，也不能证明内容或读者掌握程度正确。

交付建议包括学习资料.html、lesson.source.html、必要练习与来源说明。优先给用户可直接打开的 HTML。模板只是起点，不必把其全部组件都放进每一份教材。
