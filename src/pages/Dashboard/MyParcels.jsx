import React from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaEye, FaTrash, FaDollarSign } from "react-icons/fa";
import { useNavigate } from "react-router";

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ["my-parcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?created_by=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // ✅ Delete handler
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This parcel will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/parcels/${id}`);
          Swal.fire("Deleted!", "Your parcel has been deleted.", "success");
          queryClient.invalidateQueries(["my-parcels", user?.email]); // Refresh list
        } catch (err) {
          console.error(err);
          Swal.fire("Error!", "Failed to delete parcel.", "error");
        }
      }
    });
  };

  // handlePayment
  const handlePay = (id) => {
    console.log("proces to payment", id);

    navigate(`/dashboard/payment/${id}`);
  };
  if (isLoading) return <p className="text-center py-10">Loading parcels...</p>;

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <h2 className="text-3xl font-bold text-center mb-8">
        My Parcels <span className="text-blue-600">({parcels.length})</span>
      </h2>

      {parcels.length === 0 ? (
        <p className="text-center text-gray-600">No parcels found.</p>
      ) : (
        <>
          {/* ✅ Desktop Table */}
          <div className="hidden md:block overflow-x-auto shadow rounded-lg">
            <table className="table w-full text-center">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Type</th>
                  <th>Created At</th>
                  <th>Status</th>
                  <th>Cost</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {parcels.map((parcel, index) => (
                  <tr key={parcel._id} className="hover:bg-gray-100 transition">
                    <td>{index + 1}</td>
                    <td className="font-medium">{parcel.title || "N/A"}</td>
                    <td>
                      {parcel.type === "document" ? "📄 Document" : "📦 Parcel"}
                    </td>
                    <td>
                      {new Date(parcel.creation_data).toLocaleString("en-GB", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </td>
                    <td>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          parcel.payment_status === "paid"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {parcel.payment_status === "paid" ? "Paid" : "Unpaid"}
                      </span>
                    </td>
                    <td className="font-semibold">{parcel.cost}৳</td>
                    <td className="flex justify-center gap-2">
                      <button className="btn btn-sm btn-outline btn-info flex items-center gap-1">
                        <FaEye /> View
                      </button>
                      {parcel.payment_status !== "paid" && (
                        <button
                          onClick={() => handlePay(parcel._id)}
                          className="btn btn-sm btn-outline btn-success flex items-center gap-1"
                        >
                          <FaDollarSign /> Pay
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(parcel._id)}
                        className="btn btn-sm btn-outline btn-error flex items-center gap-1"
                      >
                        <FaTrash /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ✅ Mobile Card */}
          <div className="grid gap-4 md:hidden justify-center">
            {parcels.map((parcel, index) => (
              <div
                key={parcel._id}
                className="border w-80 rounded-xl p-5 shadow-md bg-white"
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold text-lg">
                    {index + 1}. {parcel.title || "Untitled"}
                  </h3>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      parcel.payments_status === "paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {parcel.payments_status === "paid" ? "Paid" : "Unpaid"}
                  </span>
                </div>

                <p className="text-sm text-gray-600 mb-1">
                  <strong>Type:</strong>{" "}
                  {parcel.type === "document" ? "📄 Document" : "📦 Parcel"}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Created:</strong>{" "}
                  {new Date(parcel.creation_data).toLocaleString("en-GB", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Cost:</strong> {parcel.cost}৳
                </p>

                <div className="flex flex-wrap gap-2 mt-2">
                  <button className="btn btn-xs btn-outline btn-info flex items-center gap-1">
                    <FaEye /> View
                  </button>
                  {parcel.payments_status !== "paid" && (
                    <button className="btn btn-xs btn-outline btn-success flex items-center gap-1">
                      <FaDollarSign /> Pay
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(parcel._id)}
                    className="btn btn-xs btn-outline btn-error flex items-center gap-1"
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MyParcels;
