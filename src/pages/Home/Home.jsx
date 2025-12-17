import React from "react";
import Banner from "./banner";
import Service from "./section/Service";
import CompanyLogos from "./section/CompanyLogos";
import ThreeSplitRows from "./section/ThreeSplitRows";
import Merchant from "./section/Merchant";
import TestimonialCarousel from "./section/TestimonialCarousel";

const Home = () => {
  return (
    <div className="bg-gray-100">
      <Banner></Banner>
      <Service></Service>
      <CompanyLogos></CompanyLogos>
      <ThreeSplitRows></ThreeSplitRows>
      <Merchant></Merchant>
      <TestimonialCarousel></TestimonialCarousel>
    </div>
  );
};

export default Home;
