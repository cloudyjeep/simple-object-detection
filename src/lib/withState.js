// import {h} from 'preact'
// import {useState} from 'preact/compat'

// async function getData () {
//   let data = await fetch('google.com')
//   console.log('selesai getData', data)
//   return data
// }

// async function getMovies () {
//   let data = await fetch('imdb.com/movie')
//   console.log('selesai getMovies', data)
//   return data
// }

// const useWithState = (state, component) => {
//   let _ref
//   let _state = state == null ? {} : state
//   let _updater = function (value) {
//     console.log('udpater', value)
//     _state = typeof value == 'object' ? Array.isArray(value) ? [].concat(value) : {...value} : value
//     if(_ref && _ref.forceUpdate) _ref.forceUpdate()
//   }
//   return [
//     function () {
//       // console.log('rerender', this)
//       _ref = this
//       return component([_state, _updater])
//     },
//     [_state, _updater]
//   ]
// }
// const withState = (state, component) => {
//   return useWithState(state, component)[0]
// }

// const [BoxView, BoxHook] = useWithState({ count: 0 }, 
//   () => {
//     const [state, setState] = BoxHook
//     // console.log('BoxView', state)
//     return (
//       <div>
//         <h2>BoxView -> withStateComponent: {state.count}</h2>
//         <button onClick={() => {
//           state.count += 1
//           setState(state)
//         }}>counter</button>
//       </div>
//     )
//   }
// )

// const Box2 = withState(
//   { count: 10 },
//   ([state, setState]) => (
//     <div>
//       <h2>Box2 -> withState: {state.count}</h2>
//       <button onClick={() => {
//         state.count += 1
//         setState(state)
//       }}>counter</button>
//     </div>
//   )
// )

// export default function Box({ setCount }) {
//   const [num, setNum] = useState(0)
//   const [state, setState] = useState({
//     kamu: 100
//   })

//   // useEffect(getData, [])
//   // getData()
//   // getMovies()
//   // return <div>
//   //   <BoxView />
//   //   <Box2 />
//   // </div>

//   return (
//     <div onClick={setNum.bind(null, num+1)}>
//       <button onClick={setCount}>counter value</button>
//       <br/>
//       box: {num}
//     </div>
//   )
// }
