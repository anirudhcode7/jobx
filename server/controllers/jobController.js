const Job = require("../models/Job");

// Controller function to create a new job posting
const createJob = async (req, res) => {
  try {
    // Extract data from the request body
    const { job_link, posted_date } = req.body;

    // Check if a job with the same job link and posted date already exists
    const existingJob = await Job.findOne({ job_link, posted_date });

    if (existingJob) {
      // If a job with the same link and posted date exists, return an error
      return res.status(400).json({ message: "Job already exists." });
    }

    // If the job does not already exist, create a new job posting
    const newJob = new Job(req.body);
    await newJob.save();
    console.log("New Job Added Successfully")

    res.status(201).json({ message: "Job posting created successfully." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to create job posting. Please try again." });
  }
};

// Controller function to get all job postings
const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to retrieve job postings. Please try again." });
  }
};

// Controller function to get a single job posting by ID
const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job posting not found." });
    }
    res.json(job);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to retrieve job posting. Please try again." });
  }
};

// Controller function to update a job posting by ID
const updateJobById = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedJob = await Job.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedJob) {
      return res.status(404).json({ message: "Job posting not found." });
    }
    res.json({ message: "Job posting updated successfully." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to update job posting. Please try again." });
  }
};

// Controller function to delete a job posting by ID
const deleteJobById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedJob = await Job.findByIdAndDelete(id);
    if (!deletedJob) {
      return res.status(404).json({ message: "Job posting not found." });
    }
    console.log("Deleted Job successfully")
    res.json({ message: "Job posting deleted successfully." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to delete job posting. Please try again." });
  }
};

module.exports = {
  createJob,
  getAllJobs,
  getJobById,
  updateJobById,
  deleteJobById,
};
