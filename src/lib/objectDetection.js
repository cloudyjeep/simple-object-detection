import { expose } from "comlink";
import { callFn, isUndefined, isNull, isString } from "./helper";
// import * as cocoSsd from '@tensorflow-models/coco-ssd';
// import '@tensorflow/tfjs/dist/tf.min.js';
// import * as tf from '@tensorflow/tfjs';

importScripts('https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@2.0.0/dist/tf.min.js')
importScripts('https://cdn.jsdelivr.net/npm/@tensorflow-models/coco-ssd')

let model;

async function loadModel() {
  if(isUndefined(model)){
    model = null;
    model = await cocoSsd.load()
  }
  else if(isNull(model)){
    return new Promise( resolve => {
      setTimeout(() => {
        resolve(loadModel())
      }, 50);
    })
  }
  return true
}

async function predict(data) {
  try {
    if(isUndefined(model)) await loadModel()
    // console.log('model', model)
    const predictions = await model.detect(data); // Classify the image.
    // console.log('Predictions: ', [predictions, data]);
    return predictions

  } catch (err) {
    console.log('predic error', err)
    return []
  }
}

// comlink expose -> function
expose({
  loadModel,
  predict
})