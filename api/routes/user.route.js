import express from "express";
import { adminOnly, protect } from "../middlewares/authMiddleware.js";
import {
  viewUserProfile,
  updateUserProfile,
  deleteUserProfile,
  changeUserPassword,
  getAllUsers,
  deleteUserById,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/all-users", protect, adminOnly, getAllUsers);
router.delete("/:id", protect, adminOnly, deleteUserById);
router.get("/profile", protect, viewUserProfile);
router.put("/profile", protect, updateUserProfile);
router.delete("/profile", protect, deleteUserProfile);
router.put("/change-password", protect, changeUserPassword);

export default router;
