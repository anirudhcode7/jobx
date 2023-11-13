import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const InterviewPage = () => {
  var { authToken, setToken } = useAuth();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState(Array(questions.length).fill(''));

  useEffect(() => {
      // If there is no authToken in the context, retrieve it from localStorage
      if (!authToken) {
        const storedAuthToken = localStorage.getItem('authToken');
        console.log("Stored Auth Token:", storedAuthToken);
        if (storedAuthToken) {
          setToken(storedAuthToken);
          authToken = storedAuthToken;
        } else {
          // If there is still no authToken, the user needs to log in
          // Redirect to the login page or handle as needed
          window.location.href = '/';
        }
      }

      // Fetch questions from the backend when the component mounts
      axios.get('http://localhost:3004/api/interview/questions', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
        .then(response => {
          setQuestions(response.data.Questions);
          setUserAnswers(Array(response.data.Questions.length).fill(''));
        })
        .catch(error => {
          console.error('Error fetching questions:', error);
          if (error.response && error.response.status === 401) {
            // Unauthorized (probably due to expired token)
            // Redirect to the login page or handle as needed
            window.location.href = '/';
          }
        });
    }, [authToken, setToken]);

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
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-md shadow-md max-w-md w-full flex-1 flex flex-col">
        <div className="flex-1 overflow-hidden">
          <h1 className="text-2xl font-bold mb-4">Interview Page</h1>
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Question {currentQuestionIndex + 1}</h2>
            <p className="text-3xl mb-4">
              {questions[currentQuestionIndex]}
            </p>
          </div>
        </div>
        <div className="flex items-end justify-between">
          <textarea
            className="mt-2 p-2 border border-gray-300 rounded-md w-full"
            value={userAnswers[currentQuestionIndex]}
            onChange={handleAnswerChange}
          />
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
    </div>
  );
};

export default InterviewPage;
