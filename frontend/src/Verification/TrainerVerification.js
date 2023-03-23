import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const TrainerVerification=({children})=>{

    useEffect(()=>{

        const navigate=useNavigate()
        if(!localStorage.getItem("trainerToken")){

            navigate("/");
        }
    },[])
    return children;
    
}

export default TrainerVerification;