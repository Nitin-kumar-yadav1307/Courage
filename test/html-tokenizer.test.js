const { tokenize } = require('../src/html-tokenizer');

const html = '<h1>Hello</h1><p>World</p>';
const tokens = tokenize(html);

console.log(tokens);

console.log('\n--- Tests ---');
console.log(tokens[0].type === 'open'  && tokens[0].name === 'h1'    ? '✅ open tag h1'   : '❌ open tag h1');
console.log(tokens[1].type === 'text'  && tokens[1].value === 'Hello' ? '✅ text Hello'    : '❌ text Hello');
console.log(tokens[2].type === 'close' && tokens[2].name === 'h1'    ? '✅ close tag h1'  : '❌ close tag h1');
console.log(tokens[3].type === 'open'  && tokens[3].name === 'p'     ? '✅ open tag p'    : '❌ open tag p');
console.log(tokens[4].type === 'text'  && tokens[4].value === 'World' ? '✅ text World'    : '❌ text World');
console.log(tokens[5].type === 'close' && tokens[5].name === 'p'     ? '✅ close tag p'   : '❌ close tag p');