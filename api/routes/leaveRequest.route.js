import express from "express";
import {
  createLeaveRequest,
  getMyLeaveRequests,
  getAllLeaveRequests,
  getLeaveRequestById,
  updateLeaveRequestStatus,
  deleteLeaveRequest,
} from "../controllers/leaveRequest.controller.js";
import { protect, adminOnly } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createLeaveRequest);
router.get("/my-leaves", protect, getMyLeaveRequests);
router.get("/all", protect, adminOnly, getAllLeaveRequests);
router.get("/:id", protect, getLeaveRequestById);
router.put("/:id", protect, adminOnly, updateLeaveRequestStatus);
router.delete("/:id", protect, deleteLeaveRequest);

export default router;
