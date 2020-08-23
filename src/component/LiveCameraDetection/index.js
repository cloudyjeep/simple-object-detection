
import { h, Fragment } from "preact";
import { useRef, useEffect, useState, useCallback, useErrorBoundary } from "preact/compat";
import { wrap } from "comlink";

import { isArray, isBool } from "../../lib/helper";
import ActionsButton from "../ActionsButton";
import SelectCamera from "../SelectCamera";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core";

// worker instance
const objectDetection = wrap(new Worker('../../lib/objectDetection.js', { type: 'module' }));

function roundRect([ ctx, x, y, w, h, {radius=0, stroke=2, text } = {}]){
  ctx.beginPath();
  ctx.font = "20px Arial";
  // ctx.fillStyle = "rgb(10, 100, 0, 0.8)"
  ctx.fillStyle = "#ff0000"
  ctx.textAlign = 'center'
  ctx.fillText(text, w/2+x, y-5)
  // ctx.strokeStyle="rgb(10, 180, 0, 0.8)";
  ctx.strokeStyle="#ff8080";
  ctx.lineWidth = stroke
  ctx.strokeRect(x, y, w, h);

}

const useCameraStream = (deviceId, active, video, canvas) => {
  const [state, setState] = useState([true, ''])
  const [access, message] = state

  useEffect(() => {

    let _canvas;
    let _ctx;
    let ctxCanvas;

    const detectImage = async (recursive) => {
      if(active) try {
        const { 
          offsetWidth, offsetHeight,
          videoWidth: width, 
          videoHeight: height
        } = video

        if(!recursive) {
          console.log('start predict: ', [width, height])
          _canvas = document.createElement('canvas')
          _canvas.width = width
          _canvas.height = height
          _ctx = _canvas.getContext('2d');
        }
        
        _ctx.drawImage(video, 0, 0);
        let imageData = _ctx.getImageData(0, 0, width, height)
        let prediction = await objectDetection.predict(imageData)

        if(isArray(prediction)) {

          if(canvas.width != offsetWidth){
            canvas.width = offsetWidth
            canvas.height = offsetHeight
            ctxCanvas = canvas.getContext('2d')
          }
          ctxCanvas.clearRect(0, 0, offsetWidth, offsetHeight) // clear canvas

          const scaleWidth = offsetWidth / width
          const scaleHeight = offsetHeight / height
          for(let len=prediction.length, i=0; i<len; i++){
            let [x, y, w, h] = prediction[i].bbox
            x *= scaleWidth
            y *= scaleHeight
            w *= scaleWidth
            h *= scaleHeight
            // console.log('bbbox', prediction[i].bbox, [x, y, w, h], [width, height, offsetWidth, offsetHeight])

            // roundRect(ctxCanvas, [x, y-5, w, h, 2, 3],[prediction[i].class])
            roundRect([ctxCanvas, x, y-5, w, h, {
              radius: 2, 
              stroke: 1,
              text: prediction[i].class
            }])
          }
        }

        return active && setTimeout(detectImage, 10, true)
        // return active && requestAnimationFrame(() => detectImage(true))
        
      } catch (err) {
        console.log('end predict', [err])  
      }
    }

    const openAccess = () => {
      console.log('-->>  openAccess')

      if(video.srcObject){
        video[active? 'play':'pause']()
        if(active) detectImage()
      }
      else if(active) {
        const handleAccess = accepted => stream => {
          console.log('play video: ', accepted, [stream])
          if(accepted){
            video.srcObject = stream
            video.play().then( e => {
              console.log(e)
              detectImage()
            })
          } 
          if(access != accepted) setState([
            accepted, 
            accepted? '' : isBool(accepted) ? 'Camera access is blocked' : 'Sorry, Your browser not support for this app'
          ])
        }
        try {
          const mobile = document.body.offsetHeight > document.body.offsetWidth

          navigator.mediaDevices.getUserMedia({
            video: {
              deviceId: deviceId? { exact: deviceId } : undefined,
              [mobile? 'height':'width']: { min: 1280, ideal: 1920, max: 2560 },
              [mobile? 'width':'height']: { min: 720, ideal: 1080, max: 1440 },
              // facingMode: 'environment'
            }
          }).then(
            handleAccess(true), handleAccess(false)
          )
        } catch (error) {
          handleAccess(null)()
        }
      } else {

      }
    }
    openAccess();

    return () => {
      // stop detection on component destroyed
      _ctx = null 
      _canvas = null
    }
  }, [active, deviceId])

  return state
}

const useCameraDevices = (access) => {
  const [devices, setDevices] = useState([false, []])

  if(!devices[0] && access) useEffect(() => {
    console.log('->> useCameraDevices > useEffect')

    const getDevices = async () => {
      const camera = {};
      await (await navigator.mediaDevices.enumerateDevices()).map(c => {
        console.log('useCameraDevices', c)
        if(c.kind === 'videoinput') camera[c.deviceId] = c.label
      })
      console.log('??>> ', Object.entries(camera))
      setDevices([true, Object.entries(camera)])
    }
    getDevices()
  })
  return devices 
}

const useCheckModelHasLoaded = () => {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    if(!loaded) try {
      objectDetection.loadModel().then(() => {
        console.log('-->> useCheckModelHasLoaded > setLoaded')
        setLoaded(true)
      })
    } catch (err) {};
  }, [])
  return loaded
}

const useStyles = makeStyles(t => ({
  action: {
    // textAlign: 'left'
    backgroundColor: '#eee',
    overflow: 'auto',
    whiteSpace: 'nowrap',
  },
  info: {
    position: 'absolute',
    width: '100%',
    justifyContent: 'center'
  },
  video: {
    width: '100%',
    maxWidth: 880,
  }
}));

const LiveCameraDetection = () => {
  const classes = useStyles()
  const [state, setState] = useState({
    play: false,
    deviceId: '',
    // isCamera: true,
    // urlVideo: false,
  })

  const { play, deviceId } = state 

  const refCanvas = useRef({})
  const refVideo = useRef({})
  const [access, msgError] = useCameraStream(deviceId, play, refVideo.current, refCanvas.current)
  const [deviceAvail, deviceList] = useCameraDevices(access)
  const modelHasLoaded = useCheckModelHasLoaded()

  const playOrPause = (play) => {
    setState({ ...state, play })
  }

  const handleSelectCamera = (deviceId) => {
    setState({ ...state, deviceId })
  }
  
  if(!access && play) {
    setState({ ...state, play: false })
  }

  console.log('state', state)

  const disabledToolbar = !access || !modelHasLoaded

  return (
    <Fragment>
      <Toolbar className={classes.action}>
        <ActionsButton disabled={disabledToolbar} play={play} onChanges={playOrPause} />
        { deviceAvail &&
          <SelectCamera disabled={disabledToolbar} data={deviceList} selected={deviceId} onChanges={handleSelectCamera} /> }
      </Toolbar>
      <Toolbar className={classes.info}>
        <MessageInfo show msg={access? !modelHasLoaded && 'loading model..' : msgError }/>
      </Toolbar>
      <div style={{display: 'inline-flex'}}>
        <div style={{display: 'flex'}}>
          <video ref={refVideo} autoPlay muted class={classes.video} />
          <canvas ref={refCanvas} style={{position: 'absolute'}}/>
        </div>
      </div>
    </Fragment>
  );
}

export default LiveCameraDetection


const MessageInfo = ({show, msg: children, as='small'}) => {
  return show && h(as, { children })
}