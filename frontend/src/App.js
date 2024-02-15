import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import Question from './Question'
import Finish from './Finish'
import './App.css'

const App = () => {
  const [questions, setQuestions] = useState([])
  const [answeredQuestions, setAnsweredQuestions] = useState([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [points, setPoints] = useState(0)
  const [quizFinished, setQuizFinished] = useState(false)

  useEffect(() => {
    fetch('http://localhost:3009/api/questions')
      .then((response) => response.json())
      .then((data) => setQuestions(data))
      .catch((error) => console.error('Error fetching questions:', error))
  }, [])

  const handleNextQuestion = () => {
    const nextUnansweredIndex = getNextUnansweredQuestionIndex()
    if (nextUnansweredIndex !== -1) {
      setCurrentQuestion(nextUnansweredIndex)
    } else {
      setQuizFinished(true)
    }
  }

  const getNextUnansweredQuestionIndex = () => {
    for (let i = currentQuestion + 1; i < questions.length; i++) {
      if (!answeredQuestions.includes(i)) {
        return i
      }
    }
    for (let i = 0; i < questions.length; i++) {
      if (!answeredQuestions.includes(i)) {
        return i
      }
    }
    return -1 // If all questions are answered
  }

  const handleAnswer = (answer) => {
    const isCorrect = answer === questions[currentQuestion]?.correctAnswer
    setPoints((prevPoints) => (isCorrect ? prevPoints + 1 : prevPoints))
    setAnsweredQuestions((prev) => [...prev, currentQuestion])
    const nextUnansweredIndex = getNextUnansweredQuestionIndex()
    setCurrentQuestion(nextUnansweredIndex)
    if (nextUnansweredIndex === -1) {
      setQuizFinished(true)
    }
  }

  const handleReset = () => {
    setPoints(0)
    setCurrentQuestion(0)
    setQuizFinished(false)
    setAnsweredQuestions([])
  }

  return (
    <Router>
      <div className="App-container">
        <div className="resetContainer">
          <div className="HeaderLeft">
            <Link to="/" className="ResetLink" onClick={handleReset}>
              Reset
            </Link>
          </div>
          <div className="HeaderRight">
            <span className="Points">Points: {points}</span>
          </div>
        </div>
        <div className="QuestionContainer">
          <Routes>
            <Route
              path="/"
              element={
                <Question
                  questions={questions}
                  currentQuestion={currentQuestion}
                  onAnswer={handleAnswer}
                  onNextQuestion={handleNextQuestion}
                  hasNextQuestion={
                    answeredQuestions.length < questions.length - 1
                  }
                  points={points}
                  quizFinished={quizFinished}
                  onQuizFinish={() => setQuizFinished(true)}
                  onPlayAgain={handleReset}
                />
              }
            />
            <Route
              path="/finish"
              element={<Finish points={points} onPlayAgain={handleReset} />}
            />
          </Routes>

          {!quizFinished && (
            <Link
              to="/finish"
              className="FinishButton"
              onClick={() => setQuizFinished(true)}
            >
              Finish
            </Link>
          )}
        </div>
      </div>
    </Router>
  )
}

export default App
