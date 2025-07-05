const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const auth = require('../middleware/auth');

// Create project
router.post('/', auth, async (req, res) => {
  try {
    const { name, description, teamMembers } = req.body;
    const project = new Project({ name, description, teamMembers, createdBy: req.user.id });
    await project.save();
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all projects for the user
router.get('/', auth, async (req, res) => {
  try {
    const projects = await Project.find({ createdBy: req.user.id });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
