self.importScripts&&!self.System&&importScripts("loader/system.js"),System.register(["./e7226a64.js"],(function(){"use strict";var t,r,n;return{setters:[function(e){t=e.e,r=e.i,n=e.a}],execute:function(){function e(t,r,n){return n?r?r(t):t:(t&&t.then||(t=Promise.resolve(t)),r?t.then(r):t)}var o=s((function(t){return function(t,r){try{var n=t()}catch(t){return r(t)}if(n&&n.then)return n.then(void 0,r);return n}((function(){return i((function(){if(r(u))return function(t,r,n){if(n)return r?r(t()):t();try{var e=Promise.resolve(t());return r?e.then(r):e}catch(t){return Promise.reject(t)}}(c,f,t);var t}),(function(){return e(u.detect(t))}))}),(function(t){return[]}))}));function i(t,r){var n=t();return n&&n.then?n.then(r):r(n)}var u,c=s((function(){var t=!1;return i((function(){return r(u)?(u=null,e(cocoSsd.load(),(function(t){u=t}))):n(u)?(t=!0,new Promise((function(t){setTimeout((function(){t(c())}),50)}))):void 0}),(function(r){return!t||r}))}));function s(t){return function(){for(var r=[],n=0;n<arguments.length;n++)r[n]=arguments[n];try{return Promise.resolve(t.apply(this,r))}catch(t){return Promise.reject(t)}}}function f(){}importScripts("https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@2.0.0/dist/tf.min.js"),importScripts("https://cdn.jsdelivr.net/npm/@tensorflow-models/coco-ssd"),t({loadModel:c,predict:o})}}}));
