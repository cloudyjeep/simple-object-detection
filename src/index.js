import './style.css'
import { h, render } from 'preact'
import App from './app' 

function initApps () {
  const elm = document.getElementById('root')
  elm.innerText = ''
  render(<App />, elm)
}

initApps()

