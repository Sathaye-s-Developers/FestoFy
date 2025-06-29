const router = require("express").Router();
const User = require("../Model/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const verifyToken = require("../middlewares/token_varification");
const JWT_SECRET = process.env.JWT_SECRET || "secret_key";
// const { sendConfirmationEmail } = require("../email_services/EmailService");

//  Register
router.post("/signUp", async (req, res) => {
  try {
    const { username, email, password, college_code } = req.body;

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

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      college_code,
    });
    // await User.insertOne(newUser);
    await newUser.save();



    const token = jwt.sign({ id: newUser._id, email: newUser.email }, JWT_SECRET);

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

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid Credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid Credentials" });


    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET);
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

//  Protected Route
router.get("/user_details", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET);

    res.json({ user,token});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;