// routes/otp.router.js
const router = require("express").Router();
const {
  generateOTP,
  sendOTP,
  sendConfirmationEmail,
  sendForgotPasswordEmail,
} = require("../email_services/EmailService");
// const jwt = require("jsonwebtoken");
const User = require("../Model/user.model");
const verifyToken = require("../middlewares/token_varification");
const cors = require("cors");
router.use(cors());

const otpStore = new Map(); // { email: { otp, expiresAt } }

//  Send OTP for Registration
router.post("/register-login", async (req, res) => {
  const { email } = req.body;

  if (!email || !email.includes("@")) {
    return res
      .status(400)
      .json({ success: false, message: "Valid email required" });
  }

  try {
    const otp = generateOTP();

    otpStore.set(email, {
      otp,
      expiresAt: Date.now() + 5 * 60 * 1000,
    });

    await sendOTP(email, otp);
    return res
      .status(200)
      .json({ success: true, message: "OTP sent for registration/login" });
  } catch (err) {
    console.error("OTP (register) send failed:", err);
    return res
      .status(500)
      .json({ success: false, message: "Failed to send registration/login OTP" });
  }
});



//  Send OTP for Forgot Password
router.post("/forgot", async (req, res) => {
  const { email } = req.body;

  if (!email || !email.includes("@")) {
    return res
      .status(400)
      .json({ success: false, message: "Valid email required" });
  }

  // Check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    return res
      .status(404)
      .json({ success: false, message: "Email not found in system" });
  }

  try {
    const otp = generateOTP();

    otpStore.set(email, {
      otp,
      expiresAt: Date.now() + 5 * 60 * 1000,
    });

    await sendForgotPasswordEmail(email, otp);
    return res
      .status(200)
      .json({ success: true, message: "OTP sent for password reset" });
  } catch (err) {
    console.error("OTP (forgot) send failed:", err);
    return res
      .status(500)
      .json({ success: false, message: "Failed to send forgot-password OTP" });
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
  res.json({ success: true, message: "OTP verified " });
});

// Public OTP Verification (no login)
router.post("/verify-otp-public", async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({
      success: false,
      message: "Email and OTP are required",
    });
  }

  // Check if email exists in the database
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "Email not registered in the system",
    });
  }

  const stored = otpStore.get(email);
  if (!stored) {
    return res.status(400).json({
      success: false,
      message: "OTP expired or not found",
    });
  }

  if (Date.now() > stored.expiresAt) {
    otpStore.delete(email);
    return res.status(400).json({
      success: false,
      message: "OTP expired",
    });
  }

  if (stored.otp !== otp) {
    return res.status(400).json({
      success: false,
      message: "Invalid OTP",
    });
  }

  otpStore.delete(email);
  return res.status(200).json({
    success: true,
    message: "OTP verified ",
  });
});

// router.post("/send-otp", async (req, res) => {
//   const { email, purpose } = req.body;

//   if (!email || !email.includes("@"))
//     return res
//       .status(400)
//       .json({ success: false, message: "Valid email required" });

//   try {
//     const otp = generateOTP();

//     otpStore.set(email, {
//       otp,
//       expiresAt: Date.now() + 5 * 60 * 1000,
//     });

//     if (purpose === "forgot") {
//       await sendForgotPasswordEmail(email, otp);
//     } else {
//       await sendOTP(email, otp);
//     }

//     res.json({ success: true, message: "OTP sent successfully" });
//   } catch (err) {
//     console.error("Email sending failed:", err);
//     res.status(500).json({ success: false, message: "Failed to send OTP" });
//   }
// });

//merge verify
// router.post("/verify-otp", async (req, res) => {
//   const { email, otp, purpose } = req.body;

//   if (!email || !otp) {
//     return res.status(400).json({
//       success: false,
//       message: "Email and OTP are required",
//     });
//   }

//   try {
//     //  Public Purpose: Forgot Password
//     if (purpose === "forgot") {
//       const user = await User.findOne({ email });
//       if (!user) {
//         return res.status(404).json({
//           success: false,
//           message: "Email not registered in the system",
//         });
//       }
//     }

//     // Protected Purpose: Registration Confirmation (with JWT token)
//     if (purpose === "register") {
//       // Attach `verifyToken` only when purpose === register
//       // You must wrap this route with `verifyToken` at mount time for secure routes
//       // OR in frontend call this only after login/signup
//       const token = req.headers.authorization?.split(" ")[1];
//       if (!token) {
//         return res.status(401).json({
//           success: false,
//           message: "Authorization token missing",
//         });
//       }

//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       req.user = decoded;

//       const user = await User.findById(req.user._id).select("-password");
//       if (!user) {
//         return res
//           .status(404)
//           .json({ success: false, message: "User not found" });
//       }

//       await sendConfirmationEmail(email, user.username);
//     }

//     const stored = otpStore.get(email);
//     if (!stored) {
//       return res.status(400).json({
//         success: false,
//         message: "OTP expired or not found",
//       });
//     }

//     if (Date.now() > stored.expiresAt) {
//       otpStore.delete(email);
//       return res.status(400).json({
//         success: false,
//         message: "OTP expired",
//       });
//     }

//     if (stored.otp !== otp) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid OTP",
//       });
//     }

//     otpStore.delete(email);

//     return res.status(200).json({
//       success: true,
//       message: "OTP verified ✅",
//     });
//   } catch (err) {
//     console.error("OTP verification failed:", err.message);
//     return res.status(500).json({ success: false, message: "Server error" });
//   }
// });

//////

module.exports = router;