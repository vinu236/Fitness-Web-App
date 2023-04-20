import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const UserVerification=({children})=>{
   
    const navigate=useNavigate()
    useEffect(()=>{
        
        if(!localStorage.getItem("traineeToken")){
            navigate("/login",{replace:true})
            
        }
        
    },[])
    return children;
}
export default UserVerification;