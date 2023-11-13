import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const InterviewPage = () => {
  const { authToken } = useAuth();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState(Array(questions.length).fill(''));

  useEffect(() => {
    // Fetch questions from the backend when the component mounts
    axios.get('http://localhost:3004/api/interview/questions', {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then(response => {
        console.log("response:", response.data);
        setQuestions(response.data.Questions);
        setUserAnswers(Array(response.data.Questions.length).fill(''));
      })
      .catch(error => {
        console.error('Error fetching questions:', error);
      });
  }, []);

  const handleAnswerChange = (event) => {
    const updatedUserAnswers = [...userAnswers];
    updatedUserAnswers[currentQuestionIndex] = event.target.value;
    setUserAnswers(updatedUserAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleSubmit = () => {
    console.log('Submit button clicked');
    // Add logic to handle the submitted answers
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-md shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4">Interview Page</h1>
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Question {currentQuestionIndex + 1}</h2>
          <p>{questions[currentQuestionIndex]}</p>
          <textarea
            className="mt-2 p-2 border border-gray-300 rounded-md w-full"
            value={userAnswers[currentQuestionIndex]}
            onChange={handleAnswerChange}
          />
        </div>
        {currentQuestionIndex < questions.length - 1 ? (
          <button
            className="w-full py-2 px-4 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 focus:outline-none focus:ring focus:ring-purple-500"
            onClick={handleNextQuestion}
          >
            Next
          </button>
        ) : (
          <button
            className="w-full py-2 px-4 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-400"
            onClick={handleSubmit}
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default InterviewPage;
