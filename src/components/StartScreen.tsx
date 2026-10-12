import type { Action } from '../App';

interface StartScreenProps {
  numQuestions: number;
  dispatch: (dispatch: Action) => void;
}

function StartScreen({ numQuestions, dispatch }: StartScreenProps) {
  return (
    <div className="start">
      <h2>Welcome to The React Quiz! </h2>
      <h3>{numQuestions} questions to test your React Mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: 'start' })}
      >
        Let's start
      </button>
    </div>
  );
}

export default StartScreen;
