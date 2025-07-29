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
  },
  department: {
    type: String,
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

  //Visibility logic: 'college' or 'explore'
  visibility: {
    type: String,
    enum: ["college", "explore"],
    default: "college",
  },

  createdByCollege: {
    type: String,
    required: true, // used for filtering college events
  },

  subEvents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubEvent",
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
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Event", eventSchema);
