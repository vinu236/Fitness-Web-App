import Logo from "../../assets/img/Logo.png";
import { navbarMenu } from "../../../config";
import ModalLogin from "../../pages/User/ModalLogin";
import ModalSignUp from "../../pages/User/ModalSignup";
import { useEffect, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import {RiMenu3Fill} from "react-icons/ri";
import {RxCross1} from "react-icons/rx"
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Navbar = () => {
  console.log("helloo guys")
  const [traineeAuth, setTraineeAuth] = useState(false);
  const[trainerAuth,setTrainerAuth]=useState(false);
  const uToken = useSelector(store => store.user.uToken);
  const [show,setHandleShow]=useState(false)

  console.log("NAV BAR FROM USER");
  const renderNavbar = navbarMenu.map((menu, index) => {
    return (
      <li className="cursor-pointer" key={index}>
        <Link to={menu.to}>{menu.navTitle}</Link>
      </li>
    );
   });
   const handleShow=()=>{
    setHandleShow(true)
   }
   const handleHidden=()=>{
    setHandleShow(false)
   }

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
 
  const mobNav=(

    
      <div className="hidden max-md:block w-full h-screen bg-neutral-800 opacity-95 absolute z-40 transition-all duration-200 ease-out ">
        <ul className="bg-black h-[70%] flex flex-col items-center justify-center text-white text-2xl gap-24">
        {renderNavbar}
        </ul>
        <div className=" bg-red-200 h-[20%]">
      {localStorage.getItem("traineeToken") ? (
        <Link to={"/user/profile"}>
          <FaUserAlt className="text-white mr-6 h-5 cursor-pointer" />
        </Link>
      ) : localStorage.getItem("trainerToken")? (
        <Link to={"/trainer/profile"}>
          <FaUserAlt className="text-white mr-6 h-5 cursor-pointer" />
        </Link>
      ) : (
        <ul className="flex flex-col justify-start text-white text-2xl items-center gap-20 mr-6 bg-black w-full h-full z-50">
          <li className="cursor-pointer">
         <Link to={"/login"}>
          Login
         </Link>
          </li>
          <li className="cursor-pointer">
          <Link to={"/signup"}>
          Signup
         </Link>
          </li>
        </ul>
      )}
      </div>
      </div>
    
  )

  return (
    //doubt
   <>
   {console.log(traineeAuth)}
    <div className="flex items-center justify-between shadow-md   text-white w-full max-h-20 bg-black  max-sm:h-[55px]">
      <img src={Logo} alt="logo" className=" max-h-28 max-sm:h-[6rem]" />
      <div className="max-md:hidden">
        <ul className="flex gap-4">{renderNavbar}</ul>
      </div>

      <div className="max-md:hidden">
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
     <div className="hidden max-md:block">
      {!show ?(
        <RiMenu3Fill className="text-custom-gym mr-6 max-sm:h-[2rem]" size={33} onClick={handleShow}/>):(
          <RxCross1 className="text-custom-gym mr-6  transform transition duration-500 rotate-180 ease-in-out" size={33} onClick={handleHidden}/>
        )}
     </div>
    </div>
       {show && mobNav}
    </>
  );
};

export default Navbar;