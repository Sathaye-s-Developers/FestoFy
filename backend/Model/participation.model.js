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
      required: false, // For main event-level registration
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
    type: {
      type: String,
      enum: ["college", "explore"],
      required: true,
    },
  },
  { timestamps: true }
);

// 🛡️ Unique only for same person (email) registering for same sub-event
participationSchema.index(
  { participantEmail: 1, subEventId: 1 },
  {
    unique: true,
    partialFilterExpression: { subEventId: { $exists: true } },
  }
);

// 🛡️ Unique only for same person (email) registering for full event (no sub-event)
participationSchema.index(
  { participantEmail: 1, eventId: 1 },
  {
    unique: true,
    partialFilterExpression: { subEventId: { $exists: false } },
  }
);

module.exports = mongoose.model("Participation", participationSchema);
