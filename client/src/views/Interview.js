import React, { useState, useEffect, useRef } from "react";
import {
  fetchQuestions,
  submitInterview,
  evaluateInterview,
} from "../api/interviewApi";
import QuestionDisplay from "../components/interview/QuestionDisplay";
import QuestionCategoryModal from "../components/interview/QuestionTypeModal";
import SubmitIntervieModal from "../components/interview/SubmitInterviewModal";

// import TextInputWithMic from '../components/interview/TextInputWithMic';
import SpeechToText from "../components/SpeechToText";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/core/NavBar";
import { Flex } from "@tremor/react";
import { Chip, Button, Tooltip, useDisclosure } from "@nextui-org/react";

import { Textarea } from "@tremor/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMicrophone,
  faArrowRight,
  faArrowLeft,
  faCheck,
  faKeyboard,
  faWaveSquare,
} from "@fortawesome/free-solid-svg-icons";
import "../components/interview/interview.css";

const InterviewPage = () => {
  var { authToken, setToken } = useAuth();
  const [questions, setQuestions] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const navigate = useNavigate();

  const [isRecording, setIsRecording] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isTextAreaDisabled, setIsTextAreaDisabled] = useState(true);
  const [isQuestionPrevMoved, setQuestionPrevMoved] = useState(false);
  const [textAreaClass, setTextAreaClass] = useState("h-32");
  const textareaRef = useRef(null);
  const {
    isOpen: isSubmitModalOpen,
    onOpen: onOpenSubmitModal,
    onClose: onCloseSubmitModal,
  } = useDisclosure();

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Setting up the text area height
    if (!isRecording) {
      setTextAreaClass("h-64");
    } else {
      setTextAreaClass("h-32");
    }
  };

  const toggleTyping = () => {
    console.log("clicking", isTyping);
    setIsTyping(!isTyping);
    setIsTextAreaDisabled(!isTextAreaDisabled);
    // Setting up the text area height
    if (!isTyping) {
      setTextAreaClass("h-64");
    } else {
      setTextAreaClass("h-32");
    }
  };

  const handleTranscription = (transcribedText) => {
    const updatedUserAnswers = [...userAnswers];
    updatedUserAnswers[currentQuestionIndex] += ` ${transcribedText}`;
    setUserAnswers(updatedUserAnswers);
  };

  useEffect(() => {
    // If there is no authToken in the context, retrieve it from localStorage
    if (!authToken) {
      const storedAuthToken = localStorage.getItem("authToken");
      if (storedAuthToken) {
        setToken(storedAuthToken);
      } else {
        // Redirect to login if no authToken found
        navigate("/");
        return;
      }
    }

    // Fetch questions from the backend when the component mounts
    fetchQuestions(authToken)
      .then((response) => {
        const questionsResponse = response.data.Questions;

        setQuestions(questionsResponse);
        setUserAnswers(Array(questionsResponse.length).fill(""));
        console.log(response.data);
      })
      .catch((error) => {
        // Handle errors, such as redirecting on authorization failure
        console.error("Error fetching questions:", error);
      });
  }, [authToken, setToken, navigate]);

  const handleAnswerChange = (event) => {
    const updatedUserAnswers = [...userAnswers];
    updatedUserAnswers[currentQuestionIndex] = event.target.value;
    setUserAnswers(updatedUserAnswers);
  };

  const handlePrevQuestion = () => {
    console.log("Prev button clicked: ", currentQuestionIndex);
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setQuestionPrevMoved(true);
    }
  };

  const handleNextQuestion = () => {
    console.log("Next button clicked: ", currentQuestionIndex);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setQuestionPrevMoved(false);
    }
  };

  const handleSubmit = () => {
    console.log("Submit button clicked");

    // Construct the interview data
    const interviewData = questions.map((questionObj, index) => ({
      question: questionObj.question,
      answer: userAnswers[index],
    }));

    // Send a POST request to the backend to store the interview data
    submitInterview(authToken, interviewData)
      .then((response) => {
        console.log("Interview data submitted successfully:", response);
        navigate("/thank-you");
      })
      .catch((error) => {
        console.error("Error submitting interview data:", error);
        // Handle the error, such as displaying an error message
      });

    // Call evaluate API with chatGPT
    evaluateInterview(authToken)
      .then((response) => {
        console.log("Evaluation from Chat-GPT: ", response);
      })
      .catch((error) => {
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

  const questionsCount = questions.length;
  const isFirstQuestion = currentQuestionIndex === 0;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  return (
    <>
      <NavBar />
      <div
        className="bg-gray-100 flex flex-col items-center justify-center"
        style={{ height: "calc(100vh - 65px)" }}
      >
        <div className="bg-white m-3 p-2 lg:p-4 rounded-xl shadow-xl border-1 border-slate-50 max-w-4xl w-11/12 lg:w-full flex flex-col">
          {!isRecording ? (
            <Flex className="gap-4 p-0 py-1 mb-3 w-full">
              <div>
                <Chip
                  variant="shadow"
                  classNames={{
                    base: "border-gray/50 border-1 rounded-lg bg-white shadow-slate-200/30",
                    content:
                      "text-slate-500 font-normal py-1 text-xs lg:text-sm",
                  }}
                >
                  {" "}
                  Question{" "}
                  <span style={{ letterSpacing: "1.6px" }}>
                    {currentQuestionIndex + 1}/{questionsCount}
                  </span>
                </Chip>
              </div>
              <div>
                <QuestionCategoryModal
                  type={
                    questions[currentQuestionIndex]
                      ? questions[currentQuestionIndex].type
                      : ""
                  }
                />
              </div>
            </Flex>
          ) : (
            <></>
          )}

          <QuestionDisplay
            question={
              questions[currentQuestionIndex]
                ? questions[currentQuestionIndex].question
                : ""
            }
            skipAnimate={isQuestionPrevMoved}
            currentQuestionIndex={currentQuestionIndex}
          />

          <Textarea
            onChange={handleAnswerChange}
            id="description"
            placeholder={
              isTyping ? "Type answer here..." : "Start answering..."
            }
            className={`rounded-md transition-all duration-500 focus:outline-none focus:border-1 focus:border-slate-400 focus:h-64 ${textAreaClass}`}
            value={
              userAnswers[currentQuestionIndex]
                ? userAnswers[currentQuestionIndex]
                : ""
            }
            disabled={isTextAreaDisabled}
            ref={textareaRef}
          />
          {isRecording && (
            <div className="mt-4 relative flex justify-center items-center">
              <div className="transribe_shadow rounded-xl ">
                <div class="w-full rounded-xl text-slate-500 bg-slate-50 p-2 px-4 text-xs font-medium">
                  {" "}
                  <FontAwesomeIcon icon={faWaveSquare} size="sm" /> transcribing
                  your answer ...
                </div>
              </div>
            </div>
          )}

          <SpeechToText
            onTranscription={handleTranscription}
            isRecording={isRecording}
          />

          <Flex className="gap-4 p-0 py-1 mt-3 w-full">
            <div>
              {!isTyping ? (
                <Button
                  color="primary"
                  size="sm"
                  onClick={toggleRecording}
                  className="py-6 w-0 lg:w-auto lg:p-8 font-medium bg-blue-600 text-md lg:text-lg"
                >
                  {isRecording ? (
                    <>
                      <FontAwesomeIcon icon={faCheck} size="lg" />
                      <p>Done</p>
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faMicrophone} size="lg" />
                      {userAnswers[currentQuestionIndex] ? (
                        <span className="hidden lg:block">
                          <p>Continue</p>
                        </span>
                      ) : (
                        <span className="hidden lg:block">
                          <p>Answer</p>
                        </span>
                      )}
                    </>
                  )}
                </Button>
              ) : (
                <></>
              )}
              {isRecording ? (
                <></>
              ) : (
                <Tooltip
                  showArrow={true}
                  content={
                    !isTyping
                      ? userAnswers[currentQuestionIndex]
                        ? "Edit Answer"
                        : "Type Answer"
                      : "Finish Answering"
                  }
                  placement="bottom"
                >
                  <Button
                    color="primary"
                    size="sm"
                    onClick={toggleTyping}
                    className="py-6 lg:p-8 text-md w-0 lg:w-auto lg:text-lg mx-2 font-medium border-blue-600 bg-white text-blue-600 hover:bg-blue-600 hover:text-white border-1"
                  >
                    {!isTyping ? (
                      <FontAwesomeIcon icon={faKeyboard} size="lg" />
                    ) : (
                      <>
                        <FontAwesomeIcon icon={faCheck} size="lg" /> <p>Done</p>
                      </>
                    )}
                  </Button>
                </Tooltip>
              )}
            </div>

            {!isRecording && !isTyping ? (
              <div>
                {isFirstQuestion ? (
                  <></>
                ) : (
                  <Tooltip
                    showArrow={true}
                    content="Previous Question"
                    placement="bottom"
                  >
                    <Button
                      size="sm"
                      className="py-6 lg:p-8 text-md w-0 lg:w-auto lg:text-lg mx-2 font-medium border-blue-600 bg-white text-blue-600 hover:bg-blue-600 hover:text-white border-1"
                      onClick={handlePrevQuestion}
                    >
                      <FontAwesomeIcon icon={faArrowLeft} size="lg" />
                    </Button>
                  </Tooltip>
                )}
                <Tooltip
                  showArrow={true}
                  content={
                    isLastQuestion ? "Submit Interview" : "Next Question"
                  }
                  placement="bottom"
                >
                  <Button
                    size="sm"
                    className=" py-6 lg:p-8 text-md w-0 lg:w-auto lg:text-lg font-medium border-blue-600 bg-white text-blue-600 hover:bg-blue-600 hover:text-white border-1"
                    onPress={
                      isLastQuestion ? onOpenSubmitModal : handleNextQuestion
                    }
                  >
                    {isLastQuestion ? (
                      <>
                        <FontAwesomeIcon icon={faCheck} size="lg" />
                      </>
                    ) : (
                      <FontAwesomeIcon icon={faArrowRight} size="lg" />
                    )}
                  </Button>
                </Tooltip>
              </div>
            ) : (
              <></>
            )}
          </Flex>
          <SubmitIntervieModal
            isSubmitModalOpen={isSubmitModalOpen}
            onOpenSubmitModal={onOpenSubmitModal}
            onCloseSubmitModal={onCloseSubmitModal}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </>
  );
};

export default InterviewPage;
