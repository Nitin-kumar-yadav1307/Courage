const http = require('http');

const html = `<html>
<style>
  h1 { font-weight: bold; font-size: 24px; }
  p { font-style: italic; }
</style>
<body>
  <h1>Hello Bold</h1>
  <p>Hello Italic</p>
</body>
</html>`;

http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(html);
}).listen(3000);

console.log('Test server running at http://localhost:3000');