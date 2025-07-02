const mongoose = require('mongoose');

const OTPSchema = new mongoose.Schema({
  email: String,
  otp: String,
  createdAt: { type: Date, default: Date.now, expires: 300 }, // expires after 5 minutes
});

module.exports = mongoose.model("OTP", OTPSchema);

