import {h, Fragment} from 'preact'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(t => ({
  root: {
   
  }

}));


const Header = () => {
  const classes = useStyles()

  return (
    <Box className={classes.root} >
      <Typography variant='h5'>
        Simple Object Detection
      </Typography>
    </Box>
  )
}

export default Header
