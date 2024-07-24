import VideoPlayer from "./VideoPlayer"
import { useRef, useState } from 'react'

function App() {

  const playerRef = useRef(null)
  let [videoLink, setVideoLink] = useState(null)
  let [file, setFile] = useState("")

  let handleFileChange = (e) => {
    setFile(e.target.files[0])
    console.log(e.target.files[0])
  }

  const handleUpload = async () => {
    const formData = new FormData()
    formData.append("file", file)
  
    await fetch("http://localhost:8000/upload", {
      method: "POST",
      body: formData
    })
    .then(res => res.json())
    .then(jsonRes => {
      console.log(json);
      setVideoLink(jsonRes.videoUrl)
    })
    .catch(e => console.log(e))
  }

  // Below code copied from: https://videojs.com/guides/react/
  const videoPlayerOptions = {
    controls: true,
    responsve: true,
    fluid: true,
    sources: [{
      src: videoLink,
      type: "application/x-mpegURL",
      // type: 'video/mp4'
    }]
  }

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on('waiting', () => {
      videojs.log('player is waiting');
    });

    player.on('dispose', () => {
      videojs.log('player will dispose');
    });
  };

  return (
    <>
      <h1>Video Player</h1>{videoLink ? 
      <VideoPlayer options={videoPlayerOptions} onReady={handlePlayerReady} />
      : <h2>Loading video...</h2>
    }
    <input type="file" onChange={handleFileChange}/>
    <button onClick={handleUpload}>Change</button>
    </>
  );
}

export default App
