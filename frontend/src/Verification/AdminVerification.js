import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const AdminVerification=({children})=>{

    const navigate=useNavigate();
  useEffect(()=>{
    if(!localStorage.getItem("adminToken")){
        navigate("/")
    }
},[])
return children;
}

export default AdminVerification;