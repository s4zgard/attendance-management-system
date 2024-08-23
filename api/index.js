import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";

// Routes Import
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import attendanceRoutes from "./routes/attendance.route.js";
import leaveRequestRoutes from "./routes/leaveRequest.route.js";
import uploadRoutes from "./routes/upload.route.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Static Folder for Images
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Routes
app.get("/", (req, res) => res.send(`API is running ...`));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/leaves", leaveRequestRoutes);
app.use("/api/uploads", uploadRoutes);

// Error Middleware
app.use(notFound);
app.use(errorHandler);

// Server

app.listen(port, () => console.log(`Server is running on port ${port}`));
