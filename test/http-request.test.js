const { sendRequest } = require('../src/http-request');

sendRequest('info.cern.ch', 80, '/')
  .then((rawResponse) => {
    console.log('✅ Got response');
    console.log(rawResponse);
  })
  .catch((err) => {
    console.log('❌ Error:', err.message);
  });