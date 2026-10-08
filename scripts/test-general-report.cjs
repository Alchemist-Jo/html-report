const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { execFileSync } = require('node:child_process');

test('general reports render both languages without paper branding, including a heading-free body', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'general-report-'));
  try {
    for (const lang of ['zh-CN', 'en']) {
      const input = path.join(dir, 'input.md');
      const output = path.join(dir, 'output.html');
      fs.writeFileSync(input, `<!-- report-lang: ${lang} -->
# ${lang === 'zh-CN' ? '系统状态更新' : 'State updates'}

State transition:

$$x_{t+1}=x_t+1$$

An increment maps state 2 to state 3.
`);
      execFileSync(process.execPath, [path.join(__dirname, 'render-report.cjs'), input, output]);
      const html = fs.readFileSync(output, 'utf8');
      assert.ok(html.includes(`<html lang="${lang}">`));
      assert.ok(html.includes('HTML / REPORT'));
      assert.ok(html.includes('class="katex"'));
      assert.ok(html.includes('href="#content"'));
      assert.doesNotMatch(html, /PAPER \/ READING|Paper Reading Skill|论文深读|DEEP READING ATLAS|href="#section-1"/);
      assert.doesNotMatch(html, /src="https?:|url\(fonts\//);
    }
  } finally { fs.rmSync(dir, { recursive: true, force: true }); }
});
