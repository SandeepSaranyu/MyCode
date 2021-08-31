import React, { useState } from 'react'
import ReactPlayer from 'react-player'
import {Container, Grid, IconButton, Menu, MenuItem} from '@material-ui/core';
// import MoreVertIcon from '@material-ui/icons/MoreVert';

const option = ["Configuration", "Settings", "Login"];
const ITEM_HEIGHT = 48;


function VideoStreaming() {

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

    return (
        <div>
            <h1>SARANYU</h1>
            <Container maxWidth="md">
                <div className="video-player">
                    <ReactPlayer  
                        playing
                        url='http://techslides.com/demos/sample-videos/small.mp4'
                        width='100%'
                        height='100%'
                        controls
                        />
                    <div className="video-control">
                        <Grid container direction="row" alignItems="center" justifyContent="space-between">
                            <Grid item>
                                <p>Ranjha</p>
                            </Grid>
                            <Grid item>
                            <IconButton
                                aria-label="more"
                                aria-controls="long-menu"
                                aria-haspopup="true"
                                onClick={handleClick}
                            >
                                {/* <MoreVertIcon /> */}                                
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
                                {option.map((option) => (
                                <MenuItem key={option} selected={option === 'Pyxis'} onClick={handleClose}>
                                    {option}
                                </MenuItem>
                                ))}
                            </Menu>
                            </Grid>
                        </Grid>
                    </div>                        
                </div>
            
            </Container>            
        </div>
    )
}
export default VideoStreaming