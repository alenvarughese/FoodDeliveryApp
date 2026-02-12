import React, { useRef } from "react";
import { Link } from "react-router-dom";
import api from '../api/api';
import PageBanner from "./PageBanner";

const Register = () => {
  const signupNameRef = useRef();
  const signupPasswordRef = useRef();
  const signupEmailRef = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();
    const name = signupNameRef.current.value;
    const email = signupEmailRef.current.value;
    const password = signupPasswordRef.current.value;

    try {
      const response = await api.post("/api/signup", { name, email, password });
      const result = response.data;

      if (result.success) {
        alert("Registration Successful! Please login.");
        window.location.href = "/login";
      } else {
        alert(result.message || "Registration Failed");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("An error occurred during signup. Please try again.");
    }
  };

  return (
    <div>
      <PageBanner title="Signup" />

      <section className="px-4 py-20">
        <div className="container mx-auto">

          {/* Form Container */}
          <div className="max-w-md mx-auto bg-red-50 rounded-md p-8 text-center shadow-sm">
            <form className="flex flex-col gap-6" onSubmit={submitHandler}>

              {/* Full Name Input */}
              <div className="text-left">
                <input
                  type="text"
                  placeholder="Full name"
                  required
                  ref={signupNameRef}
                  className="w-full bg-transparent border-b border-gray-400 py-2 focus:outline-none focus:border-red-500 text-gray-700 placeholder-gray-500"
                />
              </div>

              {/* Email Input */}
              <div className="text-left">
                <input
                  type="email"
                  placeholder="Email"
                  required
                  ref={signupEmailRef}
                  className="w-full bg-transparent border-b border-gray-400 py-2 focus:outline-none focus:border-red-500 text-gray-700 placeholder-gray-500"
                />
              </div>

              {/* Password Input */}
              <div className="text-left">
                <input
                  type="password"
                  placeholder="Password"
                  required
                  ref={signupPasswordRef}
                  className="w-full bg-transparent border-b border-gray-400 py-2 focus:outline-none focus:border-red-500 text-gray-700 placeholder-gray-500"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="mt-4 bg-red-600 text-white py-2 px-6 rounded hover:bg-red-700 transition-colors duration-300 w-fit mx-auto"
              >
                Sign Up
              </button>
            </form>
          </div>

          {/* Footer Link */}
          <div className="text-center mt-6">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-gray-800 font-semibold hover:text-red-600">
                Login
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;