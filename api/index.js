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
import gradeRoutes from "./routes/grade.route.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;
app.use("/api/grades", gradeRoutes);
app.use(express.json());
app.use(cookieParser());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Routes
app.use("/", (req, res) => res.send(`API is running ...`));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/leaves", leaveRequestRoutes);
app.use("/api/grades", gradeRoutes);

// Error Middleware
app.use(notFound);
app.use(errorHandler);

// Server
app.listen(port, () => console.log(`Server is running on port ${port}`));
