---
name: html-report
description: Explains one body of material (a paper, a video or lecture series, a document, code, data or a comparison) as one self-contained offline HTML report or lesson. Runs a staged agent workflow with source fallbacks, ledgers, parallel segment subagents for long inputs, a fixed type scale, and a rendered audit at 1440 and 390px with direct screenshot inspection. Use when the user asks to deep-read a paper as a web page, turn a video, course, document, code or data into an HTML explanation or learning page, build an interactive explainer, or fix the layout, fonts, contrast or figures of such a page. Not for a field textbook with prerequisites, exercises and review rounds (textbook-anything), LaTeX notes from a YouTube or Bilibili URL (youtube-render-pdf, bilibili-render-pdf), paper slides (paper-to-html, topic-paper-talk), or project progress reports (research-report). 触发词：论文精读、读论文做成网页、HTML 报告、学习资料、视频讲解、交互讲解、代码讲解、数据报告、网页排版、配色、对比度。
license: MIT
metadata:
  version: "3.0.0"
---

# HTML Report

Use this skill to turn one body of material into one offline HTML file that a reader can follow, check and apply without opening the source. The material can be a paper, a video or a lecture series, a document, a code base, a dataset or a comparison. A learning request adds worked examples, practice and reasoned answers.

## Goal

The deliverable is one self-contained HTML file with its editable source. The file must:

- explain the material's actual content: the problem, the mechanism, the evidence and the conditions under which the conclusions hold
- reorganise the material into a teaching order instead of mirroring its original order
- open offline as a single file, with fonts, formulas, images and scripts embedded
- read as one document even when segments were drafted separately
- place every figure next to the paragraph that uses it, with its source page, figure number or video time visible
- keep every source number verbatim, and label teaching calculations, simulations, redraws and the writer's inference as such
- follow one type scale, one reading column and stated colour roles ([visual design](references/visual-design.md))
- pass `scripts/render-audit.mjs` at 1440 and 390px, with every screenshot tile opened and inspected
- for learning material, contain a worked example, guided practice and an independent variation, each with a reasoned answer
- end with a synthesis that connects the mechanisms and evidence and states their scope

Write in the language of the user's request. Chinese requests get Chinese pages.

## Reader Standard

The reader is a careful peer studying alone. After reading, that reader can explain the main mechanism in their own words, recompute the worked example, and find the source location behind each important claim. Each section moves from motivation to the core idea, then the mechanism, then an example or evidence, then what to retain. Formalism arrives after the plain-language intuition, and every symbol is explained where it appears.

The page should look designed by one person for this material. One reading column, six text sizes, colour with a stable meaning, and figures whose labels are readable on a phone are part of comprehension.

## Routes

Choose the route from the material, then load only the references it names.

| Material | Route | References |
| --- | --- | --- |
| One academic paper | Markdown audit source, built with `scripts/render-reading.cjs` into a reading atlas | [paper deep read](references/paper-deep-read.md), [paper types](references/paper-types.md), [visual reading](references/visual-reading.md), [reading quality gates](evals/reading-quality.md) |
| A paper read with a review or research lens | The paper route plus the lens | [reading modes](references/reading-modes.md), [critique matrix](references/critique-matrix.md), [research card](references/research-card.md), [evidence state](references/evidence-state.md) |
| A video, course or series | HTML lesson source, built with `scripts/build-html.mjs` | [video acquisition](references/video-learning.md), [learning design](references/learning.md) |
| A document, code base, dataset or comparison | HTML lesson source or the Markdown report route | [technical explanation](references/technical-explanation.md), [Markdown report](references/markdown-report.md) |
| Any route | Writing, design, interaction and build | [writing requirements](references/writing-requirements-original.md), [visual design](references/visual-design.md), [animation](references/animation.md), [HTML authoring](references/html-authoring.md) |

Read the writing requirements before the first draft. [Workflow detail](references/agent-workflow.md) covers branching cases, and [method basis](references/html-basis.md) explains why the guide is built this way; neither is needed for routine work.

## Acquire the Source

1. Open the actual input and establish its identity: title, author, version or date, length. For a paper, count pages including appendices and locate the figure sources. For a video, read the metadata first: title, duration, chapters, cover, subtitle tracks and downloadable formats. For code, find the entry point and one real input. For data, establish units, denominators, missing values and comparison conditions.
2. Prefer the best usable source. Manual subtitles come before automatic ones. Use the highest resolution that actually downloads. Original figure files, such as an arXiv source archive, come before crops from the PDF, and PDF crops come before screenshots.
3. Keep working artifacts local in one work directory: metadata, the cover, timed subtitles, candidate frames, figure assets and notes.
4. When access fails, try in order: the official page or repository, a copy the user supplied, an available transcript or audio transcription. A third-party summary never stands in for the source. Record what stays unread as a gap.

Ask the user only about a decision that changes the deliverable and cannot be found in the environment.

## Build the Ledgers

Keep four short ledgers in the work directory. They stay out of the reader's page.

- Coverage: each section, chapter or time window, its concepts, and a status of unread, read, drafted or checked.
- Evidence: each claim or number, its source location (page, section, figure, table, equation or timestamp), and its kind: source statement, observed result, teaching calculation or inference.
- Figures: each candidate under a neutral name such as `t00-12-42.png` or `p07-fig3.png`, whether it was opened, the decision, the semantic name given after inspection, and its time or page.
- Design: the measure, the six sizes, the colour roles and the widths to inspect, as set out in [visual design](references/visual-design.md).

Labels stay neutral until verified. A raw frame keeps its timestamp name until it has been viewed. A claim stays marked unverified until it has been checked against the source. A check is recorded as done only after its output has been read.

## Long Material

Split the work when any threshold is crossed:

- a video longer than 20 minutes, or a subtitle file with more than 300 entries
- a paper longer than 30 pages including appendices
- a series of two or more lectures, with one segment per lecture and further splits inside a lecture that crosses the video threshold
- a code path that crosses more than ten source files

Split at chapter, section or lecture boundaries. When those are missing or uneven, split by coherent concepts or time windows. Keep a small overlap where an explanation crosses a boundary: about 30 seconds of video, or one paragraph of text. For papers, split by responsibility as described in [multi-agent](references/multi-agent.md).

When subagents are available, run the segments in parallel. Give each subagent its exact boundary, the shared terms and notation, and the ledger formats. Each subagent returns:

- the segment's teaching goal and its core claims, each with a source location
- formulas and code verbatim, with the symbols they use
- figure candidates with their time or page, marked opened or not opened
- every number it will cite, with its source location
- terms as the source writes them
- ambiguities, conflicts between sources, and gaps it could not close

The main agent integrates the returns into one outline and one narrative. It unifies terms and notation, removes overlap, fills missing prerequisites, and opens every figure it keeps. A subagent's report of success is not acceptance. The final page must read as one document, never as a sequence of segment summaries. Without subagents, process the segments in order under the same contract.

## Write the Explanation

Organise each major section as problem, why the simple view fails, core idea, mechanism, example or evidence, and what to retain. Reconstruct the teaching order. Skip greetings, sponsorship, logistics and routine back-and-forth. Keep a speaker's closing discussion when it carries synthesis, limitations, trade-offs or open questions.

When a formula appears, say in plain language what it expresses and why it appears, show it as display math, then explain every symbol in a list. When code appears, state its role before the listing and its expected behaviour after it. Preserve source numbers exactly, and mark every teaching calculation.

Callouts carry three signals: a core claim, background the reader needs, and a common misunderstanding. A short quoted exchange from an interview or talk is kept only when the wording itself teaches, with speaker and time, followed by an explanation of why it matters.

For learning material, move from a complete worked example to guided practice and then an independent variation with a changed condition. Each answer gives the reasoning, the result and a way to check it. [Learning design](references/learning.md) has the exercise forms.

End with a synthesis section that connects the mechanisms, states what the evidence supports and where it stops, and gives concrete next steps when the material supports them.

## Figures and Interaction

Choose figures by necessity. Include every figure that materially improves the explanation, and omit repetitive frames.

Bias the search for frames toward recall before precision. For each concept, generate dense candidates across its subtitle-aligned interval and slightly beyond it, use contact sheets to locate them, then open the best candidates individually in the image viewer. Decide what a frame shows only from viewing it, never from its filename, the nearby subtitles or OCR. For progressive slides, animations and whiteboards, keep searching until the final, fully populated, readable state appears. Crop to the region the text discusses.

Redraw a relationship that a screenshot shows poorly. Use inline SVG for diagrams and a plotting library for data, and label every redraw with its source. Original paper figures appear with a visible reading cue before them that names the panel and the point to notice.

Use interaction only when the reader changes or follows something that reveals a relationship: a parameter, a branch, a state across stages. Interaction starts from a user action, can pause, step and reset, and the page still teaches the same relationship with scripts disabled. [Animation](references/animation.md) gives the state model.

## Visual Design

[Visual design](references/visual-design.md) holds the rules and the shipped values. The invariants that most often fail:

- six text sizes per width at most, taken from the scale variables
- one reading column: 648px for Chinese, 576px for English, with figures and tables on the same edges
- figure labels at least 12px when rendered at 390px; the repair order is enlarge, reflow, local scroll, split
- WCAG AA contrast measured against the pixels behind the text
- one accent hue and one caution hue, each with one meaning, and a second encoding for every colour difference
- cards only for parallel items, stages and exercises; decoration only in the opening background
- headings that state their content and never take the form of a question

When the user supplies a reference design, follow its look and keep these invariants inside it.

## Build

Install the locked dependencies once inside the skill directory, then build:

~~~sh
cd /path/to/html-report
npm ci --ignore-scripts --no-audit --no-fund
python3 -m pip install -r requirements-html.txt
node scripts/build-html.mjs /path/to/lesson.source.html /path/to/讲解.html
node scripts/render-reading.cjs /path/to/paper.md /path/to/论文深读.html
node scripts/render-report.cjs /path/to/report.md /path/to/报告.html
~~~

The lesson route starts from `assets/lesson-template.html`. Delete `data-template` from the body, mark formulas with `data-tex`, and keep one `h1`. `examples/retries.source.html` shows every component. The builder embeds fonts as subsets, pre-renders formulas, and inlines styles, scripts and images. Read only the template and the component you need, never the whole builder.

## Inspect and Repair

A successful build proves only that a file was written. Inspect the rendered page:

1. Run `node scripts/render-audit.mjs page.html --widths 1440,390 --out audit/`, adding `--print` when print is delivered. It needs Node 22 or later and a local Chrome or Chromium.
2. Read its report. Exit status 1 means a measured defect, and each hit names its selector and screenshot tile.
3. Open every tile and both overviews with the image viewer. Look for what the script cannot measure: column alignment, stranded characters, competing emphasis, figure crops, uneven spacing, and text inside raster images.
4. Open the print PDF pages when print is delivered.
5. Check content against the ledgers: every segment checked, every kept figure opened, every number traced, every exercise solved.
6. Repair each defect at its source, rebuild, rerun the audit, and reopen the affected tiles. Settled tiles are not rechecked.

| Invariant | Threshold | Checked by |
| --- | --- | --- |
| Sideways page scroll | none at 390 and 1440 | audit |
| Text sizes per width | 6 at most | audit |
| Smallest text, figures included | 12px | audit, tiles for raster text |
| Text contrast | 4.5:1, or 3:1 at 24px or 18.66px bold | audit |
| Figure labels | no overlap, nothing past the figure edge | audit and tiles |
| Images | none broken, none enlarged past natural width | audit |
| Visible text | no raw Markdown or TeX | audit |
| Internal links | every target exists | audit |
| Coverage | every ledger row checked | coverage ledger |
| Evidence | every number has a source location | evidence ledger |
| Figures | every kept figure opened before naming | figure ledger |

## When Something Fails

Apply the first fallback that works:

- Source access: official page or repository, user copy, transcript or audio transcription, then a recorded gap.
- A figure that fails at 390: enlarge labels, reflow, scroll inside the figure with a `min-width`, split into several figures.
- No browser for rendering: run the build and the logic tests, then state that rendered inspection was not done and which checks remain.
- A blocked tool or policy: use a permitted alternative or report the block. Never route around it.

These moves are never allowed:

- describing a frame or figure that was not opened
- giving a semantic name to an uninspected frame
- citing a number without a source location
- text below 12px, or deleting labels to make a figure fit
- reporting a rendered check that was not viewed
- presenting a third-party summary as inspection of the source
- delivering concatenated segment summaries as the final page

## Final Checklist

- No important teaching content was dropped, and no concrete but critical detail was lost in condensing or restructuring.
- Every figure supports its paragraph, shows the fullest relevant state, and carries its time or source location.
- The page is visually rich enough to teach. More frames or redrawn diagrams were considered where a paragraph still carries a visual idea alone.
- Every formula has its plain-language purpose and symbol list. Every code listing has its role and behaviour.
- Source statements, observed results, teaching calculations and inference are distinguishable.
- Learning material has a worked example, guided practice and an independent variation with reasoned answers.
- The audit passes at both widths, and every tile was opened.
- The file opens offline as one file.

## Delivery

Discussion with the user is in Chinese unless they write in another language.

Deliver:

- the HTML file, named in the reader's language after the material's title
- the editable source (`.source.html` or `.md`) and the local assets it references
- the cover image and the selected frames or figure assets
- the audit report and the screenshot directory
- a short note listing what was checked, by which method, and every gap that remains open
