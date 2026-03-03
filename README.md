# Courage

A web browser built from scratch in Node.js.
No libraries. No shortcuts. Every line written by hand.

## Why
Because I want to understand what most people never will.
Because I want something I can call mine.

## Progress
- [x] Week 1 — HTTP Fetcher
  - [x] Day 2 — URL Parser
  - [x] Day 3 — Raw TCP Socket
  - [ ] Day 4 — HTTP Request
  - [ ] Day 5 — Response Parser
  - [ ] Day 6 — Connect everything
- [ ] Week 2 — HTML Parser & DOM Tree
- [ ] Week 3 — HTTPS & CSS Parser
- [ ] Week 4 — Layout Engine
- [ ] Week 5 — Renderer

## Run it
node browser.js http://example.com

## Architecture
- src/url-parser.js       — breaks a URL into protocol, host, port, path
- src/socket.js           — opens a raw TCP connection to any server
- src/http-request.js     — sends an HTTP GET request (coming Day 4)
- src/response-parser.js  — parses the raw HTTP response (coming Day 5)

## Modules
### URL Parser
Takes any URL and returns protocol, host, port and path.
Written using pure string manipulation. No regex. No libraries.

### TCP Socket
Opens a raw TCP connection to a host and port using Node's net module.
Collects all incoming data chunks and resolves when connection closes.

## Journal
Day 2 — Built the URL parser. Learned how a URL is structured at the spec level.
Day 3 — Built the TCP socket. Connected to example.com:80 for the first time.
        That moment when 'connected successfully' printed — unforgettable.