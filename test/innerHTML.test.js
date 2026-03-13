const { tokenize } = require('../src/html-tokenizer');
const { buildDOM } = require('../src/dom-builder');
const { querySelector } = require('../src/querySelector');
const { innerHTML } = require('../src/innerHTML');

const html = '<html><body><h1>Example Domain</h1><p>This domain is for use in examples.</p></body></html>';
const tokens = tokenize(html);
const dom = buildDOM(tokens);

const h1 = querySelector(dom, 'h1');
const p = querySelector(dom, 'p');
const body = querySelector(dom, 'body');

console.log('h1 innerHTML:', innerHTML(h1));
console.log('p innerHTML:', innerHTML(p));
console.log('body innerHTML:', innerHTML(body));

console.log('\n--- Tests ---');
console.log(innerHTML(h1) === 'Example Domain'                     ? '✅ h1 innerHTML'   : '❌ h1 innerHTML');
console.log(innerHTML(p) === 'This domain is for use in examples.' ? '✅ p innerHTML'    : '❌ p innerHTML');
console.log(innerHTML(body).includes('Example Domain')             ? '✅ body innerHTML' : '❌ body innerHTML');