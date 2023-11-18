import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Typed from 'react-typed'; // Import Typed for typing animation

const InterviewPage = () => {
  var { authToken, setToken } = useAuth();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);

  useEffect(() => {
      // If there is no authToken in the context, retrieve it from localStorage
      if (!authToken) {
        const storedAuthToken = localStorage.getItem('authToken');
        if (storedAuthToken) {
          setToken(storedAuthToken);
          authToken = storedAuthToken;
        } else {
          // Redirect to login if no authToken found
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
          // Handle errors, such as redirecting on authorization failure
          console.error('Error fetching questions:', error);
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
    console.log("Submit button clicked");

    // Construct the interview data
    const interviewData = questions.map((question, index) => ({
        question,
        answer: userAnswers[index]
    }));

    // Send a POST request to the backend to store the interview data
    axios.post('http://localhost:3004/api/interview/responses', {
        interview: interviewData
    }, {
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
    })
    .then(response => {
        console.log('Interview data submitted successfully:', response);
        // Redirect or display a success message
    })
    .catch(error => {
        console.error('Error submitting interview data:', error);
        // Handle the error, such as displaying an error message
    });
};

  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const buttonText = isLastQuestion ? 'Submit' : 'Next';
  const buttonColor = isLastQuestion ? 'bg-green-500 hover:bg-green-600' : 'bg-purple-600 hover:bg-purple-700';

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-md shadow-md max-w-md w-full flex-1 flex flex-col">
        <h1 className="text-2xl font-bold mb-4">Interview Page</h1>
        <h2 className="text-lg font-semibold mb-2">Question {currentQuestionIndex + 1}</h2>
        <div className="mb-6 bg-gray-200 p-4 rounded-lg">
        {questions.length > 0 && questions[currentQuestionIndex] &&
          <Typed
            key={currentQuestionIndex}
            startDelay={500}
            strings={[questions[currentQuestionIndex]]}
            typeSpeed={40}
          />
        }
        </div>
        <textarea
          className="mt-2 p-2 border border-gray-300 rounded-md w-full"
          value={userAnswers[currentQuestionIndex]}
          onChange={handleAnswerChange}
        />
        <button
          className={`w-full my-4 py-2 px-4 text-white font-semibold rounded-md focus:outline-none focus:ring ${buttonColor}`}
          onClick={isLastQuestion ? handleSubmit : handleNextQuestion}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default InterviewPage;
