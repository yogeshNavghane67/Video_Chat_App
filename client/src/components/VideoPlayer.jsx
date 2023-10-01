import React, { useContext } from 'react';
import { Grid, Typography, Paper, makeStyles } from '@material-ui/core';

import { SocketContext } from '../SocketContext';

const useStyles = makeStyles((theme) => ({
  video: {
    width: '650px',
    [theme.breakpoints.down('xs')]: {
      width: '300px',
    },
  },
  gridContainer: {
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  paper: {
    padding: '5px',
   // border: '1px solid black',
    margin: '0px',
    justifyItems: 'center',
    
  },

}));




const VideoPlayer = () => {
  const  { name, callAccepted, myVideo, userVideo, callEnded, stream, call} = useContext(SocketContext); //contain all variable pass in context provider
  const classes = useStyles();
  return (
    <Grid container className={classes.gridContainer}>
      {/* Our own video*/}
      {
        stream && (
          <Paper className={classes.paper}>
            <Grid item xs={12} md={6}>
              <Typography variant = "h5" gutterBottom >{name || 'Name'}</Typography>
              <video playsInline muted ref={myVideo} autoPlay className={classes.video}/>
            </Grid>   
          </Paper>
        )
      }
      {/* user video */}
      {
        callAccepted && !callEnded && (
          <Paper className={classes.paper}>
            <Grid item xs={12} md={6}>
              <Typography variant = "h5" gutterBottom>{call.name || 'Name'}</Typography>
              <video playsInline ref={userVideo} autoPlay className={classes.video}/>
            </Grid> 
         </Paper>
        )
      }    
    </Grid>
  )
}

export default VideoPlayer

