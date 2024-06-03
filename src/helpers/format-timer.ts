export const formatTimer = (timer: number) => {
  const inSeconds = timer / 1e3;
  const minutes = Math.floor(inSeconds / 60);
  const seconds = inSeconds % 60;
  return `${minutes < 10 ? "0" + minutes : minutes}:${
    seconds < 10 ? "0" + seconds : seconds
  }`;
};
