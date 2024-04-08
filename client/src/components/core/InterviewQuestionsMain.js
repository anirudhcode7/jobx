import React, { useState, useEffect } from "react";
import { Button, useDisclosure } from "@nextui-org/react";
import { fetchInterviewQuestions, addInterviewQuestion, updateInterviewQuestion, deleteInterviewQuestion } from "../../api/questionApi"; // Import the API functions for questions
import QuestionPostMain from "./QuestionsPostMain"; // Create a similar component for displaying interview questions
import AddQuestionModal from "./AddQuestionModal"; // Create a similar modal component for adding/editing questions
import { useAuth } from "../../context/AuthContext"; // Import the AuthContext

export default function InterviewQuestionsMain() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [questionData, setQuestionData] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { authToken } = useAuth(); // Get the authToken from the AuthContext
  const { userInfo } = useAuth();

  useEffect(() => {
    // Fetch questions from the backend when the component mounts
    fetchQuestionsFromApi();
  }, [authToken]);

  useEffect(() => {
    if (questionData) {
      onOpen();
    }
  }, [questionData, onOpen]);

  useEffect(() => {
    if (!isOpen) {
      setQuestionData(null);
    }
  }, [isOpen]);

  const fetchQuestionsFromApi = async () => {
    try {
      const data = await fetchInterviewQuestions(authToken); // Pass authToken to fetchQuestions function
      setQuestions(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching questions:", error);
      setLoading(false);
    }
  };

  const handleAddQuestion = async (newQuestionData) => {
    try {
      await addInterviewQuestion(authToken, newQuestionData); // Pass authToken to addQuestion function
      fetchQuestionsFromApi();
    } catch (error) {
      console.error("Error adding question:", error);
    }
  };

  const handleUpdateQuestion = async (updatedQuestionData) => {
    try {
      await updateInterviewQuestion(authToken, questionData._id.toString(), updatedQuestionData); // Pass authToken to updateQuestion function
      fetchQuestionsFromApi();
    } catch (error) {
      console.error("Error updating question:", error);
    }
  };

  const handleEdit = (id) => {
    console.log("Editing question with id:", id);
    const question = questions.find((question) => question._id.toString() === id);
    setQuestionData(question);
    onOpen();
  };

  const handleDelete = async (id) => {
    console.log("Deleting question with id:", id);
    try {
      await deleteInterviewQuestion(authToken, id); // Pass authToken to deleteQuestion function
      fetchQuestionsFromApi();
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  return (
    <>
      <div className="p-6">
        <h1 className="text-xl font-bold text-black mb-4">All Interview Questions</h1>
        {userInfo?.role === "admin" && (
          <Button
            onPress={onOpen}
            className="ml-auto text-white bg-indigo-800"
            size="lg"
            radius="full"
            variant="bordered"
          >
            Add Question
          </Button>
        )}

        <AddQuestionModal
          isOpen={isOpen}
          onClose={onClose}
          onAddQuestion={handleAddQuestion}
          initialQuestionData={questionData}
          onUpdateQuestion={handleUpdateQuestion}
        />

        {loading ? (
          <p>Loading...</p>
        ) : (
          questions.slice(0).reverse().map((question, index) => (
            <QuestionPostMain
              key={index}
              id={question._id.toString()}
              category={question.category}
              subCategory={question.sub_category}
              question={question.question}
              skills={question.skills}
              handleDelete={userInfo?.role === "admin" ? handleDelete : null}
              handleEdit={userInfo?.role === "admin" ? handleEdit : null}
            />
          ))
        )}
      </div>
    </>
  );
}
