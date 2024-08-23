import { useState } from "react";
import { Outlet, useLoaderData, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { FaBars } from "react-icons/fa";

export const dashboardLoader = async () => {
  try {
    const { data } = await axios.get("/api/users/profile");
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message || error.message);
    return redirect("/");
  }
};

const DashboardPage = () => {
  const { user } = useLoaderData();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen w-full">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-gray-800 text-white flex flex-col transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="flex items-center justify-between h-16 px-4">
          <h1 className="text-2xl font-bold">Dashboard</h1>

          <button
            onClick={toggleSidebar}
            className="text-white rounded-full bg-gray-800 md:hidden focus:outline-none"
          >
            <FaBars size={24} />
          </button>
        </div>
        <div className="flex flex-row gap-2 mx-3 items-center w-32">
          <div className="w-10">
            <img
              src={user.profilePicture}
              alt="Profile"
              className="rounded-full "
            />
          </div>
          <div className="font-semibold capitalize">{user.name}</div>
        </div>
        <Sidebar user={user} onSelect={toggleSidebar} />
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col md:ml-64">
        {/* Navbar */}
        <div className="mx-2 my-1 w-8 h-8 text-center md:hidden">
          <button
            onClick={toggleSidebar}
            className="px-2 py-1 text-gray-700 md:hidden focus:outline-none"
          >
            <FaBars size={24} />
          </button>
        </div>

        {/* Outlet for nested routes */}
        <main className="flex-1 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
