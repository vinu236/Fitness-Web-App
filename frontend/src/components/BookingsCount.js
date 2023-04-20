import React from "react";
import PropTypes from "prop-types";
import { GiOpenBook } from "react-icons/gi";
import { animated, useSpring } from "react-spring";

const BookingCount = ({ title, count }) => {
  const animation = useSpring({
    opacity: 1,
    transform: "translateY(0)",
    from: { opacity: 0, transform: "translateY(20px)" },
  });

  return (
    <animated.div
      className="w-64 h-32 bg-black p-4 flex flex-col justify-center items-center border border-gray-300 rounded-md"
      style={animation}
    >
      <div className="text-2xl font-bold mb-2 first-letter  flex gap-2">
        <GiOpenBook className="inline-block mr-2 text-custom-gym" />
       <p className="text-white"> {title}</p>
      </div>
      <div className="text-4xl font-bold text-white">{count}</div>
    </animated.div>
  );
};

BookingCount.propTypes = {
  title: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
};

export default BookingCount;
