import express from "express";
import { adminOnly, protect } from "../middlewares/authMiddleware.js";
import {
  markAttendance,
  viewAttendance,
  checkTodayAttendance,
  getAttendanceStats,
  getAllAttendance,
} from "../controllers/attendance.controller.js";

const router = express.Router();

router.route("/").post(protect, markAttendance).get(protect, viewAttendance);
router.route("/today").get(protect, checkTodayAttendance);
router.route("/stats").get(protect, getAttendanceStats);
router.route("/all").get(protect, adminOnly, getAllAttendance);

export default router;
