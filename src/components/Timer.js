import React, { useEffect, useState } from 'react';

const Timer = ({ setStop }) => {
  const [time, setTime] = useState(localStorage.getItem('time') || 30);
  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => (prev >= 1 ? prev - 1 : 0));
      if (time === 0) {
        setStop(true);
      }
    }, 1000);

    return () => clearInterval(timer);
  });
  return <div className="timer">{time}</div>;
};

export default Timer;
