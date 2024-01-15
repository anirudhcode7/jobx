import React, { useState, useEffect } from 'react';
import { fetchQuestions, submitInterview, evaluateInterview } from '../api/interviewApi';
import QuestionDisplay from '../components/interview/QuestionDisplay';
import TextInputWithMic from '../components/interview/TextInputWithMic';
import SpeechToText from '../components/SpeechToText';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/core/NavBar';


const InterviewPage = () => {
  var { authToken, setToken } = useAuth();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const navigate = useNavigate();

  const [isRecording, setIsRecording] = useState(false);

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  const handleTranscription = (transcribedText) => {
    const updatedUserAnswers = [...userAnswers];
    updatedUserAnswers[currentQuestionIndex] += ` ${transcribedText}`;
    setUserAnswers(updatedUserAnswers);
  };


  useEffect(() => {
      // If there is no authToken in the context, retrieve it from localStorage
      if (!authToken) {
        const storedAuthToken = localStorage.getItem('authToken');
        if (storedAuthToken) {
          setToken(storedAuthToken);
        } else {
          // Redirect to login if no authToken found
            navigate('/');
            return;
        }
      }

      // Fetch questions from the backend when the component mounts
      fetchQuestions(authToken)
        .then(response => {
          setQuestions(response.data.Questions);
          setUserAnswers(Array(response.data.Questions.length).fill(''));
        })
        .catch(error => {
          // Handle errors, such as redirecting on authorization failure
          console.error('Error fetching questions:', error);
        });
  }, [authToken, setToken, navigate]);

    const handleAnswerChange = (event) => {
      const updatedUserAnswers = [...userAnswers];
      updatedUserAnswers[currentQuestionIndex] = event.target.value;
      setUserAnswers(updatedUserAnswers);
    };

    const handleNextQuestion = () => {
      console.log("Next button clicked: ", currentQuestionIndex)
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
        submitInterview(authToken, interviewData)
        .then(response => {
            console.log('Interview data submitted successfully:', response);
            navigate('/thank-you')
        })
        .catch(error => {
            console.error('Error submitting interview data:', error);
            // Handle the error, such as displaying an error message
        });

        // Call evaluate API with chatGPT
        evaluateInterview(authToken)
        .then(response => {
          console.log("Evaluation from Chat-GPT: ", response)
        })
        .catch(error => {
          if (error.response && error.response.status === 404) {
              console.log("Evaluation feature is currently disabled.");
              // Optionally redirect or display a message to the user
              // TODO: Display a notification bar
          } else {
              console.error("Error during evaluation:", error);
              // Handle other types of errors
          }
        });
    };

  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const buttonText = isLastQuestion ? 'Submit' : 'Next';
  const buttonColor = isLastQuestion ? 'bg-green-500 hover:bg-green-600' : 'bg-purple-600 hover:bg-purple-700';

  return (
    <> 
      <NavBar />
      <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
        <div className="bg-white p-8 rounded-md shadow-lg border-1 shadow-indigo-50 max-w-2xl w-full flex flex-col">
          <h2 className="text-lg font-semibold mb-2">Question {currentQuestionIndex + 1}</h2>
          
          <QuestionDisplay question={questions[currentQuestionIndex]} currentQuestionIndex={currentQuestionIndex} />
          <TextInputWithMic 
            value={userAnswers[currentQuestionIndex]} 
            onChange={handleAnswerChange} 
            isRecording={isRecording} 
            toggleRecording={toggleRecording} 
          />

          <SpeechToText onTranscription={handleTranscription} isRecording={isRecording} />
          <button
            className={`w-full my-4 py-2 px-4 text-white font-semibold rounded-md focus:outline-none focus:ring ${buttonColor}`}
            onClick={isLastQuestion ? handleSubmit : handleNextQuestion}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </>
  );
};

export default InterviewPage;
