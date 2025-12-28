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

const statusColors = {
  Pending: "border-yellow-600",
  Accepted: "border-green-600",
  Completed: "border-green-600",
  Cancelled: "border-gray-600",
  Rejected: "border-red-600",
};

const badgeColors = {
  Pending: "bg-yellow-600 text-white",
  Accepted: "bg-green-600 text-white",
  Completed: "bg-green-700 text-white",
  Cancelled: "bg-gray-600 text-white",
  Rejected: "bg-red-600 text-white",
};

const MyRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    const token = sessionStorage.getItem("token");
    try {
      const data = await apiFetch("/api/request/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRequests(data.requests || []);
    } catch (err) {
      alert(err.message || "Failed to fetch requests");
      setRequests([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (loading) {
    return (
      <p className="p-6 text-white text-lg">
        Loading your service requests...
      </p>
    );
  }

  const renderCard = (req) => {
    const acceptedUserName =
      req.accepteduser?.name ||
      (typeof req.accepteduser === "string"
        ? req.accepteduser
        : null);

    return (
      <div
        key={req._id}
        className={`bg-gray-800 p-6 rounded-xl shadow-xl flex flex-col border-t-4 ${
          statusColors[req.status]
        } transition duration-300 hover:shadow-2xl hover:bg-gray-700`}
      >
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wider">
              Service Type
            </p>
            <h2
              className={`text-2xl font-bold ${
                req.status === "Completed"
                  ? "text-green-400"
                  : "text-indigo-400"
              }`}
            >
              {req.serviceType}
            </h2>
          </div>
          <span
            className={`px-3 py-1 mt-1 rounded-full text-xs font-bold shadow-md ${
              badgeColors[req.status]
            }`}
          >
            {req.status}
          </span>
        </div>

        <p className="text-gray-300 mb-4 italic line-clamp-3">
          {req.description}
        </p>

        <div className="text-sm text-gray-400 space-y-1 mt-2">
          {req.status === "Pending" && req.createdAt && (
            <p>
              Raised On:{" "}
              <span className="text-white">
                {formatDateTime(req.createdAt)}
              </span>
            </p>
          )}

          {req.status === "Accepted" && req.acceptedAt && (
            <p>
              Accepted On:{" "}
              <span className="text-white">
                {formatDateTime(req.acceptedAt)}
              </span>{" "}
              {acceptedUserName && (
                <>
                  by{" "}
                  <span className="text-indigo-400 font-medium">
                    {acceptedUserName}
                  </span>
                </>
              )}
            </p>
          )}

          {req.status === "Completed" && req.updatedAt && (
            <p>
              Completed On:{" "}
              <span className="text-green-400 font-medium">
                {formatDateTime(req.updatedAt)}
              </span>
            </p>
          )}

          {req.location && (
            <p>
              Location:{" "}
              <span className="text-white">{req.location}</span>
            </p>
          )}
        </div>
      </div>
    );
  };

  const inProgress = requests.filter(
    (req) =>
      req.status !== "Completed" &&
      req.status !== "Cancelled" &&
      req.status !== "Rejected"
  );

  const completed = requests.filter(
    (req) => req.status === "Completed"
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-4xl font-extrabold mb-8 border-b border-gray-700 pb-3 text-white">
        My Service Requests
      </h1>

      <h2 className="text-2xl font-bold mb-5 text-white">
        In-Progress Services
      </h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-10">
        {inProgress.length === 0 && (
          <p className="text-gray-400 col-span-full bg-gray-800 p-4 rounded-lg">
            You have no active service requests right now.
          </p>
        )}
        {inProgress.map(renderCard)}
      </div>

      <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-gray-700 pb-2 text-white">
        Completed Services
      </h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {completed.length === 0 && (
          <p className="text-gray-400 col-span-full bg-gray-800 p-4 rounded-lg">
            No completed service requests yet.
          </p>
        )}
        {completed.map(renderCard)}
      </div>
    </div>
  );
};

export default MyRequests;
