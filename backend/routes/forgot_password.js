const router = require("express").Router();
const User = require("../Model/user.model");
const bcrypt = require("bcryptjs");
const {
  sendPasswordChangedConfirmation,
} = require("../email_services/EmailService");
router.post("/reset-password", async (req, res) => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword) {
    return res
      .status(400)
      .json({ success: false, message: "Email and new password required" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await User.findOneAndUpdate({ email }, { password: hashedPassword });
  await sendPasswordChangedConfirmation(email);
  res
    .status(200)
    .json({ success: true, message: " Password reset successfully" });
});

module.exports = router;