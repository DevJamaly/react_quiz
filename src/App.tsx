import { useEffect, useReducer } from 'react';
import Header from './components/Header';
import MainElement from './components/MainElement';
import Loader from './components/Loader';
import ErrorElement from './components/ErrorElement';
import StartScreen from './components/StartScreen';

interface StateData {
  questions: QuestionData[];
  status: 'loading' | 'error' | 'ready' | 'finished';
}

interface QuestionData {
  correctOption: number;
  id: string;
  options: string[];
  points: number;
  question: string;
}

type Action =
  | { type: 'dataReceived'; payload: QuestionData[] }
  | { type: 'dataFailed'; payload: string };

const initialState: StateData = {
  questions: [],
  // 'loading, 'error', 'ready', 'finished'
  status: 'loading',
};

function reducer(state: StateData, action: Action): StateData {
  switch (action.type) {
    case 'dataReceived':
      return { ...state, questions: action.payload, status: 'ready' };

    case 'dataFailed':
      return { ...state, status: 'error' };

    default: {
      const _exhaustive: never = action;
      throw new Error(`Unknown action: ${JSON.stringify(_exhaustive)}`);
    }
  }
}

function App() {
  const [{ questions, status }, dispatch] = useReducer(reducer, initialState);

  const numQuestions = questions.length;

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
        {status === 'ready' && <StartScreen numQuestions={numQuestions} />}
      </MainElement>
    </div>
  );
}

export default App;
