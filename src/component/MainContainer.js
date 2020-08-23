import {h, Fragment} from 'preact'
import makeStyles from '@material-ui/core/styles/makeStyles';
import Box from '@material-ui/core/Box';
import LiveCameraDetection from './LiveCameraDetection';

const useStyles = makeStyles(t => ({
  root: {
    // display: 'flex',
    justifyContent: 'center',
  }
}));

const MainContainer = () => {
  const classes = useStyles()

  return (
    <Box className={classes.root}>
      <LiveCameraDetection/>
    </Box>
  )
}

export default MainContainer
