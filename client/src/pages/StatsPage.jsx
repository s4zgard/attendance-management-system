import { useEffect, useState } from "react";
import {
  FaThumbsUp,
  FaCalendarDay,
  FaThumbsDown,
  FaStar,
  FaTrashAlt,
  FaEye,
} from "react-icons/fa";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const StatsPage = () => {
  const [attendanceStats, setAttendanceStats] = useState({
    present: 0,
    leave: 0,
    absent: 0,
  });

  const [leaveRequests, setLeaveRequests] = useState([]);
  const navigate = useNavigate();

  const getGradeIcon = (grade) => {
    switch (grade) {
      case "A":
        return <FaStar className="text-yellow-500 text-4xl mr-4" />;
      case "B":
        return <FaStar className="text-blue-500 text-4xl mr-4" />;
      case "C":
        return <FaStar className="text-green-500 text-4xl mr-4" />;
      case "D":
        return <FaStar className="text-red-500 text-4xl mr-4" />;
      default:
        return <FaStar className="text-gray-500 text-4xl mr-4" />;
    }
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await axios.get("/api/attendance/stats");
        setAttendanceStats(data);
      } catch (error) {
        console.error("Failed to fetch attendance stats", error);
      }
    };

    const fetchLeaveRequests = async () => {
      try {
        const { data } = await axios.get("/api/leaves/my-leaves");
        setLeaveRequests(data);
      } catch (error) {
        console.error("Failed to fetch leave requests", error);
      }
    };

    fetchStats();
    fetchLeaveRequests();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/leaves/${id}`);
      setLeaveRequests(leaveRequests.filter((leave) => leave._id !== id));
    } catch (error) {
      console.error("Failed to delete leave request", error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen p-6">
      {/* Attendance Stats Section */}
      <div className="flex-1 flex flex-col items-center justify-center bg-white shadow-lg rounded-lg p-8 mx-2 mb-6 md:mb-0">
        <h2 className="text-2xl font-bold mb-4">Attendance Stats</h2>
        <div className="flex flex-col space-y-4">
          <div className="flex items-center text-green-500">
            <FaThumbsUp className="text-4xl mr-4" />
            <span className="text-xl">Present: {attendanceStats.present}</span>
          </div>
          <div className="flex items-center text-yellow-500">
            <FaCalendarDay className="text-4xl mr-4" />
            <span className="text-xl">Leave: {attendanceStats.leave}</span>
          </div>
          <div className="flex items-center text-red-500">
            <FaThumbsDown className="text-4xl mr-4" />
            <span className="text-xl">Absent: {attendanceStats.absent}</span>
          </div>
          <div className="flex items-center text-blue-500">
            {getGradeIcon(attendanceStats.grade)}
            <span className="text-xl">Grade: {attendanceStats.grade}</span>
          </div>
        </div>
      </div>
      {/* Leave Requests Section */}
      <div className="flex-1 flex flex-col items-center justify-center bg-white shadow-lg rounded-lg p-8 mx-2">
        <h2 className="text-2xl font-bold mb-4">Leave Requests</h2>
        <div className="w-full">
          {leaveRequests.map((leave) => (
            <div
              key={leave._id}
              className={`flex items-center justify-between p-4 mb-4 rounded-lg ${
                leave.status === "Accepted"
                  ? "bg-green-100"
                  : leave.status === "Rejected"
                  ? "bg-red-100"
                  : "bg-yellow-100"
              }`}
            >
              <div>
                <p className="text-lg font-semibold">
                  Date: {new Date(leave.date).toLocaleDateString()}
                </p>
                <p>Status: {leave.status}</p>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={() => navigate(`../leave-details/${leave._id}`)}
                  className="text-blue-500 hover:text-blue-600"
                >
                  <FaEye className="text-xl" />
                </button>
                {leave.status === "Pending" && (
                  <button
                    onClick={() => handleDelete(leave._id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <FaTrashAlt className="text-xl" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsPage;
