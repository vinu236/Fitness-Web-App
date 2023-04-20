import Tab from "../../components/Tab";
import avatar from "../../assets/img/avatar.jpg";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import useLogout from "../../Hooks/useLogout";
import Detail from "../../components/Details";
import TrainerChat from "../../components/TrainerChat";
const TrainerProfile = () => {
  //custom hooks for =>>>>>>>>>>>>>>>>>handleLogout
  const UserData = [
    {
      label: "Trainees",
      value: "html",
      desc: (
        <Detail
      
      />
      
      ),
    },
    // {
    //   label: "Trainee",
    //   value: "react",
    //   desc: (
    //     <div className="h-[300px]">
    //       Contrary to popular belief, Lorem Ipsum is not simply random text. It
    //       has roots in a piece of classical Latin literature from 45 BC, making
    //       it over 2000 years old. Richard McClintock, a Latin professor at
    //       Hampden-Sydney College in Virginia, looked up one of the more obscure
    //       Latin words, consectetur, from a Lorem Ipsum passage, and going
    //       through the cites of the word in classical literature, discovered the
    //       undoubtable source. Lorem Ipsum comes from sections 1.10.32 and
    //       1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and
    //       Evil) by Cicero, written in 45 BC. This book is a treatise on the
    //       theory of ethics, very popular during the Renaissance. The first line
    //       of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in
    //       section 1.10.32. The standard chunk of Lorem Ipsum used since the
    //       1500s is reproduced below for those interested. Sections 1.10.32 and
    //       1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also
    //       reproduced in their exact original form, accompanied by Englis
    //     </div>
    //   ),
    // },

    {
      label: "Chat ",
      value: "vue",
      desc: <TrainerChat/>,
    },
  ];
 const{handleLogout}=useLogout();

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
      <div className=" w-full h-[64px]">
        <Tab  data={UserData}/>
      </div>
    </section>
  );
};
export default TrainerProfile;
