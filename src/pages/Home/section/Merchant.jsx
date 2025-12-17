import React from "react";
import location from "../../../assets/location-merchant.png";

const Merchant = () => {
  return (
    <div className="px-4 md:px-20 py-10 md:py-20">
      <div
        data-aos="flip-left"
        data-aos-easing="ease-out-cubic"
        data-aos-duration="2000"
        className="flex  bg-[url('assets/be-a-merchant-bg.png')] bg-no-repeat flex-col-reverse lg:flex-row items-center gap-10 bg-[#03373D] rounded-2xl p-6 md:p-10"
      >
        {/* Text Section */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <h1 className="text-3xl md:text-5xl text-white font-bold leading-snug">
            Merchant and Customer Satisfaction is Our First Priority
          </h1>
          <p className="py-6 text-gray-300 text-base md:text-lg">
            We offer the lowest delivery charge with the highest value along
            with 100% safety of your product. Pathao courier delivers your
            parcels in every corner of Bangladesh right on time.
          </p>
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3">
            <button className="btn btn-primary text-black rounded-full px-6 py-2">
              Become a Merchant
            </button>
            <button className="btn border border-primary text-primary bg-[#03373D] rounded-full px-6 py-2">
              Learn More
            </button>
          </div>
        </div>

        {/* Image Section */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <img
            src={location}
            alt="Merchant Location"
            className="w-64 md:w-80 lg:w-[400px] rounded-xl shadow-2xl object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Merchant;
