const { tokenize } = require('../src/html-tokenizer');
const { buildDOM } = require('../src/dom-builder');

// Test self closing tags
const html = '<div><br><img src="photo.jpg"><p>Hello</p></div>';
const tokens = tokenize(html);
const dom = buildDOM(tokens);

console.log(JSON.stringify(dom, null, 2));

console.log('\n--- Tests ---');
console.log(dom.children[0].name === 'div'                        ? '✅ div'            : '❌ div');
console.log(dom.children[0].children[0].name === 'br'             ? '✅ br self closing' : '❌ br self closing');
console.log(dom.children[0].children[1].name === 'img'            ? '✅ img self closing' : '❌ img self closing');
console.log(dom.children[0].children[2].name === 'p'              ? '✅ p after self closing' : '❌ p after self closing');
console.log(dom.children[0].children[2].children[0].value === 'Hello' ? '✅ Hello text' : '❌ Hello text');