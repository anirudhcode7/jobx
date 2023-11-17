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
    // Logic to handle the submission of answers
    // This would typically involve sending the data to a backend endpoint
    console.log("Submit button clicked");
//    axios.post('http://localhost:3004/api/interview/submit', {
//      answers: userAnswers,
//    }, {
//      headers: {
//        Authorization: `Bearer ${authToken}`,
//      },
//    })
//      .then(response => {
//        // Handle the successful submission
//        console.log('Answers submitted:', response);
//      })
//      .catch(error => {
//        // Handle errors during submission
//        console.error('Error submitting answers:', error);
//      });
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
