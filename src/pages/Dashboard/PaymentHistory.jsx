import React from "react";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const formatDate = (iso) => new Date(iso).toLocaleString();

const convertToBDT = (amount) => {
  const rate = 120; // 1 USD = 120 BDT (তুমি চাইলে dynamic করতে পারো)
  return ((amount / 100) * rate).toFixed(2);
};

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { isPending, data: payments = [] } = useQuery({
    queryKey: ["payments", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
  });

  if (isPending) {
    return "......loading";
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">💳 Payment History..</h2>

      {/* Desktop / Laptop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="table w-full border">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th>#</th>
              <th>Parcel ID</th>
              <th>Amount</th>
              <th>Method</th>
              <th>Transaction ID</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.length > 0 ? (
              payments.map((payment, index) => (
                <tr key={payment._id} className="border-b">
                  <td className="px-3 py-2">{index + 1}</td>
                  <td className="px-3 py-2">{payment.parcelId}</td>
                  <td className="px-3 py-2">
                    {convertToBDT(payment.amount)} BDT
                  </td>
                  <td className="px-3 py-2">{payment.paymentMethod}</td>
                  <td className="px-3 py-2">{payment.transactionId}</td>
                  <td className="px-3 py-2">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        payment.status === "succeeded"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-3 py-2">
                    {formatDate(payment.paid_at_string || payment.paid_at)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  No payments found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {payments.length > 0 ? (
          payments.map((payment, index) => (
            <div
              key={payment._id}
              className="border rounded-lg p-4 shadow-sm bg-white"
            >
              <p className="font-semibold text-gray-800">
                #{index + 1} - Parcel: {payment.parcelId}
              </p>
              <p>
                <span className="font-medium">💰 Amount:</span>{" "}
                {convertToBDT(payment.amount)} BDT
              </p>
              <p>
                <span className="font-medium">📦 Method:</span>{" "}
                {payment.paymentMethod}
              </p>
              <p>
                <span className="font-medium">🔑 Transaction:</span>{" "}
                {payment.transactionId}
              </p>
              <p>
                <span className="font-medium">📅 Date:</span>{" "}
                {formatDate(payment.paid_at_string || payment.paid_at)}
              </p>
              <p>
                <span className="font-medium">✅ Status:</span>{" "}
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    payment.status === "succeeded"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {payment.status}
                </span>
              </p>
            </div>
          ))
        ) : (
          <p className="text-center py-4">No payments found</p>
        )}
      </div>
    </div>
  );
};

export default PaymentHistory;
