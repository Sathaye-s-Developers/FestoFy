const router = require("express").Router();
const Participation = require("../Model/participation.model");
const User = require("../Model/user.model");
const Event = require("../Model/event.module");
const SubEvent = require("../Model/subevent.model");
const verifyToken = require("../middlewares/token_varification");
const Volunteer = require("../Model/volunteer.model");

// Register participant for event or sub-event
router.post("/register", verifyToken, async (req, res) => {
  try {
    const userId = req.user._id;
    const {
      eventId,
      subEventId = null,
      teamName = null,
      members = null,
      collegeName = null,
      contact = null,
    } = req.body;

    if (!eventId) {
      return res.status(400).json({ error: "Event ID is required" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    // user are already register as Volunteer
    const alreadyVolunteer = await Volunteer.findOne({
      email: user.email,
      eventId,
      subEventId,
    });

    if (alreadyVolunteer) {
      return res.status(400).json({
        error:
          "User is already a volunteer in this event, cannot register as participant",
      });
    }

    let subEvent = null;
    if (subEventId) {
      subEvent = await SubEvent.findById(subEventId);
      if (!subEvent)
        return res.status(404).json({ error: "Sub-event not found" });
    }

    // Check if already registered
    let existing;
    if (subEvent) {
      if (subEvent.participation_type === "team") {
        existing = await Participation.findOne({
          eventId,
          subEventId,
          teamName,
        });
      } else {
        existing = await Participation.findOne({
          eventId,
          subEventId,
          participantEmail: user.email,
        });
      }
    } else {
      existing = await Participation.findOne({
        eventId,
        subEventId: null,
        participantEmail: user.email,
      });
    }

    if (existing) {
      return res
        .status(409)
        .json({ error: "Already registered for this event/sub-event" });
    }

    // Check participant limits
    let currentCount = await Participation.countDocuments({
      eventId,
      ...(subEventId ? { subEventId } : { subEventId: null }),
    });

    const maxAllowed = subEventId
      ? subEvent?.maxParticipants
      : (await Event.findById(eventId))?.maxParticipants;

    if (maxAllowed && currentCount >= maxAllowed) {
      return res.status(400).json({ error: "Participant limit reached" });
    }

    // Create participation
    let newParticipant;
    if (subEvent?.participation_type === "team") {
      if (!teamName || !members || members.length === 0) {
        return res.status(400).json({
          error: "Team name and members are required for team participation",
        });
      }

      newParticipant = new Participation({
        eventId,
        subEventId,
        participantName: user.username,
        participantEmail: user.email,
        participantPhone: user.phone,
        college: user.collegeName,
        team: { teamName, members, collegeName, contact },
        members,
        collegeName,
      });
    } else {
      newParticipant = new Participation({
        eventId,
        subEventId,
        participantName: user.username,
        participantEmail: user.email,
        participantPhone: user.phone,
        college: user.collegeName,
      });
    }

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
