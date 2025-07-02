const router = require("express").Router();
const {
  sendOTP,
  sendConfirmationEmail,
} = require("../email_services/EmailService");
const User = require("../Model/user.model");
const verifyToken = require("../middlewares/token_varification");
require("dotenv").config();
const cors = require("cors");
router.use(cors());
const otpStore = new Map(); // { email: { otp, expiresAt } }

// Send OTP (now requires authentication)
router.post("/send-otp", verifyToken, async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: "Email required" });
  }

  // Verify the email matches the authenticated user
  const user = await User.findById(req.user.id);
  if (!user || user.email !== email) {
    return res.status(403).json({ success: false, message: "Unauthorized" });
  }

  try {
    const otp = await sendOTP(email);
    otpStore.set(email, {
      otp,
      expiresAt: Date.now() + 5 * 60 * 1000, // 5 minutes
      attemptsLeft: 3, // Allow 3 attempts
    });
    res.status(200).json({ success: true, message: "OTP sent successfully" });
  } catch (err) {
    console.error("Error sending OTP:", err);
    res.status(500).json({ success: false, message: "Failed to send OTP" });
  }
});

// Verify OTP
router.post("/verify-otp", verifyToken, async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res
      .status(400)
      .json({ success: false, message: "Email and OTP required" });
  }

  // Verify the email matches the authenticated user
  const user = await User.findById(req.user.id);
  if (!user || user.email !== email) {
    return res.status(403).json({ success: false, message: "Unauthorized" });
  }

  const stored = otpStore.get(email);

  if (!stored) {
    return res.status(400).json({
      success: false,
      message: "OTP expired or not found. Please request a new OTP.",
    });
  }

  if (Date.now() > stored.expiresAt) {
    otpStore.delete(email);
    return res.status(400).json({
      success: false,
      message: "OTP expired. Please request a new OTP.",
    });
  }

  if (stored.otp !== otp) {
    const attemptsLeft = stored.attemptsLeft - 1;

    if (attemptsLeft <= 0) {
      otpStore.delete(email);
      return res.status(400).json({
        success: false,
        message: "Too many wrong attempts. Please request a new OTP.",
      });
    }

    otpStore.set(email, {
      ...stored,
      attemptsLeft,
    });

    return res.status(400).json({
      success: false,
      message: `Invalid OTP. ${attemptsLeft} attempt(s) left.`,
    });
  }

  // Successful verification
  otpStore.delete(email);

  try {
    await sendConfirmationEmail(email, user.username);
    res.status(200).json({ success: true, message: "OTP verified ✅" });
  } catch (e) {
    console.error("Error in verification:", e);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
