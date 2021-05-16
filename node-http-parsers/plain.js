const http = require(`http`)
const url = `http://51.77.66.14/Trilogia%20%20John%20Wick%202014-2019%20REMUX%204K%20HDR%20Latino/John%20Wick%203%20Parabellum%202019%20REMUX%204K%20HDR%20Latino.mkv`
const byteOffset = 2595000000
let chunkCounter = 0
let res = ""

const req = http.request(url, {
  method: `GET`,
  headers: {
    'Range': `bytes=${byteOffset}-`,
  },
}, (res) => {
  console.log(`STATUS:`, res.statusCode);
  console.log(`HEADERS:`, res.headers);
  // res.setEncoding('hex');
  res.on('data', (chunk) => {
    chunkCounter++
    res += chunk
    // needs to be registered so that the body is parsed
  });
})

req.on('error', (err) => {
  console.error(err)
  console.log(`chunkCounter:`, chunkCounter)
});
req.end();