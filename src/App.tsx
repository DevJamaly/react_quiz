import { useEffect, useReducer } from 'react';
import Header from './components/Header';
import MainElement from './components/MainElement';
import Loader from './components/Loader';
import ErrorElement from './components/ErrorElement';
import StartScreen from './components/StartScreen';
import Question from './components/Question';
import NextButton from './components/NextButton';
import Progress from './components/Progress';
import FinishScreen from './components/FinishScreen';
import Footer from './components/Footer';
import Timer from './components/Timer';

interface StateData {
  questions: QuestionData[];
  status: 'loading' | 'error' | 'ready' | 'finished' | 'active';
  index: number;
  answer: number;
  points: number;
  highscore: number;
  secondsRemaining: number;
}

export interface QuestionData {
  correctOption: number;
  id: string;
  options: string[];
  points: number;
  question: string;
}

export type Action =
  | { type: 'dataReceived'; payload: QuestionData[] }
  | { type: 'dataFailed'; payload: string }
  | { type: 'newAnswer'; payload: number }
  | { type: 'start' }
  | { type: 'finish' }
  | { type: 'nextQuestion' }
  | { type: 'restart' }
  | { type: 'tick' };

const initialState: StateData = {
  questions: [],
  // 'loading, 'error', 'ready', 'finished'
  status: 'loading',
  index: 0,
  answer: -1,
  points: 0,
  highscore: 0,
  secondsRemaining: -1,
};

const SEC_PER_QUESTION = 5;

function finishQuiz(state: StateData): StateData {
  return {
    ...state,
    status: 'finished',
    highscore: Math.max(state.points, state.highscore),
  };
}

function reducer(state: StateData, action: Action): StateData {
  switch (action.type) {
    case 'dataReceived':
      return { ...state, questions: action.payload, status: 'ready' };

    case 'dataFailed':
      return { ...state, status: 'error' };

    case 'start':
      return {
        ...state,
        status: 'active',
        secondsRemaining: state.questions.length * SEC_PER_QUESTION,
      };

    case 'restart':
      return { ...initialState, status: 'ready', questions: state.questions };

    case 'finish':
      return finishQuiz(state);

    case 'newAnswer':
      const question = state.questions[state.index];
      const isCorrect = action.payload === question.correctOption;
      return {
        ...state,
        answer: action.payload,
        points: state.points + (isCorrect ? question.points : 0),
      };

    case 'nextQuestion':
      return { ...state, index: state.index + 1, answer: -1 };
    case 'tick':
      const secondsRemaining = state.secondsRemaining - 1;
      return secondsRemaining > 0
        ? { ...state, secondsRemaining }
        : finishQuiz({
            ...state,
            secondsRemaining: 0,
          });

    default: {
      const _exhaustive: never = action;
      throw new Error(`Unknown action: ${JSON.stringify(_exhaustive)}`);
    }
  }
}

function App() {
  const [
    { questions, status, index, answer, points, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const totalPoints = questions.reduce(
    (sum, question) => sum + question.points,
    0,
  );

  useEffect(() => {
    fetch('http://localhost:8080/questions')
      .then(res => {
        if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
        return res.json();
      })
      .then((data: QuestionData[]) => {
        dispatch({ type: 'dataReceived', payload: data });
      })
      .catch(err => {
        if (err instanceof Error)
          dispatch({ type: 'dataFailed', payload: err.message });
        else dispatch({ type: 'dataFailed', payload: err.message.toString() });
      });
  }, []);

  return (
    <div className="app">
      <Header />
      <MainElement>
        {status === 'loading' && <Loader />}
        {status === 'error' && <ErrorElement />}
        {status === 'ready' && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === 'active' && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              totalPoints={totalPoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer secondsRemaining={secondsRemaining} dispatch={dispatch} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                index={index}
                numQuestions={numQuestions}
              />
            </Footer>
          </>
        )}
        {status === 'finished' && (
          <FinishScreen
            points={points}
            totalPoints={totalPoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </MainElement>
    </div>
  );
}

export default App;
