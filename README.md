# html-report

An agent skill for clear, source-grounded HTML reports: technical explanations, research notes, concepts, code and systems, data analysis, comparisons, surveys, and paper readings.

Reports use a few main sections and connected prose. Mathematical derivations and proofs retain their intermediate steps, assumptions, and worked examples. Claims point to source material or explicit reasoning. Figures and interactions explain relationships without replacing the main argument.

## Install and use

Copy this repository into your agent's personal skills directory. For Codex:

```sh
git clone https://github.com/Alchemist-Jo/html-report.git ~/.codex/skills/html-report
cd ~/.codex/skills/html-report
npm ci --ignore-scripts --no-audit --no-fund
npm run doctor
npm test
```

Node.js 20 or newer is required for the bundled renderer. The skill can also author equivalent standalone HTML directly. Invoke `$html-report` with your source materials and the topic you want explained. Chinese is the default when no output language is specified.

> Use $html-report to explain these materials in a complete HTML report. Keep a few main sections, show the reasoning and worked examples, and connect conclusions to evidence.

The original Chinese writing requirements are preserved in `references/writing-requirements-original.md`. The entrypoint reads them alongside `references/technical-explanation.md`.

## Render a report

Start Markdown with `<!-- report-lang: zh-CN -->` or `<!-- report-lang: en -->`, then add one title and the main sections your content needs. Place local images in a subdirectory beside the Markdown source.

```sh
node scripts/render-report.cjs input.md output.html
```

The renderer embeds CSS, mathematical fonts, and local images in one offline-readable HTML file. It supports KaTeX formulas and optional structured visual blocks inherited from the upstream renderer. Plain Markdown is sufficient for ordinary reports.

## Source and license

Adapted from [Xiaofeng Shi's paper-reading-skill](https://github.com/xiaofengShi/paper-reading-skill) at commit `33a055f6124a8bb64bfe5a8be623d66fb32ed07a`, under the MIT license. The original copyright and license are retained in `LICENSE`; provenance is recorded in `UPSTREAM.json`. Upstream examples and their reading materials are retained as rendering fixtures, with their original source attribution. Upstream entrypoint and README snapshots are kept under `references/` for provenance.

This adaptation replaces the paper-specific default workflow with a general report workflow, adds the supplied writing rules, reduces subsection fragmentation, and adds generic report labels while retaining legacy rendering compatibility. Dependency sources are installed from the lockfile and are excluded from the repository.

The tests check rendering behavior. The accuracy of each generated report requires checking its source materials, calculations, and interpretation.
