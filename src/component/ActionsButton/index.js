import {h, Fragment} from 'preact'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Icons from '../Icons';

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'left',
    marginRight: theme.spacing(1)
  },
  title: {
    marginLeft: theme.spacing(1)
  }
}))

export default function ActionsButton({
  disabled,
  onChanges,
  play: playing
}) {
  const classes = useStyles();

  // console.log('>>> ActionsButton')

  return (
    <div className={classes.root}>
      <Button disabled={disabled} 
        onClick={() => { if(onChanges) onChanges(!playing) }} 
        variant={playing? 'outlined':'text'} 
        aria-haspopup="true" 
      >
        <Icons size={20} name={playing? 'stop':'play'} />
        <b class={classes.title}>{playing? 'Stop':'Play'}</b>
      </Button>
    </div>
  );
}