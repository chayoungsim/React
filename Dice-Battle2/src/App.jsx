

import { useState } from 'react'
import Board from './components/Board'
import Button from './components/Button'
import './App.css'

import logo from './assets/images/logo.png'


function random(n) {
  return Math.floor(Math.random() * n);
}

function App() {
  const [myHistory, setMyHistory ] = useState([]);
  const [otherHistory, setOtherHistory]  = useState([]);
  const [rolling, setRolling] = useState(false);

  const handleRollClick = () => {
    const nextNum = random(6);
    const nextOtherNum = random(6);

    if(rolling) return;
    setRolling(true);

    setTimeout(()=>{
      setRolling(false);
    },900)

    setMyHistory([...myHistory, nextNum]);
    setOtherHistory([...otherHistory, nextOtherNum]);
  }

  const handleRestClick = () => {
    setMyHistory([]);
    setOtherHistory([]);
    setRolling(false);
  }

  return (
    <>
      <div className='dice-wrap'>
         <h1>Dice Battle</h1>
         <img src={logo} alt="logo" />
         <div className='disc-button'>
              <Button className="App-button" color="blue" onClick={handleRollClick}>던지기</Button>
              <Button className="App-button" color="red" onClick={handleRestClick}>다시하기</Button>
         </div>
         <div className='dice-board'>
            <Board name="My" color="blue" gameHistory={myHistory}/>
            <Board name="Computer" color="red" gameHistory={otherHistory}/>
         </div>
      </div>
    </>
  )
}

export default App
