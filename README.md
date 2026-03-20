# Courage

A web browser built from scratch in Node.js.
No libraries. No shortcuts. Every line written by hand.

## Why
Because I want to understand what most people never will.
Because I want something I can call mine.

## Progress
- [x] Week 1 — HTTP Fetcher
  - [x] Day 1  — Foundation & Mindset
  - [x] Day 2  — URL Parser
  - [x] Day 3  — Raw TCP Socket
  - [x] Day 4  — HTTP Request
  - [x] Day 5  — Response Parser
  - [x] Day 6  — Full Assembly
  - [x] Day 7  — Review & Clean
- [x] Week 2 — HTML Parser & DOM Tree
  - [x] Day 8  — HTML Tokenizer
  - [x] Day 9  — DOM Tree Builder
  - [x] Day 10 — Connected to HTTP Fetcher
  - [x] Day 11 — Attributes + Self-closing + querySelector
  - [x] Day 12 — querySelectorAll + innerHTML
  - [x] Day 13 — Review & Clean
- [x] Week 3 — HTTPS & CSS Pipeline
  - [x] Day 14 — HTTPS + TLS + Redirects + User-Agent
  - [x] Day 15 — CSS Tokenizer
  - [x] Day 16 — CSS Parser
  - [x] Day 17 — Style Matcher
  - [x] Day 18 — Computed Styles
  - [x] Day 19 — Full Pipeline Connected
  - [x] Day 20 — Review & Clean
- [ ] Week 4 — Layout Engine
- [ ] Week 5 — Renderer
- [ ] Week 6 — JavaScript Support
- [ ] Week 7 — UI, Tabs, History

## Run it
node browser.js https://example.com

## Output
Status Code: 200
Status Text: OK
Headers: { 'content-type': 'text/html', 'server': 'cloudflare', ... }

--- BODY ---
<!doctype html><html>...</html>

--- DOM TREE WITH STYLES ---
{
  type: 'document',
  children: [
    { type: 'element', name: 'html', children: [
        { type: 'element', name: 'head', children: [...] },
        { type: 'element', name: 'body',
          styles: { background: '#eee', width: '60vw', margin: '15vh auto' },
          children: [...] }
    ]}
  ]
}

## Architecture

### Networking Layer
- src/url-parser.js       — breaks a URL into protocol, host, port, path
- src/socket.js           — raw TCP + TLS connections (HTTP + HTTPS)
- src/http-request.js     — builds and sends HTTP GET request with User-Agent
- src/response-parser.js  — parses raw response into statusCode, headers, body

### Parsing Layer
- src/html-tokenizer.js   — raw HTML → tokens with tag names and attributes
- src/dom-builder.js      — tokens → nested DOM tree using a stack

### DOM API Layer
- src/querySelector.js    — find first matching node by tag name (DFS)
- src/querySelectorAll.js — find all matching nodes by tag name (DFS)
- src/innerHTML.js        — get all text content inside any node

### CSS Layer
- src/css-tokenizer.js    — raw CSS → flat tokens ({ } : ; are landmarks)
- src/css-parser.js       — tokens → structured rules { selector, declaration }
- src/style-matcher.js    — walks DOM tree, attaches styles to matching nodes
- src/computed-styles.js  — reads styles from any node, returns {} if none

### Entry Point
- browser.js              — full pipeline: fetch → DOM → CSS → styled nodes

## Modules

### URL Parser
Takes any URL and returns protocol, host, port and path.
Written using pure string manipulation. No regex. No libraries.

### TCP Socket
Opens a raw TCP or TLS connection using Node's net and tls modules.
Writes the HTTP request on connect. Collects all incoming
data chunks and resolves the Promise when connection closes.

### HTTP Request
Builds a raw HTTP GET request string with User-Agent header.
Passes it through the socket. Returns the full server response.

### Response Parser
Splits the raw HTTP response at \r\n\r\n — headers above,
body below. Parses status line and headers into a clean object.
Returns { statusCode, statusText, headersObject, body }.
Also strips chunked transfer encoding numbers from body.

### HTML Tokenizer
Reads HTML character by character. Identifies opening tags,
closing tags, and text content. Parses attributes into key-value
pairs. Skips doctype declarations. Handles self-closing tags.
Returns a flat array of typed tokens.

### DOM Builder
Takes the flat token array and builds a nested tree using a stack.
Open tag → push node onto stack (unless self-closing).
Close tag → pop from stack.
Text → attach to current parent.
Returns a document node with the full tree as children.

### querySelector
Searches the DOM tree using depth-first search.
Returns the first node matching the given tag name.
Returns null if nothing found.

### querySelectorAll
Searches the entire DOM tree using depth-first search.
Returns an array of all nodes matching the given tag name.
Returns empty array if nothing found.

### innerHTML
Walks a node's subtree and collects all text content.
Returns everything as one concatenated string.

### CSS Tokenizer
Reads CSS character by character.
Four landmarks: { } : ;
Returns flat array of typed tokens.

### CSS Parser
Walks token array and groups into structured rules.
Returns array of { selector, declaration } objects.

### Style Matcher
Walks entire DOM tree using DFS recursion.
Matches CSS rules to DOM nodes by tag name.
Attaches matching declarations to node.styles.

### Computed Styles
Reads node.styles attached by style matcher.
Returns empty object if no styles matched.
Never returns undefined — always safe to use.

## Journal
Day 1  — Learned how the internet works at the wire level.
          TCP handshakes, DNS, HTTP — nothing is magic anymore.
Day 2  — Built the URL parser. 5/5 tests passing.
Day 3  — Built the TCP socket. Connected to example.com:80.
          That moment when 'connected successfully' printed — unforgettable.
Day 4  — Built the HTTP request. Courage fetched the world's
          first website — info.cern.ch. Still running after 30 years.
Day 5  — Built the response parser. 4/4 tests passing.
Day 6  — Connected everything. One command. Real structured data.
Day 7  — Week 1 complete. Reviewed, commented, cleaned.
Day 8  — Built the HTML tokenizer. < starts a tag. > ends it.
Day 9  — Built the DOM tree using a stack. DSA in real life.
Day 10 — Connected networking to parsing. One full pipeline.
Day 11 — Attributes, self-closing tags, querySelector.
Day 12 — querySelectorAll and innerHTML. DOM API complete.
Day 13 — Week 2 complete. Nine modules. Every line by hand.
Day 14 — HTTPS working. Fetched github.com, wikipedia.org, Jal Mitra.
          Wikipedia said no without User-Agent. Added Courage/1.0. It said yes.
Day 15 — CSS tokenizer. { } : ; are the landmarks.
Day 16 — CSS parser. Flat tokens → structured rules.
Day 17 — Style matcher. DFS again. Every node gets its styles.
Day 18 — getComputedStyle. Simplest module. One job. Done well.
Day 19 — Full pipeline connected. body.styles = { background: '#eee' }
Day 20 — Week 3 complete. 13 modules. Reviewed, commented, cleaned.
          Ready for Week 4 — Layout Engine.

## What's Next
Week 4: Layout Engine.
Every DOM node gets exact pixel coordinates.
{ x, y, width, height } — calculated from styles and content.
The CSS box model implemented from scratch.
This is where most browser projects quit.
Courage keeps going.