const { tokenize } = require('../src/html-tokenizer');
const { buildDOM } = require('../src/dom-builder');
const { querySelectorAll } = require('../src/querySelectorAll');

const html = '<html><body><p>First</p><p>Second</p><p>Third</p><h1>Title</h1></body></html>';
const tokens = tokenize(html);
const dom = buildDOM(tokens);

const paragraphs = querySelectorAll(dom, 'p');
const headings = querySelectorAll(dom, 'h1');
const divs = querySelectorAll(dom, 'div');

console.log('Paragraphs found:', paragraphs.length);
console.log('Headings found:', headings.length);
console.log('Divs found:', divs.length);

console.log('\n--- Tests ---');
console.log(paragraphs.length === 3                    ? '✅ found 3 paragraphs'     : '❌ found 3 paragraphs');
console.log(paragraphs[0].children[0].value === 'First'  ? '✅ first p is First'    : '❌ first p is First');
console.log(paragraphs[1].children[0].value === 'Second' ? '✅ second p is Second'  : '❌ second p is Second');
console.log(paragraphs[2].children[0].value === 'Third'  ? '✅ third p is Third'    : '❌ third p is Third');
console.log(headings.length === 1                      ? '✅ found 1 heading'        : '❌ found 1 heading');
console.log(divs.length === 0                          ? '✅ no divs found'          : '❌ no divs found');