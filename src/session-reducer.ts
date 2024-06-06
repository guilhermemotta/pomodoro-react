import { Session } from "./App";

type ACTIONTYPE =
  | { type: "focusStarted" }
  | { type: "totalTimeIncreased" }
  | { type: "focusEnded" }
  | { type: "nextStageApproved" }
  | { type: "sessionStopped" };

export function sessionReducer(
  sessionState: Session,
  action: ACTIONTYPE
): Session {
  let { consecutiveShortRests } = sessionState;

  switch (action.type) {
    case "focusStarted": {
      return {
        ...sessionState,
        stage: "focus",
      };
    }
    case "totalTimeIncreased": {
      let { totalTime } = sessionState;
      totalTime += 1e3;
      console.log(`totalTimeIncreased dispatched\ttotalTime = ${totalTime}`);
      return {
        ...sessionState,
        totalTime,
      };
    }
    case "focusEnded": {
      if (consecutiveShortRests < 4) {
        consecutiveShortRests++;
      } else {
        consecutiveShortRests = 0;
      }
      console.log(
        `focusEnded dispatched\tconsecutiveShortRests = ${consecutiveShortRests}`
      );
      return {
        ...sessionState,
        stage: "idle",
        consecutiveShortRests,
      };
    }
    case "nextStageApproved": {
      if (consecutiveShortRests < 4) {
        return {
          ...sessionState,
          stage: "shortRest",
        };
      } else {
        return {
          ...sessionState,
          stage: "longRest",
        };
      }
    }
    case "sessionStopped": {
      return {
        ...sessionState,
        stage: "idle",
        totalTime: 0,
      };
    }
    default: {
      throw new Error(`Unknown action`);
    }
  }
}
