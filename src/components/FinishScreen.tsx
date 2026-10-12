interface FinishScreenProps {
  points: number;
  totalPoints: number;
}

function FinishScreen({ points, totalPoints }: FinishScreenProps) {
  const percentage = (points / totalPoints) * 100;

  return (
    <div className="result">
      <p>
        You scored <strong>{points}</strong> out of {totalPoints} (
        {Math.ceil(percentage)}%)
      </p>
    </div>
  );
}

export default FinishScreen;
