# Courage

A web browser built from scratch in Node.js.
No libraries. No shortcuts. Every line written by hand.

## Why
Because I want to understand what most people never will.
Because I want something I can call mine.

## Progress
- [x] Week 1 — HTTP Fetcher
  - [x] Day 1 — Foundation & Mindset
  - [x] Day 2 — URL Parser
  - [x] Day 3 — Raw TCP Socket
  - [x] Day 4 — HTTP Request
  - [x] Day 5 — Response Parser
  - [x] Day 6 — Full Assembly
  - [x] Day 7 — Review & Clean
- [ ] Week 2 — HTML Parser & DOM Tree
- [ ] Week 3 — HTTPS & CSS Parser
- [ ] Week 4 — Layout Engine
- [ ] Week 5 — Renderer
- [ ] Week 6 — JavaScript Support
- [ ] Week 7 — UI, Tabs, History

## Run it
node browser.js http://example.com

## Output
Status Code: 200
Status Text: OK
Headers: { 'content-type': 'text/html', 'server': 'cloudflare', ... }

--- BODY ---
<!doctype html><html>...</html>

## Architecture
- src/url-parser.js       — breaks a URL into protocol, host, port, path
- src/socket.js           — opens a raw TCP connection to any server
- src/http-request.js     — builds and sends a raw HTTP GET request
- src/response-parser.js  — parses raw response into statusCode, headers, body
- browser.js              — entry point, connects all modules together

## Modules

### URL Parser
Takes any URL and returns protocol, host, port and path.
Written using pure string manipulation. No regex. No libraries.

### TCP Socket
Opens a raw TCP connection using Node's net module.
Writes the HTTP request on connect. Collects all incoming
data chunks and resolves the Promise when connection closes.

### HTTP Request
Builds a raw HTTP GET request string and passes it through
the socket. Returns the full server response as a string.

### Response Parser
Splits the raw HTTP response at \r\n\r\n — headers above,
body below. Parses status line and headers into a clean object.
Returns { statusCode, statusText, headersObject, body }.

## Journal
Day 1 — Learned how the internet works at the wire level.
         TCP handshakes, DNS, HTTP — nothing is magic anymore.
Day 2 — Built the URL parser. 5/5 tests passing.
         Learned how a URL is structured at the spec level.
Day 3 — Built the TCP socket. Connected to example.com:80.
         That moment when 'connected successfully' printed — unforgettable.
Day 4 — Built the HTTP request. Courage fetched the world's
         first website — info.cern.ch. Still running after 30 years.
Day 5 — Built the response parser. 4/4 tests passing.
         Raw string → clean { statusCode, headers, body }.
Day 6 — Connected everything. One command. Real structured data.
         node browser.js http://example.com — and it works.
Day 7 — Week 1 complete. Reviewed, commented, cleaned.
         Ready for Week 2 — HTML Parser & DOM Tree.

## What's Next
Week 2: Read the HTML body Courage fetches and build a DOM tree.
Every tag becomes a node. Every node has a parent and children.
The web starts making sense at a deeper level.