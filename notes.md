# Courage — Learning Notes

---

## Week 1 — Networking Layer

---

### Day 3 — TCP Socket

#### TCP vs UDP

TCP is connection-oriented — it guarantees reliable, ordered delivery
by tracking packets and retransmitting lost ones. UDP is connectionless
— fires packets with no delivery guarantee, making it faster and lighter.
UDP is preferred for video streaming, DNS, and online gaming where speed
matters more than perfection.

#### What does "stateful" mean?

A stateful connection means both sides maintain shared context about the
ongoing exchange — sequence numbers, acknowledgment counters, connection
phase, window sizes. Each side tracks "where we are" in the conversation.

TCP is stateful — it knows which bytes have been sent, acknowledged, and
what comes next. This is how it detects and recovers from dropped packets.

UDP is stateless — every message is treated in isolation. No memory of
what came before.

#### Why does HTTP use TCP and not UDP?

- Correctness matters. One missing byte breaks a page or corrupts a file.
- Request/response semantics. HTTP is a conversation — TCP maps to this naturally.
- No retry logic needed. TCP handles reliability so HTTP doesn't have to.

Note: HTTP/3 now runs over QUIC — a UDP-based protocol that rebuilds
reliability at the application layer to get speed + correctness.

---

### Day 4 — HTTP Request

#### GET vs POST

GET  — fetches data. Parameters go in the URL: GET /search?q=cats
POST — sends data. Parameters go in the body. Used for forms, logins, uploads.

Simple rule: GET retrieves. POST submits.

#### What is \r\n?

\r = carriage return (moves cursor to start of line)
\n = line feed (moves cursor down one line)

Together \r\n = one complete new line. A relic from typewriters and
teletype machines. HTTP uses it because the original spec required it
as the standard line ending. Every HTTP header line ends with \r\n.

#### What happens if you forget the blank line?

The blank line (\r\n\r\n) signals "headers are done, body starts here."

If you forget it, the server keeps waiting for more headers and never
starts reading the body. The request hangs or gets rejected.

Like a letter without a blank line between the address and the message —
the reader doesn't know where one ends and the other begins.

---

### Day 5 — Response Parser

#### Request vs Response Headers

Request headers — sent by the browser to the server.
Tell the server what the client wants and what it can handle.

Response headers — sent by the server back to the browser.
Describe the data being returned.

Think of it like ordering food:
- Request header  = "I want a burger, no onions, allergic to nuts"
- Response header = "Here's your burger, it's hot, it weighs 300g"

#### Content-Type

Tells the browser what kind of data is in the body.

Content-Type: text/html         → render as a webpage
Content-Type: application/json  → parse as JSON
Content-Type: image/png         → display as an image

Without it the browser guesses what to do with the data.

#### Content-Length

Tells the browser how many bytes the response body is.

Content-Length: 3495  → "the body is 3,495 bytes long"

Lets the browser know when the download is complete and show
an accurate progress bar. Without it the browser doesn't know
if it has received all the data yet.

---

## Fuzzy Things / Open Questions

- What are chunk size numbers (210, 0) in the body? (Transfer-Encoding: chunked)
- How does the HTML parser know where one tag ends and another begins?
- How does a DOM tree get built from a flat string?

---

## Commands I Use

node browser.js http://example.com   — fetch any webpage
node test/url-parser.test.js         — test url parser
node test/response-parser.test.js    — test response parser

---

## Words I Now Own

TCP          — reliable, ordered, stateful connection protocol
UDP          — fast, connectionless, no delivery guarantee
Socket       — a door between two programs across a network
HTTP         — plain text protocol for requesting web resources
DNS          — translates hostnames to IP addresses
\r\n         — HTTP line ending (carriage return + line feed)
DOM          — Document Object Model — tree structure of HTML
Status Code  — server's answer: 200 ok, 302 redirect, 404 not found
Promise      — represents a value that will arrive in the future
async/await  — clean way to work with Promises in JavaScript