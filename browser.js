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
const { getComputedStyle } = require('./src/computed-styles.js')

async function fetch(url, viewportWidth, viewportHeight) {
  const {host, port, protocol, path} = parseURL(url);

  const rawResponse = await sendRequest(host, port, path, protocol);
  //console.log(rawResponse.slice(0, 500));

  const {statusCode, statusText, headersObject, body} = parseResponse(rawResponse);
 // console.log(body.slice(0, 3000));

  

  if (statusCode === 301 || statusCode === 302) {
    const newUrl = headersObject['location'];
  //  console.log('Redirecting to:', newUrl);
    return fetch(newUrl, viewportWidth, viewportHeight);
  }

  
 const tokens = tokenize(body);
 console.log('li tokens:', tokens.filter(t => t.name === 'li'));
 const ulIndex = tokens.findIndex(t => t.name === 'ul');
console.log('ul section tokens:', tokens.slice(ulIndex, ulIndex + 15));
// console.log('first 5 tokens:', tokens.slice(0, 5));
 //console.log('link token:', tokens.find(t => t.name === 'link'));
  const rootNode = buildDOM(tokens);
  
  allLinkNode = querySelectorAll(rootNode,'link');
 for (let link of allLinkNode) {
  if (!link.attributes.href) continue;
    if (link.attributes.rel === 'stylesheet') {
       let styleCSS = await fetchCSS(link.attributes.href);
       const cssTokens = tokenizeCSS(styleCSS);
       const rules = parseCSS(cssTokens); 
         console.log('selectors:', rules.map(r => r.selector).join(', '));            // https://github.com/    http://example.com
       //console.log('rules:', JSON.stringify(rules));
       styleMatcher(rootNode, rules);

    }
}

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
 // console.log('styleNode:', styleNode);
  if (styleNode) {
    const css = innerHTML(styleNode);
    const cssTokens = tokenizeCSS(css);
   // console.log('cssTokens:', JSON.stringify(cssTokens));
    const rules = parseCSS(cssTokens);
    console.log('selectors:', rules.map(r => r.selector).join(', '));
   //console.log('rules:', JSON.stringify(rules));
    styleMatcher(rootNode, rules);
  
  }

  const allStyledNodes = querySelectorAll(rootNode, '*');
for (let node of allStyledNodes) {
    node.computedStyles = getComputedStyle(node);
}
const htmlNode = querySelectorAll(rootNode, 'html')[0];
console.log('html styles:', htmlNode?.styles);

const ulNode = querySelectorAll(rootNode, 'ul')[0];
console.log('ul styles after styleMatcher:', ulNode?.styles);
  styleMatcher(rootNode, []);

  calculateLayout(rootNode, viewportWidth, 0, viewportWidth, viewportHeight);
//  console.log('body layout:', querySelector(rootNode, 'body').layout);

  
  let scriptNode = querySelector(rootNode, 'script');
  if (scriptNode) {
    let js = innerHTML(scriptNode);
   try {
    eval(js);
} catch(e) {
   // console.log('JS eval error:', e.message);
}
    calculateLayout(rootNode, viewportWidth, 0, viewportWidth, viewportHeight);
  }

  return rootNode;
}


async function fetchCSS(url){
 const {host, port, protocol, path} = parseURL(url);
   const rawResponse = await sendRequest(host, port, path, protocol);
   const {statusCode, statusText, headersObject, body} = parseResponse(rawResponse);
   return body;
}

module.exports = { fetch };