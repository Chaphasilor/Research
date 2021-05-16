require(`dotenv`).config()
const betterLogging = require(`better-logging`)
betterLogging(console, {
  format: process.env.environment !== `production` ? undefined : ctx => `${ctx.STAMP(new Date().toISOString().slice(0, 19).replace(`T`, `_`))} ${ctx.type} ${ctx.msg}`,
  messageConstructionStrategy: betterLogging.MessageConstructionStrategy.FIRST,
})
console.logLevel = process.env.environment === `development` ? 4 : 2
const os = require(`os`)
const fs = require(`fs`)
const probe = require('node-ffprobe')
const resizeImg = require('resize-img')

const extractFrames = require(`./util/extract-frames`)
const { findClosestFrame } = require(`./util/find-closest-frame`)

function* offsetGenerator(start = 0, step = 1) {
  let iterationCount = start
  let prev
  while (true) {
    prev = iterationCount
    iterationCount += step
    yield prev
  }
}


(async () => {

  let staticFrameDir = fs.mkdtempSync(`${os.tmpdir()}/${process.env.staticFrameDir}`)
  let rollingFramesDir = fs.mkdtempSync(`${os.tmpdir()}/${process.env.rollingFramesDir}`)
  console.log(`staticFrameDir:`, staticFrameDir)

  const videoDimensions = await getVideoDimensions()
  const video1IsLarger = videoDimensions[0].width >= videoDimensions[1].width 

  const staticFrameInput = video1IsLarger ? process.argv[2] : process.argv[4]
  const rollingFrameInput = video1IsLarger ? process.argv[4] : process.argv[2]

  const staticFrameOffset = parseInt(video1IsLarger ? process.argv[3] : process.argv[5])
  const rollingFrameOffset = parseInt(video1IsLarger ? process.argv[5] : process.argv[3])

  let staticFrame = extractFrames({
    input: staticFrameInput,
    outputDir: staticFrameDir,
    offsets: [staticFrameOffset],
  })[0]
  const staticFramePath = `${staticFrameDir}/${staticFrame.filename}`
  
  fs.writeFileSync(staticFramePath, await resizeImg(fs.readFileSync(staticFramePath), {
    format: `bmp`,
    width: videoDimensions[1].width,
    height: videoDimensions[1].height,
  }))

  let searchCenter = rollingFrameOffset // in milliseconds
  let searchResolution = parseInt((process.env.searchResolution))
  for (let iteration = 1; iteration <= process.env.iterations; iteration++) {
  
    console.log(`iteration:`, iteration)

    let searchWidth = process.env.searchWidthInSeconds / iteration
    
    console.log(`searchWidth:`, searchWidth)
    console.log(`searchCenter:`, searchCenter)
    console.debug(`parseInt((searchCenter - searchWidth*1000/2 ):`, parseInt((searchCenter - searchWidth*1000/2 )))
    console.debug(`searchWidth*1000 / searchResolution:`, searchWidth*1000 / searchResolution)

    const gen = offsetGenerator(parseInt((searchCenter - searchWidth*1000/2)), searchWidth*1000 / searchResolution)
    let offsets = new Array(searchResolution).fill(0).map(x => gen.next().value)

    console.log(`offsets:`, offsets)
    
    let exportedFrames = extractFrames({
      input: rollingFrameInput,
      outputDir: rollingFramesDir,
      offsets,
    })
  
    console.debug(`exportedFrames:`, exportedFrames)
    
    let closestMatch = await findClosestFrame(staticFramePath, rollingFramesDir)
    console.info(`Done.`)

    console.debug(`closestMatch:`, closestMatch)

    let closestOffset = exportedFrames.find(frame => frame.filename === closestMatch.filename)?.offset
    console.log(`closestOffset:`, closestOffset)
    searchCenter = closestOffset
    
  }

  let totalOffset = (staticFrameOffset - searchCenter).toFixed(0)
  console.info(`Video 2 is approx. ${Math.abs(totalOffset)} ms ${video1IsLarger && totalOffset > 0 ? `ahead` : `behind`} video 1`)

})()


async function getVideoDimensions() {

  let vid1Data = await probe(process.argv[2])
  let vid2Data = await probe(process.argv[4])

  console.log(`Video 1: width: ${vid1Data.streams[0].width}, height: ${vid1Data.streams[0].height}`)
  console.log(`Video 2: width: ${vid2Data.streams[0].width}, height: ${vid2Data.streams[0].height}`)

  if (vid1Data.streams[0].width > vid2Data.streams[0].width && vid1Data.streams[0].height < vid2Data.streams[0].height) {
    console.warn(`Videos have different aspect ratios. You might get worse results.`)
  }

  return [
    {
      width: vid1Data.streams[0].width,
      height: vid1Data.streams[0].height,
    },
    {
      width: vid2Data.streams[0].width,
      height: vid2Data.streams[0].height,
    },
  ]
  
}