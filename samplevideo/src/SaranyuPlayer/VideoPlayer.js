import React,{useEffect, useState} from 'react'
// import { useState } from 'react'
// import {HHMMSS} from "../commonFunction/comman"
import VideoControler from './VideoControler'

function SaranyuVideoPlayer() {
    const [state, setState] = useState({
        play: false, mute: false, volume: 0.1, duration: null, time: null, currentTime: null, length: null,        
    })

    const handlePlayPause = async(e) =>{                
            let play = document.getElementById("sp")            
            if(state.play){
                play.play()
                setState({...state, play: !state.play})
            }else{
                play.pause()
                setState({...state, play: !state.play})
            }                        
        }

    const handleMute = () =>{
        state.mute ? setState({...state, mute: !state.mute}) : setState({...state, mute: !state.mute})
    }

    const handleVolume = () =>{
        let volumeRange = document.querySelector(".volume_range");
        document.getElementById("sp").volume = volumeRange.value
        // setState({...state, volume: volumeRange.value})
        // state.volume === "0" ? setState({...state, mute: true}) : setState({...state, mute: false})
        if(volumeRange.value === "0"){
            setState({...state, mute: true, volume: volumeRange.value})
        }else if(volumeRange.value !== "0"){
            setState({...state, mute: false, volume: volumeRange.value})
        }
        console.log(volumeRange.value)            
    }

    const handleDurationTime = () =>{
             const timeRange = document.querySelector(".seek");             
             document.getElementById("sp").currentTime = timeRange.value
            //  console.log(timeRange.value + parseInt(30))
             setState({...state, currentTime: timeRange.value})
            }

        useEffect(() => {
            // handleDurationTime()
            // setState({...state, currentTime: 0})
            // console.log(currentTime)
            // return () => {
            //     cleanup
            // }
        }, [])
    const {play, mute, volume, currentTime, length} = state;
    // const handleForword = () =>{
    //     let current = document.getElementById("sp")
    //    let  currenttime = current.currentTime;
    //     current.currentTime = currenttime + 10                
    // }
    return (
        <div className="container">
            <div className="video-player" >
                <video className="video" id="sp" width="1000" height="auto" muted={mute} autoPlay={play} >                    
                    <source src= "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4" type="video/mp4" />
                </video>
                <div className="control">
                    <VideoControler 
                        play={play} onPlayPause = {handlePlayPause}
                        mute={mute} onMute = {handleMute}
                        volume={volume} onVolume = {handleVolume}
                        currentTime = {currentTime} onDuration={handleDurationTime} length={length} 
                        // onForword = {handleForword}
                        />                
                </div>
            </div>                        
        </div>
    )
}
// mpd ajls
export default SaranyuVideoPlayer
