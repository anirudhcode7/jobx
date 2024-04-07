const express = require('express');
const router = express.Router();
const JobController = require('../controllers/jobController');

// Create a new job posting
router.post('/jobs', JobController.createJob);

// Get all job postings
router.get('/jobs', JobController.getAllJobs);

// Get a single job posting by ID
router.get('/jobs/:id', JobController.getJobById);

// Update a job posting by ID
router.put('/jobs/:id', JobController.updateJobById);

// Delete a job posting by ID
router.delete('/jobs/:id', JobController.deleteJobById);

module.exports = router;
