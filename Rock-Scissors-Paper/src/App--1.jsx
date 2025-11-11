// src/App.jsx
import React, { useState } from "react";
import "./App.css";

const CHOICES =["가위", "바위", "보"]

function judge(user, comp) {
  if(user === comp) return "무승부";
    else if(
      (user === "가위" && comp === "보") ||
      (user === "바위" && comp === "가위") ||
      (user === "보" && comp === "바위")    
    ) return "WIN";
    return "LOSE";
}


export default function App() {

  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState("");
  const [record, setRecord] = useState({ win: 0, lose: 0, draw: 0 });

  const play = (user) => {
    setUserChoice(user);
    const comp = CHOICES[Math.floor(Math.random() * CHOICES.length)];
    setComputerChoice(comp);

    const r = judge(user, comp);
    setResult(r);

    setRecord(prev => ({
        win : prev.win + (r === "WIN" ? 1 : 0),
        lose : prev.lose + (r === "LOSE" ? 1 : 0),
        draw : prev.draw + (r === "무승부" ? 1 : 0),
    }))
  }

  const reset = () => {
    setUserChoice(null);
    setComputerChoice(null);
    setResult("");
    setRecord({ win: 0, lose: 0, draw: 0 });
  }

  
  return (
    <main style={{ fontFamily: "system-ui, sans-serif", padding: 24 }}>
      <h1>가위바위보 (React)</h1>

      <section style={{ marginBottom: 16 }}>
        {CHOICES.map((choice) => (       
        <button style={{ marginRight: 8, padding: "8px 12px" }} key={choice} onClick={() => play(choice)}>{choice}</button>
         ))}
        <button style={{ marginLeft: 12 }} onClick={reset}>초기화</button>
      </section>

      <section aria-live="polite" style={{ marginBottom: 12 }}>
        <div><strong>내 선택:</strong> {userChoice ?? "-"} </div>
        <div><strong>컴퓨터:</strong> {computerChoice ?? "-"}</div>
        <div style={{ marginTop: 10, fontSize: 18 }}>
          <strong>결과:</strong> {result || "-"}
        </div>
      </section>

      <section>
        <h2>전적</h2>
        <div>승: {record.win} / 패:  {record.lose}/ 무: {record.draw} </div>
      </section>
    </main>
  );
}
