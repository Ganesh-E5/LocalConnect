import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import { apiFetch } from "../api"; // ✅ use apiFetch

const RaiseRequest = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  const [categories, setCategories] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("");
  const [services, setServices] = useState([]);

  // ✅ Fetch service categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await apiFetch("/api/service-categories");

        const formatted = {};
        data.forEach((category) => {
          formatted[category.name] = category.skills;
        });

        setCategories(formatted);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);

    const serviceList = categories[category];
    setServices(serviceList || []);

    setValue("serviceType", "");
  };

  // ✅ Submit service request
  const onSubmit = async (data) => {
    const token = sessionStorage.getItem("token");

    try {
      await apiFetch("/api/request", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          serviceType: data.serviceType,
          description: data.description,
          location: data.location,
        }),
      });

      reset();
      setSelectedCategory("");
      setServices([]);
      alert("Service request submitted successfully!");
    } catch (err) {
      console.error("Error submitting request:", err);
      alert(err.message || "Failed to submit request");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold mb-6">
        Raise a Service Request
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-800 p-6 rounded-lg shadow-md space-y-4"
      >
        {/* Category */}
        <div>
          <label className="block text-gray-300 mb-1">
            Service Category
          </label>
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="w-full px-4 py-2 rounded bg-gray-700 text-white"
          >
            <option value="">Select Category</option>
            {Object.keys(categories).map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Services */}
        {services.length > 0 && (
          <div>
            <label className="block text-gray-300 mb-2">
              Select a Service
            </label>
            <div className="grid grid-cols-2 gap-2">
              {services.map((service) => (
                <label
                  key={service}
                  className="flex items-center space-x-2 bg-gray-700 text-white px-3 py-2 rounded cursor-pointer"
                >
                  <input
                    type="radio"
                    value={service}
                    {...register("serviceType", {
                      required: "Please select a service",
                    })}
                    className="form-radio text-blue-500"
                  />
                  <span className="capitalize">{service}</span>
                </label>
              ))}
            </div>
            {errors.serviceType && (
              <span className="text-red-500 text-sm">
                {errors.serviceType.message}
              </span>
            )}
          </div>
        )}

        {/* Description */}
        <div>
          <label className="block text-gray-300 mb-1">
            Description
          </label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            rows={4}
            placeholder="Describe your service requirements"
            className="w-full px-4 py-2 rounded bg-gray-700 text-white resize-none"
          />
          {errors.description && (
            <span className="text-red-500 text-sm">
              {errors.description.message}
            </span>
          )}
        </div>

        {/* Location */}
        <div>
          <label className="block text-gray-300 mb-1">
            Location
          </label>
          <input
            type="text"
            {...register("location", {
              required: "Location is required",
            })}
            placeholder="Enter location"
            className="w-full px-4 py-2 rounded bg-gray-700 text-white"
          />
          {errors.location && (
            <span className="text-red-500 text-sm">
              {errors.location.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-500 px-6 py-2 rounded hover:bg-blue-600 text-white font-semibold mt-4"
        >
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default RaiseRequest;
