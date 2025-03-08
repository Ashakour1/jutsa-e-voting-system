import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../hooks/useUser";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    studentId: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const { login, user } = useAuth(); // Get user state from context
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post(
        "https://jutsa-e-voting-system.onrender.com/api/users/login",
        formData
      );
      // console.log("Login successful:", data);

      login(data); // Store user data in context
    } catch (err) {
      console.log(err.response?.data?.message || "Login failed");
      setLoading(false);
    }
  };

  // Redirect when user updates
  useEffect(() => {
    if (user?.data?.role) {
      navigate(
        user.data.role === "admin" ? "/admin/dashboard" : "/user/dashboard"
      );
    }
  }, [user, navigate]); // Runs when `user` updates

  return (
    <div className="flex min-h-screen flex-1 flex-col justify-center items-center px-6 lg:px-8">
      <div className="w-full max-w-sm mx-auto">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm space-y-3">
          <img alt="Logo" src="logo.png" className="mx-auto h-15 w-15" />
          <h2 className="mt-4 text-center text-2xl font-bold tracking-tight text-primary">
            Welcome to Voting Portal
          </h2>
          <p className="text-center text-sm text-gray-400">
            Please verify your identity to access the <br /> voting portal
          </p>
        </div>

        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="studentId"
                className="block text-sm font-medium text-gray-900"
              >
                Student ID
              </label>
              <div className="mt-2">
                <input
                  id="studentId"
                  name="studentId"
                  type="text"
                  required
                  onChange={handleChange}
                  placeholder="Enter your Student ID"
                  className="block w-full rounded-md bg-white px-3 py-3 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-900"
              >
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={handleChange}
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-2.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-secondary sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full py-3 cursor-pointer justify-center rounded-md bg-secondary px-3 text-sm font-semibold text-white shadow-xs hover:bg-secondary focus-visible:outline-2 focus-visible:outline-secondary"
              >
                {loading ? "Loading..." : "Login"}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Need help logging in?{" "}
            <a href="#" className="font-semibold text-primary">
              Support Center
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
