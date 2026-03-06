const {openSocket} = require("./src/socket.js");
const {parseResponse} = require("./src/response-parser.js");
const {parseURL} = require("./src/url-parser.js");
const {sendRequest} = require("./src/http-request.js");
const url = process.argv[2];

async function fetch(url){
  const {host,port,protocol,path} = parseURL(url);

  const rawResponse = await  sendRequest(host,port,path);

  const {statusCode,statusText,headersObject,body}  =  parseResponse(rawResponse);

  console.log('Status Code:', statusCode);
console.log('Status Text:', statusText);
console.log('Headers:', headersObject);
console.log('\n--- BODY ---\n');
console.log(body);
}

fetch(url);