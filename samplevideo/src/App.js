import React from "react"
import './App.css';
import "./saranyuStyle.css"
// import VideoPlayer from "./Sample1/VideoPlayerSample";
import SaranyuVideoPlayer from "./SaranyuPlayer/VideoPlayer";
// import Video from "./SaranyuPlayer/Video";

function App() {  
  return (
    <span>      
      {/* <VideoPlayer src="https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4" /> */}
      <SaranyuVideoPlayer />
      {/* <Video /> */}
    </span>
  );
}

export default App;
