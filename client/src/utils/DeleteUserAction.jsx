import axios from "axios";
import { redirect } from "react-router-dom";
import { toast } from "react-toastify";

export const deleteUserAction = async ({ params }) => {
  try {
    await axios.delete(`/api/users/${params.id}`);
    toast.success("User deleted successfully.");
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
  return redirect("/dashboard/admin");
};
