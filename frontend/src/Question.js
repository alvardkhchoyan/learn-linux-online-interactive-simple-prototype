import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Question = ({ questions, currentQuestion, onAnswer, onNextQuestion, hasNextQuestion, points, quizFinished, onQuizFinish, onPlayAgain }) => {
  const [userAnswer, setUserAnswer] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setUserAnswer("");
  }, [currentQuestion]);

  const handleNextQuestion = () => {
    onNextQuestion(); // Call the provided onNextQuestion function
  };

  const handlePlayAgain = () => {
    onPlayAgain(); // Call the provided onPlayAgain function to reset questions
    navigate("/");
  };

  const question = questions[currentQuestion];

  return (
    <div>
      <h2>{question?.text}</h2>
      {quizFinished ? (
        <div>
          <h3>Quiz Finished!</h3>
          <p>Your Final Score: {points}</p>
          <button className="FinishButton" onClick={handlePlayAgain}>
            Play Again
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
          />
          <button onClick={() => onAnswer(userAnswer)}>Submit Answer</button>
          {hasNextQuestion && (
            <button onClick={handleNextQuestion}>Next Question</button>
          )}
        </div>
      )}
    </div>
  );
};

export default Question;
