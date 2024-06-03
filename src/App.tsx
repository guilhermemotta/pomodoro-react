import * as React from "react";

import { MdSettings } from "react-icons/md";

import { formatTimer } from "./helpers/format-timer";
import { useStickyState } from "./hooks/use-sticky-state";
import "./App.css";
import Settings from "./components/settings";

export type PomodoroSettings = {
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
  const [currentSettings, setCurrentSettings] =
    useStickyState<PomodoroSettings>(defaultSettings, "currentSettings");
  const [isRunning, setIsRunning] = React.useState<boolean>(false);
  const [timer, setTimer] = React.useState<number>(currentSettings.pomodoro);
  const intervalRef = React.useRef(0);
  const settingsRef = React.useRef<HTMLDialogElement>(null);

  React.useEffect(() => {
    if (timer <= 0) {
      clearInterval(intervalRef.current);
      setIsRunning(false);
    }
  }, [timer]);

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
    setTimer(currentSettings.pomodoro);
    setIsRunning(false);
  };

  const handleShowSettings = () => {
    settingsRef.current?.showModal();
  };

  const handleCloseSettings = () => {
    settingsRef.current?.close();
  };

  const handleChangeSettings = (setting: string, value: number) => {
    setCurrentSettings({ ...currentSettings, [setting]: value });
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
        <header
          style={{
            display: "inline-flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignContent: "middle",
          }}
        >
          {currentSettings.label}
          <Settings
            ref={settingsRef}
            currentSettings={currentSettings}
            changeCallback={handleChangeSettings}
            closeCallback={handleCloseSettings}
          />

          <button
            style={{
              display: "inline-block",
              backgroundColor: "transparent",
              padding: "0.5rem",
              margin: 0,
              borderRadius: "100%",
              width: "42px",
              height: "42px",
            }}
            onClick={handleShowSettings}
          >
            <MdSettings style={{ width: "24px", height: "24px" }} />
          </button>
        </header>

        <div
          style={{
            fontSize: "4rem",
            fontFamily: "monospace",
            cursor: "default",
          }}
        >
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
                timer !== currentSettings.pomodoro ? "pointer" : "not-allowed"
              }`,
            }}
            onClick={() => handleStopTimer()}
            disabled={timer == currentSettings.pomodoro}
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
