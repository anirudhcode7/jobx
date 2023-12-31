const mongoose = require('mongoose');
const { Schema } = mongoose;

const interviewSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  interviews: [
    {
      interview: [
        {
          question: { type: String, required: true },
          answer: { type: String, required: true }
        }
      ],
      attempt_number: { type: Number, required: true }
    }
  ]
});

const Interview = mongoose.model('Interview', interviewSchema);

module.exports = Interview;
