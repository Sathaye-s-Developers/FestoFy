const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "Token missing" });
  // Check if Authorization header is present and starts with Bearer
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token missing or invalid format" });
  }
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET); // secret must match
    //  console.log("✅ Decoded token:", decoded);
    req.user = decoded;

    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: "Invalid token  or expire" });
  }
}

module.exports = verifyToken;