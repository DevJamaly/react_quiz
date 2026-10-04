import { useReducer, useState, type ChangeEvent } from 'react';

type Action =
  | { type: 'inc'; payload?: number }
  | { type: 'dec'; payload?: number }
  | { type: 'setCount'; payload: number };

function reducer(state: number, action: Action): number {
  console.log(state, action);
  switch (action.type) {
    case 'inc':
      return state + (action.payload ?? 1);
    case 'dec':
      return state - (action.payload ?? 1);
    case 'setCount':
      return action.payload;
    default:
      return state;
  }
}

function DateCounter() {
  // const [count, setCount] = useState(0);

  const [count, dispatch] = useReducer(reducer, 0);

  const [step, setStep] = useState(1);

  // This mutates the date object.
  const date = new Date('june 21 2027');
  date.setDate(date.getDate() + count);

  const dec = function () {
    dispatch({ type: 'dec', payload: step });
    // setCount((count) => count - 1);
    // setCount(count => count - step);
  };

  const inc = function () {
    dispatch({ type: 'inc', payload: step });
    // setCount((count) => count + 1);
    // setCount(count => count + step);
  };

  const defineCount = function (e: ChangeEvent<HTMLInputElement>) {
    dispatch({ type: 'setCount', payload: Number(e.target.value) });
    // setCount(Number(e.target.value));
  };

  const defineStep = function (e: ChangeEvent<HTMLInputElement>) {
    setStep(Number(e.target.value));
  };

  const reset = function () {
    // setCount(0);
    setStep(1);
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
