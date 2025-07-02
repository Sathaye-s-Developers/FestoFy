const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
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
    default: "C://myproject//SathayProject//Festofy//defult event img.png",
    set: (v) =>
      v === ""
        ? "C://myproject//SathayProject//Festofy//defult event img.png"
        : v,
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
      ref: "SubEvent", //list of all subevent
    },
  ],
  volunteers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Volunteer", // volunteer list who regster for event
    },
  ],

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users", // whose created
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
