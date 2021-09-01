import React, { useRef, useState } from 'react'
import ReactPlayer from 'react-player'
import {Container} from '@material-ui/core';
import VideoControl from '../Controls/VideoControl';
import screenfull from 'screenfull';


function VideoStreaming() {
    const [state, setState] = useState({
        play: false, mute: false, volume: 1, playBack: 1.0, progress: 0
    })
    const playerRef  = useRef(null)
    const playerContainRef = useRef()

    const handlePlayPause = () =>{
        setState({...state, play: !state.play})
    }

    const handleForword = () =>{
        playerRef.current.seekTo(playerRef.current.getCurrentTime() + 30)
    }

    const handleReplay = () =>{
        playerRef.current.seekTo(playerRef.current.getCurrentTime() - 30)
    }

    const handleMute = () =>{
        setState({...state, mute: !state.mute})
    }

    const handleVolumeUp = (e, update) =>{
        setState({...state,
                    volume: parseFloat(update/100),
                    mute: update === 0? true : false,
                })                    
    }

    const handleVolumeDown = (e, update) =>{
        setState({...state,
                    volume: parseFloat(update/100),
                    mute: update === 0? true : false,
                })                    
    }

    const handlePlayBackSpeed = (speed) =>{
        setState({...state,
                    playBack: speed})
    }

    const handleFullScreen = () =>{
        screenfull.toggle(playerContainRef.current)
    }

    const handleProgress = (changeState) =>{        
        setState({...state, ...changeState, progress: changeState.played})
    }

    const {play, mute, volume, playBack, progress} = state;
    return (
        <div>
            <span style={{display:"flex", justifyContent:"center"}}><h1>SARANYU</h1></span>            
            <Container maxWidth="md">
                <div ref={playerContainRef} className="video-player">
                    <ReactPlayer 
                        ref = {playerRef} 
                        playing = {play}
                        muted = {mute}
                        url = "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4"
                        width = '100%'
                        height = '100%'
                        volume = {volume}
                        playbackRate = {playBack}
                        onProgress = {handleProgress}    
                        // controls
                        />                    
                <VideoControl 
                    playPaus={handlePlayPause} play={play} 
                    onForward = {handleForword} onReplay = {handleReplay}
                    onMute = {handleMute} mute = {mute}
                    onVolumeUp = {handleVolumeUp} onVolumeDown = {handleVolumeDown} volume = {volume}
                    onPlayback = {handlePlayBackSpeed} playBack = {playBack}
                    onFullScreen = {handleFullScreen}
                    progress = {progress}
                />     
                </div>                       
            </Container>            
        </div>
    )
}
  
export default VideoStreaming