const {openSocket} = require("./src/socket.js");
const {parseResponse} = require("./src/response-parser.js");
const {parseURL} = require("./src/url-parser.js");
const {sendRequest} = require("./src/http-request.js");
const {buildDOM} = require("./src/dom-builder.js");
const {tokenize} = require("./src/html-tokenizer.js");
const { querySelector } = require('./src/querySelector.js');
const { innerHTML } = require('./src/innerHTML.js');
const { tokenizeCSS } = require('./src/css-tokenizer.js');
const { parseCSS } = require('./src/css-parser.js');
const { styleMatcher} = require('./src/style-matcher.js');
const {calculateLayout} = require("./src/layout.js");
const { querySelectorAll } = require('./src/querySelectorAll.js');

async function fetch(url, viewportWidth, viewportHeight) {
  const {host, port, protocol, path} = parseURL(url);

  const rawResponse = await sendRequest(host, port, path, protocol);

  const {statusCode, statusText, headersObject, body} = parseResponse(rawResponse);

  if (statusCode === 301 || statusCode === 302) {
    const newUrl = headersObject['location'];
    console.log('Redirecting to:', newUrl);
    return fetch(newUrl, viewportWidth, viewportHeight);
  }

  const tokens = tokenize(body);
  const rootNode = buildDOM(tokens);

  const allNodes = querySelectorAll(rootNode, '*');
  for (let node of allNodes) {
      Object.defineProperty(node, 'textContent', {
          set: function(value) {
              if (node.children[0] && node.children[0].type === 'text') {
                  node.children[0].value = value;
              }
          }
      });
  }

  const document = { 
    querySelector: function(selector) { 
      return querySelector(rootNode, selector); 
    }, 
    getElementById: function(id) {
      return querySelector(rootNode, '#' + id);
    },
    body: querySelector(rootNode, 'body') 
  }

  const styleNode = querySelector(rootNode, 'style');
  if (styleNode) {
    const css = innerHTML(styleNode);
    const cssTokens = tokenizeCSS(css);
    const rules = parseCSS(cssTokens);
    styleMatcher(rootNode, rules);
  }

  calculateLayout(rootNode, viewportWidth, 0, viewportWidth, viewportHeight);

  let scriptNode = querySelector(rootNode, 'script');
  if (scriptNode) {
    let js = innerHTML(scriptNode);
    eval(js);
    calculateLayout(rootNode, viewportWidth, 0, viewportWidth, viewportHeight);
  }

  return rootNode;
}

module.exports = { fetch };