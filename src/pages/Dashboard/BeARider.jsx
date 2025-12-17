import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import serviceCenters from "../../assets/New folder/data/warehouses.json"; // JSON data
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const BeARider = () => {
  const { user } = useAuth(); // { displayName, email }
  const { register, handleSubmit, reset } = useForm();

  const [regions, setRegions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");
  const axiosSecure = useAxiosSecure();

  // Extract unique regions
  useEffect(() => {
    const uniqueRegions = [...new Set(serviceCenters.map((sc) => sc.region))];
    setRegions(uniqueRegions);
  }, []);

  // Filter unique districts based on selected region
  useEffect(() => {
    if (selectedRegion) {
      const filteredDistricts = [
        ...new Set(
          serviceCenters
            .filter((sc) => sc.region === selectedRegion)
            .map((sc) => sc.district)
        ),
      ];
      setDistricts(filteredDistricts);
    } else {
      setDistricts([]);
    }
  }, [selectedRegion]);

  const onSubmit = (data) => {
    // Prepend +880 to phone
    const fullPhone = "+880" + data.phone;

    const riderData = {
      ...data,
      phone: fullPhone,
      status: "pending",
    };

    console.log("Rider Application Submitted:", riderData);

    axiosSecure.post("/riders", riderData).then((res) => {
      if (res.data.insertedId) {
        // Show SweetAlert success message
        Swal.fire({
          icon: "success",
          title: "Application Submitted",
          text: "Your rider application has been successfully submitted!",
          confirmButtonText: "OK",
        });
      }
    });

    reset(); // reset the form after submission
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 border rounded shadow-lg bg-white">
      <h2 className="text-2xl font-bold mb-6 text-center">Be a Rider</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* --- Personal Info --- */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Personal Info</h3>

          <div>
            <label className="block mb-1">Name</label>
            <input
              {...register("name", { required: true })}
              defaultValue={user?.displayName || ""}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div>
            <label className="block mb-1">Email</label>
            <input
              {...register("email", { required: true })}
              value={user?.email || ""}
              readOnly
              className="w-full border px-3 py-2 rounded bg-gray-100"
            />
          </div>

          <div>
            <label className="block mb-1">Age</label>
            <input
              type="number"
              {...register("age", { required: true })}
              className="w-full border px-3 py-2 rounded"
              placeholder="Enter your age"
            />
          </div>

          <div>
            <label className="block mb-1">Phone Number</label>
            <input
              type="tel"
              {...register("phone", { required: true })}
              className="w-full border px-3 py-2 rounded"
              placeholder="Enter your phone number"
            />
          </div>

          <div>
            <label className="block mb-1">National ID Number</label>
            <input
              type="text"
              {...register("nid", { required: true })}
              className="w-full border px-3 py-2 rounded"
              placeholder="Enter your NID number"
            />
          </div>
        </div>

        {/* --- Bike Info --- */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Bike Info</h3>

          <div>
            <label className="block mb-1">Bike Brand</label>
            <input
              type="text"
              {...register("bikeBrand", { required: true })}
              className="w-full border px-3 py-2 rounded"
              placeholder="Enter your bike brand"
            />
          </div>

          <div>
            <label className="block mb-1">Bike Registration Number</label>
            <input
              type="text"
              {...register("bikeRegNumber", { required: true })}
              className="w-full border px-3 py-2 rounded"
              placeholder="Enter bike registration number"
            />
          </div>
        </div>

        {/* --- Location --- */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Location</h3>

          <div>
            <label className="block mb-1">Region</label>
            <select
              {...register("region", { required: true })}
              className="w-full border px-3 py-2 rounded"
              onChange={(e) => setSelectedRegion(e.target.value)}
              defaultValue=""
            >
              <option value="">Select Region</option>
              {regions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1">District</label>
            <select
              {...register("district", { required: true })}
              className="w-full border px-3 py-2 rounded"
              disabled={!selectedRegion}
              defaultValue=""
            >
              <option value="">Select District</option>
              {districts.map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* --- Submit Button --- */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 mt-4"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default BeARider;
