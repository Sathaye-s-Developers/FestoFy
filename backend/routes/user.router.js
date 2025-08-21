const router = require("express").Router();
const User = require("../Model/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const verifyToken = require("../middlewares/token_varification");
const JWT_SECRET = process.env.JWT_SECRET || "secret_key";
const clg_codes = require("../college_codes/codes");

//Admin secreate code
const ADMIN_SECRET_CODE = process.env.ADMIN_SECRET_CODE;
// super Admin
const SUPER_ADMIN_SECRET_KEY = process.env.SUPER_ADMIN_SECRET_KEY;

//  Register
router.post("/signUp", async (req, res) => {
  try {
    const { username, email, password, college_code } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const reservedEmails = ["festofy011@gmail.com", "admin@festofy.com"];

    let reserved_email = email.toLowerCase().trim();

    if (reservedEmails.includes(reserved_email)) {
      return res.status(409).send({ message: "This email is reserved" });
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

    // Build a map for O(1) lookups
    const collegeMap = {};
    for (const college of clg_codes) {
      collegeMap[college.college_code] = college.full_name;
    }

    // Function to get college name
    function getCollegeNameByCode(code) {
      return collegeMap[code] || false;
    }

    // Example usage
    const clg_Name = getCollegeNameByCode(college_code);
    if (clg_Name == false) {
      return res.status(404).send({ message: "clg not listed" });
    }
    //console.log(clg_Name);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      collegeName: clg_Name,
      college_code,
    });

    await newUser.save();

    const token = jwt.sign(
      {
        _id: newUser._id,
        email: newUser.email,
        role: newUser.role,
        collegeName: newUser.collegeName,
      },
      JWT_SECRET,
      { expiresIn: "2d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // true only in prod
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // lax in dev
      maxAge: 2 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully.",
      username: newUser.username,
      collegeName: newUser.collegeName,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error during SignUp" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password, adminCode, superAdminKey } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid Credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid Credentials" });

    // role
    let role = "user";
    if (adminCode && adminCode === ADMIN_SECRET_CODE) {
      role = "admin";
    }
    if (superAdminKey && superAdminKey === SUPER_ADMIN_SECRET_KEY) {
      role = "superadmin";
    }

    // Update user role
    if (user.role !== role) {
      user.role = role;
      await user.save();
    }

    // Create JWT
    const token = jwt.sign(
      {
        _id: user._id,
        email: user.email,
        role: user.role,
        collegeName: user.collegeName,
      },
      JWT_SECRET,
      { expiresIn: "2d" }
    );

    // Set token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // true only in prod
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // lax in dev
      maxAge: 2 * 24 * 60 * 60 * 1000,
    });

    //SEND RESPONSE
    return res.status(200).json({
      success: true,
      message: "Login successful",
      username: user.username,
      role: user.role,
      collegeName: user.collegeName,
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, message: "Error during login" });
  }
});

//logout
router.post("/logout", verifyToken, (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  res.status(200).json({ success: true, message: "Logged out successfully" });
});

//get user

router.get("/user_details", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) return res.status(404).json({ isAuthenticated: false });

    res.json({ isAuthenticated: true, user });
  } catch (err) {
    res.status(500).json({ isAuthenticated: false });
  }
});

//  Get All Users (Admin/SuperAdmin only)
router.get("/all_users", verifyToken, async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.status(200).json({ message: " All users fetched", users });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// make admin by admin key
router.post("/role_admin", verifyToken, async (req, res) => {
  try {
    const { adminCode } = req.body;
    const userId = req.user._id;

    // find user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // check admin code
    if (!adminCode || adminCode !== process.env.ADMIN_SECRET_CODE) {
      return res.status(403).json({ error: "Invalid admin code" });
    }

    // assign role
    if (user.role !== "admin") {
      user.role = "admin";
      await user.save();
    }

    const token = jwt.sign(
      {
        _id: user._id,
        email: user.email,
        role: user.role,
        collegeName: user.collegeName,
      },
      JWT_SECRET,
      { expiresIn: "2d" }
    );

    // Set token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // true only in prod
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // lax in dev
      maxAge: 2 * 24 * 60 * 60 * 1000,
    });

    return res.json({ message: "User promoted to admin successfully", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
