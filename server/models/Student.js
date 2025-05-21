
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true
    },
    age: {
      type: Number,
      required: [true, 'Age is required']
    },
    parentsEmail: {
      type: String,
      required: [true, 'Parent\'s email is required'],
      trim: true,
      lowercase: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Student', studentSchema);
