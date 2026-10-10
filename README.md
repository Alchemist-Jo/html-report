# html-report

[English](README.md) · [简体中文](README.zh-CN.md)

An agent skill that explains one body of material as one offline HTML file. The material can be an academic paper, a video or lecture series, a document, a code base, a dataset or a comparison. The reader should be able to follow the page, recompute its worked example and find the source behind each claim without opening the original.

## What the agent does

[SKILL.md](SKILL.md) is a staged guide for a long-running agent:

1. Acquire the source with a fixed fallback order: metadata and subtitles before a video download, original figure files before PDF crops, official copies before transcripts.
2. Keep four ledgers: coverage, evidence, figures and design. Labels stay neutral until verified, so a frame gets a semantic name only after it has been viewed.
3. Split long material at stated thresholds (a video longer than 20 minutes or with more than 300 subtitle entries, a paper longer than 30 pages, a series of lectures) and run segments in parallel subagents under a fixed return contract.
4. Write a teaching sequence: problem, core idea, mechanism, example or evidence, and what to retain. Formulas come with their purpose and symbol lists. Learning pages add worked examples, practice and reasoned answers.
5. Choose figures by recall before precision and decide what a frame shows only from viewing it.
6. Build, then inspect the rendered page at 1440 and 390px and repair what fails.

## Routes

| Material | Route |
| --- | --- |
| One paper | A Markdown audit source rendered into a reading atlas with `scripts/render-reading.cjs`, following [paper deep read](references/paper-deep-read.md) |
| A video, course or series | An HTML lesson built with `scripts/build-html.mjs`, following [video acquisition](references/video-learning.md) |
| A document, code, data or comparison | The HTML lesson or the Markdown report route |

A field or course textbook with prerequisites, exercises and review rounds belongs to [textbook-anything](https://github.com/Alchemist-Jo/textbook-anything). Both skills share the lesson theme, the builder and the rendered audit.

## Visual design and the rendered audit

[Visual design](references/visual-design.md) fixes the type scale at six sizes per width, the reading column at 648px for Chinese and 576px for English, figure labels at 12px or more on a 390px screen, WCAG AA contrast, and one accent hue with one caution hue. `scripts/render-audit.mjs` checks these on the rendered page:

~~~sh
node scripts/render-audit.mjs docs/learning-example.html --widths 1440,390 --out build/audit --print
~~~

It sets true viewport widths through the DevTools protocol, saves screenshot tiles and an overview for each width, and reports page overflow, the rendered type scale, text below 12px, contrast measured against the pixels behind the text, overlapping or clipped figure labels, broken or enlarged images, raw Markdown or TeX, and internal links without a target. It needs Node 22 or later and a local Chrome or Chromium. The agent then opens every tile, because the script does not measure alignment, spacing or figure crops.

## Install and use

~~~sh
npx skills add Alchemist-Jo/html-report --skill html-report -g
~~~

~~~text
Use $html-report to deep-read this paper as one offline HTML page.
~~~

~~~text
Use $html-report to turn this lecture into Chinese learning material with
worked examples, practice and reasoned answers. Keep source times next to figures.
~~~

## Build

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

Building needs Node 20+ and Python 3.10+, and the audit needs Node 22+. The resulting HTML opens without those tools or a network connection. If using a separate Python environment, set SKILL_HTML_PYTHON to its executable.

[Worked interactive example](docs/learning-example.html) · [Editable source](examples/retries.source.html) · [Paper reading example](docs/attention-is-all-you-need-deep-read.html)

## Sources and license

The paper renderer and deep-read route are adapted from [paper-reading-skill](https://github.com/xiaofengShi/paper-reading-skill). The staged agent workflow is informed by [youtube-render-pdf](https://github.com/wdkns/wdkns-skills/tree/main/skills/youtube-render-pdf). See [LICENSE](LICENSE), [third-party notices](THIRD_PARTY_NOTICES.md) and [method sources](references/html-basis.md).
