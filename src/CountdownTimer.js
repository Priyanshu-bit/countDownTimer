import React, { useState, useEffect } from 'react';
import './CountdownTimer.css'; // Import CSS for styling

const CountdownTimer = () => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timerInterval;

    if (isRunning && totalSeconds > 0) {
      timerInterval = setInterval(() => {
        setTotalSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    }

    return () => clearInterval(timerInterval);
  }, [isRunning, totalSeconds]);

  const formatTime = (time) => {
    const formattedMinutes = String(Math.floor(time / 60)).padStart(2, '0');
    const formattedSeconds = String(time % 60).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const startTimer = () => {
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setMinutes(0);
    setSeconds(0);
    setTotalSeconds(0);
  };

  const handleMinutesChange = (e) => {
    const inputMinutes = parseInt(e.target.value, 10);
    setMinutes(inputMinutes);
    setTotalSeconds(inputMinutes * 60 + seconds);
  };

  const handleSecondsChange = (e) => {
    const inputSeconds = parseInt(e.target.value, 10);
    setSeconds(inputSeconds);
    setTotalSeconds(minutes * 60 + inputSeconds);
  };

  return (
    <div className="countdown-container">
      <div className="countdown-clock">
        <div className="countdown-display">
          <div className="countdown-clock-text">{formatTime(totalSeconds)}</div>
          <div className="countdown-controls">
            <button onClick={startTimer}>Start</button>
            <button onClick={stopTimer}>Stop</button>
            <button onClick={resetTimer}>Reset</button>
          </div>
        </div>
      </div>
      <div className="countdown-input">
        <label>Enter Minutes:</label>
        <input type="number" value={minutes} onChange={handleMinutesChange} />
        <label>Enter Seconds:</label>
        <input type="number" value={seconds} onChange={handleSecondsChange} />
      </div>
    </div>
  );
};

export default CountdownTimer;
