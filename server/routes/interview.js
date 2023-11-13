const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');


const InterviewController =  require('../controllers/interviewController.js')

// Use the authMiddleware to protect the /questions route
router.get('/questions', authMiddleware, InterviewController.getQuestions);


module.exports = router;