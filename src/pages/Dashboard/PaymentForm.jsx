import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { parcelId } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [success, setSuccess] = useState("");

  const [error, setError] = useState("");

  const { isPending, data: parcelInfo = {} } = useQuery({
    queryKey: ["parcels", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      return res.data;
    },
  });

  if (isPending) {
    return "....loading";
  }
  console.log(parcelInfo);
  const amount = parcelInfo.cost;
  console.log(amount);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      return;
    }

    //step-1 validate the card
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      setError(error.message);
    } else {
      setError("");
      console.log("payment method", paymentMethod);

      //step-2  crate payment intent
      const res = await axiosSecure.post("/create-payment-intent", {
        amount: amount,
        parcelId,
      });
      console.log("res from intent", res);

      // step-3 Confirm card payment
      const clientSecret = res.data.clientSecret;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: user.displayName,
            email: user.email,
          },
        },
      });

      if (result.error) {
        setError(result.error.message);
        setSuccess("");
      } else {
        setError("");
        if (result.paymentIntent.status === "succeeded") {
          setSuccess("✅ Payment successful!");
          setError("");
          const transactionId = result.paymentIntent.id;
          // step-4 mark parcel paid also create payment history
          const paymentData = {
            parcelId,
            email: user.email,
            amount,
            paymentMethod: transactionId,
            transactionId: result.paymentIntent.payment_method_types,
          };
          const paymentRes = await axiosSecure.post("/payments", paymentData);
          if (paymentRes.data.insertedId) {
            await Swal.fire({
              icon: "success",
              title: "Payment Successful!",
              html: `<strong>Transaction ID:</strong> <code>${transactionId}</code>`,
              confirmButtonText: "Go to My Parcels",
            });

            // Redirect to /myParcels
            navigate("/dashboard/myParcels");
          }
        }
      }
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded-2xl shadow-md w-full max-w-md mx-auto"
      >
        <CardElement className="p-2 border rounded-2xl"></CardElement>
        <button
          className="btn btn-primary w-full text-black"
          type="submit"
          disabled={!stripe}
        >
          Pay tk {amount}
        </button>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500 mt-2">{success}</p>}
      </form>
    </div>
  );
};

export default PaymentForm;
