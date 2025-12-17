import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";

const ActiveRiders = () => {
  const [search, setSearch] = useState("");
  const queryClient = useQueryClient();

  // Fetch active riders
  const {
    data: riders = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["activeRiders"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/riders/active");
      return res.data;
    },
  });

  // Mutation for deactivating rider
  const deactivateMutation = useMutation({
    mutationFn: async (id) => {
      return axios.patch(`http://localhost:5000/riders/${id}/status`, {
        status: "inactive",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["activeRiders"]); // refetch after success
      Swal.fire("Success!", "Rider has been deactivated.", "success");
    },
    onError: () => {
      Swal.fire("Error!", "Something went wrong!", "error");
    },
  });

  // Handle deactivate
  const handleDeactivate = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to deactivate this rider?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, deactivate",
    }).then((result) => {
      if (result.isConfirmed) {
        deactivateMutation.mutate(id);
      }
    });
  };

  // Filter riders by search
  const filteredRiders = riders.filter((rider) =>
    rider.name.toLowerCase().includes(search.toLowerCase())
  );

  if (isLoading) return <p className="p-4">Loading active riders...</p>;
  if (isError) return <p className="p-4 text-red-500">Failed to load riders</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Active Riders</h2>

      {/* Search box */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name..."
          className="border px-3 py-2 rounded w-64"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Riders Table */}
      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Region</th>
              <th>District</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredRiders.map((rider) => (
              <tr key={rider._id}>
                <td>{rider.name}</td>
                <td>{rider.email}</td>
                <td>{rider.phone}</td>
                <td>{rider.region}</td>
                <td>{rider.district}</td>
                <td>
                  <span
                    className={`px-2 py-1 rounded text-white text-sm ${
                      rider.status === "active"
                        ? "bg-green-500"
                        : rider.status === "inactive"
                        ? "bg-red-500"
                        : "bg-gray-400"
                    }`}
                  >
                    {rider.status}
                  </span>
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-error"
                    onClick={() => handleDeactivate(rider._id)}
                    disabled={deactivateMutation.isLoading}
                  >
                    {deactivateMutation.isLoading
                      ? "Processing..."
                      : "Deactivate"}
                  </button>
                </td>
              </tr>
            ))}
            {filteredRiders.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  No active riders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActiveRiders;
