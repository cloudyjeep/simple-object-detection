import {h, Fragment} from 'preact'
import { useState, useEffect } from 'preact/compat';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import Icons from '../Icons';

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'left'
  },
  title: {
    marginLeft: theme.spacing(1)
  }
}));


export default function SelectCamera({data: camera, selected, onChanges, disabled}) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const anyCamera = camera.length > 0
  
  const handleButtonClick = e => setAnchorEl(e.currentTarget)

  const handleItemClick = id => e => {
    setAnchorEl(null)
    if(onChanges && id) onChanges(id)
  }
  // console.log('-->> SelectCamera', [this])

  if(!selected && anyCamera) {
    const id = camera[0][0]
    if(onChanges) onChanges(id)
  }
  const cameraSelected = anyCamera && selected && camera.find(c => c[0] == selected) || []
  const cameraName = cameraSelected[1] || 'Camera not found'

  return (
    <div className={classes.root}>
      <Button aria-controls={classes.title} variant='text' aria-haspopup="true" 
        onClick={handleButtonClick}
        disabled={disabled}
      >
        <Icons size={20} name='camera-video' />
        <b class={classes.title}>{cameraName}</b>
      </Button>

      { anyCamera &&
        <Menu
          id={classes.title}
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleItemClick()}
        >
          {camera.map(([id, name]) => (
            <MenuItem
              key={id}
              selected={id === selected}
              onClick={handleItemClick(id)}
            >
              {name}
            </MenuItem>
          ))}
        </Menu>
      }
    </div>
  );
}