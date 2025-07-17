const router = require("express").Router();
const verifyToken = require("../middlewares/token_varification");
const User = require("../Model/user.model");

const SubEvent = require("../Model/subevent.model");
const Event = require("../Model/event.module");
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

// Get all events a volunteer is registered to
router.get("/registered-events/:volunteerId", async (req, res) => {
  try {
    const { volunteerId } = req.params;

    // Step 1: Find events where volunteer is listed
    const events = await Event.find({ volunteers: volunteerId })
      .populate("subEvents")
      .select("title department dateRange subEvents");

    res.json({ success: true, events });
  } catch (err) {
    console.error(" Error fetching volunteer events:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

//registeration

router.post("/register", verifyToken, async (req, res) => {
  try {
    const userId = req.user._id;
    const { eventId, subEventId } = req.body;
    // console.log(subEventId);

    if (!eventId || !subEventId) {
      return res
        .status(400)
        .json({ error: "Event ID and SubEvent ID are required" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    // Check if already registered
    const existing = await Volunteer.findOne({
      email: user.email,
      eventId,
      subEventId,
    });
    if (existing) {
      return res.status(409).json({ error: "Already registered as volunteer" });
    }

    // Create Volunteer entry
    const newVolunteer = new Volunteer({
      name: user.username,
      email: user.email,
      phone: user.phone,
      college: user.collegeName,
      department: user.department,
      year: user.year,
      eventId,
      SubEventId: subEventId,
    });

    const savedVolunteer = await newVolunteer.save();

    // Link to Event
    await Event.findByIdAndUpdate(
      eventId,
      { $push: { volunteers: savedVolunteer._id } },
      { new: true }
    );

    // Link to SubEvent
    await SubEvent.findByIdAndUpdate(
      subEventId,
      { $push: { volunteers: savedVolunteer._id } },
      { new: true }
    );

    res
      .status(201)
      .json({ message: "Volunteer registered", volunteer: savedVolunteer });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE volunteer by ID
router.delete("/delete/:volunteerId", async (req, res) => {
  try {
    const { volunteerId } = req.params;

    // Step 1: Delete the volunteer from the database
    const deletedVolunteer = await Volunteer.findByIdAndDelete(volunteerId);
    if (!deletedVolunteer) {
      return res
        .status(404)
        .json({ success: false, message: "Volunteer not found." });
    }

    // Step 2: Remove volunteer reference from any Events
    await Event.updateMany(
      { volunteers: volunteerId },
      { $pull: { volunteers: volunteerId } }
    );

    // Step 3: Remove volunteer reference from any SubEvents
    await SubEvent.updateMany(
      { volunteers: volunteerId },
      { $pull: { volunteers: volunteerId } }
    );

    res
      .status(200)
      .json({ success: true, message: "Volunteer deleted successfully." });
  } catch (err) {
    console.error("Error deleting volunteer:", err);
    res.status(500).json({ success: false, message: "Server error." });
  }
});

module.exports = router;

module.exports = router;
