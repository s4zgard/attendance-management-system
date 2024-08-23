import { Link, useLoaderData } from "react-router-dom";
import moment from "moment";
import {
  FaUser,
  FaEnvelope,
  FaCalendarAlt,
  FaInfoCircle,
  FaCheckCircle,
  FaTimesCircle,
  FaArrowLeft,
} from "react-icons/fa";
import axios from "axios";

export const leaveLoader = async ({ params }) => {
  const { id } = params;
  try {
    const { data } = await axios.get(`/api/leaves/${id}`);
    return data;
  } catch (error) {
    return {
      error:
        error?.response?.data?.message ||
        "Failed to load leave request details.",
    };
  }
};

const ViewLeave = () => {
  const leaveRequest = useLoaderData();

  if (leaveRequest.error) {
    return (
      <div className="text-red-500 text-center font-semibold">
        {leaveRequest.error}
      </div>
    );
  }

  const statusColor = {
    Approved: "text-green-500",
    Pending: "text-yellow-500",
    Rejected: "text-red-500",
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Leave Request Details
      </h2>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <Link to="../stats" className="flex items-center text-teal-500 mb-6">
          <FaArrowLeft className="mr-2" />
          Back
        </Link>
        <div className="flex items-center mb-4">
          <FaUser className="text-blue-500 mr-3" />
          <p className="text-lg font-medium text-gray-700">
            {leaveRequest.user.name}
          </p>
        </div>
        <div className="flex items-center mb-4">
          <FaEnvelope className="text-blue-500 mr-3" />
          <p className="text-lg font-medium text-gray-700">
            {leaveRequest.user.email}
          </p>
        </div>
        <div className="flex items-center mb-4">
          <FaCalendarAlt className="text-blue-500 mr-3" />
          <p className="text-lg font-medium text-gray-700">
            {moment(leaveRequest.leaveDate).format("MM-DD-YYYY")}
          </p>
        </div>
        <div className="flex items-center mb-4">
          <FaInfoCircle className="text-blue-500 mr-3" />
          <p
            className={`text-lg font-medium ${
              statusColor[leaveRequest.status]
            }`}
          >
            {leaveRequest.status}
          </p>
        </div>
        <div className="flex items-center">
          <FaCheckCircle className="text-blue-500 mr-3" />
          <p className="text-lg font-medium text-gray-700">
            {leaveRequest.reason}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ViewLeave;
