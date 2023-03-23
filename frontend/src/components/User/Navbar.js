import Logo from "../../assets/img/Logo.png";
import { navbarMenu } from "../../../config";
import ModalLogin from "../../pages/User/ModalLogin";
import ModalSignUp from "../../pages/User/ModalSignup";
import { useEffect, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
const Navbar = () => {
  
  const [auth, setAuth] = useState(false);
  console.log("auth",{auth})

  console.log("NAV BAR FROM USER");
  const renderNavbar = navbarMenu.map((menu, index) => {
    return <li className="cursor-pointer">
      <Link to={menu.to}>
      {menu.navTitle}
      </Link>
      </li>;
  });

  useEffect(() => {
  
    const token = localStorage.getItem("traineeToken");
    console.log("token",{token})
    if (!token) {
      console.log("testing token null")
       return setAuth(false);
    }
    setAuth(true);
  }, []);
  return (
    //doubt
    <div className="flex items-center justify-between shadow-md  bg-transparent    text-white w-full">
      <img src={Logo} alt="logo" className="w-2/12" />

      <div>
        <ul className="flex gap-4">
          {renderNavbar}
          </ul>
      </div>

      <div>
        {auth ? (
          <Link to={"/user/profile"}>
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
  );
};

export default Navbar;
