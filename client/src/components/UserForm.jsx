import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const UserForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    studentId: "",
    password: "",
    role: "user",
  });

  console.log(formData);

  useEffect(() => {
    if (id) {
      fetchUserData();
    }
  }, [id]);

  const fetchUserData = async () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const token = userData?.token;
    // if (!access) {
    //   navigate(`/?redirectTo=${location.pathname}`);
    //   return;
    // }
    try {
      const response = await axios.get(
        `https://jutsa-e-voting-system.onrender.com/api/users/${id}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFormData({
        name: response.data.name,
        email: response.data.email,
        studentId: response.data.studentId,
        role: response.data.role,
        password: "",
      });
    } catch (error) {
      console.error("Error fetching user:", error);
      toast.error("Failed to load user data.");
    }
  };

  const validate = () => {
    const errors = {};
    if (!formData.name) errors.name = "Name is required";
    if (!formData.email) errors.email = "Email is required";
    if (!formData.studentId) errors.studentId = "Student ID is required";
    if (!formData.password) errors.password = "Password is required";

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const userData = {
      name: formData.name,
      email: formData.email,
      studentId: formData.studentId,
      password: formData.password,
      role: formData.role,
    };
    const LocalUserData = JSON.parse(localStorage.getItem("userData"));
    const token = LocalUserData?.token;

    try {
      if (id) {
        await axios.put(`https://jutsa-e-voting-system.onrender.com/api/users/${id}/`, userData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success("User updated successfully!");
      } else {
        await axios.post("https://jutsa-e-voting-system.onrender.com/api/users/", userData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setFormData({
          name: "",
          email: "",
          studentId: "",
          password: "",
          role: "user",
        });
        toast.success("User registered successfully!");
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.studentId ||
          error.response?.data?.email ||
          "An error occurred."
      );
    }
  };

  return (
    <div className="w-full px-20 rounded-lg mx-auto text-black p-8">
      <h1 className="my-4 text-3xl font-bold tracking-tight text-Accent">
        {id ? "Update User" : "User Registration"}
      </h1>
      <p className="mb-4 text-gray-700">
        {id
          ? "Modify the details below to update the user."
          : "Please fill in the form below to register a new user."}
      </p>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label
            className="mb-1 text-sm font-medium text-gray-700"
            htmlFor="name"
          >
            Name
          </label>
          <input
            className="rounded-md border border-gray-300 bg-gray-50 p-2 text-sm text-black"
            id="name"
            placeholder="Enter full name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label
            className="mb-1 text-sm font-medium text-gray-700"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="rounded-md border border-gray-300 bg-gray-50 p-2 text-sm text-black"
            id="email"
            placeholder="Enter email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label
            className="mb-1 text-sm font-medium text-gray-700"
            htmlFor="studentId"
          >
            Student ID
          </label>
          <input
            className="rounded-md border border-gray-300 bg-gray-50 p-2 text-sm text-black"
            id="studentId"
            placeholder="Enter student ID"
            type="text"
            name="studentId"
            value={formData.studentId}
            onChange={handleChange}
          />
          {errors.studentId && (
            <p className="text-red-500 text-xs mt-1">{errors.studentId}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label
            className="mb-1 text-sm font-medium text-gray-700"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="rounded-md border border-gray-300 bg-gray-50 p-2 text-sm text-black"
            id="password"
            placeholder="Enter password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
          )}
        </div>

        <button
          className="w-full rounded-md bg-green-500 px-4 text-sm font-medium text-white py-3"
          type="submit"
        >
          {id ? "Update" : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default UserForm;
