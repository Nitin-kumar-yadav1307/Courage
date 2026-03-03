const net = require("net");

function openSocket(host,port){
    return new Promise((resolve,reject)=>{

        const socket = net.createConnection({host: host, port:port}, function(){
            console.log("connected successfully");
        });
      
        let rawData = '';
        socket.on("data", (chunks)=>{
             rawData += chunks.toString();
            console.log(rawData);
        });

        socket.on('end', ()=>{
            resolve(rawData);
            console.log('disconnected')
        });

        socket.on('error',(e)=>{
            reject(e);
            console.log(e.message);
        })
    })
}

module.exports = { openSocket };