import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import styles

const Assignment = () => {
  const questions = [
    "How do we insert a comment in HTML?",
    "How do you create nested web pages in HTML?",
    "How do you add buttons in HTML?",
    "What are the different types of headings in HTML?",
    "How do you insert an image in the HTML webpage?"
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(''));
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    if (answers.some(answer => answer.trim() === '')) {
      setError('Please answer all questions before submitting.');
      return;
    }
    
   
  };
  

  const handleNextQuestion = () => {
    // Check if the answer for the current question is empty
    if (answers[currentQuestionIndex].trim() === '') {
      setError('Please answer the current question before proceeding.');
      return; // Don't proceed if the answer is empty
    }

    // Clear error message if the answer is not empty
    setError('');

    // Proceed to the next question
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex - 1);
  };

  return (
    <div>
      <h2>Assignment</h2>
      {!submitted ? (
        <form onSubmit={handleSubmit}>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <p>{questions[currentQuestionIndex]}</p>
          <ReactQuill
            theme="snow"
            value={answers[currentQuestionIndex]}
            onChange={(value) => {
              const newAnswers = [...answers];
              newAnswers[currentQuestionIndex] = value;
              setAnswers(newAnswers);
            }}
            disabled={submitted}
          />
          <div>
            {currentQuestionIndex !== 0 && (
              <button
                type="button"
                onClick={handlePreviousQuestion}
                style={{ backgroundColor: "#294573", color: "white" }}
                disabled={submitted}
              >
                Previous
              </button>
            )}
            <button
              type="button"
              onClick={handleNextQuestion}
              style={{ marginTop: "20px", marginLeft: "50px", backgroundColor: "#294573", color: "white" }}
              disabled={currentQuestionIndex === questions.length - 1 || submitted}
            >
              Next
            </button>
          </div>
          {currentQuestionIndex === questions.length - 1 && (
            <button
              type="submit"
              style={{ marginTop: "20px", marginLeft: "50px", backgroundColor: "#294573", color: "white" }}
              disabled={submitted}
            >
              Submit 
            </button>
          )}
        </form>
      ) : (
        <div>
          <h3>You submitted successfully!</h3>
        </div>
      )}
    </div>
  );
};

export default Assignment;
