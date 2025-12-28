import React, { useState, useEffect } from "react";
import { apiFetch } from "../api";

const formatDateTime = (isoString) => {
  if (!isoString) return "-";
  return new Date(isoString).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

const AssignedRequests = () => {
  const [assignedRequests, setAssignedRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAssignedRequests = async () => {
    setLoading(true);
    try {
      const data = await apiFetch("/api/request/assigned", {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      });
      setAssignedRequests(data.requests || []);
    } catch (err) {
      console.error("Error fetching assigned service requests:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignedRequests();
  }, []);

  const handleMarkComplete = async (id) => {
    if (!confirm("Mark this service request as completed?")) return;
    try {
      await apiFetch(`/api/request/${id}/complete`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      alert("Service request marked as completed!");
      fetchAssignedRequests();
    } catch (err) {
      console.error("Mark complete error:", err);
      alert("An error occurred while marking the service as completed");
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <p className="text-center text-gray-300">Loading assigned service requests...</p>
      </div>
    );
  }

  const inProgress = assignedRequests.filter(
    (req) => req.status !== "Completed" && req.status !== "Cancelled" && req.status !== "Rejected"
  );
  const completed = assignedRequests.filter((req) => req.status === "Completed");

  return (
    <div className="p-6 text-white max-w-7xl mx-auto">
      <h1 className="text-4xl font-extrabold mb-8 border-b border-gray-700 pb-3">
        My Assigned Service Requests
      </h1>

      <h2 className="text-2xl font-bold mb-5">In-Progress Services</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-10">
        {inProgress.length === 0 && (
          <p className="text-gray-400 col-span-full bg-gray-800 p-4 rounded-lg">
            You have no active service requests right now.
          </p>
        )}
        {inProgress.map((req) => (
          <div
            key={req._id}
            className="bg-gray-800 p-6 rounded-xl shadow-xl flex flex-col justify-between border-t-4 border-yellow-600 transition duration-300 hover:shadow-2xl hover:bg-gray-700"
          >
            <div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider">Service Type</p>
                  <h2 className="text-2xl font-bold text-indigo-400">{req.serviceType}</h2>
                </div>
                <span className="px-3 py-1 mt-1 rounded-full text-xs font-bold bg-yellow-600 text-white shadow-md">
                  {req.status}
                </span>
              </div>

              <p className="text-gray-300 mb-4 italic line-clamp-3">{req.description}</p>

              <h3 className="text-lg font-semibold border-t border-gray-700 pt-3">
                Client: <span className="font-medium text-white">{req.requesteduser?.name || "N/A"}</span>
              </h3>

              <div className="text-sm space-y-1 mt-2 text-gray-400">
                {req.createdAt && <p>Raised On: {formatDateTime(req.createdAt)}</p>}
                {req.acceptedAt && <p>Accepted On: {formatDateTime(req.acceptedAt)}</p>}
                <p>Location: {req.location || "N/A"}</p>
              </div>
            </div>

            <div className="flex justify-center mt-6">
              <button
                onClick={() => handleMarkComplete(req._id)}
                className="w-full bg-green-600 px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition duration-150 shadow-lg"
              >
                Mark as Completed
              </button>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-gray-700 pb-2">Completed Services</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {completed.length === 0 && (
          <p className="text-gray-400 col-span-full bg-gray-800 p-4 rounded-lg">
            No completed service requests yet.
          </p>
        )}
        {completed.map((req) => (
          <div
            key={req._id}
            className="bg-gray-800 p-6 rounded-xl shadow-lg border-t-4 border-green-600 hover:bg-gray-700 transition duration-300"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider">Service Type</p>
                <h2 className="text-2xl font-bold text-green-400">{req.serviceType}</h2>
              </div>
              <span className="px-3 py-1 mt-1 rounded-full text-xs font-bold bg-green-700 text-white shadow-md">
                {req.status}
              </span>
            </div>

            <p className="text-gray-300 mb-4 italic">{req.description}</p>

            <div className="text-sm text-gray-400 space-y-1">
              <p>
                Client: <span className="text-indigo-400">{req.requesteduser?.name || "N/A"}</span>
              </p>
              <p>Location: {req.location || "N/A"}</p>
              {req.completedAt && (
                <p className="text-green-400 font-medium">Completed On: {formatDateTime(req.completedAt)}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssignedRequests;
