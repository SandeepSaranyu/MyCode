import React, { useState } from 'react'
import {Grid, IconButton, Menu, MenuItem, Slider, Tooltip, Button, Typography, Popover} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Forward30, Fullscreen, Pause, PauseCircleOutline, PlayArrow, PlayArrowOutlined, Replay30, VolumeOff, VolumeUp } from '@material-ui/icons';

const option = ["Configuration", "Settings", "Login"];
const ITEM_HEIGHT = 48;


function VideoControl({playPaus, play,
                       onForward, onReplay,
                       onMute, mute,
                       onVolumeUp, onVoluemDown, volume,
                       onPlayback, playBack,
                       onFullScreen,
                       progress
                    }) {
    
    const [anchorEl, setAnchorEl] = useState(null);
    const [speedbol, setSpeedbol] = useState(null);
    const open = Boolean(anchorEl);
    const openspeed = Boolean(speedbol)
    const id = openspeed ? 'playbackrate-popover' : undefined;
    

  const handleClick = (event, data) => {          
      if(data=== "more"){
        setAnchorEl(event.currentTarget);
      }    
    if(data === "speed"){
        setSpeedbol(event.currentTarget)
    }
  };
  
  const handleClose = () => {
    setAnchorEl(null);
    setSpeedbol(null);
  };

    return (
        <div>            
            {/* Top of the video */}
            <div className="video-control">
                <Grid container direction="row" alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <p style={{color:"white"}} >Sample video.mp4</p>
                    </Grid>
                    <Grid item>
                        <IconButton
                            aria-label="more"
                            aria-controls="menu"
                            aria-haspopup="true"
                            onClick={(e)=>handleClick(e,"more")}
                            // color="primary"
                            style={{color:"white"}}
                        >
                            <MoreVertIcon  />   
                        </IconButton>                                                                                         
                        <Menu
                            id="menu"
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
                            {option.map((option) => (
                            <MenuItem key={option} selected={option === 'Pyxis'} onClick={handleClose}>
                                {option}
                            </MenuItem>
                            ))}
                        </Menu>
                    </Grid>
                </Grid>
{/* Center control                         */}
                <Grid container direction="row" alignItems="center" justifyContent="center">
                    <IconButton onClick={onReplay} className="icon-custom" aria-label="required">
                        <Replay30 />
                    </IconButton>
                    <IconButton onClick={playPaus} className="icon-custom" aria-label="required">
                      {play? <PauseCircleOutline /> : <PlayArrowOutlined /> }
                    </IconButton>
                    <IconButton onClick={onForward} className="icon-custom" aria-label="required">
                        <Forward30 />
                    </IconButton>
                </Grid>
{/* Bottom control                         */}
                <Grid container direction="row" justifyContent="space-between" alignItems="center" style={{padding:"10px"}}>
                    {/* <PrettoSlider min={0} max={100} defaultValue={20} /> */}
                    <Grid item xs={12}>
                        <Slider
                            min={0}
                            max={100}
                            style={{color:"#fff"}}
                            ValueLabelComponent={ValueLabelComponent}
                            aria-label="custom thumb label"
                            value = {progress * 100}
                        />
                    </Grid>
                    <Grid item>
                        <Grid container alignItems="center" >
                            <IconButton onClick={playPaus} className="bottom-play" style={{color:"#fff"}}>
                               {play? <Pause/> : <PlayArrow/>  }
                            </IconButton>
                            <IconButton onClick={onMute} className="bottom-play" style={{color:"#fff"}}>
                               {mute? <VolumeOff /> : <VolumeUp/>   }
                            </IconButton>
                            <span style={{display: "flex"}}>
                                <Slider 
                                    min={0} max={100} defaultValue={volume * 100} style={{ width: 100}} 
                                    onChange={onVolumeUp} onChangeCommitted={onVoluemDown}
                                    />
                            </span>                                    
                            <Button variant="text"className="bottom-play" style={{color:"#fff"}}>
                                <Typography>05:30</Typography>
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Button onClick={(e)=>handleClick(e, "speed")} variant="text"className="bottom-play" style={{color:"#fff"}}>
                            <Typography>{playBack}X</Typography>
                        </Button>
                        <Popover
                            id={id}
                            open={openspeed}
                            anchorEl={speedbol}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                                }}
                            transformOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                                }}
                        >
                            <Grid container direction="column-reverse">
                            {[0.5, 1, 1.5, 2].map(e=>
                            <Button onClick={()=> onPlayback(e)} variant="text">
                                <Typography color={e === playBack? "primary" : "default"}>{e}X</Typography>
                            </Button>
                            )}
                            </Grid>   
                        </Popover>
                        <IconButton onClick={onFullScreen} className="bottom-play" style={{color:"#fff"}}>
                            <Fullscreen />                                    
                        </IconButton>
                    </Grid>
                </Grid>                        
            </div>                                    
        </div>
    )
}


function ValueLabelComponent(props) {
    const { children, open, value } = props;
  
    return (
      <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
        {children}
      </Tooltip>
    );
  }

// const PrettoSlider = withStyles({
//     root: {
//       color: 'primary',
//       height: 8,
//     },
//     thumb: {
//       height: 24,
//       width: 24,
//       backgroundColor: '#fff',
//       border: '2px solid currentColor',
//       marginTop: -8,
//       marginLeft: -12,
//       '&:focus, &:hover, &$active': {
//         boxShadow: 'inherit',
//       },
//     },
//     active: {},
//     valueLabel: {
//       left: 'calc(-50% + 4px)',
//     },
//     track: {
//       height: 8,
//       borderRadius: 4,
//     },
//     rail: {
//       height: 8,
//       borderRadius: 4,
//     },
//   })(Slider);


export default  VideoControl