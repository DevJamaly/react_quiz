interface ProgressProps {
  index: number;
  numQuestions: number;
  points: number;
  totalPoints: number;
  answer: number;
}

function Progress({
  index,
  numQuestions,
  points,
  totalPoints,
  answer,
}: ProgressProps) {
  return (
    <header className="progress">
      <progress max={numQuestions} value={index + Number(answer !== -1)} />
      <p>
        Question <strong> {index + 1} </strong> / {numQuestions}
      </p>

      <p>
        <strong> {points} </strong> / {totalPoints}
      </p>
    </header>
  );
}

export default Progress;
