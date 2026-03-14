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
- [ ] Week 3 — HTTPS & CSS Parser
  - [ ] Day 14 — HTTPS Support
  - [ ] Day 15 — CSS Tokenizer
  - [ ] Day 16 — CSS Parser
  - [ ] Day 17 — Style Matcher
  - [ ] Day 18 — Computed Styles
  - [ ] Day 19 — Connect Everything
  - [ ] Day 20 — Review & Clean
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

--- DOM TREE ---
{
  type: 'document',
  children: [
    { type: 'element', name: 'html', children: [
        { type: 'element', name: 'head', children: [...] },
        { type: 'element', name: 'body', children: [...] }
    ]}
  ]
}

## Architecture

### Networking Layer
- src/url-parser.js       — breaks a URL into protocol, host, port, path
- src/socket.js           — opens a raw TCP connection to any server
- src/http-request.js     — builds and sends a raw HTTP GET request
- src/response-parser.js  — parses raw response into statusCode, headers, body

### Parsing Layer
- src/html-tokenizer.js   — raw HTML → tokens with tag names and attributes
- src/dom-builder.js      — tokens → nested DOM tree using a stack

### DOM API Layer
- src/querySelector.js    — find first matching node by tag name (DFS)
- src/querySelectorAll.js — find all matching nodes by tag name (DFS)
- src/innerHTML.js        — get all text content inside any node

### Entry Point
- browser.js              — connects all modules, run from command line

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
Same concept as element.innerHTML in real browsers.

## Journal
Day 1  — Learned how the internet works at the wire level.
          TCP handshakes, DNS, HTTP — nothing is magic anymore.
Day 2  — Built the URL parser. 5/5 tests passing.
          Learned how a URL is structured at the spec level.
Day 3  — Built the TCP socket. Connected to example.com:80.
          That moment when 'connected successfully' printed — unforgettable.
Day 4  — Built the HTTP request. Courage fetched the world's
          first website — info.cern.ch. Still running after 30 years.
Day 5  — Built the response parser. 4/4 tests passing.
          Raw string → clean { statusCode, headers, body }.
Day 6  — Connected everything. One command. Real structured data.
          node browser.js http://example.com — and it works.
Day 7  — Week 1 complete. Reviewed, commented, cleaned.
Day 8  — Built the HTML tokenizer. HTML is just characters with meaning.
          < starts a tag. > ends it. Everything else is text.
Day 9  — Built the DOM tree using a stack. DSA in real life.
          Last in first out — exactly how HTML nesting works.
Day 10 — Connected networking to parsing. One full pipeline.
          Fetch a webpage. Get a DOM tree. One command.
Day 11 — Added attribute parsing, self-closing tag support, querySelector.
          <a href="..."> now captures href. <br> no longer breaks the tree.
Day 12 — Built querySelectorAll and innerHTML.
          Find every matching node. Read any text content. DOM API complete.
Day 13 — Week 2 complete. Reviewed, commented, cleaned.
          Nine modules. Two weeks. Every line written by hand.

## What's Next
Week 3: HTTPS support so Courage can reach any website.
Then a CSS parser — read stylesheets, match rules to DOM nodes.
Every element will know its computed styles.
The browser gets a sense of how things should look.