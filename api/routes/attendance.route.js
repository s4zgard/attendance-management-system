import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  markAttendance,
  viewAttendance,
} from "../controllers/attendance.controller.js";

const router = express.Router();

router.route("/").post(protect, markAttendance).get(protect, viewAttendance);

export default router;
