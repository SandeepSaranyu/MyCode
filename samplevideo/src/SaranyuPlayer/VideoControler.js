import React, {useState, useEffect} from 'react'
import { Forward10, Fullscreen, Menu, More, MoreVert,MoreVertIcon, PauseCircleFilledOutlined, PlayCircleFilledOutlined, Replay10, Replay30, VolumeMuteTwoTone, VolumeUpTwoTone } from '@material-ui/icons'
import { HHMMSS } from '../commonFunction/comman'
import { IconButton, MenuItem } from '@material-ui/core'
import LongMenu from '../SaranyuPlayer/more'


const ITEM_HEIGHT = 48;

function VideoControler({play, onPlayPause,
                        mute, onMute,
                        volume, onVolume,
                        currentTime, onDuration, length,
                        onForword
                        }) {
       
        const [stateValue, setStateValue] = useState({playC: play, currentTimeC: currentTime, lengthC: length, 
                                            progressTime: null, updateTime: currentTime, imgseek: "", seekTool:"" })
        
        const {currentTimeC, progressTime, lengthC,seekTool, updateTime, progress, playC} = stateValue;
        // const [anchorEl, setAnchorEl] = useState(true);
        // const open = Boolean(anchorEl);

        const handleDuration = () =>{
            let duration = document.getElementById("sp").duration;                    
            duration = duration.toFixed();               
            let progress = HHMMSS(duration);   
            // console.log(progress)     
            setStateValue({ ...stateValue,
                lengthC : duration,
                progressTime : progress
            })
            return duration
        }
    
        const handleCurrentTime = async() =>{
            let current = document.getElementById("sp").currentTime;
            current = current.toFixed();                        
            
            let currentFormat = HHMMSS(current)
            // console.log(currentFormat)
           await setStateValue({...stateValue, updateTime: currentFormat, currentTimeC: current, imgseek: currentFormat });
            // console.log(stateValue.updateTime)
            // if(parseInt(state.currentTimeC) === parseInt(state.lengthC)){
            //     setState({...state, play: true});
            // }
            // console.log(updateTime)
            return [current, currentFormat]
        }

        const handleFullScreen =()=>{
            let elem = document.documentElement
            console.log(elem)
            if (elem.requestFullscreen) {
                elem.requestFullscreen();
              } else if (elem.webkitRequestFullscreen) { /* Safari */
                elem.webkitRequestFullscreen();
              } else if (elem.msRequestFullscreen) { /* IE11 */
                elem.msRequestFullscreen();
              }
        }

        
        const handleForwordRewind = (e, type) =>{
            if(type === "forword"){
                let current = document.getElementById("sp")
                let  currenttime = current.currentTime;
                current.currentTime = currenttime + 10                
            }else if(type === "rewind"){
                let current = document.getElementById("sp")
                let  currenttime = current.currentTime;
                current.currentTime = currenttime - 10                
            }
            
        }
        
        useEffect(() => {
            // handleDuration()
            // handleCurrentTime()
            // setStateValue({...stateValue, currentTimeC: "0"})
            // if(playC){
                setInterval(() => {
                let time = handleCurrentTime()
                // console.log(time[1])
                handleDuration()
                        // setStateValue({...stateValue, currentTimeC: handleCurrentTime(), lengthC: handleDuration() })
                    }, 1000);

                    
            // }            
            setInterval(()=>{
                updateSeekTooltip()
                updateProgress()
                // console.log(update[0] + '========='+ update[1])
            }                
            ,1000)
        }, [])        


        function updateProgress() {
            let seeks = document.getElementById('seek');
            let videoid = document.getElementById("sp");
            let progress = document.getElementById('progress-bar');
            let seek = seeks.value = Math.floor(videoid.currentTime);            
            let progressbar = progress.value = Math.floor(videoid.currentTime);
            // console.log(document.getElementById("sp").currentTime)
            // console.log(progressBar.value)
            return [seek, progressbar]
          }
        
        function updateSeekTooltip(event) {
            if(event){            
                let seektool = document.getElementById("seek-tooltip");
                let videoid = document.getElementById("sp");
                let img = document.getElementById("img")

                const skipTo = Math.round(
                    (event.nativeEvent.offsetX / event.nativeEvent.target.clientWidth) *
                        parseInt(event.target.getAttribute('max'), 10)
                    );
                    // console.log(skipTo)
                    seektool.textContent = HHMMSS(skipTo)
                    let video = videoid.getBoundingClientRect()
                    seektool.style.left = `${event.pageX - video.left}px`
                    img.style.left = `${event.pageX - video.left}px`
                    setStateValue({...stateValue, seekTool: HHMMSS(skipTo)})

                //   console.log(document.getElementById('seek').event.target.dataset.setAttribute("data-seek", skipTo))
                //   document.getElementById('seek').event.target.dataset.setAttribute('data-seek', skipTo)
                // console.log(event.target.dataset)
                // console.log(event.target.getAttribute('max'))
                // // console.log(event.currentTarget.attributes['tag'].value)
                // console.log(event.target.getAttribute("data-remove"))
            }
          }
        
        //   const [anchorEl, setAnchorEl] = React.useState(null);
        //   const open = Boolean(anchorEl);
        
        //   const handleClick = (event) => {
        //     setAnchorEl(event.currentTarget);
        //   };
        
        //   const handleClose = () => {
        //     setAnchorEl(null);
        //   };
        
        const handleMenuItemClicks = (e, i) =>{
            console.log(e)
            console.log(i)
            let videos = document.getElementById("sp");
            i === 0 ? videos.playbackRate = 0.5 : i === 1 ? videos.playbackRate = 1.0 : 
            i === 1.5 ? videos.playbackRate = 1.5 : videos.playbackRate = 3.0
        }
    return (
        <div className="control-container">            
            <div className="center-control">
                <span onClick={(e)=>handleForwordRewind(e, "forword")} className="icon-style">
                    <Forward10 id="icon" />
                </span>
                <span onClick={onPlayPause} className="icon-style">
                    {play?
                        <PlayCircleFilledOutlined  id="icon" />
                    :
                        <PauseCircleFilledOutlined id="icon" />    
                    }                
                </span>
                <span onClick={(e)=>handleForwordRewind(e, "rewind")} className="icon-style">
                    <Replay10 id="icon" />
                </span>
            </div>
            <div className="bottom-control">                        
                {/* <div style={{display:"flex", justifyContent:"space-between"}}>
                    <p style={{color:"white"}}>{`${progressTime}`}</p>
                    <span  >
                        <input className="duration" id="spr" type = "range" value= {currentTimeC} step={0.1} min={0} max={lengthC} 
                                onChange={onDuration}  
                                // onMouseOver={handleMouseOver}
                                // onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onMouseOver={handleMouseOver} 
                                // onMouseMoveCapture={handleCapture} onMouseOverCapture={overcap}

                                /> 
                    </span>
                    <p style={{color:"white"}}>{currentTimeC}</p>
                </div> */}                                    
                    <div class="video-progress">                                    
                        <progress className="progress-bar" id="progress-bar" value="0" min="0"></progress>                    
                        <input  className="seek" id="seek" value={currentTimeC} min="0" max={lengthC} type="range" step="1" 
                            onChange={onDuration}  onMouseMoveCapture={updateSeekTooltip}
                        />                    
                        <div className="seek-tooltip" id="seek-tooltip">00:00:00</div>
                        
                        {/* <img className="seek-img" id="img" onMouseMoveCapture={updateSeekTooltip} 
                        src="https://www.saranyu.in/assets/images/slides/tab-slide2.png" width = "100" />                         */}
                                                
                        {seekTool === "00:00:00"?
                        <img className="seek-img" id="img" onMouseMoveCapture={updateSeekTooltip} 
                        src="https://www.saranyu.in/assets/images/slides/tab-slide2.png" width = "100" />                        
                        :
                        seekTool === "00:00:30"?
                        <img className="seek-img" id="img" onMouseMoveCapture={updateSeekTooltip} 
                        src="https://www.saranyu.in/assets/images/logos/zee5.png" width = "100" />
                        :
                        <img className="seek-img" id="img" onMouseMoveCapture={updateSeekTooltip} 
                        src="https://www.saranyu.in/assets/images/logos/shemaroo_logo.svg" width = "100" />
                        }
                    </div>
                <div style={{display:"flex", justifyContent:"space-between"}}>
                    <div style={{display:"flex", justifyContent:"space-between"}}>
                        <span onClick={onPlayPause} className="icon-style">
                            {play?
                                <PlayCircleFilledOutlined  id="icon" />
                            :
                                <PauseCircleFilledOutlined id="icon" />    
                            }                
                        </span>
                        <span onClick={onMute} className="icon-style">
                            {mute?
                                <VolumeMuteTwoTone id="icon" />
                                :
                                <VolumeUpTwoTone id="icon" />
                                }
                        </span>
                        <span >
                            <input className="volume_range" type = "range" value= {volume} step={0.1} min={0} max={1} onChange={onVolume} /> 
                        </span>                
                        <span>
                            <p style={{color:"white"}}>
                                {progressTime}/{updateTime}
                            </p>
                        </span>
                    </div>
                    <div>
                        {/* <LongMenu onIndex={handleMenuItemClicks} /> */}

                    {/* <IconButton
                        aria-label="more"
                        aria-controls="long-menu"
                        aria-haspopup="true"
                        onClick={handleClick}
                    >
                        <MoreVert style={{color:"white"}}/>
                    </IconButton>
                    <Menu
                        id="long-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={open}
                        onClose={handleClose}
                        PaperProps={{
                        style: {
                            maxHeight: ITEM_HEIGHT * 4.5,
                            width: '20ch',
                        },
                        }}
                    >
                        {options.map((option) => (
                        <MenuItem key={option} selected={option === 'Pyxis'} onClick={handleClose}>
                            {option}
                        </MenuItem>
                        ))}
                    </Menu> */}
                    </div>
    {/* 
                    <span onClick={handleFullScreen} className="icon-style">
                        <Fullscreen id="icon"/>
                    </span> */}

                </div>
                
            </div>
        </div>
    )
}


const options = [
    'None',
    'Atria',
    'Callisto',
    'Dione',
    'Ganymede',
    'Hangouts Call',
    'Luna',
    'Oberon',
    'Phobos',
    'Pyxis',
    'Sedna',
    'Titania',
    'Triton',
    'Umbriel',
  ];
  

export default VideoControler
