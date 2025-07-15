const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,

    minlength: [13, "Email must be at least 13 characters long"],
  },
  title: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  department: {
    type: String,
    required: false,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  bannerUrl: {
    type: String,
    required: true,
    trim: true,
  },
  dateRange: {
    start: Date,
    end: Date,
  },
  subEvents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubEvent", // update as needed
    },
  ],
  volunteers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Volunteer",
    },
  ],

  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Participation",
    },
  ],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // update as needed
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;