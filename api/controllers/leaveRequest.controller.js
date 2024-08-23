import moment from "moment";
import LeaveRequest from "../models/leaveRequest.model.js";
import Attendance from "../models/attendance.model.js";

// Create a new leave request
export const createLeaveRequest = async (req, res) => {
  const { date, reason } = req.body;

  try {
    const leaveRequest = new LeaveRequest({
      user: req.user.id,
      date: moment(date).toDate(),
      reason,
    });

    const createdLeaveRequest = await leaveRequest.save();

    res.status(201).json(createdLeaveRequest);
  } catch (error) {
    res.status(500).json({ message: "Failed to create leave request." });
  }
};

// Get all leave requests for the authenticated user
export const getMyLeaveRequests = async (req, res) => {
  try {
    const leaveRequests = await LeaveRequest.find({ user: req.user._id });

    res.status(200).json(leaveRequests);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve leave requests." });
  }
};

// Get a leave request by ID
export const getLeaveRequestById = async (req, res) => {
  try {
    const leaveRequest = await LeaveRequest.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (!leaveRequest) {
      return res.status(404).json({ message: "Leave request not found." });
    }

    res.status(200).json(leaveRequest);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve leave request." });
  }
};

// Get all leave requests (Admin only)
export const getAllLeaveRequests = async (req, res) => {
  try {
    const leaveRequests = await LeaveRequest.find().populate(
      "user",
      "name email"
    );

    res.status(200).json({ leaveRequests });
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve leave requests." });
  }
};

// Update leave request status (Admin only)
export const updateLeaveRequestStatus = async (req, res) => {
  const { status } = req.body;

  try {
    const leaveRequest = await LeaveRequest.findById(req.params.id);

    if (!leaveRequest) {
      return res.status(404).json({ message: "Leave request not found." });
    }

    // Update the leave request status
    leaveRequest.status = status;
    const updatedLeaveRequest = await leaveRequest.save();

    // If the leave request is approved, update attendance records
    if (status === "Approved") {
      const { user, startDate, endDate } = leaveRequest;

      // Convert startDate and endDate to moments
      const start = moment(startDate).startOf("day");
      const end = moment(endDate).endOf("day");

      // Loop through each day in the leave period
      for (let date = start; date.isBefore(end); date.add(1, "days")) {
        const existingAttendance = await Attendance.findOne({
          user,
          date: {
            $gte: date.toDate(),
            $lt: date.clone().endOf("day").toDate(),
          },
        });

        if (existingAttendance) {
          // If attendance exists, update it to "Leave"
          existingAttendance.status = "Leave";
          await existingAttendance.save();
        } else {
          // If no attendance exists, create a new "Leave" record
          const newAttendance = new Attendance({
            user,
            date: date.toDate(),
            status: "Leave",
          });
          await newAttendance.save();
        }
      }
    }

    res.status(200).json(updatedLeaveRequest);
  } catch (error) {
    res.status(500).json({ message: "Failed to update leave request." });
  }
};

// Delete a leave request (User or Admin)
export const deleteLeaveRequest = async (req, res) => {
  try {
    const leaveRequest = await LeaveRequest.findById(req.params.id);

    if (!leaveRequest) {
      return res.status(404).json({ message: "Leave request not found." });
    }

    if (
      leaveRequest.user.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this leave request." });
    }

    await leaveRequest.deleteOne();

    res.status(200).json({ message: "Leave request deleted." });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete leave request." });
  }
};
