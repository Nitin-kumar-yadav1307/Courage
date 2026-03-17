const { tokenizeCSS } = require('../src/css-tokenizer');
const { parseCSS } = require('../src/css-parser');

const css = `h1 { color: red; font-size: 16px; } body { background: #eee; margin: 0; }`;

const tokens = tokenizeCSS(css);
const rules = parseCSS(tokens);

console.log(JSON.stringify(rules, null, 2));

console.log('\n--- Tests ---');
console.log(rules.length === 2                                ? '✅ 2 rules'              : '❌ 2 rules');
console.log(rules[0].selector === 'h1'                        ? '✅ h1 selector'          : '❌ h1 selector');
console.log(rules[0].declaration['color'] === 'red'           ? '✅ color: red'           : '❌ color: red');
console.log(rules[0].declaration['font-size'] === '16px'      ? '✅ font-size: 16px'      : '❌ font-size: 16px');
console.log(rules[1].selector === 'body'                      ? '✅ body selector'        : '❌ body selector');
console.log(rules[1].declaration['background'] === '#eee'     ? '✅ background: #eee'     : '❌ background: #eee');
console.log(rules[1].declaration['margin'] === '0'            ? '✅ margin: 0'            : '❌ margin: 0');