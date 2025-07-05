const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// 👉 Create a new task
router.post('/', async (req, res) => {
  console.log('👉 POST /api/tasks called with:', req.body); // ✅ Your custom logging line

  try {
    const task = new Task(req.body);
    const savedTask = await task.save();
    console.log('✅ Task saved:', savedTask); // Optional: extra logging
    res.status(201).json(savedTask);
  } catch (err) {
    console.error('❌ Error saving task:', err); // ✅ Optional: extra logging
    res.status(500).json({ message: err.message });
  }
});

// 👉 Get all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find().populate('project assignedTo createdBy');
    res.json(tasks);
  } catch (err) {
    console.error('❌ Error fetching tasks:', err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
