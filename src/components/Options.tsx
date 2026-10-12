import type { QuestionData } from '../App';

function Options({ question }: { question: QuestionData }) {
  return (
    <div className="options">
      {question.options.map(option => (
        <button className="btn btn-options" key={option}>
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
