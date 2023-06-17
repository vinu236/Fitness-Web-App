import { useState,useEffect } from "react";
import BarChart from "../../components/BarChart";
import { UserData } from "../../components/Data";
import instance from "../../api/axios";
import UserCount from "../../components/UserCount";
import TrainerCount from "../../components/TrainerCount";
import BookingCount from "../../components/BookingsCount";
import PieChart from "../../components/PieChart"
const DashBoard = () => {
  const [traineesCount,setTraineesCount]=useState(0);
  const[trainersCount,setTrainersCount]=useState(0);
  const[BookingsCount,setBookingsCount]=useState(0);
        const [userData, setUserData] = useState({
    labels: "" ,
    datasets: [
      {
        label: "Plans Purchased",
        data: UserData.map((data) => data.planPurchased),
        backgroundColor: [
          "#FFA500",
          "#50AF95",
          "#ecf0f1",
          "#f36100",
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
   <div className="flex flex-col justify-center w-full bg-slate-900">
  <div className="flex justify-around">
    <UserCount count={traineesCount} title={"Trainees"} />
    <TrainerCount count={trainersCount} title={"Trainers"} />
    <BookingCount count={BookingsCount} title={"Bookings"} />
  </div>
  <div className="w-full flex justify-around">
  <div className="mt-9 flex w-1/2  justify-around">
    <BarChart chartData={userData}  className="w-96"/>
  </div>
  <div className="mt-9 flex w-40% justify-around">
  <PieChart chartData={userData} className="w-32"/>
  </div>
  </div>
  
 
</div>

  </>
  )
};
export default DashBoard;
