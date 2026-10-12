import type { Action, QuestionData } from '../App';
import Options from './Options';

interface QuestionProps {
  question: QuestionData;
  dispatch: (dispatch: Action) => void;
  answer: number;
}

function Question({ question, dispatch, answer }: QuestionProps) {
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} dispatch={dispatch} answer={answer} />
    </div>
  );
}

export default Question;
