const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { 
    type: String,
    required: true,
    trim: true
  },

  phno: {
    type: String,
    required: true,
    trim: true,
    match: [/^\d{10}$/, 'Phone number must be 10 digits'] // Adjust pattern if needed
  },

  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
  },

  password: { 
    type: String, 
    required: true,
    minlength: 6
  },

  skills: {
    type: [String],
    default: [],
    set: skills => skills.map(skill => skill.trim())
  },

  location: {
    type: String,
    trim: true
  },

  requests: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Request'
  }],

  acceptedRequests:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Request'
  }],

}, { timestamps: true });

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;