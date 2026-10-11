interface StartScreenProps {
  numQuestions: number;
}

function StartScreen({ numQuestions }: StartScreenProps) {
  return (
    <div className="start">
      <h2>Welcome to The React Quiz! </h2>
      <h3>{numQuestions} questions to test your React Mastery</h3>
      <button className="btn btn-ui">Let's start</button>
    </div>
  );
}

export default StartScreen;
