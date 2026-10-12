import type { Action, QuestionData } from '../App';

interface OptionsProps {
  question: QuestionData;
  dispatch: (dispatch: Action) => void;
  answer: number;
}

function Options({ question, dispatch, answer }: OptionsProps) {
  const hasAnswered = answer !== -1;

  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          className={`btn btn-option ${index === answer ? 'answer' : ''} ${hasAnswered && (index === question.correctOption ? 'correct' : 'wrong')}`}
          key={option}
          disabled={hasAnswered}
          onClick={() => dispatch({ type: 'newAnswer', payload: index })}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
