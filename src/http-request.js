const  {openSocket} = require("./socket.js");

async function sendRequest(host,port,path){
    let requestString = 
  'GET ' + path + ' HTTP/1.1\r\n' +
  'Host: ' + host + '\r\n' +
  'Connection: close\r\n' +
  '\r\n';

  let rawResponse = await openSocket(host,port,requestString);

  return rawResponse;

}

module.exports = {sendRequest};
