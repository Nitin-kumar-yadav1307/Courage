1.What is the difference between TCP and UDP?
ans-TCP vs UDP: TCP is a connection-oriented protocol that guarantees reliable, ordered delivery of data by tracking packets, retransmitting lost ones, and ensuring everything arrives in sequence. UDP, by contrast, is connectionless and fires packets off with no delivery guarantees or ordering — making it faster and lighter, which is why it's preferred for things like video streaming, DNS, and online gaming where speed matters more than perfection.Stateful connections: A stateful connection means both sides maintain shared context about the ongoing exchange — things like which bytes have been sent, acknowledged, and what comes next. TCP is stateful in this way; each side tracks the state of the session, which is precisely what enables it to detect and recover from dropped packets. A stateless protocol like raw UDP has no such memory — every message is treated in isolation.Why HTTP uses TCP: HTTP transfers structured data where correctness is non-negotiable — a single missing byte can break a page or corrupt a file. TCP's reliability and ordered delivery mean HTTP doesn't need to build its own error-recovery logic. That said, TCP's overhead (particularly its 3-way handshake) became a bottleneck for modern web traffic, which is why HTTP/3 now runs over QUIC — a UDP-based protocol that rebuilds reliability at the application layer to get the best of both worlds.

2.What does it mean for a connection to be "stateful"?
Ans-A stateful connection means both parties track the ongoing context of the communication — things like sequence numbers, acknowledgment counters, connection phase (opening/established/closing), and window sizes. Each side maintains a shared understanding of "where we are" in the conversation.
TCP is stateful: when you send packets, each side knows which bytes have been acknowledged, which are in-flight, and what to expect next. This is how TCP can detect dropped packets and retransmit them.
A stateless protocol (like raw UDP) treats every message in isolation — no memory of what came before.

3.Why does HTTP use TCP and not UDP?
Ans- HTTP is designed to transfer structured documents and data reliably. A few reasons TCP is the right fit:
Correctness matters. If even one byte of an HTML page, image, or JSON response is lost or corrupted, the result is broken. TCP guarantees complete, ordered delivery; UDP doesn't.
Request/response semantics. HTTP is inherently a conversation — a client sends a request and expects a specific response. TCP's stateful connection maps naturally to this model.
No application-level retry logic needed. By delegating reliability to TCP, HTTP doesn't have to implement its own retransmission or ordering logic.

## GET vs POST

**GET** — fetches data. Parameters go in the URL: `GET /search?q=cats`
**POST** — sends data. Parameters go in the **body**: used for forms, logins, file uploads.

Simple rule: GET *retrieves*, POST *submits*.

---

## What is `\r\n`?

- `\r` = **carriage return** (moves cursor to start of line)
- `\n` = **line feed** (moves cursor down one line)

Together `\r\n` = one complete new line. It's a relic from typewriters/teletype machines. HTTP uses it because the original spec (built on older protocols) required it as the standard line ending — every header line ends with `\r\n`.

---

## What happens if you forget the blank line?

The blank line (`\r\n\r\n`) signals **"headers are done, body starts here."**

If you forget it, the server keeps waiting for more headers and **never starts reading the body** — the request just hangs or gets rejected. It's like ending a letter without a blank line between the address and the message — the reader doesn't know where one stops and the other begins.

# HTTP Headers Notes

## Request vs Response Headers

**Request headers** are sent *by the browser to the server* — they tell the server what the client wants and what it can handle.
**Response headers** are sent *by the server back to the browser* — they describe the data being returned.

Think of it like ordering food:
- **Request header** = you telling the waiter *"I want a burger, no onions, and I'm allergic to nuts"*
- **Response header** = the waiter bringing your food and saying *"Here's your burger, it's hot, and it weighs 300g"*

---

## `Content-Type`
Tells the browser **what kind of data** is in the body, so it knows how to handle it.

```
Content-Type: text/html        → render as a webpage
Content-Type: application/json → parse as JSON
Content-Type: image/png        → display as an image
```

Without it, the browser would be guessing what to do with the data.

---

## `Content-Length`
Tells the browser **how many bytes** the response body is.

```
Content-Length: 3495   → "the body is 3,495 bytes long"
```

This lets the browser know when the download is complete and show an accurate progress bar. Without it, the browser doesn't know if it has received *all* the data yet.