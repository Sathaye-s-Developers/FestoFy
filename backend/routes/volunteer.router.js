const router = require("express").Router();

//get volunteers
router.get("/", (req, res) => {
  res.send(200).json({ mssage: "hello" });
});

router.post("/create", (req, res) => {});

module.exports = router;