const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    minlength: [3, 'uesername must be at least 3 characters long']
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
    minlength: [13, 'email must be at least 13 characters long']
  },
  collegeName: {
    type: String,
    require: false,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: [5, 'password must be at least 5 characters long']
  },
  college_code: {
    type: String,
    require: false,
    trim: true
  },
  role: {
    type: String,
    require: false,
    default: "user",
    enum: ["user", "admin", "superadmin"],
  },
  isAdminRequested: {
    type: Boolean,
    default: false,
  },
  adminRequest: {
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    requestedAt: Date,
    reason: String,
    processedAt: Date,
    processedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  adminRevoked: {
    reason: String,
    revokedAt: Date,
    revokedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
});

const users = mongoose.model('users', userSchema);

module.exports = users; 