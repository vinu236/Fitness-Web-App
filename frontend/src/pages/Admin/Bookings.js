import { useState, useEffect } from "react";
import DataTable from "../../components/DataTable";
import TableShimmer from "../../components/TableShimmer";
import Heading from "../../components/Heading";
import Search from "../../components/Search";
import instance from "../../api/axios";
import { BsArrowRightCircleFill } from "react-icons/bs";
import Modal from "../../components/User/Modal";
//TODO:delete this with folder also
import toast from "../../components/Toaster"
import { toast } from "react-toastify";

const Bookings = () => {
  const [data, setData] = useState([]);
  const[userBookData,setUserBookData]=useState({});
  const[selectTrainers,setSelectTrainers]=useState("");
  const[trainers,setTrainers]=useState([]);
  const [showModal, setShowModal] = useState(false);
 

  useEffect(() => {
    getBookings();
  }, []);

  const getBookings = async () => {
    try {
      const { data, status } = await instance.get("/bookings");
      console.log(data);
      if (status == 200) {
        setData(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowModal = (id) => {
    setShowModal(true);
    //here modal data
    alert("asdf")
     getBooking(id);
  };

  const getBooking=async(id)=>{
    try {
       alert("asdczdfsf")
      const {data,status}=await instance.get(`/bookingDetail/ ${id}`);
   
     
      console.log(data);
      if(status===200){
        setUserBookData(data);
        setSelectTrainers(data?.trainer?._id); 
      }
    } catch (error) {
      console.log(error)
    }
  }
  console.log(userBookData);

  const handleClickHide = () => {
    setShowModal(false);
  };

  const COLUMNS = [
    {
      Header: "Booking Id",
      accessor: "_id",
    },
    {
      Header: "UserName",
      accessor: "user.userName",
    },
    {
      Header: "Plan",
      accessor: "Plan.planName",
    },
    {
      Header: "Plan Status",
      accessor: "user.plan",
      Cell: ({ row }) => {
        console.log(row.original.user.plan);
        return (
          <span
            className={
              row.original.user.plan
                ? "text-green-400"
                : "text-red-700"
            }
          >
            {row.original.user.plan ? "Active" : "Expired"}
          </span>
        );
      },
    },
    {
      Header: "More Details",
      Cell: ({ row }) => {
        return (
          <BsArrowRightCircleFill
            className="inline-block cursor-pointer hover:rotate-180"
            onClick={() => handleShowModal(row.original._id)}
          />
        );
      },
    },
  ];

  /* ============Date formatting================== */
  const formattedBookingDate = formatDate(userBookData.dateOfBooking);
  const formattedExpiryDate = formatDate(userBookData.expirationDate);
  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getUTCFullYear();
    const month = `0${date.getUTCMonth() + 1}`.slice(-2);
    const day = `0${date.getUTCDate()}`.slice(-2);
    return `${year}-${month}-${day}`;
  }
  /* ================================================= */



  const handleSelectTrainer = (e) => {
    console.log(e.target.value);
    if (e.target.value) {
      patchTrainer(e.target.value);
    } else {
      patchTrainer(null); // or pass an appropriate default value
    }
  };
  
  
  const patchTrainer = async (id) => {
    try {
      console.log("from postTrainer",id);
      const { data, status } = await instance.patch(`/booking/${userBookData._id}`, { trainer_id: id });
      console.log(data);
      console.log(status);
      if (status === 201) {
        setSelectTrainers(data?.trainer?._id);
        toast.success(` Updated successfully`);
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  
  console.log(selectTrainers)
  useEffect(()=>{
    getTrainers();
  },[])

  const getTrainers=async()=>{
    try {
      const {data}=await instance.get("/dashboard/getTrainer");
      setTrainers(data);
    } catch (error) {
      
    }
  }
  const modal = (
<Modal onClose={handleClickHide}>     
  <div className="bg-black rounded-lg overflow-hidden">
    <div className="flex items-center justify-center p-4 border-b">
      <img
        src={""}
        alt={`${"user.userName"}'s profile`}
        className="rounded-full w-16 h-16 object-cover mr-4"
      />
      {/* <div>
        <h2 className="text-lg  text-white font-bold">{"user.userName"}</h2>
        <p className=" text-sm text-white font-bold">{"user.email"}</p>
      </div> */}
    </div>
    <div className="p-7   ">
      <div className="flex justify-between mb-2 p-1">
        <span className=" text-white font-bold">Plan Name</span>
        <span className="text-white font-bold">"{userBookData?.Plan?.planName}"</span>
      </div>
      <hr className="border-gray-300 my-2"/>
      <div className="flex justify-between mb-2 p-1">
        <span className=" text-white font-bold">Date of Booking</span>
        <span className="text-white font-bold">{formattedBookingDate}</span>
      </div>
      <hr className=" my-2"/>
      <div className="flex justify-between mb-2 p-1">
        <span className=" text-white font-bold">Plan Expiry</span>
        <span className="text-white font-bold">{formattedExpiryDate}</span>
      </div>
      <hr className=" my-2"/>
      <div className="flex justify-between p-1">
        <span className=" text-white font-bold">Trainer </span>
        <select value={selectTrainers} onChange={handleSelectTrainer} className="text-black bg-orange-500  rounded-full px-3 py-1 appearance-none">
          <option value="" key="asdasd" className="text-black">------Select Trainers------</option>

         {trainers.map((trainer)=>{
          return (<option key={trainer._id} value={trainer._id} className="text-black">{trainer.trainerName}</option>)
         })}
        </select>
      </div>
    </div>
  </div>
</Modal>

  );

  return (
    <div className="relative w-full  bg-gray-200">
      <div className=" absolute top-20  w-full">
        <div className="flex justify-between mb-2 items-center">
          <Heading text="Booking Details" />
          <Search />
        </div>
        <DataTable column={COLUMNS} Data={data} />
      </div>
      {showModal && modal}
    </div>
  );
};

export default Bookings;
