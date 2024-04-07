const mongoose = require("mongoose");
const { Schema } = mongoose;

const jobSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  job_link: {
    type: String,
    required: true,
  },
  posted_date: {
    type: Date,
    default: Date.now,
  },
  employment_type: {
    type: String,
    enum: ["full-time", "part-time", "intern"],
  },
  location: {
    type: String,
  },
  skills_required: {
    type: [String],
  },
  experience_required: {
    type: Number,
  },
  company_name: {
    type: String,
  },
  company_logo: {
    type: String, // Assuming the company logo is stored as a URL
  },
});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
