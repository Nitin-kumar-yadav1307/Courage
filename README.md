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
- [x] Week 4 — Layout Engine
  - [x] Day 21 — calculateLayout basics
  - [x] Day 22 — CSS width (vw vh px)
  - [x] Day 23 — Margin handling + auto centering
  - [x] Day 24 — Connected to browser.js
  - [x] Day 25 — Review & Clean
- [x] Week 5 — Renderer
  - [x] Day 26 — Open a window
  - [x] Day 27 — Draw rectangles
  - [x] Day 28 — Draw text
  - [x] Day 29 — Walk DOM and render
  - [x] Day 30 — Full render pipeline
  - [x] Day 31 — Review & Clean
- [x] Week 6 — JavaScript Engine
  - [x] Day 32 — eval() wired up. Webpage scripts execute.
  - [x] Day 33 — Fake document object built in browser.js.
                  querySelector, getElementById, body — all wired to Courage's DOM.
  - [x] Day 34 — textContent setter via Object.defineProperty.
                  JS-driven DOM mutation confirmed. Canvas re-renders with new content.
  - [x] Day 35 — Review & Clean
- [x] Week 7 — UI, Tabs, History
  - [x] Day 35 — Toolbar added. Back, forward, reload buttons. Address bar. GO button.
  - [x] Day 36 — Dark theme applied. Canvas resized to fill below toolbar.
                  http://example.com loads via address bar.
  - [x] Day 37 — History navigation. Back and forward working with array + index.
  - [x] Day 38 — Reload button wired up.
  - [x] Day 39 — Tabs. Create, delete, active highlighting. insertBefore, classList, stopPropagation.
  - [x] Day 40 — Tab switching. Address bar syncs per tab. Canvas clears on empty tab.
                  Cleanup and README update. Week 7 complete.

## Run it
```bash
npm start
```

## Output
A real OS window opens.
example.com is fetched, parsed, laid out, and painted on screen.
Real text. Real colors. Real centered layout.
Tabs. Navigation. History. All built by hand.

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

### Layout Layer
- src/layout.js           — calculates { x, y, width, height } for every node
                            parseValue: converts vw/vh/px CSS values to pixels
                            parseMargin: handles all CSS margin syntax + auto
                            calculateLayout: recursive DFS, width down, height up
                            parentX flows down so children inherit correct position

### Renderer Layer
- main.js        — Electron entry point. Creates the OS window.
- renderer.html  — Canvas surface + toolbar UI loaded inside the Electron window.
- renderer.js    — Walks the layout tree using DFS.
                   Paints rectangles and text using Canvas API.
                   wrapText: word wrap algorithm using ctx.measureText.
                   Filters head/style/title nodes from rendering.
                   Manages tabs, history, navigation per tab.

### JavaScript Engine
- browser.js     — full pipeline: fetch → DOM → CSS → layout → JS execution
                   Fake document object injected before eval(js).
                   querySelector, getElementById, body all wired to Courage's DOM.
                   textContent setter via Object.defineProperty on every element node.

### Entry Point
- browser.js     — full pipeline: fetch → DOM → CSS → layout → export

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

### Layout Engine
Walks the entire DOM tree recursively.
Attaches { x, y, width, height } to every element node.
Width flows top-down from parent to children.
Height bubbles bottom-up from children to parent.
parentX flows down so children inherit correct x position.
Reads CSS styles for explicit widths and margins.
Converts vw, vh, px values to actual pixels.
Handles margin: auto to center elements horizontally.

### JavaScript Engine
Extracts all script tags from the DOM after parsing.
Builds a fake document object with querySelector, getElementById, body.
All methods point to Courage's own DOM tree, not Electron's.
textContent setter uses Object.defineProperty on every element node.
Executes scripts using eval(). Canvas re-renders after JS runs.

### Renderer
Walks the layout tree using DFS recursion.
For element nodes — draws background rectangle if background style exists.
For text nodes — wraps text using measureText, draws line by line.
Filters out head, style, title nodes from rendering.
Uses Canvas 2D API — fillRect for boxes, fillText for text.
Electron provides the window. Canvas provides the surface.
Every pixel placed by hand.

### UI Layer
Toolbar with back, forward, reload buttons and address bar.
Tab bar above the toolbar. Each tab is a DOM div created dynamically.
Tabs store their own url, history array and currentIndex.
Active tab highlighted with CSS class. Switching tabs restores address bar and canvas.
insertBefore keeps + button always at the end of the tab bar.
stopPropagation prevents delete click from bubbling to tab click.

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
Day 21 — Layout engine born. Every node gets { x, y, width, height }.
          Width flows down. Height bubbles up. Two passes.
Day 22 — parseValue. CSS strings → pixels. 60vw=480. 15vh=90.
Day 23 — parseMargin. margin: 15vh auto → centered at x:160.
          Handled all four CSS margin syntaxes.
Day 24 — Connected to browser.js. Full pipeline working.
          body → { x:160, y:130, width:480, height:60 }
Day 25 — Week 4 complete. Reviewed, commented, cleaned.
          Ready for Week 5 — Renderer.
Day 26 — Electron window opened for the first time.
          Courage has a face now.
Day 27 — Drew the first rectangle on canvas.
          ctx.fillRect. Four numbers. A shape on screen.
Day 28 — Drew the first text. "Shree Ganesh."
          The first words Courage ever wrote.
Day 29 — Connected the full pipeline to the renderer.
          DOM tree walking. Real elements on screen.
Day 30 — Full render pipeline complete.
          example.com rendered in Courage Browser.
          Real text. Real colors. Real layout.
Day 31 — Word wrap algorithm implemented.
          Text stays inside its container.
          Week 5 complete. Courage is a real browser.
Day 32 — eval() wired up. Webpage JS executes inside Courage.
          console.log confirmed working. But document was Electron's, not ours.
Day 33 — Built fake document object in browser.js.
          querySelector, getElementById, body — all pointing to Courage's DOM.
          Injected before eval(). Webpages can now touch our tree.
Day 34 — textContent setter built with Object.defineProperty.
          JS mutation confirmed — canvas re-rendered with changed content.
          "Hello from JavaScript!" painted by Courage. Week 6 complete.
Day 35 — Toolbar added to renderer.html.
          Back, forward, reload, address bar, GO button. All wired up.
Day 36 — Dark Brave-inspired theme applied.
          Canvas resized to fill below toolbar. example.com loads via address bar.
Day 37 — History navigation. Back and forward working.
          Array + index. Same pattern as browser history in real browsers.
Day 38 — Reload button wired. One line. Clean.
Day 39 — Tabs. createTab() builds tab object and DOM element together.
          insertBefore keeps + at the end. classList manages active state.
          Delete button with stopPropagation. New DOM methods learned.
Day 40 — Tab switching. Each tab owns its url, history, currentIndex.
          Address bar syncs on tab click. Canvas clears for empty tabs.
          Week 7 complete. Courage has tabs, navigation, and history.
          40 days. Built from scratch. Every line by hand.

## What's Next
Week 8: Bug fixes and polish.
Fix text line overlap. Respect font sizes. Render anchor tags.
Make more websites load correctly.