import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const PendingRiders = () => {
  const [riders, setRiders] = useState([]);
  const [selectedRider, setSelectedRider] = useState(null);

  // Load pending riders
  useEffect(() => {
    axios
      .get("http://localhost:5000/riders/pending")
      .then((res) => setRiders(res.data))
      .catch((err) => console.error("Error loading pending riders:", err));
  }, []);

  // Handle approve/cancel
  const handleAction = (id, action) => {
    Swal.fire({
      title: `Are you sure?`,
      text: `Do you want to ${action} this rider application?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: `Yes, ${action}`,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .patch(`http://localhost:5000/riders/${id}/status`, {
            status: action == "approve" ? "active" : "rejected",
          })
          .then(() => {
            Swal.fire(
              "Success!",
              `Rider application has been ${action}.`,
              "success"
            );
            setRiders((prev) => prev.filter((rider) => rider._id !== id));
            setSelectedRider(null);
          })
          .catch((err) => {
            console.error(err);
            Swal.fire("Error!", "Something went wrong!", "error");
          });
      }
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Pending Riders</h2>

      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {riders.map((rider) => (
              <tr key={rider._id}>
                <td>{rider.name}</td>
                <td>{rider.email}</td>
                <td>{rider.phone}</td>
                <td>{rider.status}</td>
                <td>
                  <button
                    className="btn btn-sm btn-info"
                    onClick={() => setSelectedRider(rider)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
            {riders.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No pending riders
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Rider Details Modal */}
      {selectedRider && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
            <h3 className="text-xl font-bold mb-4">Rider Details</h3>
            <p>
              <strong>Name:</strong> {selectedRider.name}
            </p>
            <p>
              <strong>Email:</strong> {selectedRider.email}
            </p>
            <p>
              <strong>Phone:</strong> {selectedRider.phone}
            </p>
            <p>
              <strong>Age:</strong> {selectedRider.age}
            </p>
            <p>
              <strong>NID:</strong> {selectedRider.nid}
            </p>
            <p>
              <strong>Bike Brand:</strong> {selectedRider.bikeBrand}
            </p>
            <p>
              <strong>Bike Reg:</strong> {selectedRider.bikeRegNumber}
            </p>
            <p>
              <strong>Region:</strong> {selectedRider.region}
            </p>
            <p>
              <strong>District:</strong> {selectedRider.district}
            </p>

            <div className="flex justify-between mt-4">
              <button
                className="btn btn-success"
                onClick={() => handleAction(selectedRider._id, "active")}
              >
                Accept
              </button>
              <button
                className="btn btn-error"
                onClick={() => handleAction(selectedRider._id, "cancelled")}
              >
                Cancel
              </button>
              <button className="btn" onClick={() => setSelectedRider(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingRiders;
