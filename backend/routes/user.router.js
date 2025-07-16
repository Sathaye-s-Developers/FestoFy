const router = require("express").Router();
const User = require("../Model/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const verifyToken = require("../middlewares/token_varification");
const JWT_SECRET = process.env.JWT_SECRET || "secret_key";
const match_clg = require("../functions/searching_clg_codes");
// //Admin secreate code
const ADMIN_SECRET_CODE = process.env.ADMIN_SECRET_CODE;
// super Admin
const SUPER_ADMIN_SECRET_KEY = process.env.SUPER_ADMIN_SECRET_KEY;
//  Register
router.post("/signUp", async (req, res) => {
  try {
    const { username, email, password, collegeName, adminCode, superAdminKey } =
      req.body;
    console.log("Incoming data:", req.body);
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, message: "User Already Exists." });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res
        .status(409)
        .json({ success: false, message: "Email Already Exists." });
    }

    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Please Enter A Valid Email" });
    }

    // Find the college code based on name

    try {
      const match = match_clg(collegeName);
      console.log(match);

      if (!match) {
        return res
          .status(404)
          .json({ message: "College not found in our records." });
      }

      const collageCode = Object.keys(match)[0];
      // console.log(collegeCode);
    } catch (err) {
      console.log(err);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Role logic
    let role = "user";
    if (adminCode && adminCode === ADMIN_SECRET_CODE) {
      role = "admin";
    }
    if (superAdminKey && superAdminKey === SUPER_ADMIN_SECRET_KEY) {
      role = "superadmin";
    }

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      collegeName,
      collageCode,
      role,
    });

    await newUser.save(); // Save new user

    const token = jwt.sign(
      { _id: newUser._id, email: newUser.email, role: newUser.role },
      JWT_SECRET,
      { expiresIn: "2d" }
    );

    res.status(201).json({
      success: true,
      message: "User registered successfully.",
      token,
      username: newUser.username,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Error during registration" });
  }
});

//  Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid Credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid Credentials" });

    const token = jwt.sign(
      { _id: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      {
        expiresIn: "2d",
      }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      username: user.username,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error during login" });
  }
});

//verify user to get its able or not
router.get("/verifyUser", verifyToken, async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.role === "admin" || user.role === "superadmin") {
      return res.status(400).json({ message: "User is already an admin" });
    }

    if (user.isAdminRequested) {
      return res
        .status(400)
        .json({ message: "Admin request already submitted" });
    }

    user.isAdminRequested = true;
    user.adminRequest = {
      status: "pending",
      reason: "Requested by user", // or leave blank
      requestedAt: new Date(),
    };

    await user.save();

    // Emit to all connected SuperAdmin sockets
    const io = req.app.get("io");
    io.emit("new_admin_request", {
      _id: user._id,
      name: user.username,
      email: user.email,
    });

    res.json({ message: "Admin access request submitted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// 🔐 Get All Users (Admin/SuperAdmin only)
router.get("/all_users", verifyToken, async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.status(200).json({ message: "✅ All users fetched", users });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;