import React from "react";
import {
  FaBoxes,
  FaGlobeAsia,
  FaMoneyBillWave,
  FaShippingFast,
  FaUndo,
  FaWarehouse,
} from "react-icons/fa";
import ServiceCard from "./ServiceCard";

const Service = () => {
  const cards = [
    {
      icon: <FaShippingFast size={40} className="text-indigo-500" />,
      title: "Express & Standard Delivery",
      description:
        "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
    },
    {
      icon: <FaGlobeAsia size={40} className="text-indigo-500" />,
      title: "Nationwide Delivery",
      description:
        "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
    },
    {
      icon: <FaBoxes size={40} className="text-indigo-500" />,
      title: "Fulfillment Solution",
      description:
        "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
    },
    {
      icon: <FaMoneyBillWave size={40} className="text-indigo-500" />,
      title: "Cash on Home Delivery",
      description:
        "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
    },
    {
      icon: <FaWarehouse size={40} className="text-indigo-500" />,
      title: "Corporate Service / Contract In Logistics",
      description:
        "Customized corporate services which includes warehouse and inventory management support.",
    },
    {
      icon: <FaUndo size={40} className="text-indigo-500" />,
      title: "Parcel Return",
      description:
        "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
    },
  ];

  return (
    <section className="py-10 bg-gray-100">
      <div className="text-center max-w-3xl mx-auto px-4 py-8">
        <h3 className="text-3xl font-bold text-indigo-600 mb-4">
          Our Services
        </h3>
        <p className="text-gray-700 text-base leading-relaxed">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>
      </div>
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {cards.map((card, id) => (
            <ServiceCard key={id} card={card}></ServiceCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Service;
