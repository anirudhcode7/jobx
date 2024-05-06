const mongoose = require("mongoose");
const Chance = require("../node_modules/chance");
const Job = require("./models/Job");
const Skill = require("./models/Skill");

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/dev", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a new Chance instance
const chance = new Chance();

// Function to generate a random job
const generateRandomJob = async () => {
  try {
    const title = chance.profession();
    const description = chance.sentence({ words: 10 });
    const jobLink = chance.url();
    const employmentType = chance.pickone(["full-time", "part-time", "intern"]);
    const location = chance.city();
    const skillsRequired = await generateRandomSkills(); // Generate random skills
    const experienceRequired = chance.integer({ min: 0, max: 10 });
    const companyName = chance.company();
    const companyLogo = chance.url({ domain: "example.com" });

    // Create a new job document
    const job = new Job({
      title,
      description,
      job_link: jobLink,
      employment_type: employmentType,
      location,
      skills_required: skillsRequired,
      experience_required: experienceRequired,
      company_name: companyName,
      company_logo: companyLogo,
    });

    // Save the job document to the database
    await job.save();
    console.log("Job created:", job);
  } catch (error) {
    console.error("Error generating random job:", error);
  }
};

// Function to generate random skills
const generateRandomSkills = async () => {
  try {
    const numSkills = chance.integer({ min: 1, max: 5 }); // Generate random number of skills (1-5)

    // fetch random skills from database
    const randomSkills = await Skill.aggregate([
      { $sample: { size: numSkills } },
    ]);

    // Map each skill to the required format
    return randomSkills.map((skill) => ({
      skill: skill._id,
      name: skill.name,
    }));
  } catch (error) {
    console.error("Error generating random skills:", error);
    return [];
  }
};

// Function to generate multiple random jobs
const generateRandomJobs = async (numJobs) => {
  try {
    for (let i = 0; i < numJobs; i++) {
      await generateRandomJob();
    }
    console.log("Random jobs generation completed.");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error generating random jobs:", error);
    mongoose.connection.close();
  }
};

// Generate 10 random jobs
generateRandomJobs(100);
