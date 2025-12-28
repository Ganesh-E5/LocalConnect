import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ServicesSection from "./ServicesSection";
import { apiFetch } from "../api";

const MyProfile = () => {
  const [selectedServices, setSelectedServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phno: "",
      location: "",
    },
  });

  useEffect(() => {
    const fetchUser = async () => {
      const token = sessionStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const data = await apiFetch("/api/users/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        reset({
          name: data.name || "",
          email: data.email || "",
          phno: data.phno || "",
          location: data.location || "",
        });

        setSelectedServices(data.skills || []);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [reset]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setMessage("");
    setIsSuccess(false);
    const token = sessionStorage.getItem("token");

    try {
      await apiFetch("/api/users/me", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: data.name,
          phno: data.phno,
          location: data.location,
          services: selectedServices,
        }),
      });

      setMessage("Success! Profile updated successfully.");
      setIsSuccess(true);
    } catch (error) {
      setMessage(`Failed: ${error.message || "Server error"}`);
      setIsSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div className="p-6 text-center text-xl">Loading Profile...</div>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold">My Profile</h1>

      {message && (
        <div
          className={`p-3 rounded-md font-medium ${
            isSuccess
              ? "bg-green-800 text-green-100"
              : "bg-red-800 text-red-100"
          }`}
        >
          {message}
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-800 p-6 rounded-lg shadow-md space-y-4"
      >
        <div>
          <label className="block text-gray-300 mb-1">Full Name</label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            className="w-full px-4 py-2 rounded bg-gray-700 text-white"
          />
          {errors.name && (
            <span className="text-red-500 text-sm">
              {errors.name.message}
            </span>
          )}
        </div>

        <div>
          <label className="block text-gray-300 mb-1">Email</label>
          <input
            type="email"
            {...register("email")}
            className="w-full px-4 py-2 rounded bg-gray-700 text-gray-400 cursor-not-allowed"
            readOnly
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-1">Phone Number</label>
          <input
            type="text"
            {...register("phno", { required: "Phone number is required" })}
            className="w-full px-4 py-2 rounded bg-gray-700 text-white"
          />
          {errors.phno && (
            <span className="text-red-500 text-sm">
              {errors.phno.message}
            </span>
          )}
        </div>

        <div>
          <label className="block text-gray-300 mb-1">
            Location (e.g., City)
          </label>
          <input
            type="text"
            {...register("location")}
            className="w-full px-4 py-2 rounded bg-gray-700 text-white"
            placeholder="e.g., San Francisco, CA"
          />
        </div>

        <ServicesSection
          selectedServices={selectedServices}
          setSelectedServices={setSelectedServices}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-500 py-2 rounded hover:bg-blue-600 text-white font-semibold mt-2 disabled:bg-gray-600 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default MyProfile;
