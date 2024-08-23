import { useState } from "react";
import { useLoaderData, redirect, Form } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FaUser, FaEnvelope, FaUpload, FaKey } from "react-icons/fa";

export const profileLoader = async () => {
  try {
    const { data } = await axios.get("/api/users/profile");
    return data;
  } catch (error) {
    toast.error("Failed to load user data.");
    return redirect("/login");
  }
};

export const profileAction = async ({ request }) => {
  const formData = await request.formData();

  if (formData.get("formType") === "profile") {
    try {
      await axios.put("/api/users/profile", {
        name: formData.get("name"),
        email: formData.get("email"),
        profilePicture: formData.get("profilePicture"),
      });
      toast.success("Profile updated successfully.");
      return redirect("../profile");
    } catch (error) {
      toast.error("Failed to update profile.");
      return null;
    }
  }

  if (formData.get("formType") === "password") {
    if (formData.get("newPassword") !== formData.get("confirmPassword")) {
      toast.error("Passwords do not match.");
      return null;
    }
    try {
      await axios.put("/api/users/change-password", {
        currentPassword: formData.get("currentPassword"),
        newPassword: formData.get("newPassword"),
      });
      toast.success("Password changed successfully.");
      return redirect("../profile");
    } catch (error) {
      toast.error(error?.response?.data?.message || error.error);
      return null;
    }
  }
};

const ProfilePage = () => {
  const { user } = useLoaderData();

  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    profilePicture: user.profilePicture || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleUpload = async (e) => {
    const imageData = new FormData();
    imageData.append("image", e.target.files[0]);

    try {
      const { data } = await axios.post("/api/uploads", imageData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(data.message);
      setFormData((prev) => ({ ...prev, profilePicture: data.image }));
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to upload image.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex flex-col items-center p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Profile</h2>
      <Form
        method="post"
        encType="multipart/form-data"
        className="w-full max-w-md space-y-4"
      >
        <input type="hidden" name="formType" value="profile" />
        <input
          type="hidden"
          name="profilePicture"
          id="profilePicture"
          value={formData.profilePicture}
        />
        {formData.profilePicture && (
          <div className="mt-4">
            <img
              src={formData.profilePicture}
              alt="Profile"
              className="w-24 h-24 border-2 border-slate-800 rounded-md object-cover"
            />
          </div>
        )}
        <div className="px-3 py-2 flex  gap-4 items-center border border-gray-300 rounded-md shadow-sm">
          <FaUpload className="ml-2 text-gray-500" />
          <label
            htmlFor="fileUpload"
            className="block text-sm font-medium text-gray-700 ml-2 flex-1"
          >
            Picture
          </label>
          <input
            type="file"
            name="fileUpload"
            id="fileUpload"
            accept="image/*"
            onChange={handleUpload}
            className="mt-1 block w-full text-gray-900 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="px-3 py-2 flex  gap-4 items-center border border-gray-300 rounded-md shadow-sm">
          <FaUser className="ml-2 text-gray-500" />
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 ml-2 flex-1"
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="px-3 py-2 flex gap-4 items-center border border-gray-300 rounded-md shadow-sm">
          <FaEnvelope className="ml-2 text-gray-500" />
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 ml-2 flex-1"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700"
        >
          Update Profile
        </button>
      </Form>

      <Form method="post" className="w-full max-w-md mt-6 space-y-4">
        <input type="hidden" name="formType" value="password" />
        <h3 className="text-xl font-semibold">Change Password</h3>
        <div className="px-3 py-2 flex gap-4 items-center border border-gray-300 rounded-md shadow-sm">
          <FaKey className="ml-2 text-gray-500" />
          <label
            htmlFor="currentPassword"
            className="block text-sm font-medium text-gray-700 ml-2 flex-1"
          >
            Current Password
          </label>
          <input
            type="password"
            name="currentPassword"
            id="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="px-3 py-2 flex gap-4 items-center border border-gray-300 rounded-md shadow-sm">
          <FaKey className="ml-2 text-gray-500" />
          <label
            htmlFor="newPassword"
            className="block text-sm font-medium text-gray-700 ml-2 flex-1"
          >
            New Password
          </label>
          <input
            type="password"
            name="newPassword"
            id="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="px-3 py-2 flex gap-4 items-center border border-gray-300 rounded-md shadow-sm">
          <FaKey className="ml-2 text-gray-500" />
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700 ml-2 flex-1"
          >
            Confirm New Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700"
        >
          Change Password
        </button>
      </Form>
    </div>
  );
};

export default ProfilePage;
