import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import { FaTrash, FaEye } from "react-icons/fa";
import axios from "axios";
import Modal from "react-modal";

export const manageLeaveLoader = async () => {
  try {
    const { data } = await axios.get("/api/leaves/all");
    return data;
  } catch (error) {
    console.error("Failed to fetch leave requests:", error);
    return { leaveRequests: [] }; // Returning empty array if there is an error
  }
};

Modal.setAppElement("#root");

const ManageLeave = () => {
  const { leaveRequests } = useLoaderData();
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleStatusChange = async (requestId, newStatus) => {
    try {
      await axios.put(`/api/leaves/${requestId}`, { status: newStatus });
      toast.success("Leave request updated");
      // Refresh the leave requests data
      window.location.reload(); // Simple refresh, consider refetching data
    } catch (error) {
      toast.error("Failed to update leave request");
    }
  };

  const handleDelete = async (requestId) => {
    if (window.confirm("Are you sure you want to delete this leave request?")) {
      try {
        await axios.delete(`/api/leaves/${requestId}`);
        toast.success("Leave request deleted");
        // Refresh the leave requests data
        window.location.reload(); // Simple refresh, consider refetching data
      } catch (error) {
        toast.error("Failed to delete leave request");
      }
    }
  };

  const openModal = (request) => {
    setSelectedRequest(request);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedRequest(null);
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Manage Leave Requests</h2>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead>
          <tr>
            <th className="p-4 border-b">User</th>
            <th className="p-4 border-b">Date</th>
            <th className="p-4 border-b">Reason</th>
            <th className="p-4 border-b">Status</th>
            <th className="p-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {leaveRequests.map((request) => (
            <tr key={request._id}>
              <td className="p-4 border-b">{request.user?.name}</td>
              <td className="p-4 border-b">
                {new Date(request.date).toLocaleDateString()}
              </td>
              <td className="p-4 border-b">{request.reason}</td>
              <td className="p-4 border-b">
                <select
                  value={request.status}
                  onChange={(e) =>
                    handleStatusChange(request._id, e.target.value)
                  }
                  className="bg-gray-200 p-2 rounded-md"
                >
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </td>
              <td className="p-4 flex gap-2">
                <button
                  onClick={() => openModal(request)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <FaEye />
                </button>
                <button
                  onClick={() => handleDelete(request._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for viewing leave request details */}
      {selectedRequest && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50"
        >
          <div className="bg-white p-6 rounded-md shadow-md w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4">Leave Request Details</h2>
            <p>
              <strong>User:</strong> {selectedRequest.user?.name}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(selectedRequest.date).toLocaleDateString()}
            </p>
            <p>
              <strong>Reason:</strong> {selectedRequest.reason}
            </p>
            <p>
              <strong>Status:</strong> {selectedRequest.status}
            </p>
            <button
              onClick={closeModal}
              className="mt-4 bg-blue-500 text-white p-2 rounded-md"
            >
              Close
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ManageLeave;
