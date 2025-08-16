const router = require("express").Router();
const verifyToken = require("../middlewares/token_varification");
const Attendance = require("../Model/attendence.module");
const Volunteer = require("../Model/volunteer.model");

//  1. Mark / Update Attendance (Single Volunteer)
router.post("/mark", verifyToken, async (req, res) => {
  try {
    const { volunteerId, eventId, subEventId, date, status } = req.body;
    if (!volunteerId || !eventId || !subEventId || !date || !status) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Validate volunteer belongs to subEvent
    const volunteer = await Volunteer.findOne({
      _id: volunteerId,
      subEvent: subEventId,
    });
    if (!volunteer) {
      return res
        .status(400)
        .json({ error: "Volunteer does not belong to this subEvent" });
    }

    const attendanceDate = new Date(date);
    attendanceDate.setHours(0, 0, 0, 0);

    // Mark or Update (if already exists)
    const attendance = await Attendance.findOneAndUpdate(
      { volunteer: volunteerId, subEvent: subEventId, date: attendanceDate },
      { $set: { event: eventId, status } },
      { new: true, upsert: true }
    ).populate("volunteer", "name email roll_no year department");

    res.json({ success: true, attendance });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Bulk Mark Attendance
router.post("/mark-bulk", verifyToken, async (req, res) => {
  try {
    const { records } = req.body;
    // records = [{ volunteerId, eventId, subEventId, date, status }, ...]

    if (!records || !Array.isArray(records) || records.length === 0) {
      return res.status(400).json({ error: "Records array required" });
    }

    const bulkOps = records.map((r) => {
      const attendanceDate = new Date(r.date);
      attendanceDate.setHours(0, 0, 0, 0);

      return {
        updateOne: {
          filter: {
            volunteer: r.volunteerId,
            subEvent: r.subEventId,
            date: attendanceDate,
          },
          update: { $set: { event: r.eventId, status: r.status } },
          upsert: true,
        },
      };
    });

    await Attendance.bulkWrite(bulkOps);

    res.json({ success: true, message: "Bulk attendance marked successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

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

//  Strict Update API (Optional)
router.patch("/:attendanceId", verifyToken, async (req, res) => {
  try {
    const { attendanceId } = req.params;
    const { status } = req.body;

    if (!status) return res.status(400).json({ error: "Status required" });

    const attendance = await Attendance.findByIdAndUpdate(
      attendanceId,
      { $set: { status } },
      { new: true }
    ).populate("volunteer", "name email roll_no year department");

    if (!attendance)
      return res.status(404).json({ error: "Attendance not found" });

    res.json({ success: true, attendance });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
