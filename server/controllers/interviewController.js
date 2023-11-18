const User = require('../models/User');
const Interview = require('../models/Interview'); // Import the Interview model

const Questions = [
    "What are you looking for in your next job?",
     "What are your career goals for the next five years?",
     "Describe a problem that you have solved using data. What did you enjoy about the process?"
]

const getQuestions = async (req, res) => {
    res.json({ Questions });
}


// Function to store interview data
const postInterview = async (req, res) => {
    try {
        // Retrieve interview data from the request body
        const { interview } = req.body;

        // Retrieve user ID from the decoded JWT token in req.user
        const userId = req.user.id;

        // Check if the interview data is provided
        if (!interview) {
            return res.status(400).json({ message: 'Interview data is required.' });
        }

        // Create a new interview document
        const newInterview = new Interview({
            user_id: userId,
            interview: interview
        });

        // Save the interview document to the database
        await newInterview.save();
        console.log("Interview data stored successfully.");
        res.status(201).json({ message: 'Interview data stored successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to store interview data. Please try again.' });
    }
};

const InterviewController = {
    getQuestions,
    postInterview
}

module.exports = InterviewController;