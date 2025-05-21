
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import routes
const studentRoutes = require('./routes/studentRoutes');

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies

// Routes
app.use('/api/students', studentRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Student Management API is running...');
});

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
  });
