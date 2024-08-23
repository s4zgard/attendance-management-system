import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="bg-white p-8 rounded shadow-lg text-center max-w-lg">
      <h1 className="text-2xl font-bold mb-4">
        Welcome to the Attendance Management System
      </h1>
      <p className="text-gray-600 mb-8">
        Manage your attendance, leave requests, and grades efficiently. Sign in
        to start tracking your activities, or register if you're new here!
      </p>
      <div className="flex justify-around mt-8">
        <Link
          to="/login"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
