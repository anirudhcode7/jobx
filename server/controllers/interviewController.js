const User = require('../models/User');

const Questions = [
    "What are you looking for in your next job?",
     "What are your career goals for the next five years?",
     "Describe a problem that you have solved using data. What did you enjoy about the process?"
]

const getQuestions = async (req, res) => {
    res.json({ Questions });
}

const InterviewController = {
    getQuestions,
}

module.exports = InterviewController;