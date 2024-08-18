import express from "express";
import {
  createGrade,
  getGrades,
  getGradeByUserId,
  updateGrade,
  deleteGrade,
} from "../controllers/grade.controller.js";
import { protect, adminOnly } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, adminOnly, createGrade).get(protect, getGrades);
router
  .route("/:userId")
  .get(protect, getGradeByUserId)
  .put(protect, adminOnly, updateGrade)
  .delete(protect, adminOnly, deleteGrade);

export default router;
