const net = require("net");
const tls = require("tls");

function openSocket(host, port, request, protocol) {
  return new Promise((resolve, reject) => {

    // Choose connection type
    const socket = protocol === 'https'
      ? tls.connect({ host, port, servername: host }, function() {
          console.log("connected successfully");
          socket.write(request);
        })
      : net.createConnection({ host, port }, function() {
          console.log("connected successfully");
          socket.write(request);
        });

    // Everything below is shared — same for both
    let rawData = '';

    socket.on('data', (chunk) => {
      rawData += chunk.toString();
    });

    socket.on('end', () => {
      resolve(rawData);
      console.log('disconnected');
    });

    socket.on('error', (e) => {
      reject(e);
      console.log(e.message);
    });

  });
}

module.exports = { openSocket };