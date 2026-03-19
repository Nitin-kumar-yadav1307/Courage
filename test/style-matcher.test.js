const { tokenizeCSS } = require('../src/css-tokenizer');
const { parseCSS } = require('../src/css-parser');
const { styleMatcher } = require('../src/style-matcher');
const { tokenize } = require('../src/html-tokenizer');
const { buildDOM } = require('../src/dom-builder');

const html = '<html><body><h1>Hello</h1><p>World</p></body></html>';
const css = 'h1 { color: red; font-size: 16px; } body { background: #eee; }';

const dom = buildDOM(tokenize(html));
const rules = parseCSS(tokenizeCSS(css));

styleMatcher(dom, rules);

const h1 = dom.children[0].children[0].children[0];
const body = dom.children[0].children[0];

console.log('h1 styles:', h1.styles);
console.log('body styles:', body.styles);

console.log('\n--- Tests ---');
console.log(h1.styles?.color === 'red'          ? '✅ h1 color: red'        : '❌ h1 color: red');
console.log(h1.styles?.['font-size'] === '16px' ? '✅ h1 font-size: 16px'   : '❌ h1 font-size: 16px');
console.log(body.styles?.background === '#eee'  ? '✅ body background: #eee' : '❌ body background: #eee');