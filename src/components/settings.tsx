import React from "react";

import { PomodoroSettings } from "../App";

interface SettingsProps {
  currentSettings: PomodoroSettings;
  changeCallback: (setting: string, value: number) => void;
  closeCallback: () => void;
}

const Settings = React.forwardRef<HTMLDialogElement, SettingsProps>(
  function Settings(
    { currentSettings, changeCallback, closeCallback }: SettingsProps,
    ref
  ) {
    return (
      <dialog
        ref={ref}
        style={{
          border: "solid 1px white",
          borderRadius: "16px",
        }}
      >
        <section
          style={{ display: "flex", flexDirection: "column", gap: "8px" }}
        >
          <header style={{ padding: "0.5rem" }}>
            <h3
              style={{
                margin: 0,
              }}
            >
              Settings
            </h3>
            <h5
              style={{
                padding: 0,
                margin: 0,
                color: "gray",
                fontSize: "0.75rem",
              }}
            >
              (in minutes)
            </h5>
          </header>

          <label>
            Pomodoro:{" "}
            <input
              type="number"
              value={currentSettings.pomodoro / 60 / 1e3}
              onChange={(event) => {
                const inMiliseconds = parseInt(event.target.value) * 60 * 1e3;
                changeCallback("pomodoro", inMiliseconds);
              }}
            />
          </label>

          <label>
            Short rest:{" "}
            <input
              type="text"
              value={currentSettings.shortRest / 60 / 1e3}
              onChange={(event) => {
                const inMiliseconds = parseInt(event?.target.value) * 60 * 1e3;
                changeCallback("shorRest", inMiliseconds);
              }}
            />
          </label>

          <label>
            Long rest:{" "}
            <input
              type="text"
              value={currentSettings.longRest / 60 / 1e3}
              onChange={(event) => {
                const inMiliseconds = parseInt(event.target.value) * 60 * 1e3;
                changeCallback("longRest", inMiliseconds);
              }}
            />
          </label>

          <button onClick={closeCallback} autoFocus>
            Close
          </button>
        </section>
      </dialog>
    );
  }
);

export default Settings;
