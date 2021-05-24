const startStopwatchButton = document.querySelector(`#start-stopwatch`)
const output = document.querySelector(`#output`)
const counterOutput = document.querySelector(`#counter`)

startStopwatchButton.addEventListener(`click`, startStopwatch)

audioObj = new Audio(`silence.mp3`);

var stopwatch = {
  counter: 0,
  interval: null
}

function resumeStopwatch() {
 return setInterval(() => {
  updateMetadata({
    title: ++stopwatch.counter
  })
}, 1000)
}

function updateMetadata(data) {

  let oldMetadata = navigator.mediaSession.metadata
  navigator.mediaSession.metadata = new MediaMetadata({
    title: data.title || oldMetadata?.title,
    artist: data.artist || oldMetadata?.artist,
    album: data.album || oldMetadata?.album,
    artwork: data.artwork || oldMetadata?.artwork
  });
  counterOutput.innerText = navigator.mediaSession.metadata.title
  
}

function setStopwatchState(state) {
  switch (state) {
    case `running`:
      audioObj.play()
      stopwatch.interval = resumeStopwatch()
      navigator.mediaSession.playbackState = `playing`;
      updateMetadata({
        title: stopwatch.counter
      })
      output.innerText = `Stopwatch running`
      break;
    case `paused`:
      audioObj.pause()
      clearInterval(stopwatch.interval)
      navigator.mediaSession.playbackState = `paused`;
      updateMetadata({
        title: `${navigator.mediaSession.metadata.title} (paused)`
      })
      output.innerText = `Stopwatch paused`
      break;
    case `stopped`:
      audioObj.pause()
      clearInterval(stopwatch.interval)
      navigator.mediaSession.playbackState = `paused`;
      stopwatch.counter = 0
      updateMetadata({
        title: `Stopped`
      })
      output.innerText = `Stopwatch stopped`
      break;
  
    default:
      audioObj.pause()
      clearInterval(stopwatch.interval)
      navigator.mediaSession.playbackState = `none`;
      startStopwatchButton.innerText = `Stopwatch stopped`
      break;
  }
}

async function startStopwatch() {
  if (`mediaSession` in navigator) {
    
    console.log(`Starting stopwatch...`);
    
    await audioObj.play()
    audioObj.loop = true
    console.log(`audioObj:`, audioObj)

    setStopwatchState(`stopped`)

    updateMetadata({
      title: `Stopwatch started!`,
      artist: `Stopwatch`,
    });
    
    setStopwatchState(`running`)

    const actionHandlers = [
      [`play`, () => {
        console.log(`User pressed play`);
        setStopwatchState(`running`)
      }],
      [`pause`, () => {
        console.log(`User pressed pause`);
        setStopwatchState(`paused`)
      }],
      [`stop`, () => {
        setStopwatchState(`stopped`)
        updateMetadata({
          title: `Stopped!`
        })
      }],
      [`seekbackward`, (details) => {
        console.log(`details:`, details)
        console.log(`User seeked backward by ${details.seekOffset} seconds`)
      }],
      [`seekforward`, (details) => {
        console.log(`details:`, details)
        console.log(`User seeked forward by ${details.seekOffset} seconds`)
      }],
      [`seekto`, (details) => {
        console.log(`User seeked to ${details.seekTime} seconds`)
      }],
      [`previoustrack`, () => {
        console.log(`User skipped backward`);
        updateMetadata({
          title: --stopwatch.counter
        })
      }],
      [`nexttrack`, () => {
        console.log(`User skipped forward`);
        updateMetadata({
          title: ++stopwatch.counter
        })
      }],
      [`skipad`, () => {
        console.log(`User requested to skip the ad`);
      }],
      /* Video conferencing actions */
      [`togglemicrophone`, () => {
        console.log(`User toggled the microphone`);
      }],
      [`togglecamera`, () => {
        console.log(`User toggled the camera`);
      }],
      [`hangup`, () => {
        console.log(`User hang up the call`);
      }],
    ];
    
    for (const [action, handler] of actionHandlers) {
      try {
        navigator.mediaSession.setActionHandler(action, handler);
      } catch (error) {
        console.log(`The media session action "${action}" is not supported yet.`);
      }
    }
    
  } else {
    alert(`Media playback not supported!`)
  }
}