const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const InterviewController = require('../controllers/interviewController.js');

// Use the authMiddleware to protect the /questions route
router.get('/questions', authMiddleware, InterviewController.getQuestions);

// Get route to get the current count of interviews for a given user
// The authMiddleware ensures that only authenticated users can post an interview
router.get('/count', authMiddleware, InterviewController.getCurrentCountOfInterviews);

// POST route for submitting an interview
// The authMiddleware ensures that only authenticated users can post an interview
router.post('/responses', authMiddleware, InterviewController.postInterview);



module.exports = router;
