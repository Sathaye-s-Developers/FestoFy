const router = require("express").Router();
const Participation = require("../Model/participation.model");
const User = require("../Model/user.model");
const Event = require("../Model/event.module");
const SubEvent = require("../Model/subevent.model");
const verifyToken = require("../middlewares/token_varification");

// Register participant for event or sub-event
router.post("/register", verifyToken, async (req, res) => {
  try {
    const userId = req.user._id;
    const { phone, eventId, subEventId } = req.body;

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({ error: "Invalid phone number" });
    }

    if (!eventId) {
      return res.status(400).json({ error: "Event  ID is required" });
    }
    if (!subEventId) {
      return res.status(400).json({ error: "SubEvent  ID is required" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    // Check if already registered
    if (subEventId) {
      const existing = await Participation.findOne({
        participantEmail: user.email,
        eventId,
        subEventId,
      });

      if (existing) {
        return res
          .status(409)
          .json({ error: "Already registered for this sub-event" });
      }
    } else {
      const existing = await Participation.findOne({
        participantEmail: user.email,
        eventId,
        subEventId: { $exists: false },
      });

      if (existing) {
        return res
          .status(409)
          .json({ error: "Already registered for this event" });
      }
    }

    // 4. Check limits
    if (subEventId) {
      if (subEventId) {
        const subEvent = await SubEvent.findById(subEventId);
        if (!subEvent)
          return res.status(404).json({ error: "Sub-event not found" });

        const currentCount = await Participation.countDocuments({ subEventId });
        if (
          subEvent.maxParticipants &&
          currentCount >= subEvent.maxParticipants
        ) {
          return res
            .status(400)
            .json({ error: "Sub-event participant limit reached" });
        }
      } else {
        const event = await Event.findById(eventId);
        if (!event) return res.status(404).json({ error: "Event not found" });

        const currentCount = await Participation.countDocuments({
          eventId,
          subEventId: { $exists: false },
        });
        if (event.maxParticipants && currentCount >= event.maxParticipants) {
          return res
            .status(400)
            .json({ error: "Event participant limit reached" });
        }
      }
    }
    // Save new participant
    const newParticipant = new Participation({
      participantName: user.username,
      participantEmail: user.email,
      participantPhone: phone,
      college: user.collegeName,
      eventId,
      subEventId: subEventId,
      type: req.body.type || "college",
      status: "pending",
    });

    const savedParticipant = await newParticipant.save();

    // Link to Event
    await Event.findByIdAndUpdate(eventId, {
      $push: { participants: savedParticipant._id },
    });

    // Link to SubEvent
    if (subEventId) {
      await SubEvent.findByIdAndUpdate(subEventId, {
        $push: { participants: savedParticipant._id },
      });
    }

    res.status(201).json({
      success: true,
      message: "Participant registered successfully",
      data: savedParticipant,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

//  Get all participants for a specific sub-event
router.get("/subevent/:subEventId/participants", async (req, res) => {
  try {
    const { subEventId } = req.params;

    const participants = await Participation.find({ subEventId });

    if (!participants || participants.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No participants found for this sub-event",
      });
    }

    res.status(200).json({
      success: true,
      message: "Participants fetched successfully",
      participants,
    });
  } catch (err) {
    console.error("Error fetching participants:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// GET all participants (main event + sub-events)
router.get("/event/:eventId/all-participants", async (req, res) => {
  try {
    const { eventId } = req.params;

    const participants = await Participation.find({ eventId });

    if (!participants || participants.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No participants found for this event",
      });
    }

    res.status(200).json({
      success: true,
      message: "All participants for this event fetched successfully",
      participants,
    });
  } catch (err) {
    console.error("Error fetching event participants:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

//delete
router.delete("/delete/:id", verifyToken, async (req, res) => {
  try {
    const participantId = req.params.id;

    const participant = await Participation.findById(participantId);
    if (!participant) {
      return res
        .status(404)
        .json({ success: false, message: "Participant not found" });
    }

    //  Remove from Event
    await Event.findByIdAndUpdate(participant.eventId, {
      $pull: { participants: participant._id },
    });

    // Remove from SubEvent
    if (participant.subEventId) {
      await SubEvent.findByIdAndUpdate(participant.subEventId, {
        $pull: { participants: participant._id },
      });
    }

    //  delete the document
    await participant.deleteOne();

    res.status(200).json({
      success: true,
      message: "Participant deleted and unlinked successfully",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;