import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  viewUserProfile,
  updateUserProfile,
  deleteUserProfile,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/profile", protect, viewUserProfile);
router.put("/profile", protect, updateUserProfile);
router.delete("/profile", protect, deleteUserProfile);

export default router;
