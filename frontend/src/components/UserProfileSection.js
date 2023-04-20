import instance from "../api/axios";
import Button from "./Button";
import { useEffect, useState } from "react";
const UserProfileSection=({src,onClick})=>{
    const [user,setUser]=useState({})

 useEffect(()=>{
    const id=localStorage.getItem("uid")
    getUser(id);
 },[])


    const getUser=async(id)=>{

        try {
            const {data,status}=await instance.get(`/user/${id}`);
            console.log(data);
            if(status===200){
                setUser(data?.getUser);
            }
        } catch (error) {
                console.log(error)
        }
    }


    return(
      <div className="text-red-200 h-[610px] bg-black  w-[254px] shadow-lg flex flex-col items-center gap-4 border-t-custom-gym border-r-2 border-r-custom-gym rounded-tr-[24px] rounded-br-[98px]">
        <img src={src} alt="dasd" className="rounded-full w-24 h-24 mt-8" />
        <input type="file" className="hidden" />
        <p className="text-white font-medium ">{user.userName}</p>
        <p className="text-sm">{user.email}</p>
        <div>
        <span>Plan: </span>
        <p className={user.plan ? "text-green-600 text-md inline font-bold" : "text-red-600  text-md inline font-bold"}>{user.plan ? "Active" : "Not Active"}</p>
        </div>
        <div>
        <span>Bmi: </span>
        <p className={user.plan ? "text-green-600 text-md inline font-bold" : "text-red-600  text-md inline font-bold"}></p>
        </div>
        <Button
          className={"bg-custom-head p-2 w-[80px] mt-8 rounded-xl"}
          text={"Logout"}
          onClick={onClick}
        />
      </div>
    )
}

export default UserProfileSection;