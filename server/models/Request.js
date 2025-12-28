const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  requesteduser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  accepteduser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  serviceType: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    required: true
  },
  acceptedAt:{
    type:Date,
    default:null
  },
  completedAt:{
    type:Date,
    default:null
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Accepted','Rejected','Cancelled', 'Completed'],
    default: 'Pending'
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('Request', requestSchema); 