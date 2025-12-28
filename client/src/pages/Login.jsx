import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/icon.png";
import { apiFetch } from "../api";

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const result = await apiFetch("/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      sessionStorage.setItem("token", result.token);
      navigate("/raise");
    } catch (error) {
      alert("Login failed: " + (error.message || "Invalid credentials"));
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-950 text-white">
      <div className="hidden md:flex flex-1 flex-col justify-center items-center p-10 text-center bg-gradient-to-br from-blue-700/20 to-purple-700/10 border-r border-gray-800">
        <img src={logo} alt="LocalConnect Logo" className="w-20 h-20 mb-6" />
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-500 to-purple-400 bg-clip-text text-transparent mb-4">
          LocalConnect
        </h1>
        <p className="text-gray-300 text-lg max-w-sm leading-relaxed">
          Connect with clients in your area, offer your services, and grow your local business with ease.
        </p>
        <div className="mt-10 flex gap-6 text-gray-400 text-sm">
          <div>Total Providers: <span className="text-blue-400 font-semibold">1,245</span></div>
          <div>Clients Served: <span className="text-purple-400 font-semibold">3,560</span></div>
          <div>Projects Completed: <span className="text-green-400 font-semibold">4,210</span></div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-md bg-gray-900/80 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-gray-800">
          <h2 className="text-3xl font-bold text-center mb-6">Welcome Back</h2>
          <p className="text-gray-400 text-center mb-8 text-sm">
            Log in to manage your services and connect with clients nearby.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-gray-300 mb-1">Email</label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-white"
                placeholder="Enter your email"
              />
              {errors.email && (
                <span className="text-red-500 text-sm">{errors.email.message}</span>
              )}
            </div>

            <div>
              <label className="block text-gray-300 mb-1">Password</label>
              <input
                type="password"
                {...register("password", { required: "Password is required" })}
                className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-white"
                placeholder="Enter your password"
              />
              {errors.password && (
                <span className="text-red-500 text-sm">{errors.password.message}</span>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 py-2.5 rounded-md font-semibold text-white transition-all duration-200 shadow-md"
            >
              Log In
            </button>
          </form>

          <p className="text-gray-400 text-sm mt-6 text-center">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-blue-500 hover:underline font-medium">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
