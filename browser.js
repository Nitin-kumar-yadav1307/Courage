const {openSocket} = require("./src/socket.js");
const {parseResponse} = require("./src/response-parser.js");
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
const { getComputedStyle } = require('./src/computed-styles.js');
const {parseURL, resolveURL} = require("./src/url-parser.js");

async function fetch(url, viewportWidth, viewportHeight) {
  const {host, port, protocol, path} = parseURL(url);

  const rawResponse = await sendRequest(host, port, path, protocol);
  
  //console.log(rawResponse.slice(0, 500));

  const {statusCode, statusText, headersObject, body} = parseResponse(rawResponse);
 // console.log(body.slice(0, 3000));
 console.log('=== PAGE BODY length:', body.length);
console.log('=== PAGE BODY FULL:', body);

  

  if (statusCode === 301 || statusCode === 302) {
    const newUrl = headersObject['location'];
    return fetch(newUrl, viewportWidth, viewportHeight);
  }

  const tokens = tokenize(body);

  console.log('total tokens:', tokens.length);
  console.log('div tokens:', tokens.filter(t => t.name === 'div'));

  const rootNode = buildDOM(tokens);

  console.log('document root children:', rootNode.children.map(c => c.name || c.type));
  const htmlNodeCheck = rootNode.children.find(c => c.name === 'html');
  console.log('html children:', htmlNodeCheck?.children.map(c => c.name || c.type));

  const bodyNode = querySelector(rootNode, 'body');
  console.log('body children:', bodyNode.children.map(c => c.name || c.type));

  allLinkNode = querySelectorAll(rootNode,'link');
  for (let link of allLinkNode) {
    if (!link.attributes.href) continue;
    if (link.attributes.rel === 'stylesheet') {
      let absoluteHref = resolveURL(url, link.attributes.href);
      let styleCSS = await fetchCSS(absoluteHref);
      const cssTokens = tokenizeCSS(styleCSS);
      const rules = parseCSS(cssTokens);
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

 styleMatcher(rootNode, []);

const allStyledNodes = querySelectorAll(rootNode, '*');
for (let node of allStyledNodes) {
        node.computedStyles = getComputedStyle(node);
    }
const htmlNode = querySelectorAll(rootNode, 'html')[0];
console.log('html styles:', htmlNode?.styles);


const ulNode = querySelectorAll(rootNode, 'ul')[0];
console.log('ul styles after styleMatcher:', ulNode?.styles);
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
   console.log('=== PAGE BODY length:', body.length);
console.log('=== PAGE BODY FULL:', body);
   console.log('body length:', body.length);
console.log('body FULL:', body);
console.log('transfer-encoding header:', headersObject['transfer-encoding']);
   return body;
}

module.exports = { fetch };