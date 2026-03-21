const { tokenize } = require('../src/html-tokenizer');
const { buildDOM } = require('../src/dom-builder');
const { tokenizeCSS } = require('../src/css-tokenizer');
const { parseCSS } = require('../src/css-parser');
const { styleMatcher } = require('../src/style-matcher');
const { calculateLayout } = require('../src/layout');

const html = '<html><body><div><h1>Hello</h1><p>World</p></div></body></html>';
const css = 'body { width: 60vw; } div { width: 100px; }';

const dom = buildDOM(tokenize(html));
const rules = parseCSS(tokenizeCSS(css));
styleMatcher(dom, rules);
calculateLayout(dom, 800, 0);

const body = dom.children[0].children[0];
const div = dom.children[0].children[0].children[0];
const h1 = dom.children[0].children[0].children[0].children[0];

console.log('body layout:', body.layout);
console.log('div layout:', div.layout);
console.log('h1 layout:', h1.layout);

console.log('\n--- Tests ---');
console.log(body.layout.width === 480  ? '✅ body width 60vw = 480px' : '❌ body width');
console.log(div.layout.width === 100   ? '✅ div width 100px'         : '❌ div width');
console.log(h1.layout.width === 800    ? '✅ h1 inherits parentWidth' : '❌ h1 width');