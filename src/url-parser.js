

function parseURL(url){
    let protocolEnd = url.indexOf("://");
    let protocol = url.slice(0, protocolEnd);

    let hostStart = protocolEnd + 3;

    // Find first "/" after protocol
    let pathStart = url.indexOf("/", hostStart);

    // If no path, set to end
    if (pathStart === -1) {
        pathStart = url.length;
    }

    let hostPort = url.slice(hostStart, pathStart);

    let host, port;

    if (hostPort.includes(":")) {
        let parts = hostPort.split(":");
        host = parts[0];
        port = Number(parts[1]);
    } else {
        host = hostPort;
        port = protocol === "https" ? 443 : 80;
    }

    let path = pathStart < url.length ? url.slice(pathStart) : "/";

    return{
        protocol,
        host,
        port,path
    };


}

module.exports = {parseURL};