import { useState, useEffect } from 'react';
import { differenceInSeconds } from 'date-fns';

export const useTimer = (startDate, endDate) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    status: 'upcoming'
  });

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      let diff = 0;
      let status = 'upcoming';

      if (now < startDate) {
        diff = differenceInSeconds(startDate, now);
        status = 'upcoming';
      } else if (now < endDate) {
        diff = differenceInSeconds(endDate, now);
        status = 'live';
      } else {
        status = 'completed';
      }

      if (status !== 'completed') {
        const days = Math.floor(diff / (3600 * 24));
        const hours = Math.floor((diff % (3600 * 24)) / 3600);
        const minutes = Math.floor((diff % 3600) / 60);
        const seconds = Math.floor(diff % 60);

        setTimeLeft({ days, hours, minutes, seconds, status });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, status: 'completed' });
      }
    };

    updateTimer();
    const timerId = setInterval(updateTimer, 1000);

    return () => clearInterval(timerId);
  }, [startDate, endDate]);

  return timeLeft;
};