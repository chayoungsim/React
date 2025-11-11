// src/App.jsx
import React, { useReducer } from "react";
import "./App.css";

const CHOICES = ["가위", "바위", "보"];

function judge(user, comp) {
  if (user === comp) return "무승부";
  if (
    (user === "가위" && comp === "보") ||
    (user === "바위" && comp === "가위") ||
    (user === "보" && comp === "바위")
  ) return "승리";
  return "패배";
}

function reducer(state, action) {
  switch (action.type) {
    case "PLAY": {
      const user = action.payload;
      const comp = CHOICES[Math.floor(Math.random() * CHOICES.length)];
      const result = judge(user, comp);
      return {
        ...state,
        userChoice: user,
        compChoice: comp,
        result,
        record: {
          win: state.record.win + (result === "승리" ? 1 : 0),
          lose: state.record.lose + (result === "패배" ? 1 : 0),
          draw: state.record.draw + (result === "무승부" ? 1 : 0),
        },
      };
    }
    case "RESET":
      return { userChoice: null, compChoice: null, result: "", record: { win: 0, lose: 0, draw: 0 } };
    default:
      return state;
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, {
    userChoice: null,
    compChoice: null,
    result: "",
    record: { win: 0, lose: 0, draw: 0 },
  });

  return (
    <main style={{ fontFamily: "system-ui, sans-serif", padding: 24 }}>
      <h1>가위바위보 (React)</h1>

      <section style={{ marginBottom: 16 }}>
        {CHOICES.map((c) => (
          <button
            key={c}
            onClick={() => dispatch({ type: "PLAY", payload: c })}
            style={{ marginRight: 8, padding: "8px 12px" }}
            aria-label={`${c} 선택`}
          >
            {c}
          </button>
        ))}
        <button onClick={() => dispatch({ type: "RESET" })} style={{ marginLeft: 12 }}>
          초기화
        </button>
      </section>

      <section aria-live="polite" style={{ marginBottom: 12 }}>
        <div><strong>내 선택:</strong> {state.userChoice ?? "—"}</div>
        <div><strong>컴퓨터:</strong> {state.compChoice ?? "—"}</div>
        <div style={{ marginTop: 10, fontSize: 18 }}>
          <strong>결과:</strong> {state.result || "—"}
        </div>
      </section>

      <section>
        <h2>전적</h2>
        <div>승: {state.record.win} / 패: {state.record.lose} / 무: {state.record.draw}</div>
      </section>
    </main>
  );
}
