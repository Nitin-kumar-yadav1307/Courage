const { tokenize } = require('../src/html-tokenizer');
const { buildDOM } = require('../src/dom-builder');
const { querySelector } = require('../src/querySelector');

const html = '<html><head><title>Example</title></head><body><h1>Hello</h1><p>World</p></body></html>';
const tokens = tokenize(html);
const dom = buildDOM(tokens);

console.log('\n--- Tests ---');
console.log(querySelector(dom, 'h1').name === 'h1'           ? '✅ found h1'    : '❌ found h1');
console.log(querySelector(dom, 'title').name === 'title'     ? '✅ found title' : '❌ found title');
console.log(querySelector(dom, 'p').name === 'p'             ? '✅ found p'     : '❌ found p');
console.log(querySelector(dom, 'div') === null               ? '✅ returns null when not found' : '❌ null check');