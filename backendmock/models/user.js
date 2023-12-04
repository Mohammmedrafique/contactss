// models/user.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  label: { type: String },
  booked_slots: { type: Array }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
