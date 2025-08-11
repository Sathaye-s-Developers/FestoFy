const mongoose = require("mongoose");

const participationSchema = new mongoose.Schema(
  {
    participantName: { type: String, required: true },
    participantEmail: { type: String, required: true, lowercase: true },
    participantPhone: { type: String, required: true },
    college: { type: String, required: true },

    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    subEventId: { type: mongoose.Schema.Types.ObjectId, ref: "SubEvent" }, // optional

    registeredAt: { type: Date, default: Date.now },
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

    //  Razorpay payment fields
    isPaid: { type: Boolean, default: false },
    paymentId: { type: String },
    orderId: { type: String },
    amount: { type: Number },
    paidAt: { type: Date },
  },
  { timestamps: true }
);

// Ensure no duplicate registration
participationSchema.index(
  { participantEmail: 1, subEventId: 1 },
  {
    unique: true,
    partialFilterExpression: { subEventId: { $exists: true } },
  }
);

participationSchema.index(
  { participantEmail: 1, eventId: 1 },
  {
    unique: true,
    partialFilterExpression: { subEventId: { $exists: false } },
  }
);

module.exports = mongoose.model("Participation", participationSchema);