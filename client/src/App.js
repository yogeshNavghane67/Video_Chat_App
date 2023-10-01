import React from 'react'
import { Typography, AppBar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import VideoPlayer from './components/VideoPlayer'
import Notifications from './components/Notifications'
import Options from './components/Options'

import './styles.css';
import { Gradient } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  appBar: {
    borderRadius: 165,
    margin: '40px 60px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '300px',
    //border: '2px solid black',
    background:  'linear-gradient(to right, rgba(124, 9, 132, 0.73), #6609a0 )',
    color: 'white',
    fontFamily: 'Poppins',
    fontSize: '3%',
    
    

    [theme.breakpoints.down('xs')]: {
      width: '90%',
    },
  },
  image: {
    marginLeft: '15px',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
}));

const App = () => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <AppBar className={ classes.appBar } position="static" color="inherit">
        <Typography variant="h4"  align="center" >Video chat</Typography>
      </AppBar>
     <VideoPlayer />
     <Options>
       <Notifications/>
     </Options>
    </div>
  );
}

export default App

