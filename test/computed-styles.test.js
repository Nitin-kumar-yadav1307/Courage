const { tokenize } = require('../src/html-tokenizer');
const { buildDOM } = require('../src/dom-builder');
const { tokenizeCSS } = require('../src/css-tokenizer');
const { parseCSS } = require('../src/css-parser');
const { styleMatcher } = require('../src/style-matcher');
const { getComputedStyle } = require('../src/computed-styles');
const { querySelector } = require('../src/querySelector');

const html = '<html><body><h1>Hello</h1><p>World</p></body></html>';
const css = 'h1 { color: red; font-size: 16px; } body { background: #eee; }';

const dom = buildDOM(tokenize(html));
const rules = parseCSS(tokenizeCSS(css));
styleMatcher(dom, rules);

const h1 = querySelector(dom, 'h1');
const p = querySelector(dom, 'p');
const body = querySelector(dom, 'body');

console.log('h1 computed styles:', getComputedStyle(h1));
console.log('p computed styles:', getComputedStyle(p));
console.log('body computed styles:', getComputedStyle(body));

console.log('\n--- Tests ---');
console.log(getComputedStyle(h1)['color'] === 'red'          ? '✅ h1 color: red'        : '❌ h1 color: red');
console.log(getComputedStyle(h1)['font-size'] === '16px'     ? '✅ h1 font-size: 16px'   : '❌ h1 font-size: 16px');
console.log(getComputedStyle(body)['background'] === '#eee'  ? '✅ body background: #eee' : '❌ body background');
console.log(JSON.stringify(getComputedStyle(p)) === '{}'     ? '✅ p has no styles'      : '❌ p has no styles');