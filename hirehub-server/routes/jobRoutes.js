const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');

// POST /api/jobs - Create a new job post
router.post('/', jobController.createJob);

// GET /api/jobs - Get all jobs with optional filters
router.get('/', jobController.getAllJobs);

module.exports = router;
