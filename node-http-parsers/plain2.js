const http = require(`http`)

const url = `http://51.77.66.14/Trilogia%20%20John%20Wick%202014-2019%20REMUX%204K%20HDR%20Latino/John%20Wick%203%20Parabellum%202019%20REMUX%204K%20HDR%20Latino.mkv`
const byteOffset = 2595000000;

performRequest(url)
.then(res => {
  console.log(`Done:`, res)
})
.catch(err => {
  console.error(`Error:`, err)
})

function performRequest(url) {
  return new Promise((resolve, reject) => {

    const req = http.request(url, {
      method: `GET`,
      headers: {
        'Range': `bytes=${byteOffset}-`,
      }
    }, (res) => {

      console.log(`STATUS:`, res.statusCode);
      console.log(`HEADERS:`, res.headers);
      res.setEncoding('hex');

      res.on('data', (chunk) => {

      });
      res.on('end', () => {

        resolve(res)

      });

    });
    
    req.on('error', (err) => {
      reject(err)
    });

    req.end();
      
  })
}
