import moment from "moment";
import Attendance from "../models/attendance.model.js";

// Mark Attendance
export const markAttendance = async (req, res) => {
  const userId = req.user.id;
  const { status } = req.body;

  const today = moment().startOf("day");
  const existingAttendance = await Attendance.findOne({
    user: userId,
    date: { $gte: today.toDate(), $lt: moment(today).endOf("day").toDate() },
  });

  if (existingAttendance) {
    return res
      .status(400)
      .json({ message: "Attendance already marked for today." });
  }

  try {
    const attendance = new Attendance({
      user: userId,
      date: new Date(),
      status: status || "Present",
    });

    await attendance.save();

    res.status(201).json({ message: "Attendance marked successfully." });
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
      return res.status(404).json({ message: "No attendance records found." });
    }

    res.status(200).json(attendanceRecords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Check Today's Attendance
export const checkTodayAttendance = async (req, res) => {
  const userId = req.user.id;
  const today = moment().startOf("day");

  try {
    const existingAttendance = await Attendance.findOne({
      user: userId,
      date: { $gte: today.toDate(), $lt: moment(today).endOf("day").toDate() },
    });

    if (existingAttendance) {
      return res.status(200).json({ marked: true });
    }

    res.status(200).json({ marked: false });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Attendances
export const getAllAttendance = async (req, res) => {
  try {
    const attendances = await Attendance.find()
      .populate("user", "name email")
      .sort({ date: -1 });

    if (!attendances.length) {
      return res.status(404).json({ message: "No attendance records found." });
    }

    res.status(200).json(attendances);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Attendance Stats
export const getAttendanceStats = async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetch attendance counts
    const presentCount = await Attendance.countDocuments({
      user: userId,
      status: "Present",
    });

    const leaveCount = await Attendance.countDocuments({
      user: userId,
      status: "Leave",
    });

    const absentCount = await Attendance.countDocuments({
      user: userId,
      status: "Absent",
    });

    // Calculate total number of days
    const totalDays = presentCount + leaveCount + absentCount;

    // Calculate grade based on attendance
    let grade;
    if (totalDays === 0) {
      grade = "N/A"; // No data to calculate grade
    } else {
      const presentRatio = presentCount / totalDays;
      if (presentRatio >= 0.9) {
        grade = "A";
      } else if (presentRatio >= 0.8) {
        grade = "B";
      } else if (presentRatio >= 0.7) {
        grade = "C";
      } else {
        grade = "D";
      }
    }

    // Send response with attendance stats and grade
    res.status(200).json({
      present: presentCount,
      leave: leaveCount,
      absent: absentCount,
      grade: grade,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
