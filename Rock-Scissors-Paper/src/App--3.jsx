// src/App.jsx

import React, {useState} from "react";
import Box from "./components/Box";
import "./App.scss";

// 이미지 import
import rockImg from "./assets/images/hand-rock.png";
import scissorImg from "./assets/images/hand-scissors.png";
import paperImg from "./assets/images/hand-paper.png";

const CHOICES = {
  rock :{
    name : "Rock",
    img: rockImg
  },
  scissor : {
    name : "Scissor",
    img: scissorImg
  },
  paper : {
    name : "Paper",
    img: paperImg
  }
}
  
export default function App() {
  const [userSelect, setUserSelect] = useState(null);
  const [computerSelect, setComputerSelect] = useState(null);
  const [result, setResult] = useState("");
  const [record, setRecord] = useState({ win: 0, lose: 0, tie: 0 });

  function judge(user, comp) {
    if(user.name === comp.name) return "tie";
    else if(
      (user.name === "Scissor" && comp.name === "Paper") ||
      (user.name === "Rock" && comp.name === "Scissor") ||
      (user.name === "Paper" && comp.name === "Rock" )
    ) return "win";
    return "lose"
  }
  
  const play = (user) => {
    setUserSelect(user);
    const comp = randomChoice();
    setComputerSelect(comp);
  
    const r = judge(user, comp);
    setResult(r);
    setRecord(prev => ({
        win : prev.win + (r === "win" ? 1 : 0),
        lose : prev.lose + (r === "lose" ? 1 : 0),
        tie : prev.tie + (r === "tie" ? 1 : 0),
    }))
  }

  const randomChoice = () => {
    let itemArray = Object.keys(CHOICES); //객체에 키값만 뽑아서 어레이로 만들어주는 함수다
    //console.log(itemArray);
    let randomItem = Math.floor(Math.random() * itemArray.length);
    let final = itemArray[randomItem];
    return CHOICES[final];
  }
  
  const reset = () => {
    setUserSelect(null);
    setComputerSelect(null);
    setResult("");
    setRecord({ win: 0, lose: 0, tie: 0 });
  }

  
  return (
    <main>
      <div className="rps-header">
        <h1>Rock Paper Scissors</h1>
      </div>
      
      <div className="rps-wrap">        
        <div className="rps-my">
            <h2>My <p>승: {record.win} / 패 : {record.lose} / 무 : {record.tie }</p></h2>
            <Box title="You" item={userSelect} result={result} />
        </div>
        <div className="rps-comp">
            <h2>Computer <p>승: {record.lose} / 패 : {record.win} / 무 : {record.tie }</p></h2>
            <Box title="Computer" item={computerSelect} result={result} />
        </div>        
      </div>
      
      <div className="rps-choice">
          <h3>Your Choice <span style={{color:"red"}}>{result}</span></h3>
          <div className="rps-choice-rps">
              <button onClick={() => play(CHOICES.scissor)}><img src={scissorImg} alt="scissor" /></button>
              <button onClick={() => play(CHOICES.rock)}><img src={rockImg} alt="rock" /></button>
              <button onClick={() => play(CHOICES.paper)}><img src={paperImg} alt="paper" /></button>
          </div>
      </div>
      <div className="rps-reset">          
          <button type="button" onClick={reset}>Reset</button>
      </div>

    </main>
  );
}
