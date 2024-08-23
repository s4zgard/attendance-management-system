import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Pages import
import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";
import LoginPage, { loginAction } from "./pages/LoginPage";
import RegisterPage, { registerAction } from "./pages/RegisterPage";
import DashboardPage, { dashboardLoader } from "./pages/DashboardPage";
import AttendancePage from "./pages/AttendancePage";
import GradesPage from "./pages/GradesPage";
import ProfilePage, { profileAction, profileLoader } from "./pages/ProfilePage";
import LeavePage from "./pages/LeavePage";
import StatsPage from "./pages/StatsPage";
import { logoutAction } from "./components/Sidebar";
import ViewLeave, { leaveLoader } from "./pages/ViewLeave";
import AdminPage, { adminLoader } from "./pages/AdminPage";
import ManageUsers from "./components/ManageUsers";
import { deleteUserAction } from "./utils/DeleteUserAction";
import ViewAllAttendance, {
  loadAttendanceAction,
} from "./components/ViewAllAttendance";
import ManageLeave, { manageLeaveLoader } from "./components/ManageLeave";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
        action: loginAction,
      },
      {
        path: "register",
        element: <RegisterPage />,
        action: registerAction,
      },
      {
        path: "dashboard",
        element: <DashboardPage />,
        loader: dashboardLoader,
        children: [
          {
            index: true,
            element: <AttendancePage />,
          },
          {
            path: "stats",
            element: <StatsPage />,
          },
          {
            path: "grades",
            element: <GradesPage />,
          },
          {
            path: "profile",
            element: <ProfilePage />,
            loader: profileLoader,
            action: profileAction,
          },
          {
            path: "leave",
            element: <LeavePage />,
          },
          {
            path: "leave-details/:id",
            element: <ViewLeave />,
            loader: leaveLoader,
          },
          {
            path: "logout",
            action: logoutAction,
          },
          {
            path: "admin",
            element: <AdminPage />,
            loader: adminLoader,
            children: [
              {
                index: true,
                element: <ManageUsers />,
              },
              {
                path: "all-attendance",
                element: <ViewAllAttendance />,
                loader: loadAttendanceAction,
              },
              {
                path: "manage-leave",
                element: <ManageLeave />,
                loader: manageLeaveLoader,
              },
              {
                path: "delete/user/:id",
                action: deleteUserAction,
              },
            ],
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />;
      <ToastContainer position="bottom-right" />
    </>
  );
}

export default App;
