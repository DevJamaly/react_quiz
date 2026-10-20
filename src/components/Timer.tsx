import { useEffect } from 'react';
import type { Action } from '../App';

interface TimerProps {
  secondsRemaining: number;
  dispatch: (Action: Action) => void;
}

const pad = (n: number, digits: number) => String(n).padStart(digits, '0');

function Timer({ secondsRemaining, dispatch }: TimerProps) {
  const mins = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  useEffect(() => {
    const id = setInterval(() => {
      //   console.log('tick');
      dispatch({ type: 'tick' });
    }, 1000);

    return function cleanUp() {
      clearInterval(id);
    };
  }, [dispatch]);
  return (
    <div className="timer">
      {pad(mins, 2)}:{pad(seconds, 2)}
    </div>
  );
}

export default Timer;
