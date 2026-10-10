# html-report 3.0

This repository retains the html-report identity and its existing Markdown report renderer. The learning-html acquisition, teaching, design, animation and standalone HTML resources are merged into the same skill entrypoint. Version 3.0 rewrites SKILL.md as a staged agent workflow, adds the paper deep-read route from the upstream paper-reading skill as references/paper-deep-read.md, and replaces the design notes with references/visual-design.md and the rendered audit in scripts/render-audit.mjs.

The generic report remains suitable for technical explanations, research notes, code, data, comparisons and papers. Course and learning tasks additionally use worked examples, practical variations and reasoned solutions.

The source workflow is informed by youtube-render-pdf. Its metadata, timed-subtitle, keyframe-inspection, long-input and synthesis standards remain intact while HTML replaces PDF-specific layout requirements. See references/agent-workflow.md and references/video-learning.md.

User writing requirements are kept in references/writing-requirements-original.md. The original upstream report renderer and provenance are retained in UPSTREAM.json and the relevant references. Original code is under MIT; font and adapted reference notices are preserved in THIRD_PARTY_NOTICES.md.

Use SKILL.md as the entrypoint. Install declared build dependencies once; references load conditionally. Generated artifacts are offline-readable, while build tests, example calculations, isolated DOM tests, the rendered audit and direct screenshot inspection retain their distinct meanings.
