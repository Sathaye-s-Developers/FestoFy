const express = require("express");
const router = express.Router();
const Event = require("../Model/event.module");
const SubEvent = require("../Model/subevent.model");
const Volunteer = require("../Model/volunteer.model");
const User = require("../Model/user.model");
const verifyToken = require("../middlewares/token_varification");
const isAdmin = require("../middlewares/is_admin");

// CREATE Event with visibility and college name directly
router.post("/create", verifyToken, isAdmin, async (req, res) => {
  try {
    const userId = req.user._id;
    const userEmail = req.user.email;
    const { username, collegeName } = await User.findOne({ _id: userId });

    const {
      organiser_name,

      title,
      department,
      description,
      bannerUrl,
      location,
      dateRange,
      visibility,
      price,
      event_mode, //event would be paid or free
    } = req.body;
    //  console.log("req.user in /create route:", req.user);
    if (
      !title ||
      !department ||
      !description ||
      !bannerUrl ||
      !dateRange ||
      !location
    ) {
      return res.status(400).send({ message: "All fields are required" });
    }

    const existingEvent = await Event.findOne({
      title: title.trim(),
      createdBy: userId,
    });
    if (existingEvent) {
      return res
        .status(400)
        .json({ error: "You already have an event with this title." });
    }

    const newEvent = new Event({
      organiser_name: organiser_name || username,
      email: userEmail,
      title: title.trim(),
      department,
      description,
      bannerUrl,
      location,
      dateRange,
      subEvents: [],
      volunteers: [],
      createdBy: userId,
      visibility: visibility || "college", //college or explore  by default college
      price: price || 0,
      event_mode: event_mode || "free", //free pr paid
      createdByCollege: collegeName,
    });

    const newevent = await newEvent.save();
    res
      .status(201)
      .json({ message: "Event created successfully", event: newEvent });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// READ All Events for Logged-In User: My College + Explore
router.get("/my-college-events", verifyToken, async (req, res) => {
  try {
    const collegeName = req.user.collegeName;
    const events = await Event.find({
      $or: [
        { visibility: "college", createdByCollege: collegeName },
        { visibility: "explore" },
      ],
    });
    res.status(200).json({ events });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// READ All Explore Events (for All Colleges)
router.get("/explore", verifyToken, async (req, res) => {
  try {
    const exploreEvents = await Event.find({ visibility: "explore" });
    res.status(200).json({ exploreEvents });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get All SubEvents for Specific Event
router.get("/subevents/event/:eventId", verifyToken, async (req, res) => {
  try {
    const { eventId } = req.params;
    const eventExists = await Event.findById(eventId);
    if (!eventExists) {
      return res.status(404).json({ error: "Event not found" });
    }
    const subEvents = await SubEvent.find({ eventId });
    res.status(200).json({ subEvents });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ Single Event
router.get("/:eventId", verifyToken, async (req, res) => {
  try {
    const { eventId } = req.params;
    if (!eventId) {
      return res.status(400).json({ error: "Event ID is required" });
    }
    const event = await Event.findById(eventId)
      .populate("createdBy")
      .populate("subEvents");
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.status(200).json({ event });
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
      return res.status(404).json({ error: "Event not found" });
    }
    res
      .status(200)
      .json({ message: "Event updated successfully", event: updatedEvent });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE Event by ID
router.delete("/delete", verifyToken, isAdmin, async (req, res) => {
  try {
    const { eventId } = req.body;
    if (!eventId) {
      return res.status(400).json({ error: "Event ID is required" });
    }
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    if (event.volunteers?.length) {
      await Volunteer.deleteMany({ _id: { $in: event.volunteers } });
    }
    if (event.subEvents?.length) {
      await SubEvent.deleteMany({ _id: { $in: event.subEvents } });
    }
    const deleted = await Event.findByIdAndDelete(eventId);
    res.json({
      success: true,
      message: "Event and related data deleted successfully",
      deleted,
    });
  } catch (err) {
    res.status(500).json({ error: err.message || "Server error" });
  }
});

module.exports = router;
