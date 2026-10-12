import type { Action } from '../App';

interface NextButtonProps {
  dispatch: (dispatch: Action) => void;
  answer: number;
  index: number;
  numQuestions: number;
}

function NextButton({
  dispatch,
  answer,
  index,
  numQuestions,
}: NextButtonProps) {
  const hasAnswered = answer !== -1;

  if (!hasAnswered) return null;
  return index < numQuestions - 1 ? (
    <button
      className="btn btn-ui"
      onClick={() => dispatch({ type: 'nextQuestion' })}
    >
      NEXT
    </button>
  ) : (
    <button className="btn btn-ui" onClick={() => dispatch({ type: 'finish' })}>
      FINISH
    </button>
  );
}

export default NextButton;
