function parseResponse(rawResponse){

  let  responseArray =rawResponse.split('\r\n\r\n');
  
  let head = responseArray[0];
  let body = responseArray[1];
  // Strip chunk size numbers from chunked transfer encoding
body = body.replace(/^[0-9a-f]+\r\n/gim, '').replace(/\r\n/g, '').trim();

  let headersArray= head.split("\r\n");
  let statusLine = headersArray[0];
  let headers = headersArray.slice(1) // everything from index 1 onwards;
  let statusParts = statusLine.split(' ');
   let header = statusParts[0];
   let statusCode = Number(statusParts[1]);
   let statusText =statusParts[2];

   let headersObject = {};
  
  for(let item of headers){
     let split = item.split(': ');
     let key = split[0].toLowerCase();
     let value = split[1];
     headersObject[key] = value; 
  }

    return {statusCode,statusText,headersObject,body};
}

module.exports = {parseResponse};