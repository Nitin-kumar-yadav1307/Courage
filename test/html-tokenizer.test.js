const { tokenize } = require('../src/html-tokenizer');

const html = '<a href="https://example.com" class="link">Click</a>';
const tokens = tokenize(html);

console.log(tokens);

console.log('\n--- Tests ---');
console.log(tokens[0].name === 'a'                              ? '✅ tag name'        : '❌ tag name');
console.log(tokens[0].attributes.href === 'https://example.com' ? '✅ href attribute'  : '❌ href attribute');
console.log(tokens[0].attributes.class === 'link'               ? '✅ class attribute' : '❌ class attribute');
console.log(tokens[1].value === 'Click'                         ? '✅ text content'    : '❌ text content');
console.log(tokens[2].name === 'a'                              ? '✅ close tag'       : '❌ close tag');