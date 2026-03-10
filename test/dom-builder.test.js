const { tokenize } = require('../src/html-tokenizer');
const { buildDOM } = require('../src/dom-builder');

const html = '<html><body><h1>Hello</h1><p>World</p></body></html>';
const tokens = tokenize(html);
const dom = buildDOM(tokens);

console.log(JSON.stringify(dom, null, 2));

console.log('\n--- Tests ---');
console.log(dom.type === 'document'                           ? '✅ root is document'     : '❌ root is document');
console.log(dom.children[0].name === 'html'                   ? '✅ first child is html'  : '❌ first child is html');
console.log(dom.children[0].children[0].name === 'body'       ? '✅ body inside html'     : '❌ body inside html');
console.log(dom.children[0].children[0].children[0].name === 'h1' ? '✅ h1 inside body'  : '❌ h1 inside body');
console.log(dom.children[0].children[0].children[0].children[0].value === 'Hello' ? '✅ Hello text' : '❌ Hello text');