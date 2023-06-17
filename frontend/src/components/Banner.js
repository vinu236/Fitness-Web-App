import gymBanner from "../assets/img/gymBanner.png"
const Banner = () => {
  return (
    <div className="grid grid-cols-2 max-w-[1300px] m-auto items-center gap-5 shadow-2xl  ">
      <div>
        <h1 className="text-white opacity-80 text-5xl font-extrabold mb-10">
          When you feel like quitting, think about why you started
        </h1>
        <p className="text-white opacity-70 text-xl font-medium">
          "Fitness is not about being better than someone else. It's about being
          better than you used to be." - Khloe Kardashian
        </p>
      </div>
      <div>
        <img
          src={gymBanner}
          alt="gym_banner"
          className="w-full"
        />
      </div>
    </div>
  );
};

export default Banner;
