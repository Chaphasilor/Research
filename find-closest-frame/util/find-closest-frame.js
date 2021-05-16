const fs = require('fs')
const PNG = require('pngjs').PNG
const bmp = require(`bmp-js`)
const pixelmatch = require('pixelmatch')
const resizeImg = require('resize-img')
const ssim = require(`ssim.js`).default

const ALGORITHMS = {
  MISMATCHED_PIXELS: 1,
  SSIM: 2,
}
const selectedAlg = ALGORITHMS.SSIM
// const selectedAlg = ALGORITHMS.MISMATCHED_PIXELS

module.exports.findClosestFrame = async function findClosestFrame(inputFile, frameInputDir) {

  const inputImage = bmp.decode(fs.readFileSync(inputFile))
  const { width, height } = inputImage

  console.info(`Looking for closest matching frame...`)

  const files = fs.readdirSync(frameInputDir, {
    withFileTypes: true
  }).filter(x => x.isFile())
  
  let closestMatch = {
    filename: undefined,
    value: selectedAlg === ALGORITHMS.SSIM ? -1 : Infinity,
  }
  
  for (const file of files) {
  
    let imageToCompare = bmp.decode(fs.readFileSync(`${frameInputDir}/${file.name}`));
    
    if (imageToCompare.width !== width || imageToCompare.height !== height) {
      console.log(`resizing...`)
      imageToCompare = bmp.decode(await resizeImg(fs.readFileSync(`${frameInputDir}/${file.name}`), {
        format: `bmp`,
        width,
        height,
      }));
    }
  
    let result
    if (selectedAlg === ALGORITHMS.SSIM) {
      result = ssim(inputImage, imageToCompare);
    } else {
      result = pixelmatch(inputImage.data, imageToCompare.data, null, width, height, {threshold: 0.1});
    }
  
    if (
      (selectedAlg === ALGORITHMS.SSIM && result.mssim > closestMatch.value) ||
      (selectedAlg === ALGORITHMS.MISMATCHED_PIXELS && result < closestMatch.value)
      ) {
        

      switch (selectedAlg) {
        case ALGORITHMS.SSIM:
          result = ssim(inputImage, imageToCompare);
          console.log(`result.mssim:`, result.mssim)
          if (result.mssim > closestMatch.value) {
            closestMatch = {
              filename: file.name,
              value: result.mssim,
            }
          }
          break;
        case ALGORITHMS.MISMATCHED_PIXELS:
          result = pixelmatch(inputImage.data, imageToCompare.data, null, width, height, {threshold: 0.1});
          console.log(`result:`, result)
          if (result < closestMatch.value) {
            closestMatch = {
              filename: file.name,
              value: result.mssim,
            }
          }
          break;
      
        default:
          throw new Error(`Invalid algorithm!`)
          break;
      }
    }
  
  }
  
  return closestMatch

}
