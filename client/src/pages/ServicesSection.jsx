import React, { useState, useEffect } from "react";
import { apiFetch } from "../api";

const ServicesSection = ({ selectedServices, setSelectedServices }) => {
  const [serviceCategories, setServiceCategories] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await apiFetch("/api/service-categories");
        const formatted = {};
        data.forEach((cat) => {
          formatted[cat.name] = cat.skills;
        });
        setServiceCategories(formatted);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };

    fetchCategories();
  }, []);

  const toggleService = (service) => {
    if (selectedServices.includes(service)) {
      setSelectedServices(selectedServices.filter((s) => s !== service));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-gray-300 mb-1">Service Category</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
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
        <div>
          <label className="block text-gray-300 mb-2">Select Services</label>
          <div className="grid grid-cols-2 gap-2">
            {serviceCategories[selectedCategory].map((service) => (
              <label
                key={service}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md cursor-pointer text-sm ${
                  selectedServices.includes(service)
                    ? "bg-blue-600 text-white"
                    : "bg-gray-700 text-gray-200"
                }`}
              >
                <input
                  type="checkbox"
                  value={service}
                  checked={selectedServices.includes(service)}
                  onChange={() => toggleService(service)}
                  className="form-checkbox h-4 w-4 text-blue-500"
                />
                <span className="capitalize">{service}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {selectedServices.length > 0 && (
        <div className="mt-3">
          <label className="block text-gray-300 mb-1">
            Selected Services:
          </label>
          <div className="flex flex-wrap gap-2">
            {selectedServices.map((service) => (
              <span
                key={service}
                className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm"
              >
                {service}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicesSection;
