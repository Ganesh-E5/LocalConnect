const mongoose = require('mongoose');

const serviceCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  skills: [
    {
      type: String,
      required: true,
      trim: true
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('ServiceCategory', serviceCategorySchema);
