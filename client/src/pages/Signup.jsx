import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/icon.png";
import { apiFetch } from "../api";

const Signup = () => {
  const navigate = useNavigate();
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [serviceCategories, setServiceCategories] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await apiFetch("/api/service-categories");
        const formatted = {};
        data.forEach((category) => {
          formatted[category.name] = category.skills;
        });
        setServiceCategories(formatted);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const toggleSkill = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const onSubmit = async (data) => {
    try {
      await apiFetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          phno: data.phno,
          email: data.email,
          password: data.password,
          skills: selectedSkills,
        }),
      });

      alert("Registration successful!");
      navigate("/login");
    } catch (error) {
      console.error("Signup error:", error);
      alert(error.message || "Registration failed");
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
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-md bg-gray-900/80 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-gray-800">
          <h2 className="text-3xl font-bold text-center mb-6">Sign Up</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-gray-300 mb-1">Name</label>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 text-white"
              />
              {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
            </div>

            <div>
              <label className="block text-gray-300 mb-1">Phone Number</label>
              <input
                type="tel"
                {...register("phno", {
                  required: "Phone number is required",
                  pattern: { value: /^[0-9]{10}$/, message: "Enter a valid 10-digit phone number" },
                })}
                className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 text-white"
              />
              {errors.phno && <span className="text-red-500 text-sm">{errors.phno.message}</span>}
            </div>

            <div>
              <label className="block text-gray-300 mb-1">Email</label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 text-white"
              />
              {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Service Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 rounded bg-gray-700 text-white"
              >
                <option value="">Select Category</option>
                {Object.keys(serviceCategories).map((cat) => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {selectedCategory && serviceCategories[selectedCategory]?.length > 0 && (
              <div className="grid grid-cols-2 gap-2">
                {serviceCategories[selectedCategory].map((skill) => (
                  <label
                    key={skill}
                    className={`px-3 py-2 rounded cursor-pointer ${
                      selectedSkills.includes(skill)
                        ? "bg-blue-600 text-white"
                        : "bg-gray-700 text-gray-200"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedSkills.includes(skill)}
                      onChange={() => toggleSkill(skill)}
                      className="mr-2"
                    />
                    {skill}
                  </label>
                ))}
              </div>
            )}

            <div>
              <label className="block text-gray-300 mb-1">Password</label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Minimum 6 characters" },
                })}
                className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 text-white"
              />
              {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
            </div>

            <div>
              <label className="block text-gray-300 mb-1">Confirm Password</label>
              <input
                type="password"
                {...register("confirmPassword", {
                  validate: (value) => value === password || "Passwords do not match",
                })}
                className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 text-white"
              />
              {errors.confirmPassword && (
                <span className="text-red-500 text-sm">{errors.confirmPassword.message}</span>
              )}
            </div>

            <button className="w-full bg-blue-600 py-2.5 rounded-md font-semibold">
              Sign Up
            </button>
          </form>

          <p className="text-gray-400 text-sm mt-6 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
