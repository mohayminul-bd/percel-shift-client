import React from "react";
import logo1 from "../../../assets/New folder/live-tracking.png";
import logo2 from "../../../assets/New folder/safe-delivery.png";

const ThreeSplitRows = () => {
  return (
    <section className="w-full  py-10 md:px-14 px-4 space-y-6">
      {/* Row 1 */}
      <div data-aos="zoom-in-right">
        <div className="flex bg-white flex-col md:flex-row items-center  p-4  rounded-lg shadow-md">
          {/* Left (30%) */}
          <div className="md:w-1/3 w-full flex justify-center">
            <img
              src={logo1}
              alt="Feature 1"
              className="w-32 h-32 md:w-40 md:h-40 object-contain mx-auto"
            />
          </div>
          {/* Right (70%) */}
          <div className="md:w-2/3 w-full md:pl-6 mt-4 md:mt-0 text-center md:text-left">
            <h3 className="text-xl font-semibold mb-2">Live Parcel Tracking</h3>
            <p className="text-gray-600">
              Stay updated in real-time with our live parcel tracking feature.
              From pick-up to delivery, monitor your shipment's journey and get
              instant status updates for complete peace of mind.
            </p>
          </div>
        </div>
      </div>

      {/* Row 2 */}
      <div data-aos="zoom-out-left">
        <div className="flex bg-white flex-col md:flex-row items-center  p-4 rounded-lg shadow-md">
          <div className="md:w-1/3 w-full flex justify-center">
            <img
              src={logo2}
              alt="Feature 2"
              className="w-32 h-32 md:w-40 md:h-40 object-contain mx-auto"
            />
          </div>
          <div className="md:w-2/3 w-full md:pl-6 mt-4 md:mt-0 text-center md:text-left">
            <h3 className="text-xl font-semibold mb-2">100% Safe Delivery</h3>
            <p className="text-gray-600">
              We ensure your parcels are handled with the utmost care and
              delivered securely to their destination. Our reliable process
              guarantees safe and damage-free delivery every time.
            </p>
          </div>
        </div>
      </div>

      {/* Row 3 */}
      <div data-aos="zoom-out-right">
        <div className="flex bg-white flex-col md:flex-row items-center  p-4 rounded-lg shadow-md">
          <div className="md:w-1/3 w-full flex justify-center">
            <img
              src={logo2}
              alt="Feature 3"
              className="w-32 h-32 md:w-40 md:h-40 object-contain mx-auto"
            />
          </div>
          <div className="md:w-2/3 w-full md:pl-6 mt-4 md:mt-0 text-center md:text-left">
            <h3 className="text-xl font-semibold mb-2">
              24/7 Call Center Support
            </h3>
            <p className="text-gray-600">
              Our dedicated support team is available around the clock to assist
              you with any questions, updates, or delivery concerns—anytime you
              need us.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThreeSplitRows;
