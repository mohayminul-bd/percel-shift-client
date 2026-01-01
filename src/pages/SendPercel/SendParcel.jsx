import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid";

import useAuth from "../../hooks/useAuth"; // 🔥 আপনার auth hook

import dristic from "../../assets/New folder/data/warehouses.json"; // warehouses/service centers
import division from "../../assets/New folder/data/division.json"; // region list
import useAxiosSecure from "../../hooks/useAxiosSecure";

const SendParcel = () => {
  const { user } = useAuth(); // logged-in user
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  // use axiosSecure
  const axiosSecure = useAxiosSecure();

  const parcelType = watch("type");
  const senderRegion = watch("senderRegion");
  const receiverRegion = watch("receiverRegion");

  // delivery cost calculation
  const calculateCost = (data) => {
    const isSameCity = data.senderServiceCenter === data.receiverServiceCenter;
    const weight = parseFloat(data.weight) || 0;
    let baseCost = 0;
    let breakdown = "";

    if (data.type === "document") {
      baseCost = isSameCity ? 60 : 80;
      breakdown = `Document: ৳${baseCost}`;
    }

    if (data.type === "non-document") {
      if (weight <= 3) {
        baseCost = isSameCity ? 110 : 150;
        breakdown = `Up to 3kg: ৳${baseCost}`;
      } else {
        const extraKg = Math.ceil(weight - 3);
        baseCost = isSameCity ? 110 + extraKg * 40 : 150 + extraKg * 40 + 40;
        breakdown = `Base (3kg): ৳${
          isSameCity ? 110 : 150
        } + Extra ${extraKg}kg × ৳40`;
      }
    }

    return { cost: baseCost, breakdown };
  };

  const onSubmit = (data) => {
    const { cost, breakdown } = calculateCost(data);

    Swal.fire({
      title: "Delivery Cost",
      html: `
        <p class="text-gray-700 mb-2">Parcel Type: <b>${data.type}</b></p>
        <p class="text-gray-700 mb-2">Weight: <b>${
          data.weight || "-"
        } kg</b></p>
        <p class="text-gray-700 mb-2">Breakdown: <b>${breakdown}</b></p>
        <h3 class="text-lg font-semibold mt-2">Total: ৳${cost}</h3>
      `,
      showCancelButton: true,
      confirmButtonText: "Confirm",
      cancelButtonText: "Edit",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        const parcelData = {
          ...data,
          cost,
          trackingId: uuidv4(), // unique tracking id
          delivery_status: "not-collected", // default status
          payments_status: "unpaid",
          created_by: user?.email || "guest",
          creation_data: new Date().toISOString(),
        };

        console.log("✅ Saved Parcel:", parcelData);
        // 👉 এখানে axios.post("/api/parcels", parcelData) করতে পারবেন DB তে পাঠানোর জন্য

        // axios data post
        axiosSecure.post("/parcels", parcelData).then((res) => {
          console.log(res.data);
          if (res.data.insertedId) {
            Swal.fire({
              icon: "success",
              title: "Confirmed!",
              text: "Your parcel has been submitted successfully.",
              timer: 2000,
              showConfirmButton: false,
            });
          }
        });

        reset();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          icon: "info",
          title: "Edit Mode",
          text: "You can edit your parcel details again.",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  // get service centers filtered by selected region
  const getServiceCenters = (region) => {
    if (!region) return [];
    return dristic.filter((d) => d.region === region);
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-2 text-center">Send Parcel</h1>
      <p className="text-gray-600 text-center mb-8">
        Door-to-door delivery made simple. Please fill out the form below.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
        {/* Parcel Info */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold border-b pb-2">Parcel Info</h2>

          <div>
            <label className="label">Type</label>
            <select
              {...register("type", { required: true })}
              className="select select-bordered w-full"
            >
              <option value="">Select Type</option>
              <option value="document">Document</option>
              <option value="non-document">Non-Document</option>
            </select>
            {errors.type && (
              <span className="text-red-500 text-sm">Type is required</span>
            )}
          </div>

          <div>
            <label className="label">Title</label>
            <input
              type="text"
              {...register("title", { required: true })}
              className="input input-bordered w-full"
            />
            {errors.title && (
              <span className="text-red-500 text-sm">Title is required</span>
            )}
          </div>

          {parcelType === "non-document" && (
            <div>
              <label className="label">Weight (kg)</label>
              <input
                type="number"
                step="0.1"
                {...register("weight")}
                className="input input-bordered w-full"
              />
            </div>
          )}
        </div>

        {/* Sender + Receiver */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Sender Info */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold border-b pb-2">Sender Info</h2>
            <input
              type="text"
              {...register("senderName", { required: true })}
              placeholder="Name"
              className="input input-bordered w-full"
            />
            <input
              type="text"
              {...register("senderContact", { required: true })}
              placeholder="Contact"
              className="input input-bordered w-full"
            />

            {/* Division */}
            <select
              {...register("senderRegion", { required: true })}
              className="select select-bordered w-full"
            >
              <option value="">Select Region</option>
              {division.map((div) => (
                <option key={div} value={div}>
                  {div}
                </option>
              ))}
            </select>

            {/* Service Centers */}
            <select
              {...register("senderServiceCenter", { required: true })}
              className="select select-bordered w-full"
            >
              <option value="">Select Service Center</option>
              {getServiceCenters(senderRegion).map((center) => (
                <option key={center.district} value={center.district}>
                  {center.district}
                </option>
              ))}
            </select>

            <input
              type="text"
              {...register("senderAddress", { required: true })}
              placeholder="Address"
              className="input input-bordered w-full"
            />
            <input
              type="text"
              {...register("pickupInstruction", { required: true })}
              placeholder="Pickup Instruction"
              className="input input-bordered w-full"
            />
          </div>

          {/* Receiver Info */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold border-b pb-2">
              Receiver Info
            </h2>
            <input
              type="text"
              {...register("receiverName", { required: true })}
              placeholder="Name"
              className="input input-bordered w-full"
            />
            <input
              type="text"
              {...register("receiverContact", { required: true })}
              placeholder="Contact"
              className="input input-bordered w-full"
            />

            {/* Division */}
            <select
              {...register("receiverRegion", { required: true })}
              className="select select-bordered w-full"
            >
              <option value="">Select Region</option>
              {division.map((div) => (
                <option key={div} value={div}>
                  {div}
                </option>
              ))}
            </select>

            {/* Service Centers */}
            <select
              {...register("receiverServiceCenter", { required: true })}
              className="select select-bordered w-full"
            >
              <option value="">Select Service Center</option>
              {getServiceCenters(receiverRegion).map((center) => (
                <option key={center.district} value={center.district}>
                  {center.district}
                </option>
              ))}
            </select>

            <input
              type="text"
              {...register("receiverAddress", { required: true })}
              placeholder="Address"
              className="input input-bordered w-full"
            />
            <input
              type="text"
              {...register("deliveryInstruction", { required: true })}
              placeholder="Delivery Instruction"
              className="input input-bordered w-full"
            />
          </div>
        </div>

        <div className="flex justify-center">
          <button type="submit" className="btn btn-primary text-black w-48">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default SendParcel;
