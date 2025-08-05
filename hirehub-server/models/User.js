const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['jobseeker', 'employer', 'admin'], required: true },
  skills: [String],
  experience: String
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
