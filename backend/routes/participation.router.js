const router = require("express").Router();
const Participation = require("../Model/participation.model");

router.post("/register", async (req, res) => {
  try {
    const {
      participantName,
      participantEmail,
      participantPhone,
      college,
      eventId,
      subEventId,
    } = req.body;

    const newParticipant = new Participation({
      participantName,
      participantEmail,
      participantPhone,
      college,
      eventId,
      subEventId,
    });

    await newParticipant.save();
    res.status(201).json({
      success: true,
      message: "Participant registered!",
      data: newParticipant,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
