import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { FaCheckCircle, FaPlane } from "react-icons/fa";
import moment from "moment";

const MarkAttendance = () => {
  const [attendanceStatus, setAttendanceStatus] = useState("Present");
  const [attendanceMarked, setAttendanceMarked] = useState(false);

  useEffect(() => {
    const checkAttendanceStatus = async () => {
      try {
        const response = await axios.get("/api/attendance");
        const today = moment().format("YYYY-MM-DD");
        const todayAttendance = response.data.find(
          (record) => moment(record.date).format("YYYY-MM-DD") === today
        );

        if (todayAttendance) {
          setAttendanceMarked(true);
          setAttendanceStatus(todayAttendance.status);
        }
      } catch (error) {}
    };

    checkAttendanceStatus();
  }, []);

  const handleMarkAttendance = async () => {
    try {
      await axios.post("/api/attendance", { status: attendanceStatus });
      toast.success("Attendance marked successfully!");
      setAttendanceMarked(true);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };
  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-white shadow-lg rounded-lg p-8 mx-2 mb-6 md:mb-0">
      <FaCheckCircle className="text-green-500 text-6xl mb-4" />
      <h2 className="text-2xl font-bold mb-4">Mark Attendance</h2>
      <div className="w-full mb-4">
        <label className="block text-lg mb-2">Attendance Status</label>
        <select
          value={attendanceStatus}
          onChange={(e) => setAttendanceStatus(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
          disabled={attendanceMarked}
        >
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
        </select>
      </div>
      <button
        onClick={handleMarkAttendance}
        className={`px-6 py-3 text-white rounded-full font-semibold transition duration-300 ease-in-out ${
          attendanceMarked
            ? "bg-gray-500 hover:bg-gray-600"
            : "bg-blue-500  hover:bg-blue-600"
        }`}
        disabled={attendanceMarked}
      >
        {attendanceMarked ? "Marked for Today" : "Mark Attendance"}
      </button>
    </div>
  );
};
export default MarkAttendance;
