import React from 'react'
import Control from './control'
import './style.css'
function Video() {
    return (
        <div className="container">
            <div className="video-container" id = "video-container">
                {/* <video className="video-player" id="video">
                    <source src="https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4" type="video/mp4"></source>
                </video> */}
                <div className = "video-controler" id = "video-controler">
                    <Control />
                </div>
            </div>
        </div>
    )
}

export default Video
