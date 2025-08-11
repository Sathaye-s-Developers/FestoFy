const mongoose = require("mongoose");

const subEventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },

  event_mode: {
    type: String,
    enum: ["free", "paid"],
    default: "free",
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String, // optional: store as string "10:30 AM"
  },
  location: {
    type: String,
  },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },
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

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const SubEvent = mongoose.model("SubEvent", subEventSchema);

module.exports = SubEvent;