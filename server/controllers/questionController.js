const Question = require("../models/Question");

// Controller function to create a new question
const createQuestion = async (req, res) => {
  try {
    const newQuestion = new Question(req.body);
    await newQuestion.save();
    console.log("New Question Added Successfully");
    res.status(201).json({ message: "Question created successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create question. Please try again." });
  }
};

// Controller function to get all questions with pagination
const getAllQuestions = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10; // Default limit is 10 questions per page

  try {
    const totalQuestions = await Question.countDocuments();
    const totalPages = Math.ceil(totalQuestions / limit);
    const offset = (page - 1) * limit;

    const questions = await Question.find().skip(offset).limit(limit);

    res.json({
      questions,
      page,
      totalPages,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve questions. Please try again." });
  }
};


// Controller function to get a single question by ID
const getQuestionById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ message: "Question not found." });
    }
    res.json(question);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve question. Please try again." });
  }
};

// Controller function to update a question by ID
const updateQuestionById = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedQuestion = await Question.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    if (!updatedQuestion) {
      return res.status(404).json({ message: "Question not found." });
    }
    res.json({ message: "Question updated successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update question. Please try again." });
  }
};

// Controller function to delete a question by ID
const deleteQuestionById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedQuestion = await Question.findByIdAndDelete(id);
    if (!deletedQuestion) {
      return res.status(404).json({ message: "Question not found." });
    }
    console.log("Deleted Question successfully");
    res.json({ message: "Question deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete question. Please try again." });
  }
};

module.exports = {
  createQuestion,
  getAllQuestions,
  getQuestionById,
  updateQuestionById,
  deleteQuestionById,
};
