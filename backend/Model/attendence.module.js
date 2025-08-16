const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
  {
    volunteer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Volunteer",
      required: true,
    },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    subEvent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubEvent",
      required: true,
    },
    date: { type: Date, required: true },
    status: { type: String, enum: ["Present", "Absent"], default: "Absent" },
  },
  { timestamps: true }
);

// Unique: volunteer + subEvent + date
attendanceSchema.index(
  { volunteer: 1, subEvent: 1, date: 1 },
  { unique: true }
);

const Attendance = mongoose.model("Attendance", attendanceSchema);
module.exports = Attendance;
