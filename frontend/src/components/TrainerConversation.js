import { useState, useEffect } from "react";
import instance from "../api/axios";
const TrainerConversation = ({ conversation, currentUser }) => {
  const[trainees,setTrainee]=useState({});

  useEffect(() => {
    const friendId = conversation.members.find((m,index) => {
      return m!== currentUser;
    });
    console.log("friendId is ", friendId);
    getTrainer(friendId);   
  }, []);

  const getTrainer=async(id)=>{
    try {
        const {data,status}=await instance.get(`/user/${id}`);
        console.log(data);
        setTrainee(data?.getUser);
        console.log(status);
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex items-center  border-gray-500 p-3 hover:bg-gray-700 rounded-md border-none">
      <img
        src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8&w=1000&q=80"
        alt=""
        className="w-[45px] h-[45px] rounded-full object-cover mr-5"
      />
      <span className="text-white font-bold text-lg">{trainees.userName}</span>
    </div>
  );
};

export default TrainerConversation;
