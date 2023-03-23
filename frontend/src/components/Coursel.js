import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img from "../assets/img/hero-1.png";
import img1 from "../assets/img/hero-2.png"

const Coursel=()=>{
    const Banners = [
        {
          src: img,
        },
        {
          src: img1,
        },
      ];
      const settings = {
        dots: false,
        infinite: true,
        fade: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        cssEase: 'linear',
        arrows:false
    };


    return(
        
        <Slider {...settings}>
      <div className="max-h-screen relative">
      <img src={img} alt="bannerImg" className=""/>
      <div className="text-neutral-300 text-6xl  font-semibold fixed top-[260px] left-[940] tracking-wider flex flex-col gap-[24px] ">
        <div className="animate-left	">
        Push  your <span className="bg-custom-head rounded-tl-3xl rounded-br-3xl rounded   animate-pulse p-2" >limits</span> 
        </div>
        <div className="animate-right">
        <span className="bg-custom-head rounded-tl-3xl rounded-br-3xl rounded  animate-pulse p-2 ">achieve</span> the  goals
        </div>
      </div>
      </div>
      <div>
      <img src={img1} alt="bannerImg" className=""   />
      </div>
    </Slider>
 
    );
}

export default  Coursel;