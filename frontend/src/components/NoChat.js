import React from 'react';
import { RiErrorWarningLine } from 'react-icons/ri';
import { BsArrowRight } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const NoChat = () => {
  return (
    <div className="min-h-[500px] flex flex-col items-center justify-center">
      <div className="text-6xl text-red-500 mb-6">
        <RiErrorWarningLine />
      </div>
      <p className="text-2xl text-center mb-8 text-white">
        Oops! Looks like you haven't subscribed to any plans yet.
      </p>
      <Link
        to={"/plan"}
        className="flex items-center justify-center bg-custom-gym hover:bg-custom-head text-white font-semibold text-lg py-3 px-6 rounded-md transition duration-300"
      >
        Go to Plans
        <BsArrowRight className="ml-2 text-xl " />
      </Link>
    </div>
  );
};

export default NoChat;
