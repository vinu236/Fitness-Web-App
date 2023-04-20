import {useState,useEffect } from "react";
import axios from "axios";

const usePlans=()=>{

    const[plan,setPlan]=useState([]);

    useEffect(()=>{
        getPlans();
    },[]);

    const getPlans = async () => {
        try {
          const { data, status } = await axios.get(
            "http://localhost:3000/dashboard/plan"
          );
          console.log(data)
          if (status === 200) {
            setPlan(data?.data);
          }
        } catch (error) {
          console.log(error);
        }
      };

        return[plan,setPlan];


}

export default usePlans;