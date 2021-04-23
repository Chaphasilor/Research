const fs = require('fs');
const PNG = require('pngjs').PNG;
const pixelmatch = require('pixelmatch');
const resizeImg = require('resize-img');

const inputImage = PNG.sync.read(fs.readFileSync('input2.png'));
const {width, height} = inputImage;

require(`./extract-frames`).then(() => {

  findClosestImage()
  .then(() => {
    console.info(`Extracted all frames.`)
  })

})

async function findClosestImage() {

  console.info(`Looking for closest matching frame...`)

  const files = fs.readdirSync(`./frames`, {
    withFileTypes: true
  }).filter(x => x.isFile())
  
  let closestMatch = {
    filename: undefined,
    mismatchedPixels: Infinity,
  }
  
  for (const file of files) {
  
    let imageToCompare = PNG.sync.read(fs.readFileSync(`./frames/${file.name}`));
    // let imageToCompare
    if (imageToCompare.width !== width || imageToCompare.height !== height) {
      // console.log(`resizing...`)
      imageToCompare = PNG.sync.read(await resizeImg(fs.readFileSync(`./frames/${file.name}`), {
        format: `png`,
        width,
        height,
      }));
    }
  
    let result = pixelmatch(inputImage.data, imageToCompare.data, null, width, height, {threshold: 0.1});
  
    if (result < closestMatch.mismatchedPixels) {
      closestMatch = {
        filename: file.name,
        mismatchedPixels: result,
      }
    }
  
    // console.log(`result:`, result)
  
  }
  
  console.info(`Closest match: '${closestMatch.filename}' with ${closestMatch.mismatchedPixels} mismatched pixels`)

}
