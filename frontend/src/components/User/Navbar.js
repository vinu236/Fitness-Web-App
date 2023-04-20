import Logo from "../../assets/img/Logo.png";
import { navbarMenu } from "../../../config";
import ModalLogin from "../../pages/User/ModalLogin";
import ModalSignUp from "../../pages/User/ModalSignup";
import { useEffect, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Navbar = () => {
  console.log("helloo guys")
  const [traineeAuth, setTraineeAuth] = useState(false);
  const[trainerAuth,setTrainerAuth]=useState(false);
  const uToken = useSelector(store => store.user.uToken);

  console.log("NAV BAR FROM USER");
  const renderNavbar = navbarMenu.map((menu, index) => {
    return (
      <li className="cursor-pointer" key={index}>
        <Link to={menu.to}>{menu.navTitle}</Link>
      </li>
    );
   });

  console.log(uToken)
  useEffect(() => {
    // const traineeToken=localStorage.getItem("traineeToken");
    const trainerToken=localStorage.getItem("trainerToken");
    const trainerId=localStorage.getItem("traineeToken")
 
  //  if(traineeToken ){

  //   setTraineeAuth(true);
  //  }
   if(trainerToken){
    setTrainerAuth(true)
   }

  }, []);
 

  return (
    //doubt
   <>
   {console.log(traineeAuth)}
    <div className="flex items-center justify-between shadow-md  bg-transparent    text-white w-full">
      <img src={Logo} alt="logo" className="w-2/12" />
      <div>
        <ul className="flex gap-4">{renderNavbar}</ul>
      </div>

      <div>
      {localStorage.getItem("traineeToken") ? (
        <Link to={"/user/profile"}>
          <FaUserAlt className="text-white mr-6 h-5 cursor-pointer" />
        </Link>
      ) : localStorage.getItem("trainerToken")? (
        <Link to={"/trainer/profile"}>
          <FaUserAlt className="text-white mr-6 h-5 cursor-pointer" />
        </Link>
      ) : (
        <ul className="flex items-center gap-3 mr-6">
          <li className="cursor-pointer">
            <ModalLogin />
          </li>
          <li className="cursor-pointer">
            <ModalSignUp />
          </li>
        </ul>
      )}
      </div>
    </div>
    </>
  );
};

export default Navbar;