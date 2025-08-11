const router = require("express").Router();
const User = require("../Model/user.model");
const verifyToken = require("../middlewares/token_varification");

//set profile
router.post("/set-profile", verifyToken, async (req, res) => {
  try {
    const userId = req.user._id;
    const { department, year } = req.body;

    if (!department || !year) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { department, year },
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

//update profile
router.patch("/edit-profile", verifyToken, async (req, res) => {
  const userId = req.user._id;

  try {
    const updateFields = {};

    // Loop through all keys in req.body and set them in updateFields
    for (let key in req.body) {
      if (
        req.body[key] !== undefined &&
        req.body[key] !== null &&
        req.body[key] !== ""
      ) {
        updateFields[key] = req.body[key];
      }
    }

    // Prevent password updates here (optional safety check)
    delete updateFields.password;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateFields },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    console.error("Error updating profile:", err.message);
    res.status(500).json({
      success: false,
      message: "Something went wrong while updating profile",
    });
  }
});

module.exports = router;    