import LeaveRequest from "../models/leaveRequest.model.js";

// Create a new leave request
export const createLeaveRequest = async (req, res) => {
  const { startDate, endDate, reason } = req.body;

  try {
    const leaveRequest = new LeaveRequest({
      user: req.user._id,
      startDate,
      endDate,
      reason,
    });

    const createdLeaveRequest = await leaveRequest.save();

    res.status(201).json(createdLeaveRequest);
  } catch (error) {
    res.status(500);
    throw new Error("Failed to create leave request.");
  }
};

// Get all leave requests for the authenticated user
export const getMyLeaveRequests = async (req, res) => {
  try {
    const leaveRequests = await LeaveRequest.find({ user: req.user._id });

    res.status(200).json(leaveRequests);
  } catch (error) {
    res.status(500);
    throw new Error("Failed to retrieve leave requests.");
  }
};

// Get all leave requests (Admin only)
export const getAllLeaveRequests = async (req, res) => {
  try {
    const leaveRequests = await LeaveRequest.find().populate(
      "user",
      "name email"
    );

    res.status(200).json(leaveRequests);
  } catch (error) {
    res.status(500);
    throw new Error("Failed to retrieve leave requests.");
  }
};

// Update leave request status (Admin only)
export const updateLeaveRequestStatus = async (req, res) => {
  const { status } = req.body;

  try {
    const leaveRequest = await LeaveRequest.findById(req.params.id);

    if (!leaveRequest) {
      res.status(404);
      throw new Error("Leave request not found.");
    }

    leaveRequest.status = status;
    const updatedLeaveRequest = await leaveRequest.save();

    res.status(200).json(updatedLeaveRequest);
  } catch (error) {
    res.status(500);
    throw new Error("Failed to update leave request.");
  }
};

// Delete a leave request (User or Admin)
export const deleteLeaveRequest = async (req, res) => {
  try {
    const leaveRequest = await LeaveRequest.findById(req.params.id);

    if (!leaveRequest) {
      res.status(404);
      throw new Error("Leave request not found.");
    }

    if (
      leaveRequest.user.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      res.status(403);
      throw new Error("Not authorized to delete this leave request.");
    }

    await leaveRequest.deleteOne();

    res.status(200).json({ message: "Leave request deleted." });
  } catch (error) {
    res.status(500);
    throw new Error("Failed to delete leave request.");
  }
};
