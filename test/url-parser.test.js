const { parseURL } = require('../src/url-parser');

const tests = [
  {
    input: 'http://example.com',
    expected: { protocol: 'http', host: 'example.com', port: 80, path: '/' }
  },
  {
    input: 'https://example.com',
    expected: { protocol: 'https', host: 'example.com', port: 443, path: '/' }
  },
  {
    input: 'http://example.com:3000/page',
    expected: { protocol: 'http', host: 'example.com', port: 3000, path: '/page' }
  },
  {
    input: 'http://example.com/a/b/c',
    expected: { protocol: 'http', host: 'example.com', port: 80, path: '/a/b/c' }
  },
  {
    input: 'https://news.ycombinator.com/item',
    expected: { protocol: 'https', host: 'news.ycombinator.com', port: 443, path: '/item' }
  },
];

let passed = 0;
for (const t of tests) {
  const result = parseURL(t.input);
  const ok =
    result.protocol === t.expected.protocol &&
    result.host     === t.expected.host     &&
    result.port     === t.expected.port     &&
    result.path     === t.expected.path;

  if (ok) {
    console.log(`✅ PASS: ${t.input}`);
    passed++;
  } else {
    console.log(`❌ FAIL: ${t.input}`);
    console.log(`   Expected:`, t.expected);
    console.log(`   Got:     `, result);
  }
}

console.log(`\n${passed}/${tests.length} tests passed`);