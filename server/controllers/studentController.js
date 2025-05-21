
const Student = require('../models/Student');
const Mark = require('../models/Mark');
const mongoose = require('mongoose');

// Get all students with pagination
exports.getStudents = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const skip = (page - 1) * limit;
    
    let query = {};
    
    // Search functionality
    if (req.query.search) {
      query.name = { $regex: req.query.search, $options: 'i' };
    }
    
    const total = await Student.countDocuments(query);
    const students = await Student.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    res.status(200).json({
      success: true,
      students,
      total,
      page,
      limit,
      pages: Math.ceil(total / limit)
    });
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching students',
      error: error.message
    });
  }
};

// Get student by ID with their marks
exports.getStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid student ID'
      });
    }
    
    const student = await Student.findById(id);
    
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }
    
    // Get marks for the student
    const marks = await Mark.find({ studentId: id });
    
    res.status(200).json({
      success: true,
      student,
      marks
    });
  } catch (error) {
    console.error('Error fetching student:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching student',
      error: error.message
    });
  }
};

// Create a new student
exports.createStudent = async (req, res) => {
  try {
    const { name, email, age, parentsEmail } = req.body;
    
    // Check if student with email exists
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({
        success: false,
        message: 'A student with this email already exists'
      });
    }
    
    // Create new student
    const student = await Student.create({
      name,
      email,
      age,
      parentsEmail
    });
    
    res.status(201).json({
      success: true,
      student,
      message: 'Student created successfully'
    });
  } catch (error) {
    console.error('Error creating student:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating student',
      error: error.message
    });
  }
};

// Update student by ID
exports.updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, age, parentsEmail } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid student ID'
      });
    }
    
    // Check if email belongs to another student
    if (email) {
      const existingStudent = await Student.findOne({ email, _id: { $ne: id } });
      if (existingStudent) {
        return res.status(400).json({
          success: false,
          message: 'Email already in use by another student'
        });
      }
    }
    
    // Update student
    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      { name, email, age, parentsEmail },
      { new: true, runValidators: true }
    );
    
    if (!updatedStudent) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }
    
    res.status(200).json({
      success: true,
      student: updatedStudent,
      message: 'Student updated successfully'
    });
  } catch (error) {
    console.error('Error updating student:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating student',
      error: error.message
    });
  }
};

// Delete student and their marks
exports.deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid student ID'
      });
    }
    
    // Delete student
    const student = await Student.findByIdAndDelete(id);
    
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }
    
    // Delete all marks for the student
    await Mark.deleteMany({ studentId: id });
    
    res.status(200).json({
      success: true,
      message: 'Student and their marks deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting student:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting student',
      error: error.message
    });
  }
};

// Add marks for a student
exports.addMarks = async (req, res) => {
  try {
    const { studentId } = req.params;
    const { subject, marks } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid student ID'
      });
    }
    
    // Check if student exists
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }
    
    // Create mark
    const mark = await Mark.create({
      studentId,
      subject,
      marks
    });
    
    res.status(201).json({
      success: true,
      mark,
      message: 'Marks added successfully'
    });
  } catch (error) {
    console.error('Error adding marks:', error);
    res.status(500).json({
      success: false,
      message: 'Error adding marks',
      error: error.message
    });
  }
};
