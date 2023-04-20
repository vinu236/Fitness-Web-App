import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserId,setToken } from "../Redux/userSlice";
const useLogout=()=>{
const navigate=useNavigate();
const dispatch=useDispatch();
const handleLogout = () => {
  localStorage.removeItem("traineeToken");
  localStorage.removeItem("tid");
  dispatch(setUserId(null));
  dispatch(setToken(null))
  localStorage.removeItem("uid")
  localStorage.removeItem("trainerToken");
  navigate("/");
};


      return{handleLogout};
    
}

export default useLogout;