const mongoose = require("mongoose");
const Job = require("./models/Job");

// Connect to the database
mongoose
  .connect("mongodb://localhost:27017/dev", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected successfully.");
    // Call the getAllJobs function to execute it
    getAllJobs()
      .then((jobs) => {
        console.log("Job retrieval successful.");
        //console.log("First 10 jobs:", jobs);
      })
      .catch((error) => {
        console.error("Error retrieving jobs:", error);
      });
  })
  .catch((error) => {
    console.error("Error connecting to database:", error);
  });

// Controller function to get all job postings with pagination
const getAllJobs = async () => {
  try {
    // fetch job scema from database

    const scemha = mongoose.model("Job").schema;
    console.log("Schema: ", scemha.obj);

    const jobs = await Job.find().limit(10);
    // cross check with schema if all fields are being fetched
    console.log("Fields in Job Schema: ", Job.schema.obj);

    //console.log("Jobs: ", jobs[0]);
    return jobs;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw error;
  }
};
