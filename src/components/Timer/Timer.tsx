import { useEffect, useState } from "react";
import Time from "../../types/time";
import { formatTime, timeIsDone } from "../../utils/timer";

const Timer = () => {
  const [buttonText, setButtonText] = useState<string>("Start");
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [timer, setTimer] = useState<Time>({
    minutes: 25,
    seconds: 0,
  });

  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined;
    if (isRunning && !timeIsDone(timer))
      intervalId = setInterval(() => updateTimer(), 1000);
    return () => intervalId && clearInterval(intervalId);
  }, [isRunning, timer]);

  function updateTimer() {
    let { minutes, seconds } = timer;

    if (seconds === 0) {
      minutes -= 1;
      seconds = 59;
    } else seconds -= 1;

    setTimer({ minutes, seconds });
  }

  function handleClick() {
    setIsRunning((prev) => !prev);
    setButtonText(isRunning ? "Resume" : "Stop");
  }

  return (
    <div>
      <span>{formatTime(timer)}</span>
      <button onClick={handleClick}>{buttonText}</button>
    </div>
  );
};

export default Timer;
