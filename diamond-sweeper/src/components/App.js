import React from 'react'
import Game from './Game'

const App = (props) => {
  return (
    <div className='container'>
      {props.children || <Game />}
    </div>
  )
}
export default App
