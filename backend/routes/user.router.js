const router = require("express").Router();
const User = require("../Model/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("validator");

// JWT secret key (set this in .env in production)
const JWT_SECRET = process.env.JWT_SECRET || "secret_key";

//  Register
router.post("/signUp", async (req, res) => {
  try {
    const { username, email, password, college_code } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existingUser=await User.findOne({username})
    if (existingUser) {
      return res.status(409).json({success:false, message: "User Already Exists." });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(409).json({success:false, message: "Email Already Exists." });
    }
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please Enter A Valid Email" })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ username, email, password: hashedPassword, college_code });
    await newUser.save();
    const token = jwt.sign({ id: newUser._id, email: newUser.email, password: newUser.password }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(201).json({success:true, message: "User registered successfully.", token });
  } catch (err) {
    res.status(401).json({ success: false, message: "Error" })
  }
});

//  Login and send JWT token
router.post("/login", async (req, res) => {
  try {
    const { email, password, college_code } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid Credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid Credentials" });

    // Create JWT token
    const token = jwt.sign({ id: user._id, email: user.email, password: user.password }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({success:true, message: "Login successfully", token });
  } catch (err) {
    console.log(err)
    res.status(401).json({ success: false, message: "Error" })
  }

});

//  Protected Route
router.get("/user_details", verifyToken, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json({ user });
});

// Token Verification Middleware
function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "Token missing" });

  const token = authHeader.split(" ")[1]; // Bearer <token>

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

module.exports = router;
