const  {openSocket} = require("./socket.js");

async function sendRequest(host,port,path,protocol){
    let requestString = 
  'GET ' + path + ' HTTP/1.1\r\n' +
  'Host: ' + host + '\r\n' +
  'User-Agent: Courage/1.0 (Browser from scratch)\r\n' +
  'Connection: close\r\n' +
  '\r\n';

  let rawResponse = await openSocket(host,port,requestString,protocol);

  return rawResponse;

}

module.exports = {sendRequest};
