const { parseResponse } = require('../src/response-parser');

const raw = `HTTP/1.1 200 OK\r\nContent-Type: text/html\r\nConnection: close\r\nServer: Apache\r\n\r\n<html><body><h1>Hello</h1></body></html>`;

const result = parseResponse(raw);

console.log('Status Code:', result.statusCode);
console.log('Status Text:', result.statusText);
console.log('Headers:', result.headersObject);
console.log('Body:', result.body);

console.log('\n--- Tests ---');
console.log(result.statusCode === 200 ? '✅ statusCode' : '❌ statusCode');
console.log(result.statusText === 'OK' ? '✅ statusText' : '❌ statusText');
console.log(result.headersObject['content-type'] === 'text/html' ? '✅ content-type header' : '❌ content-type header');
console.log(result.body.includes('<h1>') ? '✅ body' : '❌ body');