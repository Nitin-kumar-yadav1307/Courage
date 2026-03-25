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

const url = process.argv[2];

async function fetch(url){
  const {host,port,protocol,path} = parseURL(url);

  const rawResponse = await  sendRequest(host,port,path,protocol);

  const {statusCode,statusText,headersObject,body}  =  parseResponse(rawResponse);

  if (statusCode === 301 || statusCode === 302) {
    const newUrl = headersObject['location'];
    console.log('Redirecting to:', newUrl);
    return fetch(newUrl);
  }

  console.log('Status Code:', statusCode);
console.log('Status Text:', statusText);
console.log('Headers:', headersObject);
console.log('\n--- BODY ---\n');
console.log(body);

const tokens = tokenize(body);

const rootNode = buildDOM(tokens);

const styleNode = querySelector(rootNode, 'style');
if (styleNode) {
  const css = innerHTML(styleNode);
  const cssTokens = tokenizeCSS(css);
  const rules = parseCSS(cssTokens);
  styleMatcher(rootNode, rules);

}
calculateLayout(rootNode, 800, 0);

console.log(JSON.stringify(rootNode, null, 2));


}

fetch(url);