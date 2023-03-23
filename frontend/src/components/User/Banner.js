import { useState } from "react";
import img from "../../assets/img/hero-2.png";
import img1 from "../../assets/img/hero-1.png";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Banner = () => {

  console.log("banners")
  const Banners = [
    {
      src: img,
    },
    {
      src: img1,
    },
  ];

  //! here im creating a state variable
  const [currentIndex, setCurrentIndex] = useState(0);
  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? Banners.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    console.log(currentIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === Banner.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    
  };
  return (
    <div className="max-w-[1600px] h-full w-full m-auto  relative">
      <div className="">
        
        <img src={Banners[currentIndex]?.src} alt="bannerImg" />
        
      </div>
      {/*Left Arrow */}
      <div className="block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <BsChevronCompactLeft onClick={prevSlide} size={30} />
      </div>
      {/*Right Arrow */}
      <div className="absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <BsChevronCompactRight onClick={nextSlide} size={30} />
      </div>
    </div>
  );
};
export default Banner;
