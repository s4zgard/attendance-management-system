import Grade from "../models/grade.model.js";

// Create a grade
export const createGrade = async (req, res) => {
  const { userId, attendanceGrade, overallGrade, remarks } = req.body;

  try {
    const grade = new Grade({
      user: userId,
      attendanceGrade,
      overallGrade,
      remarks,
    });

    await grade.save();
    res.status(201).json(grade);
  } catch (error) {
    res.status(500);
    throw new Error("Failed to create grade");
  }
};

// Get all grades
export const getGrades = async (req, res) => {
  try {
    const grades = await Grade.find({}).populate("user", "name email");
    res.status(200).json(grades);
  } catch (error) {
    res.status(500);
    throw new Error("Failed to retrieve grades");
  }
};

// Get grade by user ID
export const getGradeByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const grade = await Grade.findOne({ user: userId }).populate(
      "user",
      "name email"
    );

    if (!grade) {
      res.status(404);
      throw new Error("Grade not found");
    }

    res.status(200).json(grade);
  } catch (error) {
    res.status(500);
    throw new Error("Failed to retrieve grade");
  }
};

// Update grade
export const updateGrade = async (req, res) => {
  const { userId } = req.params;
  const { attendanceGrade, overallGrade, remarks } = req.body;

  try {
    const grade = await Grade.findOne({ user: userId });

    if (!grade) {
      res.status(404);
      throw new Error("Grade not found");
    }

    grade.attendanceGrade = attendanceGrade || grade.attendanceGrade;
    grade.overallGrade = overallGrade || grade.overallGrade;
    grade.remarks = remarks || grade.remarks;

    await grade.save();
    res.status(200).json(grade);
  } catch (error) {
    res.status(500);
    throw new Error("Failed to update grade");
  }
};

// Delete grade
export const deleteGrade = async (req, res) => {
  const { userId } = req.params;

  try {
    const grade = await Grade.findOne({ user: userId });

    if (!grade) {
      res.status(404);
      throw new Error("Grade not found");
    }

    await grade.remove();
    res.status(200).json({ message: "Grade deleted" });
  } catch (error) {
    res.status(500);
    throw new Error("Failed to delete grade");
  }
};
