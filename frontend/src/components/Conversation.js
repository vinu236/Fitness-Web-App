import { useState, useEffect } from "react";
import instance from "../api/axios";
const Conversation = ({ conversation, currentUser }) => {
  const[trainer,setTrainer]=useState({});

  useEffect(() => {
    const friendId = conversation.members.find((m,index) => {
      return m!== currentUser;
    });
    console.log("friendId is ", friendId);
    getTrainer(friendId);   
  }, []);

  const getTrainer=async(id)=>{
    try {
        const {data,status}=await instance.get(`/trainer/${id}`);
        console.log(data);
        setTrainer(data?.trainerData);
        console.log(status);
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex items-center  border-gray-500 p-3 hover:bg-gray-700 rounded-md border-none">
      <img
        src="https://images.unsplash.com/photo-1508919801845-fc2ae1bc2a28?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1211&q=80"
        alt=""
        className="w-[45px] h-[45px] rounded-full object-cover mr-5"
      />
      <span className="text-white font-bold text-lg">{trainer.trainerName}</span>
    </div>
  );
};

export default Conversation;
