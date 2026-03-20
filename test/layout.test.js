const { tokenize } = require('../src/html-tokenizer');
const { buildDOM } = require('../src/dom-builder');
const { calculateLayout } = require('../src/layout');

const html = '<html><body><h1>Hello</h1><p>World</p></body></html>';
const dom = buildDOM(tokenize(html));

calculateLayout(dom, 800, 0);

const html_node = dom.children[0];
const body = dom.children[0].children[0];
const h1 = dom.children[0].children[0].children[0];
const p = dom.children[0].children[0].children[1];

console.log('html layout:', html_node.layout);
console.log('body layout:', body.layout);
console.log('h1 layout:', h1.layout);
console.log('p layout:', p.layout);

console.log('\n--- Tests ---');
console.log(html_node.layout.x === 0       ? '✅ html x:0'        : '❌ html x:0');
console.log(html_node.layout.y === 0       ? '✅ html y:0'        : '❌ html y:0');
console.log(html_node.layout.width === 800 ? '✅ html width:800'  : '❌ html width:800');
console.log(body.layout.width === 800      ? '✅ body width:800'  : '❌ body width:800');
console.log(h1.layout.y === 0             ? '✅ h1 y:0'          : '❌ h1 y:0');
console.log(h1.layout.width === 800       ? '✅ h1 width:800'    : '❌ h1 width:800');
console.log(p.layout.y === 20  ? '✅ p starts after h1' : '❌ p position');