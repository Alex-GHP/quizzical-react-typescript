import { useState } from "react";
import QuizComponent from "./QuizComponent";

function App() {
  const [firstRender, setFirstRender] = useState(true);
  const [quizPage, setQuizPage] = useState(false);

  const getQuizz = () => {
    setFirstRender(false);
    setQuizPage(true);
  };

  return (
    <div>
      {firstRender && (
        <div className="h-screen gap-2 flex flex-col justify-center items-center">
          <h1 className="text-5xl text-[#293264] font-bold">Quizzical</h1>
          <p className="text-2xl text-[#293264] max-w-md text-center">
            Welcome to my Trivia project made with React, Typescript and
            Tailwind CSS
          </p>
          <p className="text-2xl text-[#293264]">Have fun!</p>
          <button
            onClick={getQuizz}
            className="text-[#F5F7FB] bg-[#4D5B9E] px-6 py-2 font-bold rounded-lg mt-4"
          >
            Start Quiz
          </button>
        </div>
      )}
      {quizPage && <QuizComponent />}
    </div>
  );
}

export default App;
