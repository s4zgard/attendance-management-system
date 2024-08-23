import { Form, useOutletContext } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

const ManageUsers = () => {
  const { users } = useOutletContext();

  return (
    <div className="p-6 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center">Manage Users</h2>
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-6 text-left">Image</th>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Role</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b">
                <td className="py-3 px-6">
                  <img
                    src={user.profilePicture}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </td>
                <td className="py-3 px-6 capitalize">{user.name}</td>
                <td className="py-3 px-6">{user.email}</td>
                <td className="py-3 px-6 capitalize">{user.role}</td>
                <td className="py-3 px-6 text-center">
                  <Form
                    method="post"
                    action={`../admin/delete/user/${user._id}`}
                  >
                    <button
                      type="submit"
                      className={`${
                        user.role === "admin"
                          ? "text-gray-400"
                          : "text-red-500 hover:text-red-700"
                      }`}
                      disabled={user.role === "admin"}
                    >
                      <FaTrash />
                    </button>
                  </Form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
