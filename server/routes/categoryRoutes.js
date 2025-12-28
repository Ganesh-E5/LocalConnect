const express = require('express');
const router = express.Router();
const ServiceCategory = require('../models/ServiceCategory');

router.get('/', async (req, res) => {
  try {
    const categories = await ServiceCategory.find({});
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch categories' });
  }
});

module.exports = router;
