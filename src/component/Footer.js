import {h, Fragment} from 'preact'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Icons from './Icons'


const useStyles = makeStyles(t => ({
  root: {
    minHeight: 30
  }

}));

const Footer = () => {
  const classes = useStyles()
  return (
    <Box className={classes.root} >
      <Typography variant='caption' >
        {'created with '}
        <Icons name='heart-fill' height={10} width={10} style={{ marginBottom: -2 }} /> 
        {' by razif'}
      </Typography>
    </Box>
  )
}

export default Footer
