import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { NavLink, redirect } from "react-router-dom";
import {
  FaClipboardList,
  FaChartPie,
  FaUserGraduate,
  FaShieldAlt,
} from "react-icons/fa";
import { toast } from "react-toastify";

const links = [
  {
    text: "Mark Attendance",
    path: ".",
    icon: <FaClipboardList />,
  },
  {
    text: "Stats",
    path: "stats",
    icon: <FaChartPie />,
  },
  {
    text: "Profile",
    path: "profile",
    icon: <FaUserGraduate />,
  },
  {
    text: "Admin",
    path: "admin",
    icon: <FaShieldAlt />,
  },
];

const Sidebar = ({ user, onSelect }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Call the logout endpoint (assuming you've set up the route)
    fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          navigate("/login"); // Redirect to the login page after successful logout
        } else {
          console.error("Logout failed");
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <nav className="flex-1 flex flex-col mt-10 space-y-2">
      {links.map((link) => {
        if (link.path === "admin" && user.role !== "admin") {
          return;
        }
        return (
          <NavLink
            onClick={onSelect}
            to={link.path}
            key={link.text}
            className={({ isActive }) =>
              `flex items-center px-4 py-2 text-lg font-medium ${
                isActive ? "bg-gray-700" : "hover:bg-gray-700"
              }`
            }
            end
          >
            <span className="mr-4">{link.icon}</span>
            {link.text}
          </NavLink>
        );
      })}

      <button
        onClick={handleLogout}
        className="flex items-center px-4 py-2 text-lg font-medium hover:bg-gray-700"
      >
        <FaSignOutAlt className="mr-4" />
        Logout
      </button>
    </nav>
  );
};

export default Sidebar;

export const logoutAction = async ({ request }) => {
  try {
    const response = await fetch("/api/auth/logout", {
      method: "POST",
    });
    const data = await response.json();
    toast.success(data.message);
  } catch (error) {
    console.error("Error during logout:", error);
    return redirect("/login");
  }
};
