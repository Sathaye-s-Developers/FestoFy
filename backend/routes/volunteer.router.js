const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/token_varification");
const is_admin = require("../middlewares/is_admin");
const User = require("../Model/user.model");
const SubEvent = require("../Model/subevent.model");
const Event = require("../Model/event.module");
const Volunteer = require("../Model/volunteer.model");

// Get all events a volunteer is registered to
router.get(
  "/registered-events/:volunteerId",
  verifyToken,
  is_admin,
  async (req, res) => {
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
  }
);

// Register a volunteer
router.post("/register", verifyToken, async (req, res) => {
  try {
    const userId = req.user._id;
    const { roll_no, eventId, subEventId } = req.body;

    if (!eventId || !subEventId) {
      return res
        .status(400)
        .json({ error: "Event ID and SubEvent ID are required" });
    }
    if (!roll_no) {
      return res.status(400).json({ error: "roll_no are required" });
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

    //volunteer limits check
    const subEvent = await SubEvent.findById(subEventId);
    if (!subEvent)
      return res.status(404).json({ error: "Sub-event not found" });

    const currentVolunteerCount = await Volunteer.countDocuments({
      subEventIds: subEventId,
    });

    if (
      subEvent.maxVolunteers &&
      currentVolunteerCount >= subEvent.maxVolunteers
    ) {
      return res.status(400).json({
        error: "Volunteer limit reached for this subevent",
      });
    }

    //Event-level volunteer limit
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ error: "Event not found" });

    const currentEventVolunteerCount = await Volunteer.countDocuments({
      eventId,
    });
    if (
      event.maxVolunteers &&
      currentEventVolunteerCount >= event.maxVolunteers
    ) {
      return res.status(400).json({
        error: "Volunteer limit reached for this event",
      });
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
      roll_no,
    });

    const savedVolunteer = await newVolunteer.save();

    // Link to Event
    const linkedEvnet = await Event.findByIdAndUpdate(
      eventId,
      { $push: { volunteers: savedVolunteer._id } },
      { new: true }
    );

    // Link to SubEvent
    const linkedSubevent = await SubEvent.findByIdAndUpdate(
      subEventId,
      { $push: { volunteers: savedVolunteer._id } },
      { new: true }
    );

    res.status(201).json({
      message: "Volunteer registered",
      volunteer: savedVolunteer,
      events: linkedEvnet,
      subevents: linkedSubevent,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all volunteers for a specific event
router.get("/event/:eventId/volunteers", verifyToken, async (req, res) => {
  try {
    const { eventId } = req.params;

    const volunteers = await Volunteer.find({ eventId });

    if (!volunteers || volunteers.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No volunteers found for this event",
      });
    }

    res.status(200).json({
      success: true,
      message: "Volunteers fetched successfully",
      volunteers,
    });
  } catch (err) {
    console.error("Error fetching volunteers for event:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

//  Get all volunteers for a specific sub-event
router.get(
  "/subevent/:subEventId/volunteers",
  verifyToken,
  async (req, res) => {
    try {
      const { subEventId } = req.params;

      const volunteers = await Volunteer.find({ subEventIds: subEventId });

      if (!volunteers || volunteers.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No volunteers found for this sub-event",
        });
      }

      res.status(200).json({
        success: true,
        message: "Volunteers fetched successfully",
        volunteers,
      });
    } catch (err) {
      console.error("Error fetching volunteers for sub-event:", err);
      res.status(500).json({ success: false, message: "Server error" });
    }
  }
);

// Delete a volunteer by ID
router.delete("/delete/:volunteerId", verifyToken, async (req, res) => {
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

    res.status(200).json({
      success: true,
      message: "Volunteer deleted successfully.",
    });
  } catch (err) {
    console.error("Error deleting volunteer:", err);
    res.status(500).json({ success: false, message: "Server error." });
  }
});

// Get all subevents a volunteer is linked to subevent
router.get("/:id/subevents", verifyToken, async (req, res) => {
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