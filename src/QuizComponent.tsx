import { useEffect, useState } from "react";

const decodeHtmlEntities = (html: any) => {
  var txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};

type QuestionProps = {
  category?: string;
  correct_answer: string;
  difficulty?: string;
  incorrect_answers: string[];
  question: string;
  type?: string;
};

function QuizComponent() {
  const [checked, setChecked] = useState(true);
  const [playAgain, setPlayAgain] = useState(false);
  const [questions, setQuestions] = useState<QuestionProps[]>([]);
  const [counter, setCounter] = useState(0);

  const fetchQuestions = () => {
    fetch(
      "https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=boolean"
    )
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data.results);
      });
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const correctAns: any = [];
  for (let i = 0; i < questions.length; i++) {
    correctAns[i] = questions[i].correct_answer;
  }

  const ansArr: any = [];
  const updateAns = (questionIndex: number, selectedAns: string) => {
    ansArr[questionIndex] = selectedAns;
  };
  console.log(questions);
  const checkAns = (event: any) => {
    event.preventDefault();
    setChecked(false);
    setPlayAgain(true);
    if (checked === false) window.location.reload();
    setChecked(false);
    for (let i = 0; i < questions.length; i++) {
      if (ansArr[i] === correctAns[i]) {
        setCounter((prevCounter) => ++prevCounter);
        console.log(`${i} is correct`);
      } else {
        console.log(`${i} is incorrect`);
      }
    }
  };
  const playAgainHandler = () => {
    setChecked(true);
    setPlayAgain(false);
    setCounter(0);
    fetchQuestions();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div className="pb-20 px-48">
      <form>
        {questions.map((question, index) => (
          <div key={index} className="mt-10">
            <h1
              className="text-3xl text-[#293264] font-bold"
              dangerouslySetInnerHTML={{
                __html: decodeHtmlEntities(question.question),
              }}
            />
            <div className="flex justify-around m-10">
              <label>
                <input
                  type="checkbox"
                  className="hidden"
                  name={`question_${index}`}
                  value="True"
                />
                <button
                  type="button"
                  onClick={() => updateAns(index, "True")}
                  className={`border-2 border-[#4D5B9E] rounded-lg text-[#293264] px-8 py-1`}
                >
                  True
                </button>
              </label>

              <label>
                <input
                  type="checkbox"
                  className="hidden"
                  name={`question_${index}`}
                  value="False"
                />
                <button
                  onClick={() => updateAns(index, "False")}
                  type="button"
                  className={`border-2 border-[#4D5B9E] rounded-lg text-[#293264] px-8 py-1`}
                >
                  False
                </button>
              </label>
            </div>
            <hr />
          </div>
        ))}
        {checked && questions.length > 0 && (
          <button
            onClick={checkAns}
            className="bg-[#4D5B9E] text-[#F5F7FB] font-bold px-6 py-4 rounded-lg mt-10 block m-auto"
          >
            Check answers
          </button>
        )}
        {playAgain && (
          <div className="flex items-center justify-center gap-10 mt-10">
            <p className="font-bold text-3xl">{`You scored ${counter}/5 correct answers!`}</p>
            <button
              onClick={playAgainHandler}
              className="bg-[#4D5B9E] text-[#F5F7FB] font-bold px-6 py-4 rounded-lg block"
            >
              Play again
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

export default QuizComponent;
