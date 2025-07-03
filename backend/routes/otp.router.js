// routes/otp.router.js
const router = require("express").Router();
const {
  sendOTP,
  sendConfirmationEmail,
} = require("../email_services/EmailService");
const User = require("../Model/user.model");
const verifyToken = require("../middlewares/token_varification");
const cors = require("cors");
router.use(cors());

const otpStore = new Map(); // { email: { otp, expiresAt } }

router.post("/send-otp", async (req, res) => {
  const { email } = req.body;
  if (!email)
    return res.status(400).json({ success: false, message: "Email required" });

  try {
    const otp = await sendOTP(email);
    otpStore.set(email, {
      otp,
      expiresAt: Date.now() + 3 * 60 * 1000,
    });
    res.json({ success: true, message: "OTP sent successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to send OTP" });
  }
});

router.post("/verify-otp", verifyToken, async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp)
    return res
      .status(400)
      .json({ success: false, message: "Email and OTP required" });

  const stored = otpStore.get(email);
  if (!stored)
    return res
      .status(400)
      .json({ success: false, message: "OTP expired or not found" });
  if (Date.now() > stored.expiresAt) {
    otpStore.delete(email);
    return res.status(400).json({ success: false, message: "OTP expired" });
  }
  if (stored.otp !== otp) {
    return res.status(400).json({ success: false, message: "Invalid OTP" });
  }

  otpStore.delete(email);

  // registartion confirm email
  const user = await User.findById(req.user._id).select("-password");
  if (!user)
    return res.status(404).json({ success: false, message: "User not found" });

  try {
    await sendConfirmationEmail(email, user.username);
  } catch (e) {
    console.error(e);
  }
  res.json({ success: true, message: "OTP verified ✅" });
});

module.exports = router;