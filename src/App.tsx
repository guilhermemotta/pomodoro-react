import * as React from "react";
import "./App.css";

type PomodoroSettings = {
  label: string;
  pomodoro: number;
  shortRest: number;
  longRest: number;
};

const defaultSettings: PomodoroSettings = {
  label: "Default Pomo",
  pomodoro: 25 * 60 * 1e3,
  shortRest: 5 * 60 * 1e3,
  longRest: 15 * 60 * 1e3,
};

function App() {
  const [isRunning, setIsRunning] = React.useState<boolean>(false);
  const [timer, setTimer] = React.useState<number>(defaultSettings.pomodoro);
  const intervalRef = React.useRef(0);

  React.useEffect(() => {
    if (timer <= 0) {
      clearInterval(intervalRef.current);
      setIsRunning(false);
    }
  }, [timer]);

  const formatTimer = (timer: number) => {
    const inSeconds = timer / 1e3;
    const minutes = Math.floor(inSeconds / 60);
    const seconds = inSeconds % 60;
    return `${minutes < 10 ? "0" + minutes : minutes}:${
      seconds < 10 ? "0" + seconds : seconds
    }`;
  };

  const handleRunTimer = () => {
    if (timer <= 0) return;
    if (isRunning) {
      clearInterval(intervalRef.current);
      setIsRunning(false);
      return;
    }
    const intervalId = setInterval(() => {
      setTimer((lastVal) => lastVal - 1e3);
    }, 1e3);
    intervalRef.current = intervalId;
    setIsRunning(true);
  };

  const handleStopTimer = () => {
    clearInterval(intervalRef.current);
    setTimer(defaultSettings.pomodoro);
    setIsRunning(false);
  };

  return (
    <>
      <h1>Pomodotta</h1>

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
        <header>{defaultSettings.label}</header>

        <div style={{ fontSize: "4rem", fontFamily: "monospace" }}>
          {formatTimer(timer)}
        </div>

        <footer
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <button
            style={{
              flex: 1,
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
              cursor: `${timer !== 0 ? "pointer" : "not-allowed"}`,
            }}
            onClick={() => handleRunTimer()}
            disabled={timer <= 0}
          >
            {isRunning ? "Pausar" : "Iniciar"}
          </button>

          <button
            style={{
              flex: 1,
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
              cursor: `${
                timer !== defaultSettings.pomodoro ? "pointer" : "not-allowed"
              }`,
            }}
            onClick={() => handleStopTimer()}
            disabled={timer == defaultSettings.pomodoro}
          >
            Reiniciar
          </button>
        </footer>
      </section>

      <footer>
        Feito por{" "}
        <a href="https://github.com/guilhermemotta">Guilherme Motta</a>
      </footer>
    </>
  );
}

export default App;
