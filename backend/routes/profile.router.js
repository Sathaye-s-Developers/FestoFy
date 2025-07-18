const router = require("express").Router();
const User = require("../Model/user.model");
const verifyToken = require("../middlewares/token_varification");

router.post("/set-profile", verifyToken, async (req, res) => {
  try {
    const userId = req.user._id;
    const { phone, department, year } = req.body;

    if (!phone || !department || !year) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { phone, department, year },
      { new: true }
    );

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    console.error("Profile update error:", err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.patch("/edit-profile", verifyToken, (req, res) => {
  const userId = req.user._id;
  const { username, phone, department, year } = req.body;
});

module.exports = router;
