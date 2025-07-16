const express = require("express");
const router = express.Router();
const SubEvent = require("../Model/subevent.model");
const Event = require("../Model/event.module");
const isAdmin = require("../middlewares/is_admin");
const verifyToken = require("../middlewares/token_varification");

// 🔹 Create SubEvent
router.post("/create", verifyToken, isAdmin, async (req, res) => {
  try {
    const { title, description, date, time, location, eventId } = req.body;

    if (!eventId || !title || !date) {
      return res
        .status(400)
        .json({ error: "Missing required fields (eventId, title, date)" });
    }

    const eventExists = await Event.findById(eventId);
    if (!eventExists) {
      return res.status(404).json({ error: " Event not found" });
    }

    const newSubEvent = new SubEvent({
      title,
      description,
      date,
      time,
      location,
      eventId,
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

//  Update SubEvent
router.patch("/update", verifyToken, isAdmin, async (req, res) => {
  try {
    const { updateData, subEventId } = req.body;

    const updated = await SubEvent.findByIdAndUpdate(subEventId, updateData, {
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