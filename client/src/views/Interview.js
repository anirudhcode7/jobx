import React, { useState, useEffect } from 'react';
import { fetchQuestions, submitInterview, evaluateInterview } from '../api/interviewApi';
import SpeechToText from '../components/SpeechToText';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../context/AuthContext';
import { TypeAnimation } from 'react-type-animation';
import { useNavigate } from 'react-router-dom';


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
          navigate('/thank-you');
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
          <TypeAnimation
            key={currentQuestionIndex}
            sequence={[questions[currentQuestionIndex]]}
            wrapper="span"
            speed={50}
            style={{ fontSize: '2em', display: 'inline-block' }}
            repeat={0}
        />
        }
        </div>
        <div className="relative mt-2">
          <textarea
            className="p-2 pl-3 pr-10 border border-gray-300 rounded-md w-full"
            value={userAnswers[currentQuestionIndex]}
            onChange={handleAnswerChange}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-2">
            {isRecording ? (
              <FontAwesomeIcon 
                icon={faMicrophone} 
                onClick={toggleRecording} 
                className="text-green-500 cursor-pointer"
                size="2x"
              />
            ) : (
              <FontAwesomeIcon 
                icon={faMicrophone} 
                onClick={toggleRecording}
                className="text-gray-500 cursor-pointer"
                size="2x"
              />
            )}
          </div>
        </div>

        <SpeechToText onTranscription={handleTranscription} isRecording={isRecording} />
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
