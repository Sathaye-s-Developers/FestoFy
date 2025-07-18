const express = require("express");
const router = express.Router();
const Event = require("../Model/event.module");
const SubEvent = require("../Model/subevent.model");
const verifyToken = require("../middlewares/token_varification");
const isAdmin = require("../middlewares/is_admin");
const Volunteer = require("../Model/volunteer.model");

// CREATE Event
router.post("/create", verifyToken, isAdmin, async (req, res) => {
  try {
    const userId = req.user._id;
    const userEmail = req.user.email;
    const { title, department, description, bannerUrl, dateRange } = req.body;

    //  Check if event title already exists for the same user
    const existingEvent = await Event.findOne({
      title: title.trim(),
      createdBy: userId,
    });

    if (existingEvent) {
      return res
        .status(400)
        .json({ error: " You already have an event with this title." });
    }

    const newEvent = new Event({
      email: userEmail,
      title: title.trim(),
      department,
      description,
      bannerUrl,
      dateRange,
      subEvents: [],
      volunteers: [],
      createdBy: userId,
    });

    await newEvent.save();

    res.status(201).json({
      message: "Event created successfully",
      event: newEvent,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//  READ Event by ID
router.get("/:eventId", verifyToken, async (req, res) => {
  try {
    const { eventId } = req.params;

    if (!eventId) {
      return res.status(400).json({ error: "Event ID is required" });
    }

    const event = await Event.findById(eventId)
      .populate("createdBy")
      .populate("subEvents");
    // .populate("volunteers");

    if (!event) {
      return res.status(404).json({ error: " Event not found" });
    }

    res.status(200).json({ event });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//  READ All Events by Admin
router.get("/", verifyToken, async (req, res) => {
  try {
    const events = await Event.find({ createdBy: req.user._id });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE Event
router.put("/update/:eventId", verifyToken, async (req, res) => {
  try {
    const { eventId } = req.params;
    const updatedData = req.body;

    const updatedEvent = await Event.findByIdAndUpdate(eventId, updatedData, {
      new: true,
    });

    if (!updatedEvent) {
      return res.status(404).json({ error: " Event not found" });
    }

    res.status(200).json({
      message: " Event updated successfully",
      event: updatedEvent,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE Event by ID (Admin only)
router.delete("/delete", verifyToken, isAdmin, async (req, res) => {
  try {
    const { eventId } = req.body;

    if (!eventId) {
      return res.status(400).json({ error: "Event ID is required" });
    }

    // Find the event
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    // Delete all volunteers linked with this event
    if (event.volunteers?.length) {
      await Volunteer.deleteMany({ _id: { $in: event.volunteers } });
    }

    // Delete all subevents linked with this event
    if (event.subEvents?.length) {
      await SubEvent.deleteMany({ _id: { $in: event.subEvents } });
    }

    // Delete the event
    const deleted = await Event.findByIdAndDelete(eventId);

    res.json({
      success: true,
      message: "Event and related data deleted successfully",
      deleted,
    });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ error: err.message || "Server error" });
  }
});

module.exports = router;
