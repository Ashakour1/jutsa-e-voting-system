import { useState } from "react";
import axios from "axios";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    studentId: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/login",
        formData
      );

      console.log(response.data);
    } catch (err) {
      console.log(err.response.data.message);
    }
  };
  return (
    <>
      <div className="flex min-h-screen flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8">
        <div className="w-full max-w-sm mx-auto lg:mt-20">
          <div className=" sm:mx-auto sm:w-full sm:max-w-sm space-y-3">
            <img alt="Logo" src="logo.png" className="mx-auto h-15 w-15" />
            <h2 className="mt-4 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
              Welcome to Voting Portal
            </h2>
            <p className=" text-center text-sm text-gray-400">
              Please Verify your identity to access the <br /> voting portal
            </p>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleSubmit} method="POST" className="space-y-6">
              <div>
                <label
                  htmlFor="studentId"
                  className="block text-sm/6 font-medium text-gray-900"
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
                    // autoComplete="email"
                    className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Password
                  </label>
                  <div className="text-sm">
                    {/* <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a> */}
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    onChange={handleChange}
                    //   placeholder="Enter your password"
                    required
                    autoComplete="current-password"
                    className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm/6 text-gray-500">
              Help to login?{" "}
              <a
                href="#"
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                Support center
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
