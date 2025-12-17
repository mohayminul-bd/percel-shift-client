import React from "react";
import casio from "../../../assets/brands/casio.png";
import amazon from "../../../assets/brands/amazon.png";
import moonstar from "../../../assets/brands/moonstar.png";
import starplus from "../../../assets/brands/start-people 1.png";
import startpeople from "../../../assets/brands/start.png";
import amazon_vector from "../../../assets/brands/randstad.png";

const CompanyLogos = () => {
  return (
    <div className="bg-gray-100 py-10">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-lg font-semibold text-teal-900 mb-8">
          We've helped thousands of sales teams
        </h2>

        {/* marquee section */}
        <marquee
          behavior="scroll"
          direction="left"
          scrollamount="10"
          onMouseOver={(e) => e.currentTarget.stop()}
          onMouseOut={(e) => e.currentTarget.start()}
        >
          <a
            href="https://www.casio.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={casio}
              alt="Casio"
              className="h-8 md:h-10 mx-8 inline-block object-contain"
            />
          </a>
          <a
            href="https://www.amazon.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={amazon}
              alt="Amazon"
              className="h-8 md:h-10 mx-8 inline-block object-contain"
            />
          </a>
          <a
            href="https://www.monster.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={moonstar}
              alt="MoonStar"
              className="h-8 md:h-10 mx-8 inline-block object-contain"
            />
          </a>
          <a
            href="https://www.starplus.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={starplus}
              alt="Star Plus"
              className="h-8 md:h-10 mx-8 inline-block object-contain"
            />
          </a>
          <a
            href="https://www.startpeople.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={startpeople}
              alt="StartPeople"
              className="h-8 md:h-10 mx-8 inline-block object-contain"
            />
          </a>
          <a
            href="https://www.randstad.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={amazon_vector}
              alt="Randstad"
              className="h-8 md:h-10 mx-8 inline-block object-contain"
            />
          </a>
        </marquee>

        <hr className="border-t border-dotted border-teal-900 mt-10" />
      </div>
    </div>
  );
};

export default CompanyLogos;
