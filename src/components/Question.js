import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  // add useEffect code
  useEffect(() => {
    if(timeRemaining >0){ //checks if timer is greater than 0, only counts if there is time left
      const timeoutId = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1); //countdown timer decrement
      }, 1000);

      //sweep up to clean up function
      return() => clearTimeout(timeoutId);
    } else {
      setTimeRemaining(10);
      onAnswered(false);  
    }
  }, [timeRemaining, onAnswered] ); //dependency array ensure the effect runs correctly after change

  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect); //resets timer and sends data to parent component
  }

  const { id, prompt, answers, correctIndex } = question;
//renders the question, answers and countdown timer
  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
