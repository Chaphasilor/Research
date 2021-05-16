const cliProgress = require(`cli-progress`)

const http = require(`http`)
const https = require(`https`)
const undici = require(`undici`)
const fetch = require(`node-fetch`)
const { DownloaderHelper } = require(`node-downloader-helper`)

const urlsToTest = [
  // `https://google.com/`,
  `http://51.77.66.14/Trilogia%20%20John%20Wick%202014-2019%20REMUX%204K%20HDR%20Latino/John%20Wick%203%20Parabellum%202019%20REMUX%204K%20HDR%20Latino.mkv`,
  // `http://51.77.66.14/Trilogia%20%20John%20Wick%202014-2019%20REMUX%204K%20HDR%20Latino/%20John%20Wick%202014%20REMUX%204K%20HDR%20Latino.mkv`,
  // `https://pan.gou13.cn/%E7%A6%BB%E7%BA%BF%E4%B8%8B%E8%BD%BD/Alita.Battle.Angel.2019.2160p.BluRay.x264.8bit.SDR.DTS-HD.MA.TrueHD.7.1.Atmos-SWTYBLZ/Alita.Battle.Angel.2019.2160p.BluRay.x264.8bit.SDR.DTS-HD.MA.TrueHD.7.1.Atmos-SWTYBLZ.mkv`,
];

(async function() {

  for (const url of urlsToTest) {
  
    let response

    try {

      response = await performRequest(process.argv[3], url, process.argv[2].toUpperCase(), Number(process.argv[4]))
      console.log(`Done`)
      // console.log(`response:`, response)
      
    } catch (err) {
      console.error(`Error using ${process.argv[3]}:`, err)
    }
    
  }

})()

function performRequest(type, url, method, offset) {
  return new Promise((resolve, reject) => {

    let pb
    let length
    let received = offset || 0
    let urlObj = new URL(url)
    let native = urlObj.protocol === `https:` ? https : http

    switch (type) {
      case `native`:
        
        console.log(`Requesting natively...`)

        const req = native.request(url, {
          method,
          headers: {
            'Range': `bytes=${received}-`,
          }
        }, (res) => {

          console.log(`STATUS:`, res.statusCode);
          console.log(`HEADERS:`, res.headers);
          length = res.headers["content-length"]
          pb = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic)
          pb.start(length, received)
          res.setEncoding('hex');

          res.on('data', (chunk) => {

            received += chunk.length
            pb.update(received)

          });
          res.on('end', () => {

            pb.stop()
            resolve(res)

          });

        });
        
        req.on('error', (err) => {
          reject(err)
        });

        req.end();
      
        break;
      case `undici`:
        
        let client = new undici.Client(`${urlObj.protocol}//${urlObj.host}`)
        client.request({
          method,
          path: urlObj.pathname,
          headers: {
            'Range': `bytes=${received}-`,
          }
        })
        .then((data) => {
          
          const {
            statusCode,
            headers,
            trailers,
            body
          } = data
        
          console.log('response received', statusCode)
          console.log('headers', headers)
        
          length = headers["content-length"]
          pb = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic)
          pb.start(length, received)
          body.setEncoding('hex')
          
          body.on('data', (chunk) => {

            received += chunk.length
            pb.update(received)

          });
          body.on('end', () => {

            console.log('trailers', trailers)
            pb.stop()
            resolve()

          });
        
          client.close()
          
        })
        .catch(err => {
          reject(err)
        })
      
        break;

      case `fetch`:

        fetch(url, {
          method,
          headers: {
            'Range': `bytes=${received}-`,
          }
        })
        .then((res) => {

          length = res.headers.get("content-length")
          pb = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic)
          pb.start(length, received)
          res.body.setEncoding('hex')
          
          res.body.on('data', (chunk) => {

            received += chunk.length
            pb.update(received)

          });
          res.body.on('end', () => {

            pb.stop()
            resolve()

          });
          
        })
        .catch(reject)

        break;

      case `ndh`:

        let newlyReceived = 0
        const dl = new DownloaderHelper(url, __dirname, {
          method,
          headers: {
            'Range': `bytes=${received}-`,
          }
        })

        dl.on('download', (downloadInfo) => {

          length = downloadInfo.totalSize
          pb = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic)
          pb.start(length, received)
          
        })
        dl.on(`progress.throttled`, (stats) => {

          newlyReceived = stats.downloaded
          pb.update(received + newlyReceived)
          
        })
        dl.on(`error`, error => {
          console.error(error)
        })
        dl.on(`stateChanged`, (state) => {
          if (state === `FAILED`) {
            return reject(state)
          }
        })
        // dl.on('end', resolve())
        dl.start();
        
        break;
    
      default:
        break;
    }

  })
}
