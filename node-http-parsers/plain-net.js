const net = require('net');
const fs = require(`fs`)

const host = '51.77.66.14';
const byteOffset = 2595000000
let socket = net.connect(80, host, function() {

const request = 
`GET /Trilogia%20%20John%20Wick%202014-2019%20REMUX%204K%20HDR%20Latino/John%20Wick%203%20Parabellum%202019%20REMUX%204K%20HDR%20Latino.mkv HTTP/1.1\r\nHost: ${host}\r\nUser-Agent: curl/7.64.0\r\nAccept: */*\r\nRange: bytes=${byteOffset}-\r\n\r\n`;
rawResponse = "";

// send http request:
socket.end(request);

// assume utf-8 encoding:
socket.setEncoding('utf-8');

const writeStream = fs.createWriteStream(`response.http`, { encoding: `utf-8` })
socket.pipe(writeStream)

// collect raw http message:
socket.on('data', function(chunk) {
    rawResponse += chunk;
});
socket.on('end', function(){
    console.log(rawResponse);
});


});