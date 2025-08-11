const router = require("express").Router();
const Razorpay = require("razorpay");
const crypto = require("crypto");
require("dotenv").config();
const Participation = require("../Model/participation.model");
const User = require("../Model/user.model");
const Event = require("../Model/event.module");
const SubEvent = require("../Model/subevent.model");
const verifyToken = require("../middlewares/token_varification");

// Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.ROZARPAY_ID,
  key_secret: process.env.ROZARPAY_SECRET,
});

// routes/payment.router.js

router.post("/create-order", verifyToken, async (req, res) => {
  try {
    const { eventId, subEventId } = req.body;
    if (!eventId)
      return res.status(400).json({ error: "Event ID is required" });

    if (subEventId) {
      const subEvent = await SubEvent.findById(subEventId);
      if (!subEvent)
        return res.status(404).json({ error: "SubEvent not found" });
      amount = subEvent.price || 10;
    } else {
      const event = await Event.findById(eventId);
      if (!event) return res.status(404).json({ error: "Event not found" });
      amount = event.price || 0;
    }

    if (amount <= 0) {
      return res.status(400).json({ error: "This is not a paid event" });
    }

    const order = await razorpay.orders.create({
      amount: amount * 100, // already in paise
      currency: "INR",
      receipt: `receipt_order_${Date.now()}`,
    });

    res.json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.post("/verify-payment", verifyToken, async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      phone,
      eventId,
      subEventId,
      type,
    } = req.body;

    if (!eventId || !phone)
      return res.status(400).json({ error: "Event ID and phone are required" });

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ error: "User not found" });

    // Validate signature
    const generated_signature = crypto
      .createHmac("sha256", process.env.ROZARPAY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    const isValid = generated_signature === razorpay_signature;

    if (!isValid) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid signature" });
    }

    // Check for duplicate registration
    const existing = await Participation.findOne(
      subEventId
        ? { participantEmail: user.email, eventId, subEventId }
        : {
            participantEmail: user.email,
            eventId,
            subEventId: { $exists: false },
          }
    );

    if (existing) {
      return res.status(409).json({ error: "Already registered" });
    }

    // Get amount
    let amount = 0;
    if (subEventId) {
      const subEvent = await SubEvent.findById(subEventId);
      if (!subEvent)
        return res.status(404).json({ error: "SubEvent not found" });
      amount = subEvent.price || 0;
    } else {
      const event = await Event.findById(eventId);
      if (!event) return res.status(404).json({ error: "Event not found" });
      amount = event.price || 0;
    }

    // Save paid participant
    const newParticipant = new Participation({
      participantName: user.username,
      participantEmail: user.email,
      participantPhone: phone,
      college: user.collegeName,
      eventId,
      subEventId: subEventId,
      isPaid: true,
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      amount: amount,
      paidAt: new Date(),
      status: "confirmed",
      type: type || "college",
    });

    const savedParticipant = await newParticipant.save();

    // Link to Event/SubEvent
    await Event.findByIdAndUpdate(eventId, {
      $push: { participants: savedParticipant._id },
    });

    if (subEventId) {
      await SubEvent.findByIdAndUpdate(subEventId, {
        $push: { participants: savedParticipant._id },
      });
    }

    return res.json({
      success: true,
      message: "Payment verified and registration successful!",
      data: savedParticipant,
    });
  } catch (err) {
    console.error("Payment verify error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;