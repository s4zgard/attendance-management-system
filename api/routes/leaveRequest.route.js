import express from "express";
import {
  createLeaveRequest,
  getMyLeaveRequests,
  getAllLeaveRequests,
  updateLeaveRequestStatus,
  deleteLeaveRequest,
} from "../controllers/leaveRequest.controller.js";
import { protect, adminOnly } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Routes for leave requests
router.post("/", protect, createLeaveRequest);
router.get("/my-leaves", protect, getMyLeaveRequests);
router.get("/", protect, adminOnly, getAllLeaveRequests);
router.put("/:id", protect, adminOnly, updateLeaveRequestStatus);
router.delete("/:id", protect, deleteLeaveRequest);

export default router;
