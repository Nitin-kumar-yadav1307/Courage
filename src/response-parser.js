function parseResponse(rawResponse){

  let  responseArray =rawResponse.split('\r\n\r\n');
  
  let head = responseArray[0];
  
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
  let body = responseArray[1];
   console.log('BODY START:', body.slice(0, 100));
   // Strip chunk size numbers from chunked transfer encoding
   console.log('transfer-encoding:', headersObject['transfer-encoding']);
  if(headersObject['transfer-encoding'] === 'chunked') {
   let result = '';
    let remaining = body ;
    while(remaining.length > 0){
      
   let end = remaining.indexOf('\r\n');
if(end === -1) end = remaining.indexOf('\n');
   let size = remaining.slice(0,end) ;
   size = parseInt(size,16);
   if(size == 0 || isNaN(size)) break;

   let chunk = remaining.slice(end + 2, end + 2 + size);
   result += chunk ;
   remaining = remaining.slice(end + 2 + size + 2);
    }
    body = result;
    console.log('DECODED BODY:', body.slice(0, 100));
}

    return {statusCode,statusText,headersObject,body};
}

module.exports = {parseResponse};