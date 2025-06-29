const router = require('express').Router();
const { sendOTP } = require('../email_services/EmailService')
const User = require("../Model/user.model");
const cors = require("cors");
const { sendConfirmationEmail } = require("../email_services/EmailService")
const verifyToken = require("../middlewares/token_varification");

const otpStore = new Map(); // { email: { otp, expiresAt } }

router.post("/send-otp", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ success: false, message: "Email required" });

  try {
    const otp = await sendOTP(email);
    otpStore.set(email, {
      otp,
      expiresAt: Date.now() + 5 * 60 * 1000, // 5 minutes
    });
    res.status(200).json({ success: true, message: "OTP sent successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to send OTP" });
  }
});

router.post("/verify-otp",verifyToken, async (req, res) => {
  const { email, otp } = req.body;
  const stored = otpStore.get(email);

  if (!stored) return res.status(400).json({ success: false, message: "OTP expired or not found" });
  if (Date.now() > stored.expiresAt) {
    otpStore.delete(email);
    return res.status(400).json({ success: false, message: "OTP expired" });
  }
  if (stored.otp !== otp) return res.status(400).json({ success: false, message: "Invalid Otp" });

  otpStore.delete(email);

  //send register confirmation email

    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });

  try {
    await sendConfirmationEmail(email, user.username);
  } catch (e) {
    console.log(e);
  }
  res.status(200).json({ success: true, message: "OTP verified ✅" });
});



module.exports = router;