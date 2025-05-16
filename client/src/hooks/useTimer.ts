import { useEffect, useState } from 'react';

export const useTimer = (minutes: number) => {
  const [time, setTime] = useState({
    seconds: 0,
    minutes: minutes,
  });
  useEffect(() => {
    const timerId = setInterval(() => {
      setTime((prev) => {
        const { seconds, minutes } = prev;
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(timerId);
            return { seconds: 0, minutes: 0 };
          } else {
            return { seconds: 59, minutes: minutes - 1 };
          }
        } else {
          return {
            ...prev,
            seconds: seconds - 1,
          };
        }
      });
    }, 1000);
    return () => clearInterval(timerId);
  }, []);
  return time;
};
