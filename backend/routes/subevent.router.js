// 📁 routes/subevent.routes.js
const express = require("express");
const router = express.Router();
const SubEvent = require("../Model/subevent.model");
const Event = require("../Model/event.module");
const isAdmin = require("../middlewares/is_admin");

//subevent/create
router.post("/create", isAdmin, async (req, res) => {
  try {
    const { title, description, date, time, location, eventId } = req.body;

    if (!eventId) return res.status(400).json({ error: "eventId is required" });

    // 1. Create the subevent
    const newSubEvent = new SubEvent({
      title,
      description,
      date,
      time,
      location,
      eventId,
    });

    const savedSubEvent = await newSubEvent.save();

    // 2. Push the subEvent _id to the event
    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      { $push: { subEvents: savedSubEvent._id } },
      { new: true } // return updated event
    );

    if (!updatedEvent)
      return res.status(404).json({ error: "Event not found" });

    res.status(201).json({
      message: "SubEvent created and linked ✅",
      subEvent: savedSubEvent,
      updatedEvent,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.patch("/update", (req, res) => {
  const userId = req.user._id;
  try {
  } catch (err) {}
});

module.exports = router;
