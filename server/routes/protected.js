const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');

router.get('/dashboard', verifyToken, (req, res) => {
  res.json({ message: `Welcome, user ID: ${req.user.id}` });
});

module.exports = router;