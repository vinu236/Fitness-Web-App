import DataTable from "../../components/DataTable";
import { TbLockOpen, TbLockOff } from "react-icons/tb";
import {useState,useEffect} from "react";
import swal from "sweetalert";
import { URL } from "../../../config";
import Shimmer from "../../components/Shimmer";
import Heading from "../../components/Heading";
import Search from "../../components/Search";
import Button from "../../components/Button"
import {Link} from "react-router-dom"
import axios from "axios";
import instance from "../../api/axios"
import { Link } from "react-router-dom";
import {BsArrowRightCircleFill} from "react-icons/bs"
import PlanDetails from "../../components/PlanDetails";
const Trainer=()=>{
  const[trainers,setTrainer]=useState([]);


 
  useEffect(()=>{
    getTrainerInfo();
  },[])


  const handleLock = (row) => {
    alert("asfdaf")
    const user = row?.values;
    console.log(user);
    if (!user) {
      console.log("User is not found");
    }

    swal({
      title: ` ${user.isActive ? "Block" : "Unblock"}`,
      text: "Are you Sure ?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((result) => {
      if (result) {
        updateStatus(user);

        swal(`Successfully ${user.isActive ? "Block" : "Unblock"}`, {
          icon: "success",
        });
      } else {
        swal("Cancelled the request successfully");
      }
    });
  };







  
  const updateStatus = async (user) => {
    try {
      const { data } = await axios.patch(`${URL}/dashboard/blockTrainer/${user._id}`, {
        isActive: !user.isActive,
      });

      console.log(data);
      const updateUser = trainers.map((trainer) => {
        if (trainer._id === data._id) {
          return { ...trainer, isActive: data.isActive };
        }
        return trainer;
      });
  
      setTrainer(updateUser);
      ;
    } catch (error) {
      console.log(error);
    }
  };



  const getTrainerInfo= async()=>{
    try {
      const {data}=await instance.get("dashboard/getTrainer");
      console.log("asdasdasd")
      console.log(data)
      setTrainer(data)
    } catch (error) {
      console.log(error)
    }
  }

    const COLUMNS = [
        {
          Header: "ID",
          accessor: "_id",
        },
        {
          Header: "Trainer Name",
          accessor: "trainerName",
        },
        {
          Header: "Email",
          accessor: "email",
        },
        {
          Header: "Block User",
          accessor: "isActive",
          Cell: ({ row }) => {
            return row.values.isActive ? (
              <TbLockOpen
                className="inline-block cursor-pointer"
                onClick={() => {
                  handleLock(row);
                }}
              />
            ) : (
              <TbLockOff
                className="inline-block cursor-pointer"
                onClick={() => {
                  handleLock(row);
                }}
              />
            );
          },
        },
        {
          Header: "More Details",
          accessor: "",
          Cell:({row})=>{
            return(
              <Link to={"/dashboard/trainer/"+row.values._id}>
              <BsArrowRightCircleFill className="inline-block cursor-pointer" />
              </Link>
            )
    
          }
        },
      ];
   
    return(
      <>     
      <div className="relative w-full  bg-gray-200">
      <div className=" absolute top-20  w-full">
      <div className="flex justify-between mb-2 items-center">
          <Heading text="Trainer Details"/>
          <div className="flex justify-between gap-2">
            <Link to={"/dashboard/addTrainer"}>
          <Button text="Add Trainer" className={"bg-black text-white p-2 mr-4 rounded-xl"}/>
          </Link>
          <Search />
          </div>
        </div>
      <DataTable column={COLUMNS} Data={trainers}/>
      </div>
    </div>
    </>

       
    );
}
export default Trainer;