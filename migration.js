const mongoose = require("mongoose");
const Interview = require("./server/models/Interview");
const Job = require("./server/models/Job");
const jobs = require("./dev.jobs.json");

async function findOrGenerateJobId(interview) {
  try {
    // Implement your logic to find or generate a job ID here
    // For example, you could search for a job based on interview questions,
    // or you could randomly select a job from the database
    const randomJob = await Job.aggregate([{ $sample: { size: 1 } }]);
    return randomJob[0]._id;
  } catch (error) {
    console.error("Error finding or generating job ID:", error);
    throw error;
  }
}

async function migrateData() {
  try {
    // Connect to MongoDB
    await mongoose.connect("mongodb://localhost:27017/dev", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connection established successfully");

    // Insert all jobs from dev.jobs.json to the database
    for (const job of jobs) {
      // check the data validity
      schema = Job.schema.obj;

      // for each field in schema check if it is present in job
      for (const field in schema) {
        if (!job[field]) {
          console.log(`Field ${field} missing in job`);
        }
      }
      await Job.create(job);
    }

    console.log("Jobs added to the database successfully");

    // Fetch all existing interviews
    const interviews = await Interview.find({});

    console.log("Data migration completed successfully");
    mongoose.connection.close();
  } catch (error) {
    console.error("Data migration error:", error);
    process.exit(1);
  }
}

// Call the migration function
migrateData();
