import Time from "../types/time";

export const toTwoDigits = (value: number) =>
  value > 9 ? value.toString() : `0${value}`;

export const formatTime = ({ minutes, seconds }: Time) =>
  `${toTwoDigits(minutes)}:${toTwoDigits(seconds)}`;

export const timeIsDone = ({ minutes, seconds }: Time) =>
  minutes === 0 && seconds === 0;
