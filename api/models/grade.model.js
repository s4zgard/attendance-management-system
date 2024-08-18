import mongoose from "mongoose";

const gradeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    attendanceGrade: {
      type: Number,
      required: true,
    },
    overallGrade: {
      type: Number,
      required: true,
    },
    remarks: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const Grade = mongoose.model("Grade", gradeSchema);

export default Grade;
