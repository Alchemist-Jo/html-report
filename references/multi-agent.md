# Splitting a paper read across agents

Split a paper read when the paper runs past 30 pages including appendices and the host provides subagents, or when the user asks for parallel agents. A shorter paper stays with one reader, because the global map depends on holding the whole argument at once.

Split by responsibility, never by asking several agents to read the whole paper:

- The source reader reconstructs the global path, the method or argument, and the mechanisms, with page, section, figure and equation anchors.
- The experiment reader extracts each experiment's question, setup, comparator, metric, result and source table or figure, keeping full-system comparisons apart from controlled ablations.
- When appendices hold proofs, training details or extra experiments that the main text depends on, an appendix reader covers them under the same contract.
- After the draft exists, a verifier checks every anchor, number and quoted equation against the paper.

Each agent returns the contract in SKILL.md under "Long Material": its scope, core claims with anchors, formulas verbatim, figure and table candidates with their inspection status, numbers with their source, terms as the paper writes them, and open conflicts. The main agent writes the one reading atlas, unifies notation, and opens every figure it keeps.

A reviewer role exists only under the REVIEW lens. A diagram is drawn by an agent that has read the source passages it depicts.
