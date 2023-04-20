import Tab from "../../components/Tab";
import avatar from "../../assets/img/avatar.jpg";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import useLogout from "../../Hooks/useLogout";
import Bmi from "../../components/Bmi";
import BookingHistory from "../../components/BookingHistory";
import UserProfileSection from "../../components/UserProfileSection";
import Chat from "../../components/Chat";

const UserProfile = () => {
  //custom hooks for =>>>>>>>>>>>>>>>>>handleLogout
  const UserData = [
    {
      label: "BMI Calculator",
      value: "html",
      desc: (
      <Bmi/>
      ),
    },
    {
      label: "Plans",
      value: "react",
      desc: (
        <BookingHistory/>
      ),
    },

    {
      label: "Chat",
      value: "vue",
      desc: <Chat/>,
    },
  ];
 const{handleLogout}=useLogout();

  return (
    <section className="flex flex-grow">
      <UserProfileSection src={avatar} onClick={handleLogout}/>
      <div className="bg-white w-full h-[64px]">
        <Tab data={UserData}/>
      </div>
    </section>
  );
};
export default UserProfile;
