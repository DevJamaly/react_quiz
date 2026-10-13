import type { Action } from '../App';

interface FinishScreenProps {
  points: number;
  totalPoints: number;
  highscore: number;
  dispatch: (dispatch: Action) => void;
}

const SCORE_EMOJIS = [
  { min: 100, emoji: '🥇' },
  { min: 80, emoji: '🎉' },
  { min: 50, emoji: '😊' },
  { min: Number.MIN_VALUE, emoji: '🤔' }, // anything above 0
];

function getEmoji(percentage: number) {
  return SCORE_EMOJIS.find(({ min }) => percentage >= min)?.emoji ?? '🤕';
}

function FinishScreen({
  points,
  totalPoints,
  highscore,
  dispatch,
}: FinishScreenProps) {
  const percentage = (points / totalPoints) * 100;

  return (
    <div>
      <p className="result">
        <span>{getEmoji(percentage)}</span>
        You scored <strong>{points}</strong> out of {totalPoints} (
        {Math.ceil(percentage)}%)
      </p>
      <p className="highscore">(Highscore: {highscore} points)</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: 'restart' })}
      >
        RESTART QUIZ
      </button>
    </div>
  );
}

export default FinishScreen;
