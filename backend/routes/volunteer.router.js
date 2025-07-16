const router = require("express").Router();
const verifyToken = require("../middlewares/token_varification");
const User = require("../Model/user.model");
const Volunteer = require("../Model/volunteer.model");

//get volunteers

router.get("/get", async (req, res) => {
  try {
    const volunteers = await Volunteer.find();
    res.status(200).json({ volunteers });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/register", verifyToken, async (req, res) => {
  const userId = req.user._id;
  const userdata = await User.findById(userId);

  const newVolunteer = new Volunteer({
    name: userdata.username,
    email: userdata.email,
    phone: userdata.phone,
    college: userdata.collegeName,
    department: userdata.department,
    year: userdata.year,
  });

  const saveVolunteer = await newVolunteer.save();

  //connnect volunteer with event
  const updatedEvent = await Event.findByIdAndUpdate(
    eventId,
    { $push: { Volunteer: saveVolunteer._id } },
    { new: true }
  );
  //connnect volunteer with event
  const updatedsubEvent = await subEvent.findByIdAndUpdate(
    SubEventId,
    { $push: { Volunteer: saveVolunteer._id } },
    { new: true }
  );
});

module.exports = router;
