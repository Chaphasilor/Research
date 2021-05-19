const { exec, execSync } = require(`child_process`)
const fs = require("fs")
const probe = require(`node-ffprobe`)

function matchTracksAndStreams(video2) {
  return new Promise(async (resolve, reject) => {
  
    let mkvmergeInfo
    let ffprobeInfo
    
    // extract original info (e.g. track names) from video
    try {
      mkvmergeInfo = JSON.parse(execSync(`mkvmerge -J "${video2}"`))
    } catch (err) {
      console.debug(`mkvmerge error:`, err)
      return reject(new Error(`Error with mkvmerge. Is it installed and in your path?`))
    }

    // check if the video's tracks can be renamed in-place or if we need to create a mkv from it first
    // the first option is preferred if possible, because the second option takes many seconds
    let containerize = needsContainerization(video2)
    let videoToMatch = containerize ? `${video2}.match` : video2

    console.debug(`mkvmergeInfo:`, mkvmergeInfo)
    
    // filter out all video tracks (they are ignored by the tool)
    let audioTracks = mkvmergeInfo.tracks.filter(track => track.type === `audio`)
    let videoTracks = mkvmergeInfo.tracks.filter(track => track.type === `video`)

    // remember original track names for renaming later
    let mkvmergeOldTrackNames = audioTracks.map(track => {
      return {
        id: track.id,
        name: track.properties[`track_name`]
      }
    })
    console.debug(`mkvmergeOldTrackNames:`, mkvmergeOldTrackNames)

    if (containerize) {
      // track can't be renamed in-place, so create a mkv from it

      //TODO rename tracks with mkvmerge
      
      try {
        
        await new Promise((resolve, reject) => {

          let trackNameString = audioTracks.reduce((sum, track, id) => `${sum} --track-name ${track.id}:${id}`, ``)
          let trackOrderString = `--track-order ${mkvmergeInfo.tracks.reduce((sum, cur, index) => `${sum}${index === 0 ? `` : `,`}0:${cur.id}`, ``)}`
          console.log(`mkvmerge ${trackNameString} "${video2}" --no-cues -D ${trackOrderString} -o "${videoToMatch}"`)
          // let merger = exec(`mkvmerge ${trackNameString} "${video2}" --no-cues -D ${trackOrderString} -o "${videoToMatch}"`)
          // let merger = exec(`mkvmerge ${trackNameString} -D "${video2}" ${trackOrderString} --no-cues -o "${videoToMatch}"`)
          let merger = exec(`mkvmerge ${trackNameString} -D "${video2}" ${trackOrderString} --no-cues -o "${videoToMatch}"`)
    
          merger.stdout.setEncoding(`utf8`)
          merger.stderr.setEncoding(`utf8`)
    
          merger.stdout.on('data', (data) => {
            console.debug(`stdout: ${data}`);
          });
          merger.stderr.on('data', (data) => {
            console.warn(`Error from mkvmerge: ${data}`);
          });
    
          merger.on('close', (code, signal) => {
    
            if (code === null) {
              return reject(new Error(`mkvmerge was killed by '${signal}'`));
            }
            if (code !== 0) {
              return reject(new Error(`mkvmerge exited with code '${code}'`));
            }
    
            return resolve()
    
          })
  
        })

      } catch (err) {
        console.debug(`containerization error:`, err)
        return reject(new Error(`Error while converting the source video to Matroska. Do you have enough free space left (${fs.lstatSync(video2).size} bytes)?`))
      }

    } else {
      // tracks can be renamed in-place

      // build the flag string passed to mkvpropedit for renaming the audio tracks
      let editString = audioTracks.reduce((sum, track, id) => {
        return `${sum} --edit track:a${id+1} --set name=${id}`
      }, ``)

      // apply the renaming using mkvpropedit
      try {
        let trackRenamer = execSync(`mkvpropedit "${videoToMatch}" ${editString}`)
      } catch (err) {
        console.debug(`mkvpropedit error:`, err)
        return reject(new Error(`Error with mkvpropedit. Is it installed and in your path?`))
      }

    }

    // load track names and ids using mkvmerge
    try {
      mkvmergeInfo = JSON.parse(execSync(`mkvmerge -J "${videoToMatch}"`))
    } catch (err) {
      console.debug(`mkvmerge error:`, err)
      return reject(new Error(`Error with mkvmerge. The file with renamed tracks might be corrupted?`))
    }
    console.debug(`mkvmergeInfo.tracks:`, mkvmergeInfo.tracks)
    
    // load stream names and ids using ffprobe
    try {
      ffprobeInfo = await probe(videoToMatch)
    } catch (err) {
      console.debug(`ffprobe error:`, err)
      return reject(new Error(`Error with ffprobe. Is it installed and in your path?`))
    }
    console.debug(`ffprobeInfo.streams:`, ffprobeInfo.streams)

    // restore the tracks to their original names after in-place renaming
    if (containerize) {

      try {
        fs.rmSync(videoToMatch)
      } catch (err) {
        console.warn(`Couldn't delete (potentially very large) temporary files! You might wanna to this manually.\nPath: "${videoToMatch}"`)
      }
      
    } else {

      // build the flag string passed to mkvpropedit for restoring the audio tracks
      //!!! the mkvmerge track ids are not related to the `track:aX`-ids, they are just enumerated on a per-type basis
      //!!! this means that the order in which items inside mkvmergeOldTrackNames are is important! (it should be the same order as it was when renaming the first time)
      let editString = mkvmergeOldTrackNames.reduce((sum, track, id) => {
        return `${sum} --edit track:a${id+1} --set name=${track.name}`
      }, ``)

      // apply the renaming using mkvpropedit
      try {
        let trackRenamer = execSync(`mkvpropedit "${videoToMatch}" ${editString}`)
      } catch (err) {
        console.debug(`mkvpropedit error:`, err)
        return reject(new Error(`Error with mkvpropedit. The file with renamed tracks might be corrupted?`))
      }
      
    }

    //TODO check if mkvmerge and ffprobe found a different amount of tracks

    let trackInfos = []
    // find ffprobe's stream index and mkvmerge's track id for each audio track found
    //TODO move getting the track info into a separate function that also returns the track id
    for (const i in audioTracks) {

      let trackOffset = containerize ? videoTracks.length : 0
      let streamIndex = ffprobeInfo.streams.find(stream => stream.tags.title === String(i)).index + trackOffset
      let trackInfo = mkvmergeInfo.tracks.find(track => track.properties[`track_name`] === String(i))
      let trackId = trackInfo.id + trackOffset
      
      console.log(`Audio track #${i} has stream index '${streamIndex}' and track id '${trackId}'`)
      trackInfos.push({
        name: mkvmergeOldTrackNames.find(track => track.id === trackId).name,
        language: trackInfo.properties.language,
        codec: trackInfo.codec,
        channels: trackInfo.properties[`audio_channels`],
        ids: {
          ffprobe: streamIndex,
          mkvmerge: trackId,
        }
      })
      
    }

    return resolve(trackInfos)
    
  })
}
module.exports.matchTracksAndStreams = matchTracksAndStreams

function needsContainerization(video) {

  let mkvmergeInfo = JSON.parse(execSync(`mkvmerge -J "${video}"`))
  return mkvmergeInfo.container.type !== `Matroska`
  
}

// matchTracksAndStreams(`/mnt/c/Users/Chaphasilor/Videos/hobbit_1_ee.mp4`)
matchTracksAndStreams(`/mnt/c/Users/Chaphasilor/Videos/output.mkv`)
.then(tracks => console.info(`tracks:`, tracks))
.catch(err => console.error(`ERROR:`, err))
