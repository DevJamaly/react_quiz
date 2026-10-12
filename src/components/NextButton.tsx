import type { Action } from '../App';

interface NextButtonProps {
  dispatch: (dispatch: Action) => void;
  answer: number;
}

function NextButton({ dispatch, answer }: NextButtonProps) {
  const hasAnswered = answer !== -1;

  if (!hasAnswered) return null;
  return (
    <button
      className="btn btn-ui"
      onClick={() => dispatch({ type: 'nextQuestion' })}
    >
      NEXT
    </button>
  );
}

export default NextButton;
