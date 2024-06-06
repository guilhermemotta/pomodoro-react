import * as React from "react";

import { MdSettings } from "react-icons/md";

import Settings from "./components/settings";
import Confirmation from "./components/confirmation";
import { formatTimer } from "./helpers/format-timer";
// import { useStickyState } from "./hooks/use-sticky-state";
import "./App.css";
import { sessionReducer } from "./sessionReducer";

export type PomodoroSettings = {
  label: string;
  focus: number;
  shortRest: number;
  longRest: number;
};

// const defaultSettings: PomodoroSettings = {
//   label: "Default Pomo",
//   pomodoro: 25 * 60 * 1e3,
//   shortRest: 5 * 60 * 1e3,
//   longRest: 15 * 60 * 1e3,
// };

const defaultSettings: PomodoroSettings = {
  label: "Default Pomo",
  focus: 5 * 1e3,
  shortRest: 2 * 1e3,
  longRest: 4 * 1e3,
};

type Stage = "idle" | "focus" | "shortRest" | "longRest";

export type Session = {
  stage: Stage;
  consecutiveShortRests: number;
  totalTime: number;
};

const initialSession: Session = {
  stage: "idle",
  consecutiveShortRests: 0,
  totalTime: 0,
};

function App() {
  // const [currentSettings, setCurrentSettings] =
  //   useStickyState<PomodoroSettings>(defaultSettings, "currentSettings");
  const [currentSettings, setCurrentSettings] =
    React.useState<PomodoroSettings>(defaultSettings);
  const [isRunning, setIsRunning] = React.useState<boolean>(false);
  const [timer, setTimer] = React.useState<number>(currentSettings.focus);

  const [currentSession, sessionDispatch] = React.useReducer(
    sessionReducer,
    initialSession
  );

  const intervalRef = React.useRef(0);
  const settingsRef = React.useRef<HTMLDialogElement>(null);
  const confirmationRef = React.useRef<HTMLDialogElement>(null);

  React.useEffect(() => {
    setTimer(currentSettings.focus);
  }, [currentSettings]);

  React.useEffect(() => {
    if (timer <= 0) {
      clearInterval(intervalRef.current);
      setIsRunning(false);
      sessionDispatch({ type: "focusEnded" });
      const confirmationTimeout = setTimeout(() => {
        if (!confirmationRef.current) {
          throw new Error("confirmationRef not assigned");
        }
        confirmationRef.current.showModal();
      }, 1e3);
      return () => clearTimeout(confirmationTimeout);
    }
  }, [timer]);

  const handleRunTimer = () => {
    if (timer <= 0) return;
    if (isRunning) {
      clearInterval(intervalRef.current);
      setIsRunning(false);
      sessionDispatch({ type: "focusEnded" });
      return;
    }

    const intervalId = setInterval(() => {
      setTimer((lastVal) => lastVal - 1e3);
      sessionDispatch({ type: "totalTimeIncreased" });
    }, 1e3);
    sessionDispatch({ type: "focusStarted" });
    intervalRef.current = intervalId;
    setIsRunning(true);
  };

  const handleStopTimer = () => {
    clearInterval(intervalRef.current);
    setTimer(currentSettings.focus);
    sessionDispatch({ type: "sessionStopped" });
    alert(`currentSession.totalTime: ${currentSession.totalTime}`);
    setIsRunning(false);
  };

  const handleShowSettings = () => {
    if (!settingsRef.current) {
      throw Error("settingsRef is not assigned");
    }
    settingsRef.current.showModal();
  };

  const handleCloseSettings = () => {
    if (!settingsRef.current) {
      throw Error("settingsRef is not assigned");
    }
    settingsRef.current.close();
  };

  const handleChangeSettings = (setting: string, value: number) => {
    setCurrentSettings({ ...currentSettings, [setting]: value });
  };

  const handleConfirmDialog = () => {
    console.log(`handleConfirmDialog fired`);
    setTimer(
      currentSession.consecutiveShortRests < 4
        ? currentSettings.shortRest
        : currentSettings.longRest
    );

    const intervalId = setInterval(() => {
      setTimer((lastVal) => lastVal - 1e3);
      sessionDispatch({ type: "totalTimeIncreased" });
    }, 1e3);
    setIsRunning(true);
    intervalRef.current = intervalId;
    sessionDispatch({ type: "nextStageApproved" });

    if (!confirmationRef.current) {
      throw new Error("confirmationRef not assigned");
    }
    confirmationRef.current.close();
  };

  const handleCancelDialog = () => {
    console.log(`handleCancelDialog fired`);
    if (!confirmationRef.current) {
      throw new Error("confirmationRef not assigned");
    }
    confirmationRef.current.close();
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

        <Confirmation
          ref={confirmationRef}
          title="Confirmação necessária"
          text="Deseja prosseguir com a próxima etapa?"
          confirmationCallback={handleConfirmDialog}
          cancelationCallback={handleCancelDialog}
        />

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
                timer !== currentSettings.focus ? "pointer" : "not-allowed"
              }`,
            }}
            onClick={() => handleStopTimer()}
            disabled={!isRunning && timer === currentSettings.focus}
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
