const express = require("express");
const router = express.Router();
const SubEvent = require("../Model/subevent.model");
const Event = require("../Model/event.module");
const isAdmin = require("../middlewares/is_admin");
const verifyToken = require("../middlewares/token_varification");

// Create SubEvent
router.post("/create", verifyToken, isAdmin, async (req, res) => {
  try {
    const { title, description, date, time, location, eventId, free_paid } =
      req.body;

    if (!eventId || !title || !date || !description || !time || !location) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Check if event exists
    const eventExists = await Event.findById(eventId);
    if (!eventExists) {
      return res.status(404).json({ error: "Event not found" });
    }

    // Check for duplicate sub-event title within the same event
    const duplicateSubEvent = await SubEvent.findOne({
      eventId,
      title: title.trim(),
    });

    if (duplicateSubEvent) {
      return res.status(409).json({
        error: "A SubEvent with this title already exists for this event.",
      });
    }

    const newSubEvent = new SubEvent({
      title: title.trim(),
      description,
      date,
      time,
      location,
      eventId,
      event_mode: "free" || free_paid,
    });

    const savedSubEvent = await newSubEvent.save();

    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      { $push: { subEvents: savedSubEvent._id } },
      { new: true }
    );

    res.status(201).json({
      message: "SubEvent created and linked to Event",
      subEvent: savedSubEvent,
      updatedEvent,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET sub-events filtered by section (college or global)
router.get("/section/:eventType", verifyToken, async (req, res) => {
  try {
    const { eventType } = req.params;
    const userCollege = req.user.collegeName;

    let eventFilter = {};

    if (eventType === "college") {
      eventFilter = {
        eventType: "college",
        createdByCollege: userCollege,
      };
    } else if (eventType === "explore") {
      eventFilter = {
        eventType: "explore",
      };
    } else {
      return res.status(400).json({ error: "Invalid event type" });
    }

    // Find matching events first
    const matchedEvents = await Event.find(eventFilter).select("_id");
    const eventIds = matchedEvents.map((e) => e._id);

    // Fetch sub-events linked to those event IDs
    const subEvents = await SubEvent.find({ eventId: { $in: eventIds } });

    res.status(200).json({ subEvents });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//  Update SubEvent
router.patch("/update", verifyToken, isAdmin, async (req, res) => {
  try {
    const { subEventId, title, description, date, time, location } = req.body;

    if (!subEventId) {
      return res.status(400).json({ error: "subEventId is required" });
    }

    const updateFields = {};
    if (title) updateFields.title = title;
    if (description) updateFields.description = description;
    if (date) updateFields.date = date;
    if (time) updateFields.time = time;
    if (location) updateFields.location = location;

    const updated = await SubEvent.findByIdAndUpdate(subEventId, updateFields, {
      new: true,
    });

    if (!updated) {
      return res.status(404).json({ error: "SubEvent not found" });
    }

    res.status(200).json({ message: "SubEvent updated", subEvent: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Delete SubEvent by ID
router.delete("/delete", verifyToken, isAdmin, async (req, res) => {
  try {
    const { subEventId } = req.body;

    if (!subEventId) {
      return res.status(400).json({ error: " subEventId is required in body" });
    }

    //  Find and delete the subevent
    const subEvent = await SubEvent.findByIdAndDelete(subEventId);

    if (!subEvent) {
      return res
        .status(404)
        .json({ error: " SubEvent not found or already deleted" });
    }

    // Remove subEvent reference from the parent Event
    await Event.findByIdAndUpdate(subEvent.eventId, {
      $pull: { subEvents: subEventId },
    });

    res.status(200).json({
      message: "SubEvent deleted successfully",
      deletedSubEvent: subEvent,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//  Get SubEvent by ID
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const subEvent = await SubEvent.findById(req.params.id)
      // .populate("volunteers")
      .populate("participants");

    if (!subEvent) {
      return res.status(404).json({ error: "SubEvent not found" });
    }

    res.status(200).json({ subEvent });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//  Get All SubEvent for specific Event
router.get("/event/:eventId", verifyToken, async (req, res) => {
  try {
    const eventId = req.params.eventId;

    const eventExists = await Event.findById(eventId);
    if (!eventExists) {
      return res.status(404).json({ error: " Event not found" });
    }

    const subEvents = await SubEvent.find({ eventId });
    res.status(200).json({ subEvents });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
