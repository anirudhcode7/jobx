const User = require('../models/User');
const Interview = require('../models/Interview'); // Import the Interview model
const MAX_ATTEMPTS = process.env.MAX_ATTEMPTS || 5; // Default to 5 if not specified in .env

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
        const userId = req.user.id;
        const { interview } = req.body;

        // Find existing interview data for the user
        let userInterview = await Interview.findOne({ user_id: userId });

        // Check if the user has reached the maximum number of attempts
        if (userInterview && userInterview.interviews.length >= MAX_ATTEMPTS) {
            return res.status(403).json({ message: 'Maximum number of attempts reached.' });
        }

        // Create a new interview attempt
        const newAttempt = {
            interview,
            attempt_number: userInterview ? userInterview.interviews.length + 1 : 1
        };

        // If no existing interview data, create new record
        if (!userInterview) {
            userInterview = new Interview({ user_id: userId, interviews: [newAttempt] });
        } else {
            // Add new attempt to existing interview data
            userInterview.interviews.push(newAttempt);
        }

        // Save the interview data
        await userInterview.save();
        console.log("Interview data stored successfully for Interview number: ",newAttempt.attempt_number);
        res.status(201).json({ message: 'Interview data stored successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to store interview data. Please try again.' });
    }
};

const getCurrentCountOfInterviews = async (req, res) => {
    try {
        const userId = req.user.id;

        // Find existing interview data for the user
        let userInterview = await Interview.findOne({ user_id: userId });

        if (userInterview){
            return res.status(200).json({count: userInterview.interviews.length});
        }
        return res.status(200).json({count: 0});
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to get the count data. Please try again' });
    }
}

const InterviewController = {
    getQuestions,
    postInterview,
    getCurrentCountOfInterviews
}

module.exports = InterviewController;