import React, { useEffect, useState } from "react";
import { apiFetch } from "../api";

const AcceptRequest = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    const fetchRequests = async () => {
      if (!token) return;
      try {
        const data = await apiFetch("/api/request", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRequests(data.requests || []);
      } catch (error) {
        console.error("Error fetching service requests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const acceptRequest = async (requestId) => {
    const token = sessionStorage.getItem("token");
    if (!token) return;

    if (!confirm("Do you want to accept this service request?")) return;

    try {
      await apiFetch(`/api/request/${requestId}/accept`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setRequests((prev) => prev.filter((r) => r._id !== requestId));
      alert("Service request accepted successfully!");
    } catch (error) {
      console.error("Accept request error:", error);
      alert(error.message || "An error occurred while accepting the service request.");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 border-b border-gray-700 pb-2">
        Available Service Requests
      </h1>

      {loading ? (
        <p>Loading...</p>
      ) : requests.length === 0 ? (
        <p>No service requests available at the moment.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {requests.map((req) => {
            const eventDate = new Date(req.createdAt);
            const formattedDate = eventDate.toLocaleDateString(undefined, {
              weekday: "short",
              year: "numeric",
              month: "short",
              day: "numeric",
            });
            const formattedTime = eventDate.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            });

            return (
              <div
                key={req._id}
                className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700"
              >
                <div className="flex justify-between mb-4">
                  <div>
                    <h2 className="font-bold text-lg">Requested On</h2>
                    <p className="text-gray-400">{formattedDate}</p>
                    <p className="text-gray-400">{formattedTime}</p>
                  </div>

                  <div>
                    <h2 className="font-bold text-lg">Service Location</h2>
                    <p className="text-gray-400">{req.location}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <h2 className="font-bold text-lg">Service Details</h2>
                  <p className="text-gray-300">{req.description}</p>
                </div>
                <div className="mb-4">
                  <h2 className="font-bold text-lg">Requested By</h2>
                  <p className="text-gray-400">
                    {req.requesteduser?.name || "Unknown Client"}
                  </p>
                </div>

                <div className="text-right">
                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded font-semibold"
                    onClick={() => acceptRequest(req._id)}
                  >
                    Accept Service Request
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AcceptRequest;
