import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";
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
    fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          navigate("/login");
        } else {
          console.error("Logout failed");
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <nav className="flex flex-col h-full p-4 bg-gray-800 text-white">
      <div className="flex-1 flex flex-col">
        {links.map((link) => {
          if (link.path === "admin" && user.role !== "admin") {
            return null;
          }
          return (
            <NavLink
              onClick={onSelect}
              to={link.path}
              key={link.text}
              className={({ isActive }) =>
                `flex items-center px-4 py-2 font-medium ${
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
      </div>

      <button
        onClick={handleLogout}
        className="flex items-center px-4 py-2 font-medium hover:bg-gray-700 mt-2"
      >
        <FaSignOutAlt className="mr-4" />
        Logout
      </button>

      <div className="text-xs text-center text-gray-300 mt-auto">
        AMS &copy; {new Date().getFullYear()} Sajjad Ahmed
      </div>
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
