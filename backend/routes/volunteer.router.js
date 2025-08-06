const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/token_varification");

const User = require("../Model/user.model");
const SubEvent = require("../Model/subevent.model");
const Event = require("../Model/event.module");
const Volunteer = require("../Model/volunteer.model");

// // Get all volunteers
// router.get("/get", async (req, res) => {
//   try {
//     const volunteers = await Volunteer.find();
//     res.status(200).json({ volunteers });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// Get all events a volunteer is registered to
router.get("/registered-events/:volunteerId", async (req, res) => {
  try {
    const { volunteerId } = req.params;

    const events = await Event.find({ volunteers: volunteerId })
      .populate("subEvents")
      .select("title department dateRange subEvents");

    res.json({ success: true, events });
  } catch (err) {
    console.error("Error fetching volunteer events:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Register a volunteer
router.post("/register", verifyToken, async (req, res) => {
  try {
    const userId = req.user._id;
    const { eventId, subEventId } = req.body;

    if (!eventId || !subEventId) {
      return res
        .status(400)
        .json({ error: "Event ID and SubEvent ID are required" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    // Check if already registered for the same subevent
    const existing = await Volunteer.findOne({
      email: user.email,
      eventId,
      subEventIds: subEventId,
    });

    if (existing) {
      return res
        .status(409)
        .json({ error: "Already registered for this subevent" });
    }

    // Check if a volunteer record exists for same user & event
    let volunteer = await Volunteer.findOne({ email: user.email, eventId });

    if (volunteer) {
      // Just push the new subEventId if not already included
      if (!volunteer.subEventIds.includes(subEventId)) {
        volunteer.subEventIds.push(subEventId);
        await volunteer.save();

        await SubEvent.findByIdAndUpdate(
          subEventId,
          { $push: { volunteers: volunteer._id } },
          { new: true }
        );

        return res.status(200).json({ message: "SubEvent added", volunteer });
      } else {
        return res
          .status(409)
          .json({ error: "Already registered for this subevent" });
      }
    }

    // Create new Volunteer
    const newVolunteer = new Volunteer({
      name: user.username,
      email: user.email,
      phone: user.phone,
      college: user.collegeName,
      department: user.department,
      year: user.year,
      eventId,
      subEventIds: [subEventId],
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

// Delete a volunteer by ID
router.delete("/delete/:volunteerId", async (req, res) => {
  try {
    const { volunteerId } = req.params;

    const deletedVolunteer = await Volunteer.findByIdAndDelete(volunteerId);
    if (!deletedVolunteer) {
      return res
        .status(404)
        .json({ success: false, message: "Volunteer not found." });
    }

    // Remove reference from Events and SubEvents
    await Event.updateMany(
      { volunteers: volunteerId },
      { $pull: { volunteers: volunteerId } }
    );

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

// Get all subevents a volunteer is linked to
router.get("/:id/subevents", async (req, res) => {
  try {
    const volunteer = await Volunteer.findById(req.params.id).populate(
      "subEventIds"
    );
    if (!volunteer) {
      return res.status(404).json({ error: "Volunteer not found" });
    }
    res.status(200).json({ subEvents: volunteer.subEventIds });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;