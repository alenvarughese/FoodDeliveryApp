import React, { useRef } from "react";
import { Link } from "react-router-dom";
import api from '../api/api';
import PageBanner from "./PageBanner";

const Login = () => {
  const loginNameRef = useRef();
  const loginPasswordRef = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();
    const email = loginNameRef.current.value;
    const password = loginPasswordRef.current.value;

    try {
      const response = await api.post("/api/login", { email, password });
      const result = response.data;

      if (result.success) {
        localStorage.setItem("user", JSON.stringify(result.data));
        alert("Login Successful!");
        window.location.href = "/";
      } else {
        alert(result.message || "Invalid Email or Password");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login. Please try again.");
    }
  };

  return (
    <div>

      <PageBanner title="Login" />

      <section className="px-4 py-20">
        <div className="container mx-auto">

          <div className="max-w-md mx-auto bg-red-50 rounded-md p-8 text-center shadow-sm">
            <form className="flex flex-col gap-6" onSubmit={submitHandler}>

              {/* Email Input */}
              <div className="text-left">
                <input
                  type="email"
                  placeholder="Email"
                  required
                  ref={loginNameRef}
                  className="w-full bg-transparent border-b border-gray-400 py-2 focus:outline-none focus:border-red-500 text-gray-700 placeholder-gray-500"
                />
              </div>

              {/* Password Input */}
              <div className="text-left">
                <input
                  type="password"
                  placeholder="Password"
                  required
                  ref={loginPasswordRef}
                  className="w-full bg-transparent border-b border-gray-400 py-2 focus:outline-none focus:border-red-500 text-gray-700 placeholder-gray-500"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="mt-4 bg-red-600 text-white py-2 px-6 rounded hover:bg-red-700 transition-colors duration-300 w-fit mx-auto"
              >
                Login
              </button>
            </form>
          </div>

          {/* Footer Link */}
          <div className="text-center mt-6">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link to="/register" className="text-gray-800 font-semibold hover:text-red-600">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;