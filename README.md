# html-report

[English](README.md) · [简体中文](README.zh-CN.md)

An agent workflow for source-grounded reports and learning materials. It acquires the actual input, organizes long material, explains mechanisms and evidence, builds purposeful visuals and interactions, checks examples and repairs the delivered artifact.

The learning-html workflow is merged into this repository. Reports, course notes, code explanations, data analysis and paper readings share the same acquisition and delivery standard. Learning tasks add worked examples, practice and reasoned solutions.

## Install and use

~~~sh
npx skills add Alchemist-Jo/html-report --skill html-report -g
~~~

Invoke $html-report with the source and the outcome you need. Chinese is the default; an explicit language and format take precedence. The skill uses a short entrypoint and conditional references, with no required companion skill.

~~~text
Use $html-report to turn this course into independent learning material.
Explain the mechanisms, preserve useful figures and source times, and include
worked examples, practical variations and reasoned answers. Deliver HTML.
~~~

## Build a reading artifact

The native HTML route provides Fandol fonts, pre-rendered math, an offline layout, compact source notes, code copying and purposeful interactions.

~~~sh
npm ci --ignore-scripts --no-audit --no-fund
python3 -m venv .venv
source .venv/bin/activate
python3 -m pip install -r requirements-html.txt
node scripts/build-html.mjs examples/retries.source.html docs/learning-example.html
~~~

Node 20+ and Python 3.10+ are needed to build; the resulting HTML opens without those tools or a network connection. If using a separate Python environment, set SKILL_HTML_PYTHON to its executable.

[Worked interactive example](docs/learning-example.html) · [Editable source](examples/retries.source.html) · [Agent workflow](references/agent-workflow.md)

Existing report Markdown and structured charts remain available:

~~~sh
node scripts/render-report.cjs input.md output.html
npm test
npm run doctor
~~~

Use a first-line report-lang marker as documented in [Markdown reports](references/markdown-report.md). Calculation and isolated DOM tests check behavior; visual inspection establishes the final appearance.

## Sources and license

The report renderer is adapted from [paper-reading-skill](https://github.com/xiaofengShi/paper-reading-skill); the procedural teaching workflow is informed by [youtube-render-pdf](https://github.com/wdkns/wdkns-skills/tree/main/skills/youtube-render-pdf). See [LICENSE](LICENSE), [third-party notices](THIRD_PARTY_NOTICES.md) and [method sources](references/html-basis.md).
