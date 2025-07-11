const express = require('express');
const router = express.Router();
const protect = require('../middleware/protect');
const authorizeRoles = require('../middleware/authorizeRoles');
const Job = require('../models/Job');

// ✅ ADMIN: Add Job
router.post('/add-job', protect, authorizeRoles('admin'), async (req, res) => {
  const { company, position, status, location, jobType } = req.body;

  try {
    const job = await Job.create({
      company,
      position,
      status,
      location,
      jobType,
      createdBy: req.user._id,
    });

    res.status(201).json(job);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Job creation failed', error: err.message });
  }
});

// ✅ USER & ADMIN: View all jobs created by the user
router.get('/all-jobs', protect, async (req, res) => {
  try {
    const jobs = await Job.find({ createdBy: req.user._id }).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to fetch jobs', error: err.message });
  }
});

// ✅ USER & ADMIN: Edit their own job
router.put('/edit-job/:id', protect, async (req, res) => {
  try {
    const job = await Job.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!job) return res.status(404).json({ msg: 'Job not found or unauthorized' });

    res.json(job);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to update job', error: err.message });
  }
});

// ✅ ADMIN ONLY: Delete any job
router.delete('/delete-job/:id', protect, authorizeRoles('admin'), async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);

    if (!job) return res.status(404).json({ msg: 'Job not found' });

    res.json({ msg: 'Job deleted successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Failed to delete job', error: err.message });
  }
});

module.exports = router;
