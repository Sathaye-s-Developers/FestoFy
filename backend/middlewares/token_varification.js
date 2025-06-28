const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  // No header?
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token missing or badly formatted" });
  }

  const token = authHeader.split(" ")[1];

  // Check if it's a basic JWT shape (3 parts separated by .)
  if (!token || token.split(".").length !== 3) {
    return res.status(401).json({ message: "Malformed token" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("❌ Token verification error:", err.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

module.exports = verifyToken;
