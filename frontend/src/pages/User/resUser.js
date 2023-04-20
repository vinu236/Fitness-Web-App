import Tab from "../../components/Tab";
import avatar from "../../assets/img/avatar.jpg";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";

const res = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("traineeToken");
    localStorage.removeItem("trainerToken");
    navigate("/login");
  };

  return (
    <section className="flex flex-col lg:flex-row min-h-screen">
      <div className="bg-black shadow-lg border-t-custom-gym border-r-2 border-r-custom-gym rounded-tr-lg lg:rounded-tr-none lg:rounded-l-lg flex flex-col items-center gap-4 lg:w-1/3">
        <img src={avatar} alt="Profile Avatar" className="rounded-full w-24 h-24 mt-8" />
        <input type="file" className="hidden" />
        <p className="text-white font-medium ">David</p>
        <p className="text-sm">david@gmail.com</p>
        <Button className="bg-custom-head p-2 w-1/2 lg:w-[80px] mt-8 rounded-xl" text="Logout" onClick={handleLogout} />
      </div>
      <div className="bg-white w-full h-[64px]">
        <Tab />
      </div>
    </section>
  );
};

export default res;



