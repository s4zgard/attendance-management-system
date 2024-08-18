import Attendance from "../models/attendance.model.js";
import User from "../models/user.model.js";

// Mark Attendance
export const markAttendance = async (req, res) => {
  const { status } = req.body;

  try {
    // Check if attendance is already marked for today
    const today = new Date().setHours(0, 0, 0, 0);
    const existingAttendance = await Attendance.findOne({
      user: req.user.id,
      date: today,
    });

    if (existingAttendance) {
      return res
        .status(400)
        .json({ message: "Attendance already marked for today" });
    }

    const attendance = new Attendance({
      user: req.user.id,
      status: status || "Present",
    });

    await attendance.save();

    res
      .status(201)
      .json({ message: "Attendance marked successfully", attendance });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// View Attendance Records
export const viewAttendance = async (req, res) => {
  try {
    const attendanceRecords = await Attendance.find({ user: req.user.id }).sort(
      { date: -1 }
    );
    if (!attendanceRecords.length) {
      return res.status(404).json({ message: "No attendance records found" });
    }

    res.status(200).json(attendanceRecords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
