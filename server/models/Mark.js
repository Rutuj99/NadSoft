
const mongoose = require('mongoose');

const markSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true
    },
    subject: {
      type: String,
      required: [true, 'Subject name is required'],
      trim: true
    },
    marks: {
      type: Number,
      required: [true, 'Marks are required']
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Mark', markSchema);
