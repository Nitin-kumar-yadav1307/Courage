const { tokenizeCSS } = require('../src/css-tokenizer');

const css = `h1 { color: red; font-size: 16px; } body { background: #eee; }`;

const tokens = tokenizeCSS(css);

console.log(tokens);

console.log('\n--- Tests ---');
console.log(tokens[0].type === 'selector' && tokens[0].value === 'h1'        ? '✅ h1 selector'       : '❌ h1 selector');
console.log(tokens[1].type === 'openBlock'                                    ? '✅ openBlock'          : '❌ openBlock');
console.log(tokens[2].type === 'property' && tokens[2].value === 'color'     ? '✅ color property'     : '❌ color property');
console.log(tokens[3].type === 'value'    && tokens[3].value === 'red'       ? '✅ red value'          : '❌ red value');
console.log(tokens[4].type === 'property' && tokens[4].value === 'font-size' ? '✅ font-size property' : '❌ font-size property');
console.log(tokens[5].type === 'value'    && tokens[5].value === '16px'      ? '✅ 16px value'         : '❌ 16px value');
console.log(tokens[6].type === 'closeBlock'                                   ? '✅ closeBlock'         : '❌ closeBlock');