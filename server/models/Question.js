const mongoose = require('mongoose');
const { Schema } = mongoose;

const questionSchema = new Schema({
  category: String,
  sub_category: String,
  type: String,
  question: { type: String, required: true }
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
