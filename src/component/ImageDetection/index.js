
// import { h, Fragment } from "preact";
// import * as style from "./style.css";
// import { useRef, useEffect, useState, Ref, useCallback } from "preact/hooks";

// import { callFn, isArray, isNull, getAccesMedia, isString, isUndefined } from "../../@libs/helper";
// // import instace_worker from 'workerize-loader?inline!./worker';

// let worker;

// function roundRect(ctx, [x, y, w, h, radius=0, stroke=2], [text] ){
//   ctx.beginPath();
//   ctx.font = "20px Arial";
//   ctx.fillStyle = "rgb(10, 100, 0, 0.8)"
//   ctx.textAlign = 'center'
//   ctx.fillText(text, w/2+x, y-5)
//   ctx.strokeStyle="rgb(10, 180, 0, 0.8)";
//   ctx.lineWidth = stroke
//   ctx.strokeRect(x, y, w, h);

// }

// const predictImage = async (imageData, ctx) => {
//   const prediction = await worker.predict(imageData)
//   // console.log('predictImage:', prediction)
//   if(isArray(prediction)) {
//     prediction.map((e) => {
//       const [x, y, width, height] = e.bbox
//       roundRect(ctx, [x, y-5, width, height, 2, 3],[e.class])
//     })
//   }
// }

// const useImage = (url) => {
//   const ref = useRef(null)
//   if(url)
//     useEffect(() => {
//       function loadImage() {
//         const img = new Image()
//         img.onload = function(){
//           const canvas = ref.current
//           const context = canvas.getContext('2d');
//           const { width, height } = img
//           canvas.width = width;
//           canvas.height = height;
//           context.drawImage(this, 0, 0 );
//           let data = context.getImageData(0, 0, width, height);
//           predictImage(data, context)
//           console.log('result', [canvas, context, data])
//         }
//         img.src = url
//       }
//       loadImage()

//     }, [url])

//   return [ref]
// }

// const ObjectDetectionByImages = () => {
//   const [state, setState] = useState({
//     urlImage: '/assets/kerja-kantoran-generasi-milenial.jpg',
//     lastUrlImage: '',
//     commit: true,
//   })
//   const { urlImage, lastUrlImage, commit } = state
//   const [img] = useImage(commit? urlImage : lastUrlImage)

//   const handleInput = e => {
//     if(commit) state.lastUrlImage = urlImage + ''
//     setState({...state, urlImage: e.target.value, commit: false,})
//   }
//   const handleCheck = () => state.commit || setState({...state, commit: true})

//   console.log('render home', state)

//   return (
//     <Fragment >
//       <h1>Predic Images</h1>
//       <input type='text' value={state.urlImage} onInput={handleInput} />
//       <button onClick={handleCheck}>check</button>
//       <hr/>
//       {/* <p> This is the Home component.</p> */}
//       <canvas ref={img} />
//     </Fragment>
//   );
// };


// const useVideoDetection = (play) => {
//   const refVideo = useRef(null)
//   const refCanvas = useRef(null)
//   if(play) 
//     useEffect(() => {
//       const detectVideo = async () => {
//         // refVideo.current.sr
//       }
//       detectVideo()
//     }, [])

//   return [refVideo, refCanvas]
// }

// const useCameraStream = (active, refCanvas) => {
//   const video = useRef(null)
//   const [access, setAccess] = useState(true)

//   useEffect(() => {

//     let canvas;
//     let ctx;
//     let ctxRefCanvas;

//     const detectImage = async (recursive) => {
//       if(active) try {
//         const width = video.current.videoWidth + 0
//         const height = video.current.videoHeight + 0

//         if(!recursive) {
//           console.log('start predict: ', [width, height])
//           canvas = document.createElement('canvas')
//           canvas.width = width
//           canvas.height = height
//           ctx = canvas.getContext('2d');

//           refCanvas.width = width
//           refCanvas.height = height
//           ctxRefCanvas = refCanvas.getContext('2d')
//         }
        
//         ctx.drawImage(video.current, 0, 0);
//         let imageData = ctx.getImageData(0, 0, width, height)
//         let prediction = await worker.predict(imageData)

//         if(isArray(prediction)) {
//           ctxRefCanvas.clearRect(0, 0, width, height) // clear canvas
//           for(let len=prediction.length, i=0; i<len; i++){
//             const [x, y, width, height] = prediction[i].bbox
//             roundRect(ctxRefCanvas, [x, y-5, width, height, 2, 3],[prediction[i].class])
//           }
//         }
//         // console.log('prediction', prediction)
//         return setTimeout(detectImage, 30, true)
//         // return requestAnimationFrame(detectImage.bind(null, true))
        
//       } catch (err) {
//         console.log('end predict', [err])  
//       }
//     }

//     const openAccess = () => {
//       if(video.current.srcObject){
//         video.current[active? 'play':'pause']()
//         if(active) detectImage()
//       }
//       else if(active) {
//         const getCallback = accepted => stream => {
//           console.log('play video: ', accepted, [stream])
//           if(accepted){
//             video.current.srcObject = stream
//             video.current.play().then( e => {
//               console.log(e)
//               detectImage()
//             })
//           }
//           if(access != accepted) setAccess(accepted)
//         }
//         getAccesMedia({ video: true }, getCallback(true), getCallback(false))
//       }
//     }
//     openAccess();

//     return () => {
//       ctx = null // trigger catch to stop detection on component destroyed
//     }
//   }, [active])

//   return [video, access]
// }

// const ObjectDetectionByLiveVideo = () => {
//   const [state, setState] = useState({
//     play: false,
//     isCamera: true,
//     urlVideo: false,
//   })

//   const { play, urlVideo, isCamera } = state 
//   // const [refVideo, refCanvas] = useVideoDetection(access && play)
//   const refCanvas = useRef(null)
//   const [refVideo, access] = useCameraStream(isCamera && play, refCanvas.current)

//   const playOrPause = useCallback(() => {
//     setState({ ...state, play: !play })
//   }, [play])

//   // const handleSelectVideo = e => {
//   //   console.log(e)

//   // }
//   // const toggleVideo = () => setState({...state, isCamera: !isCamera })


//   return (
//     <div>
//       {/* <InputRadio value={!isCamera} onInput={toggleVideo} text={'File'} />
//       <InputRadio value={isCamera} onInput={toggleVideo} text={'Camera'} />
//       { !isCamera && (
//         <div>
//           {urlVideo}
//           <button onClick={handleSelectVideo}>choice video</button>
//         </div>
//       ) } */}

//       { access ? 
//         <button onClick={playOrPause}>{play? 'Stop' : 'Play'}</button> :
//         <strong>{
//           // cameraLoading ? 'checking camera ...' :
//           "Camera is Blocked, can't access your camera !<br/>For using this Apps, please open access your camera then refresh this page"
//         }</strong>           
//       }
//       <br/>
//       <div style={{display: 'flex'}}>
//         <video ref={refVideo} autoPlay muted />
//         <canvas ref={refCanvas} style={{position: 'absolute'}}/>
//       </div>
//     </div>
//   )
// }
// const InputRadio = ({ text, value, onInput }) => (
//   <div>
//     <input type='radio' value={value} onInput={onInput} />
//     <label>{text}</label>
//   </div>
// )


// const loadWorker = (callback) => {
//   worker = instace_worker()
//   console.log('worker has loaded', [worker])
//   worker.loadModel().then(() => {
//     console.log('model has loaded', [callback])
//     callback()
//   })
// }

// const Apps = function () {
//   const workerHasNotLoaded = isUndefined(worker)
//   if(workerHasNotLoaded) loadWorker(this.forceUpdate.bind(this))

//   return (
//     <div class={style.home} >
//       { workerHasNotLoaded ? 
//         <b>Load machine learning model..</b>
//         :
//         <Fragment>
//           <ObjectDetectionByLiveVideo /> 
//           {/* <ObjectDetectionByImages /> */}
//         </Fragment>
//       }
//     </div>
//   );
// };

// export default Apps;