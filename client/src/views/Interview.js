import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';


const InterviewPage = () => {
    const { authToken } = useAuth();
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
      // Fetch questions from the backend when the component mounts
      axios.get('http://localhost:3004/api/interview/questions', {
        headers: {
          Authorization: `Bearer ${authToken}`, // Replace yourAuthToken with the actual token
        },
      })
        .then(response => {
          setQuestions(response.data.Questions);
          setUserAnswers(Array(response.data.Questions.length).fill(''));
        })
        .catch(error => {
          console.error('Error fetching questions:', error);
        });
    }, []);

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState(Array(questions.length).fill(''));

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
        <div>
          <h1>Interview Page</h1>
          <div>
            <h2>Question {currentQuestionIndex + 1}</h2>
            <p>{questions[currentQuestionIndex]}</p>
            <textarea
              value={userAnswers[currentQuestionIndex]}
              onChange={handleAnswerChange}
            />
          </div>
        {currentQuestionIndex < questions.length - 1 ? (
          <button onClick={handleNextQuestion}>Next</button>
        ) : (
          <button onClick={handleSubmit}>Submit</button>
        )}
        </div>
    );
};

export default InterviewPage;
