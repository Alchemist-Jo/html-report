const fs = require('node:fs');
const path = require('node:path');
const {execFileSync} = require('node:child_process');
const root = path.resolve(__dirname, '..');

module.exports = function embedFontCSS(text) {
  const definitions = fs.readFileSync(path.join(root, 'assets/lesson.css'), 'utf8')
    .split('\n').filter(line => line.startsWith('@font-face')).join('\n');
  const css = definitions.replace(/url\("skill:fonts\/([^"]+)"\)/g, (_, name) => {
    const contents = execFileSync(process.env.SKILL_HTML_PYTHON || 'python3', [
      path.join(root, 'scripts/subset-font.py'), path.join(root, 'assets/fonts', name)
    ], {input: text, maxBuffer: 64 * 1024 * 1024});
    return 'url(data:font/woff2;base64,' + contents.toString('base64') + ')';
  });
  const license = fs.readFileSync(path.join(root, 'assets/fonts/Fandol-COPYING.txt'), 'utf8').replaceAll('--', '- -');
  return {css, license};
};
