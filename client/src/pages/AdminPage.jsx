import { Link, Outlet, redirect, useLoaderData } from "react-router-dom";
import { FaUsers, FaCalendarCheck, FaRegFileAlt } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";

export const adminLoader = async () => {
  try {
    const { data } = await axios.get("/api/users/all-users");
    return data;
  } catch (error) {
    toast.error(error.response?.data?.message || error.error);
    return redirect("/dashboard");
  }
};

const AdminPage = () => {
  const { users } = useLoaderData();
  return (
    <div className="flex flex-col items-center p-8 rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
        <Link
          to="../admin/"
          className="bg-blue-500 text-white p-3 rounded-lg shadow-md flex items-center gap-4"
        >
          <FaUsers className="text-3xl" />
          <span className="text-lg">Manage Users</span>
        </Link>
        <Link
          to="../admin/all-attendance"
          className="bg-green-500 text-white p-3 rounded-lg shadow-md flex items-center gap-4"
        >
          <FaCalendarCheck className="text-3xl" />
          <span className="text-lg">View All Attendance</span>
        </Link>
        <Link
          to="../admin/manage-leave"
          className="bg-yellow-500 text-white p-3 rounded-lg shadow-md flex items-center gap-4"
        >
          <FaRegFileAlt className="text-3xl" />
          <span className="text-lg">Manage Leave Requests</span>
        </Link>
      </div>
      <div>
        <Outlet context={{ users }} />
      </div>
    </div>
  );
};

export default AdminPage;
