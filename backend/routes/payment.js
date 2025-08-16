const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");
const crypto = require("crypto");
require("dotenv").config();
const mongoose = require("mongoose");
const Participation = require("../Model/participation.model");
const User = require("../Model/user.model");
const Event = require("../Model/event.module");
const SubEvent = require("../Model/subevent.model");
const verifyToken = require("../middlewares/token_varification");

// Initialize Razorpay with environment variables
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_1DP5mmOlF5G5ag", // Test key fallback
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Payment request validation schema
const validatePaymentRequest = (data) => {
  if (!data.eventId) return { error: "Event ID is required" };
  if (data.subEventId && !mongoose.Types.ObjectId.isValid(data.subEventId)) {
    return { error: "Invalid SubEvent ID" };
  }
  return { error: null };
};

// Create payment order
router.post("/create-order", verifyToken, async (req, res) => {
  try {
    const validation = validatePaymentRequest(req.body);
    if (validation.error) {
      return res.status(400).json({ error: validation.error });
    }

    const { eventId, subEventId } = req.body;
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // Check event/sub-event existence and get price
      let amount = 0;
      let event, subEvent;

      event = await Event.findById(eventId).session(session);
      if (!event) throw new Error("Event not found");

      if (subEventId) {
        subEvent = await SubEvent.findOne({
          _id: subEventId,
          eventId,
        }).session(session);
        if (!subEvent) throw new Error("SubEvent not found");
        amount = subEvent.price || 0;
      } else {
        amount = event.price || 0;
      }

      if (amount <= 0) {
        throw new Error("This is not a paid event");
      }

      // Check existing participation
      const user = await User.findById(req.user._id).session(session);
      const existing = await Participation.findOne({
        participantEmail: user.email,
        eventId,
        ...(subEventId && { subEventId }),
      }).session(session);

      if (existing) {
        throw new Error("Already registered for this event");
      }

      // Create Razorpay order
      const order = await razorpay.orders.create({
        amount: Math.round(amount * 100), // Convert to paise
        currency: "INR",
        receipt: `receipt_${eventId}_${Date.now()}`,
        notes: {
          eventId,
          subEventId: subEventId || "none",
          userId: req.user._id.toString(),
        },
      });

      await session.commitTransaction();
      res.json({
        success: true,
        order,
        amount,
        currency: "INR",
      });
    } catch (err) {
      await session.abortTransaction();
      throw err;
    } finally {
      session.endSession();
    }
  } catch (err) {
    console.error("Order creation error:", err);
    res.status(400).json({
      success: false,
      error: err.message,
      code: err.code || "PAYMENT_ERROR",
    });
  }
});

// Verify payment and save participation
router.post("/verify-payment", verifyToken, async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      phone,
      eventId,
      subEventId,
      type = "college",
    } = req.body;

    // Basic validation
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      throw new Error("Missing payment verification data");
    }

    // Verify payment with Razorpay
    const payment = await razorpay.payments.fetch(razorpay_payment_id);
    if (payment.status !== "captured") {
      throw new Error("Payment not captured");
    }

    // Verify signature
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      throw new Error("Invalid payment signature");
    }

    // Get user and event details
    const [user, event] = await Promise.all([
      User.findById(req.user._id).session(session),
      Event.findById(eventId).session(session),
    ]);

    if (!user || !event) {
      throw new Error("User or Event not found");
    }

    // Check for duplicate participation
    const existing = await Participation.findOne({
      participantEmail: user.email,
      eventId,
      ...(subEventId && { subEventId }),
    }).session(session);

    if (existing) {
      throw new Error("Already registered for this event");
    }

    // Get actual amount from order
    const order = await razorpay.orders.fetch(razorpay_order_id);
    const amount = order.amount / 100; // Convert to rupees

    // Create participation record
    const participation = new Participation({
      participantName: user.username,
      participantEmail: user.email,
      participantPhone: phone,
      college: user.collegeName,
      eventId,
      ...(subEventId && { subEventId }),
      isPaid: true,
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      amount,
      paidAt: new Date(),
      status: "confirmed",
      type,
      paymentDetails: payment,
    });

    // Save participation and update event
    const savedParticipation = await participation.save({ session });

    await Event.findByIdAndUpdate(eventId, {
      $push: { participants: savedParticipation._id },
    }).session(session);

    if (subEventId) {
      await SubEvent.findByIdAndUpdate(subEventId, {
        $push: { participants: savedParticipation._id },
      }).session(session);
    }

    await session.commitTransaction();

    res.json({
      success: true,
      message: "Payment verified and registration successful",
      participation: savedParticipation,
      receiptUrl: payment.receipt_url,
    });
  } catch (err) {
    await session.abortTransaction();
    console.error("Payment verification error:", err);
    res.status(400).json({
      success: false,
      error: err.message,
      code: err.code || "VERIFICATION_ERROR",
    });
  } finally {
    session.endSession();
  }
});

// Webhook for payment notifications

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  (req, res) => {
    const signature = req.headers["x-razorpay-signature"];
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

    const isValid = crypto
      .createHmac("sha256", secret)
      .update(req.body)
      .digest("hex");

    if (isValid !== signature) {
      return res.status(400).json({ status: "Invalid signature" });
    }

    const paymentData = JSON.parse(req.body);
    // Handle different webhook events
    switch (paymentData.event) {
      case "payment.captured":
        // Handle successful payment
        break;
      case "payment.failed":
        // Handle failed payment
        break;
      case "refund.created":
        // Handle refund
        break;
    }

    res.json({ status: "success" });
  }
);

module.exports = router;