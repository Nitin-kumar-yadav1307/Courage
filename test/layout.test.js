const { tokenize } = require('../src/html-tokenizer');
const { buildDOM } = require('../src/dom-builder');
const { tokenizeCSS } = require('../src/css-tokenizer');
const { parseCSS } = require('../src/css-parser');
const { styleMatcher } = require('../src/style-matcher');
const { calculateLayout } = require('../src/layout');

const html = '<html><body><h1>Hello</h1><p>World</p></body></html>';
const css = 'body { width: 60vw; margin: 15vh auto; }';

const dom = buildDOM(tokenize(html));
const rules = parseCSS(tokenizeCSS(css));
styleMatcher(dom, rules);
calculateLayout(dom, 800, 0);

const body = dom.children[0].children[0];
const h1 = dom.children[0].children[0].children[0];
const p = dom.children[0].children[0].children[1];

console.log('body layout:', body.layout);
console.log('h1 layout:', h1.layout);
console.log('p layout:', p.layout);

console.log('\n--- Tests ---');
console.log(body.layout.width === 480          ? '✅ body width 60vw = 480px'  : '❌ body width');
console.log(body.layout.x === 160              ? '✅ body centered x=160'      : '❌ body x');
console.log(body.layout.y === 90               ? '✅ body margin-top 15vh=90'  : '❌ body y');
console.log(h1.layout.y === 90                 ? '✅ h1 starts at body y'      : '❌ h1 y');