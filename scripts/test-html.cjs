const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const {execFileSync} = require('node:child_process');
const vm = require('node:vm');
const makeDOM = require('./dom-test.cjs');
const root = path.resolve(__dirname, '..');

function example() {
  return makeDOM(path.join(root, 'examples/retries.source.html'), [
    path.join(root, 'examples/retry-model.js'), path.join(root, 'examples/retry-demo.js')
  ]);
}
test('retry controls synchronize state, comparison, pause, parameter reset and replay', () => {
  const page = example(), get = id => page.document.getElementById(id);
  assert.match(get('state').textContent, /累计金额：0/);
  page.click('play');
  assert.match(get('state').textContent, /累计金额：10；本次返回：10/);
  page.advanceTimer();
  assert.equal(get('without-value').textContent, '20');
  assert.equal(get('with-value').textContent, '10');
  page.click('play');
  assert.equal(page.timers.size, 0);
  assert.equal(get('play').getAttribute('aria-pressed'), 'false');
  page.input('amount', 25);
  assert.match(get('state').textContent, /累计金额：0/);
  for (let i = 0; i < 4; i++) page.click('next');
  assert.match(get('state').textContent, /累计金额：50；本次返回：25/);
  assert.equal(get('without-bar').style.width, '100%');
  assert.equal(get('with-bar').style.width, '50%');
  assert.equal(get('next').disabled, true);
  page.click('play');
  assert.match(get('state').textContent, /累计金额：25；本次返回：25/);
  page.observers[0]([{isIntersecting: false}]);
  assert.equal(page.timers.size, 0);
  page.click('reset');
  assert.match(get('state').textContent, /累计金额：0/);
});
test('all four stages are directly inspectable without starting playback', () => {
  const page = example();
  const buttons = [...page.document.querySelectorAll('.trace-step')];
  buttons[3].dispatchEvent(new page.context.window.Event('click'));
  assert.match(page.document.getElementById('state').textContent, /累计金额：20；本次返回：10/);
  assert.equal(page.timers.size, 0);
});
test('compact source references open their source disclosure', () => {
  const page = example();
  page.document.querySelectorAll('main section').forEach(node => {
    node.getBoundingClientRect = () => ({top: 300});
  });
  vm.runInContext(fs.readFileSync(path.join(root, 'assets/lesson.js'), 'utf8'), page.context);
  const source = page.document.querySelector('a.source-ref');
  Object.defineProperty(source, 'hash', {value: source.getAttribute('href')});
  source.dispatchEvent(new page.context.window.Event('click'));
  assert.equal(page.document.querySelector('details.references').open, true);
});
test('the native HTML route embeds fonts, math, scripts and source anchors', () => {
  const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'html-report-native-'));
  try {
    const output = path.join(temporary, 'lesson.html');
    execFileSync(process.execPath, [path.join(root, 'scripts/build-html.mjs'), path.join(root, 'examples/retries.source.html'), output]);
    const html = fs.readFileSync(output, 'utf8');
    assert.match(html, /data:font\/woff2;base64,/);
    assert.match(html, /class="katex"/);
    assert.match(html, /id="ref-aws"/);
    assert.match(html, /function retryState/);
    assert.doesNotMatch(html, /<script[^>]+src=/);
    assert.doesNotMatch(html, /data-template|data-tex=/);
  } finally { fs.rmSync(temporary, {recursive: true, force: true}); }
});
