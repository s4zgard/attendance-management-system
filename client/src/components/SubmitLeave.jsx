import axios from "axios";
import moment from "moment";
import { useState } from "react";
import { FaPlane } from "react-icons/fa";
import { toast } from "react-toastify";

const SubmitLeave = () => {
  const [leaveDate, setLeaveDate] = useState(moment().format("YYYY-MM-DD"));
  const [leaveReason, setLeaveReason] = useState("");

  const handleSubmitLeaveRequest = async () => {
    if (!leaveReason) {
      toast.error("Please fill in all fields.");
      return;
    }
    try {
      await axios.post("/api/leaves/", {
        date: leaveDate,
        reason: leaveReason,
      });
      toast.success("Leave request submitted successfully!");
      setLeaveReason("");
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-white shadow-lg rounded-lg p-8 mx-2">
      <FaPlane className="text-blue-500 text-6xl mb-4" />
      <h2 className="text-2xl font-bold mb-4">Submit Leave Request</h2>
      <div className="w-full mb-4">
        <label className="block text-lg mb-2">Leave Date</label>
        <input
          type="date"
          value={leaveDate}
          disabled
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>
      <div className="w-full mb-4">
        <label className="block text-lg mb-2">Reason</label>
        <textarea
          value={leaveReason}
          onChange={(e) => setLeaveReason(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
          rows="4"
        />
      </div>
      <button
        onClick={handleSubmitLeaveRequest}
        className={`px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-full font-semibold  transition-all duration-300 ease-in-out`}
      >
        Submit Leave Request
      </button>
    </div>
  );
};
export default SubmitLeave;
