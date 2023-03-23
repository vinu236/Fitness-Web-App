import Tab from "../../components/Tab";
import avatar from "../../assets/img/avatar.jpg";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
const UserProfile = () => {
  const navigate = useNavigate();
  //handleLogout
  const handleLogout = () => {
    const tokenRemoved = localStorage.removeItem(
      "traineeToken" || "trainerToken"
    );
    navigate("/login");
  };

  return (
    <section className="flex">
      <div className="text-red-200 h-[610px] bg-black  w-[254px] shadow-lg flex flex-col items-center gap-4 border-t-custom-gym border-r-2 border-r-custom-gym rounded-tr-[24px] rounded-br-[98px]">
        <img src={avatar} alt="dasd" className="rounded-full w-24 h-24 mt-8" />
        <input type="file" className="hidden" />
        <p className="text-white font-medium ">David</p>
        <p className="text-sm">david@gmail.com</p>
        <Button
          className={"bg-custom-head p-2 w-[80px] mt-8 rounded-xl"}
          text={"Logout"}
          onClick={handleLogout}
        />
      </div>
      <div className="bg-white w-full h-[64px]">
        <Tab />
      </div>
    </section>
  );
};
export default UserProfile;
