import { useState,useEffect } from "react";
import BarChart from "../../components/PieChart";
import { UserData } from "../../components/Data";
import instance from "../../api/axios";
import UserCount from "../../components/UserCount";
import TrainerCount from "../../components/TrainerCount";
import BookingCount from "../../components/BookingsCount";
const DashBoard = () => {
  const [traineesCount,setTraineesCount]=useState(0);
  const[trainersCount,setTrainersCount]=useState(0);
  const[BookingsCount,setBookingsCount]=useState(0);
        const [userData, setUserData] = useState({
    labels: "" ,
    datasets: [
      {
        label: "Plans Purchased",
        data: UserData.map((data) => data.userGain),
        backgroundColor: [
          "#FFA500",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
      },
    ],
  });
  

  useEffect(()=>{
    getPlans();
  },[])
  const getPlans=async()=>{

    try {
      const {data}=await instance.get('/dashboard/plan');
      console.log(data);
      const labelsRender = data?.data.map(data => data.heading);
      setUserData(({ ...UserData, labels: labelsRender }));
    } catch (error) {
      console.log(error);
    }
  }



  useEffect(()=>{
 getUsersCount();
  },[])


  const getUsersCount=async()=>{

    try {
      const {data}=await instance.get('/count/trainees');
    setTraineesCount(data?.getCount);
    } catch (error) {
      console.log(error)
    }



  }

  useEffect(()=>{
    getTrainerCount();
  },[]);

  const getTrainerCount=async ()=>{
    try {
      const{data}=await instance.get('/count/trainers');
     setTrainersCount(data?.getCount)
    } catch (error) {
      console.log(error)
    }
  }

    useEffect(()=>{
      getBookingsCount()
    },[])

    const getBookingsCount=async()=>{
      try {
        const {data}=await instance.get("/count/bookings");
        setBookingsCount(data?.getCount);
      } catch (error) {
          console.log(error)
      }
    }


  return (
    <>
    <div className="flex flex-col justify-center  w-full">
    <div className="flex justify-around">
      <UserCount count={traineesCount} title={"Trainees"}/>
      <TrainerCount count={trainersCount} title={"Trainers"}/>
      <BookingCount count={BookingsCount} title={"Bookings"}/>
    </div>
    <div  className="mt-9 flex justify-center w-[600px]">
    <BarChart chartData={userData} />
  </div>
  </div>
  </>
  )
};
export default DashBoard;
