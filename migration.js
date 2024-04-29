const mongoose = require("mongoose");
const Interview = require("./server/models/Interview"); // Import the updated Interview model
const Job = require("./server/models/Job"); // Import the Job model

// Function to find or generate a job ID
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
    await mongoose.connect("mongodb://localhost:27017/your_database", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connection established successfully");

    // Fetch all existing interviews
    const interviews = await Interview.find({});

    // Iterate over each interview
    for (const interview of interviews) {
      // Iterate over each interview attempt
      for (const attempt of interview.interviews) {
        // Check if the attempt already has a job_id
        if (!attempt.job_id) {
          // If not, find or generate a job ID and assign it
          const jobId = await findOrGenerateJobId(interview);
          attempt.job_id = jobId;
        }
      }

      // Save the updated interview document
      await interview.save();
    }

    console.log("Data migration completed successfully");
    mongoose.connection.close();
  } catch (error) {
    console.error("Data migration error:", error);
    process.exit(1);
  }
}

// Call the migration function
migrateData();
