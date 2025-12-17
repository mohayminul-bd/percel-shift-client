import React, { useState, useEffect } from "react";
import { FaQuoteLeft } from "react-icons/fa";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { motion } from "framer-motion";

const testimonials = [
  {
    id: 1,
    name: "Rasel Ahamed",
    role: "CTO",
    feedback:
      "Corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.",
  },
  {
    id: 2,
    name: "Awlad Hossin",
    role: "Senior Product Designer",
    feedback:
      "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.",
  },
  {
    id: 3,
    name: "Nasir Uddin",
    role: "CEO",
    feedback:
      "Corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.",
  },
];

function TestimonialCarousel() {
  const [current, setCurrent] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);

  // Update cardWidth based on screen size
  useEffect(() => {
    const updateWidth = () => {
      if (window.innerWidth < 640) {
        setCardWidth(14); // mobile
      } else if (window.innerWidth < 1024) {
        setCardWidth(18); // tablet
      } else {
        setCardWidth(20); // desktop
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // Auto Slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-5 text-center py-12 overflow-hidden relative">
      <h2 className="text-2xl md:text-3xl font-bold mb-2">
        What our customers are saying
      </h2>
      <p className="text-gray-600 mb-8 text-sm md:text-base">
        Enhance posture, mobility, and well-being effortlessly with Posture Pro.
      </p>

      {/* Carousel */}
      <div className="relative overflow-hidden">
        <motion.div
          className="flex gap-4 md:gap-6"
          animate={{
            x: `calc(50% - ${current * cardWidth}rem - ${cardWidth / 2}rem)`,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {testimonials.map((item, idx) => {
            const isActive = idx === current;
            return (
              <motion.div
                key={item.id}
                className="bg-white rounded-xl shadow-md p-4 md:p-5 flex-shrink-0 flex flex-col justify-between"
                style={{ width: `${cardWidth}rem`, height: "14rem" }}
                animate={{
                  scale: isActive ? 1 : 0.85,
                  opacity: isActive ? 1 : 0.5,
                }}
                transition={{ duration: 0.5 }}
              >
                <FaQuoteLeft className="text-xl text-teal-500" />
                <p className="text-gray-700 text-sm md:text-base italic line-clamp-3">
                  {item.feedback}
                </p>
                <div>
                  <h4 className="font-semibold text-sm md:text-base">
                    {item.name}
                  </h4>
                  <p className="text-xs md:text-sm text-gray-500">
                    {item.role}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Controls */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          onClick={prevSlide}
          className="bg-teal-500 text-white p-2 md:p-3 rounded-full hover:bg-teal-600"
        >
          <MdArrowBackIos />
        </button>

        <div className="flex gap-2">
          {testimonials.map((_, idx) => (
            <span
              key={idx}
              className={`w-3 h-3 rounded-full ${
                idx === current ? "bg-teal-600" : "bg-gray-300"
              }`}
            ></span>
          ))}
        </div>

        <button
          onClick={nextSlide}
          className="bg-teal-500 text-white p-2 md:p-3 rounded-full hover:bg-teal-600"
        >
          <MdArrowForwardIos />
        </button>
      </div>
    </div>
  );
}

export default TestimonialCarousel;
