const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
// Auth routes for register/login
app.use('/api/auth', require('./routes/authRoutes'));

// User profile routes (get and update profile)
app.use('/api/users', require('./routes/userRoutes'));

// Job post routes (create and view jobs)
app.use('/api/jobs', require('./routes/jobRoutes'));


// Test route
app.get('/', (req, res) => {
  res.send('HireHub backend running');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
