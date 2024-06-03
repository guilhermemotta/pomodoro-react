import { PomodoroSettings } from "./App";

export default function settingsReducer(
  settings: PomodoroSettings,
  action: { type: string; value: number }
) {
  switch (action.type) {
    case "changedPomodoro":
      return { ...settings, pomodoro: action.value };
    default:
      throw Error("Unkdown action: " + action.type);
  }
}
