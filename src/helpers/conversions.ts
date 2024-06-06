export const fromMinutesToMiliseconds = (amount: number): number => {
  return amount * 60 * 1e3;
};

export const fromMilisecondsToMinutes = (amount: number): number => {
  return amount / 60 / 1e3;
};

export const fromMilisecondsToSeconds = (amount: number): number => {
  return amount / 1e3;
};
