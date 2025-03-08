import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const token = userData?.token;
    // if (!access) {
    //   navigate("/?redirectTo=/dashboard/users");
    //   return;
    // }
    try {
      const response = await axios.get("http://localhost:3000/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUsers(response.data);

      console.log(response);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to load users.");
    }
  };

  const handleDelete = async (id) => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const token = userData?.token;
    // if (!access) {
    //   navigate("/?redirectTo=/dashboard/users");
    //   return;
    // }
    try {
      await axios.delete(
        `https://jutsa-e-voting-system.onrender.com/api/users/${id}/`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("User deleted successfully!");
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user.");
    }
  };

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold text-gray-900">Users</h1>

        <Link
          to="/admin/dashboard/users/register"
          className="rounded-sm bg-blue-600 px-4 py-2 text-xs font-medium text-white hover:bg-blue-700"
        >
          Create User
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead>
            <tr>
              <th className="px-4 py-2 font-medium text-gray-900">Name</th>
              <th className="px-4 py-2 font-medium text-gray-900">Email</th>
              <th className="px-4 py-2 font-medium text-gray-900">Role</th>
              <th className="px-4 py-2 font-medium text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-4 py-2 text-gray-900">{user.name}</td>
                <td className="px-4 py-2 text-gray-700">{user.email}</td>
                <td className="px-4 py-2 text-gray-700">{user.role}</td>
                <td className="px-4 py-2 items-end">
                  <Link
                    to={`/admin/dashboard/users/update/${user.id}`}
                    className="mr-2  rounded-sm bg-blue-600 px-4 py-2 text-xs font-medium text-white hover:bg-blue-700"
                  >
                    Update
                  </Link>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="rounded-sm bg-red-600 px-4 py-2 text-xs font-medium text-white hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
