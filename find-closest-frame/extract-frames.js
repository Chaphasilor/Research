const extractFrames = require('ffmpeg-extract-frames')
 
function* offsetGenerator(start = 0, step = 1) {
  let iterationCount = start
  let prev
  while (true) {
    prev = iterationCount
    iterationCount += step
    yield prev
  }
}
// const gen = offsetGenerator(114500, 50)
// const gen = offsetGenerator(parseInt(process.argv[3]), 100)
const gen = offsetGenerator(parseInt(process.argv[3]), 500)

let offsets = new Array(20).fill(0).map(x => gen.next().value)

module.exports = extractFrames({
  input: process.argv[2],
  output: './frames/screenshot-%i.png',
  // output: './input2.png',
  // offsets: [
  //   31000
  // ]
  offsets,
})
.then(result => {
  console.log(`Done.`)
})