const mongoose = require("mongoose");

const participationSchema = new mongoose.Schema(
  {
    participantName: {
      type: String,
      required: true,
    },
    participantEmail: {
      type: String,
      required: true,
      lowercase: true,
    },
    participantPhone: {
      type: String,
      required: true,
    },

    college: {
      type: String,
      required: true,
    },
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    subEventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubEvent",
      required: true,
    },
    registeredAt: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Participation", participationSchema);