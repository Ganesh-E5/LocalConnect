import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { apiFetch } from "../api";

const Settings = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  const newPassword = watch("newPassword");

  useEffect(() => {
    const fetchUser = async () => {
      const token = sessionStorage.getItem("token");
      if (!token) return;

      try {
        const data = await apiFetch("/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        reset({ email: data.email });
      } catch (err) {
        console.error("Error fetching user:", err);
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
    if (!token) {
      setMessage("Not authenticated");
      setIsSubmitting(false);
      return;
    }

    try {
      if (data.currentPassword && data.newPassword) {
        await apiFetch("/api/users/change-password", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            currentPassword: data.currentPassword,
            newPassword: data.newPassword,
          }),
        });
      }

      setMessage("Password updated successfully");
      setIsSuccess(true);
      reset((values) => ({
        email: values.email,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error("Settings update error:", error);
      setMessage(`Error: ${error.message || "Failed to update password"}`);
      setIsSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <p className="text-center p-6">Loading...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold">Settings</h1>

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
        className="bg-gray-800 p-6 rounded-lg shadow-md space-y-6"
      >
        <h2 className="text-xl font-semibold mb-4">Profile</h2>

        <div>
          <label className="block text-gray-300 mb-1">Email</label>
          <input
            type="email"
            {...register("email")}
            className="w-full px-4 py-2 rounded bg-gray-700 text-gray-400 cursor-not-allowed"
            readOnly
          />
        </div>

        <h2 className="text-xl font-semibold mt-6 mb-4">
          Change Password
        </h2>

        <div>
          <label className="block text-gray-300 mb-1">
            Current Password
          </label>
          <input
            type="password"
            {...register("currentPassword", {
              required: "Current password is required",
            })}
            className="w-full px-4 py-2 rounded bg-gray-700 text-white"
          />
          {errors.currentPassword && (
            <span className="text-red-500 text-sm">
              {errors.currentPassword.message}
            </span>
          )}
        </div>

        <div>
          <label className="block text-gray-300 mb-1">
            New Password
          </label>
          <input
            type="password"
            {...register("newPassword", {
              required: "New password is required",
              minLength: {
                value: 6,
                message: "Minimum 6 characters",
              },
            })}
            className="w-full px-4 py-2 rounded bg-gray-700 text-white"
          />
          {errors.newPassword && (
            <span className="text-red-500 text-sm">
              {errors.newPassword.message}
            </span>
          )}
        </div>

        <div>
          <label className="block text-gray-300 mb-1">
            Confirm New Password
          </label>
          <input
            type="password"
            {...register("confirmPassword", {
              validate: (value) =>
                value === newPassword || "Passwords do not match",
            })}
            className="w-full px-4 py-2 rounded bg-gray-700 text-white"
          />
          {errors.confirmPassword && (
            <span className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-500 px-6 py-2 rounded hover:bg-blue-600 text-white font-semibold mt-4 disabled:bg-gray-600"
        >
          {isSubmitting ? "Saving..." : "Save Settings"}
        </button>
      </form>
    </div>
  );
};

export default Settings;
