const router = require("express").Router();
const verifyToken = require("../middlewares/token_varification");
const Attendance = require("../Model/attendence.module");
const Volunteer = require("../Model/volunteer.model");
const SubEvent = require("../Model/subevent.model");
const mongoose = require("mongoose");

//  1. Mark / Update Attendance (Single Volunteer)
router.post("/mark", verifyToken, async (req, res) => {
  try {
    const { volunteerId, subEventId, eventId, date, status } = req.body;

    // Validate required fields
    if (!volunteerId || !subEventId || !eventId || !date || !status) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Validate ObjectId formats
    if (
      !mongoose.Types.ObjectId.isValid(volunteerId) ||
      !mongoose.Types.ObjectId.isValid(subEventId) ||
      !mongoose.Types.ObjectId.isValid(eventId)
    ) {
      return res.status(400).json({ error: "Invalid ID format" });
    }

    // Ensure volunteer belongs to subEvent
    const subEvent = await SubEvent.findById(subEventId).populate("volunteers");
    if (!subEvent) {
      return res.status(404).json({ error: "SubEvent not found" });
    }

    const isVolunteer = subEvent.volunteers.some(
      (v) => v._id.toString() === volunteerId
    );
    if (!isVolunteer) {
      return res
        .status(400)
        .json({ error: "Volunteer does not belong to this subEvent" });
    }

    // Normalize date to midnight (avoid duplicates for same day)
    const normalizedDate = new Date(date);
    normalizedDate.setHours(0, 0, 0, 0);

    // Check for existing attendance record first
    const existingAttendance = await Attendance.findOne({
      volunteerId,
      subEventId,
      date: normalizedDate,
    });

    if (existingAttendance) {
      // Update existing record
      existingAttendance.status = status;
      existingAttendance.markedBy = req.user._id;
      const updatedAttendance = await existingAttendance.save();
      return res.json({
        message: "Attendance updated successfully",
        attendance: updatedAttendance,
      });
    }

    // Create new attendance record
    const newAttendance = new Attendance({
      volunteerId,
      subEventId,
      eventId,
      date: normalizedDate,
      status,
      markedBy: req.user._id,
    });

    const savedAttendance = await newAttendance.save();

    res.json({
      message: "Attendance marked successfully",
      attendance: savedAttendance,
    });
  } catch (err) {
    console.error("Attendance mark error:", err);

    // Handle duplicate key error specifically
    if (err.code === 11000) {
      return res.status(400).json({
        error: "Duplicate attendance record",
        details:
          "Attendance for this volunteer, sub-event, and date already exists",
      });
    }

    res.status(500).json({
      error: "Server error",
      details: err.message,
    });
  }
});

// GET /attendance/subevent/:subEventId/volunteers
router.get(
  "/subevent/:subEventId/volunteers",
  verifyToken,
  async (req, res) => {
    try {
      const { subEventId } = req.params;

      // Get volunteers only for that subevent
      const volunteers = await Volunteer.find({ subEventId }).populate(
        "userId",
        "name email"
      );

      res.json(volunteers);
    } catch (err) {
      res.status(500).json({ error: "Server error", details: err.message });
    }
  }
);

// Get Attendance (By Date or Range)

router.get("/:eventId/:subEventId", verifyToken, async (req, res) => {
  try {
    const { eventId, subEventId } = req.params;
    const { date, from, to, includeAbsent } = req.query;

    const filter = { event: eventId, subEvent: subEventId };

    if (date) {
      const d = new Date(date);
      d.setHours(0, 0, 0, 0);
      filter.date = d;
    } else if (from && to) {
      const start = new Date(from);
      start.setHours(0, 0, 0, 0);
      const end = new Date(to);
      end.setHours(23, 59, 59, 999);
      filter.date = { $gte: start, $lte: end };
    }

    let attendanceRecords = await Attendance.find(filter)
      .populate("volunteer", "name email roll_no year department")
      .sort({ date: -1 });

    // Add default "Absent" volunteers if includeAbsent=true & single date query
    if (includeAbsent === "true" && date) {
      const attendanceVolunteerIds = attendanceRecords.map((a) =>
        a.volunteer?._id?.toString()
      );
      const allVolunteers = await Volunteer.find({
        subEvent: subEventId,
      }).select("name email roll_no year department");

      const absentVolunteers = allVolunteers.filter(
        (v) => !attendanceVolunteerIds.includes(v._id.toString())
      );
      const absentRecords = absentVolunteers.map((v) => ({
        volunteer: v,
        status: "Absent",
        date: new Date(date),
      }));

      attendanceRecords = [...attendanceRecords, ...absentRecords];
    }

    res.json({ success: true, attendance: attendanceRecords });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;