
import { useState } from 'react'  

import Box from './components/Box.jsx'

import './App.css'

import RockImg from "./assets/images/hand-rock.png";
import ScissorsImg from "./assets/images/hand-scissors.png";
import PaperImg from "./assets/images/hand-paper.png";



const CHOICE = {
  rock:{
    name :"Rock",
    img : RockImg
  },
  scissors:{
    name : "Scissors",
    img : ScissorsImg
  },
  paper:{
    name : "Paper",
    img : PaperImg
  }
}



function App() {
  const [userSelect, setUserSelect] = useState(null);
  const [computerSelect, setComputerSelect] = useState(null);
  const [result, setResult] = useState("");
  const [record, setRecord] = useState({ win: 0, lose: 0, tie: 0 });
 
  function judge(user, comp){
      if(user.name === comp.name) return "tie";
      else if(
        (user.name === "Rock" && comp.name === "Scissors") ||
        (user.name === "Scissors" && comp.name === "Paper") ||
        (user.name === "Paper" && comp.name === "Rock")
      ) return "win";
      else return "lose";     
  }

  const play = (userChoice) => {
    setUserSelect(CHOICE[userChoice]);
    const comp = randomChoice();
    setComputerSelect(comp);

    const r = judge(CHOICE[userChoice], comp);
    setResult(r);

    setRecord(prev => ({
       win : prev.win + (r === "win" ? 1 : 0),
       lose : prev.lose + (r === "lose" ? 1 : 0),
       tie : prev.tie + (r === "tie" ? 1 : 0),
    }))

  }

  const randomChoice = () => {
    let itemArray = Object.keys(CHOICE);    
    let randomItem = Math.floor(Math.random() * itemArray.length);
    let finalItem = itemArray[randomItem];
    return CHOICE[finalItem];
  }

  const reset = () => {
    setUserSelect(null);
    setComputerSelect(null);
    setResult("");
    setRecord({ win: 0, lose: 0, tie: 0 });
  }

  return (
    <>
       <h1>Rock Scissors Paper</h1>
       <div className='box-wrap'> 
          <Box title="My" item={userSelect} result={result} />
          <Box title="Computer" item={computerSelect} result={result} />
       </div>
       <div>
       <div>
          MY  승 : {record.win} 패 : {record.lose} 무 : {record.tie}
       </div>
       <div>
          COM 승 : {record.lose} 패 : {record.win} 무 : {record.tie}
       </div>
       </div>
       <div className='box-btns'>
          <button onClick={() => play("scissors")}>가위</button>
          <button onClick={() => play("rock")}>바위</button>
          <button onClick={() => play("paper")}>보</button>
          <button onClick={reset}>리셋</button>
       </div>
    </>
  )
}

export default App
