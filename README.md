# Courage

A web browser built from scratch in Node.js.
No libraries. No shortcuts. Every line written by hand.

## Why
Because I want to understand what most people never will.
Because I want something I can call mine.

## Progress
- [x] Week 1 — HTTP Fetcher (URL parser, TCP socket, HTTP request, response parser)
- [ ] Week 2 — HTML Parser & DOM Tree
- [ ] Week 3 — HTTPS & CSS Parser
- [ ] Week 4 — Layout Engine
- [ ] Week 5 — Renderer

## Run it
node browser.js http://example.com

## Architecture
- src/url-parser.js      — breaks a URL into protocol, host, port, path
- src/socket.js          — opens a raw TCP connection
- src/http-request.js    — sends an HTTP GET request
- src/response-parser.js — parses the raw HTTP response