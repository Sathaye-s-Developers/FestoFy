function Subevent_head(req, res, next) {
  if (req.user.role !== "subEventHead") {
    return res.status(403).json({ message: "Access denied: Admins only" });
  }
  next();
}

module.exports = Subevent_head;
