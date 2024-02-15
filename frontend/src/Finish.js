import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './App.css'

const Finish = ({ points, onPlayAgain }) => {
  const navigate = useNavigate()

  const handlePlayAgain = () => {
    onPlayAgain() // Call the provided onPlayAgain function to reset questions
    navigate('/')
  }

  return (
    <div>
      <h2>Quiz Finished!</h2>
      <p>Your Score: {points}</p>
      <button className="FinishButton" onClick={handlePlayAgain}>
        Play Again
      </button>
    </div>
  )
}

export default Finish
