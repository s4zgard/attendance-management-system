import { useLoaderData } from "react-router-dom";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationCircle,
} from "react-icons/fa";
import axios from "axios";

export const loadAttendanceAction = async () => {
  try {
    const response = await axios.get("/api/attendance/all");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to load attendance records."
    );
  }
};

const ViewAllAttendance = () => {
  const attendances = useLoaderData();

  return (
    <div className="p-6 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center">
        All Attendance Records
      </h2>
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-center">Date</th>
              <th className="py-3 px-6 text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {attendances.map((attendance) => (
              <tr key={attendance._id} className="border-b">
                <td className="py-3 px-6 capitalize">
                  {attendance.user?.name || "Deleted user"}
                </td>
                <td className="py-3 px-6">
                  {attendance.user?.email || "Deleted user"}
                </td>
                <td className="py-3 px-6 text-center">
                  {new Date(attendance.date).toLocaleDateString()}
                </td>
                <td className="py-3 px-6 text-center">
                  {attendance.status === "Present" && (
                    <FaCheckCircle className="text-green-500 inline-block" />
                  )}
                  {attendance.status === "Absent" && (
                    <FaTimesCircle className="text-red-500 inline-block" />
                  )}
                  {attendance.status === "Leave" && (
                    <FaExclamationCircle className="text-yellow-500 inline-block" />
                  )}
                  <span className="ml-2 capitalize">{attendance.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewAllAttendance;
