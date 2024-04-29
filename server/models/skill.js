// skill.js
const mongoose = require("mongoose");
const { Schema } = mongoose;

const skillSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true, // Ensure skill names are unique
  },
  // You can add more fields to describe skills, such as proficiency level, etc.
});

const Skill = mongoose.model("Skill", skillSchema);

module.exports = Skill;
