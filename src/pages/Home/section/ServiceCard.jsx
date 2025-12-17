import React from "react";

const ServiceCard = ({ card }) => {
  const { title, description, icon } = card;
  return (
    <div>
      <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center text-center hover:shadow-xl transition-shadow  duration-300">
        {icon}
        <h3 className="text-lg font-semibold mt-4 text-gray-800">{title}</h3>
        <p className="text-gray-600 mt-2">{description}</p>
      </div>
    </div>
  );
};

export default ServiceCard;
