import * as React from "react";
import "./App.css";

const DEFAULT_POMODORO = 25 * 60 * 1000;

function App() {
  const [isRunning, setIsRunning] = React.useState<boolean>(false);
  const [timer, setTimer] = React.useState<number>(DEFAULT_POMODORO);
  const intervalRef = React.useRef(0);

  const formatTimer = (inSeconds: number) => {
    const minutes = Math.floor(inSeconds / 60);
    const seconds = inSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  };

  const handleRunTimer = () => {
    if (isRunning) {
      clearInterval(intervalRef.current);
      setIsRunning(false);
    } else {
      const intervalId = setInterval(() => {
        setTimer((lastVal) => lastVal - 1000);
      }, 1000);
      intervalRef.current = intervalId;
      setIsRunning(true);
    }
  };

  const handleStopTimer = () => {
    clearInterval(intervalRef.current);
    setTimer(DEFAULT_POMODORO);
    setIsRunning(false);
  };

  return (
    <>
      <h1>Pomodoro</h1>

      <section
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          border: "1px solid white",
          borderRadius: "5px",
          padding: "1rem",
        }}
      >
        <header>Rótulo</header>

        <div>{formatTimer(timer / 1000)}</div>

        <footer
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "2rem",
          }}
        >
          <button onClick={() => handleRunTimer()}>
            {isRunning ? "Pausar" : "Iniciar"}
          </button>
          <button onClick={() => handleStopTimer()}>Interromper</button>
        </footer>
      </section>
    </>
  );
}

export default App;
