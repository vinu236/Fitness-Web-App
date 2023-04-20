import swal from "sweetalert";
import DataTable from "../../components/DataTable";
import Search from "../../components/Search";
import Heading from "../../components/Heading";
import usePlans from "../../Hooks/usePlans";
import {AiFillDelete} from "react-icons/ai"
import instance from "../../api/axios";
import Button from "../../components/Button";
import { Link } from "react-router-dom";
import {BsArrowRightCircleFill,BsFillPlusCircleFill} from "react-icons/bs";
import { FaCheck } from 'react-icons/fa';
import { useState } from "react";
import Modal from "../../components/User/Modal";
import fetchData from "../../utils/helper";
import ShimmerListItem from "../../components/ShimmerList";
const ViewPlans = () => {
  const[plan,setPlan]=usePlans([]);
  const[showPlan,setShowPlan]=useState(false);
  const [features, setFeatures] = useState({});


  const handleClick=(id)=>{
    if(!id){
      console.log("user id is not Found");
    }
    swal({
      title: "Delete",
      text: "Are you Sure ?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((result) => {
      if (result) {
        deletePlan(id);

        swal("Plan has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Cancelled the request successfully");
      }
    });
  }
 const handleShow=(id)=>{
 
  setShowPlan(true);
  getListDetails(id);
 }
 const handleClickHide=()=>{
  setShowPlan(false)
 
 } 
 const getListDetails = async(id) => {
  try {
    const data=await fetchData(id);
    console.log(data?.data);
    setFeatures(data?.data);
  } catch (error) {
    console.error(error);
  }
};

  const deletePlan=async(id)=>{

    try {
      console.log(plan)
      const {data}=await instance.delete(`/dashboard/delete/plans/${id}`);
        updateData(data?.data)
    } catch (error) {
        console.log(error)
    }
  }
const updateData=(list)=>{
  const filter=plan.filter(data=>{
    return data._id!=list._id;
  })
  setPlan(filter);  
} 

 

  const COLUMNS=[
    {
      Header:"plan Id",
      accessor:"_id",

    }
    ,
    {
      Header:"Plan Name",
      accessor:"planName"
    }
    ,
    {
      Header:"Price",
      accessor:"price"
    }
    ,
    {
      Header:"Delete",
      accessor:"delete",
      Cell:({row})=>{
        return  (
          
          <AiFillDelete className="inline-block cursor-pointer hover:text-red-600"
          onClick={()=>handleClick(row.values._id)}
          />
        )
      }
    }
    ,
    {
      Header: "More Details",
      accessor: "",
      Cell:({row})=>{
        return(
        //  <Link to={`/dashboard/plans/more/details/${row?.values._id}`}>
          <BsArrowRightCircleFill className="inline-block cursor-pointer hover:rotate-180" onClick={()=>handleShow(row.values._id)} />
        //  </Link>
       
        )

      }
    },
    {
      Header:"Edit Plan",
      accessor:"",
      Cell:({row})=>{
        return(
          <Link to={`/dashboard/edit/plan/${row.original._id}`}>
          <BsFillPlusCircleFill className="inline-block cursor-pointer hover:rotate-180"/>
          </Link>
        )
      }
    }

  ]
  const renderList = (
    <>
      {features.list ? (
        features.list.map((list, index) => (
          <li key={index} className="flex items-center text-lg mb-4">
            <FaCheck className="text-green-500 mr-2" />
            <span className="text-white">{list.list}</span>
            <span className="text-white">ASDASDASD</span>
          </li>
        ))
      ) : (
        <>
          <ShimmerListItem />
          <ShimmerListItem />
          <ShimmerListItem />
        </>
      )}
    </>
  );
  

const modal=(
  <Modal  onClose={handleClickHide}>
      <div>
        <div className="bg-black py-4 px-6 ">
          <h1 className="text-3xl font-bold text-white">{features.planName}</h1>
          <div className="flex items-center text-lg my-4">
            <span className="font-bold text-white mr-2">Duration:</span>
            <span className="text-white">{features.duration}</span>
          </div>
          <div className="flex items-center text-lg">
            <span className="font-bold text-white mr-2">Price:</span>
            <span className="text-green-500">{features.price}</span>
          </div>
        </div>
        <ul className="bg-black p-6">
         {renderList}
        </ul>
       
      </div>
  </Modal>
)


  return (
    <>
    <div className="relative w-full  bg-gray-200">
      <div className=" absolute top-20  w-full">
        <div className="flex justify-between mb-2 items-center">

          <Heading text="Plan Details" />
          <div className="flex justify-between gap-2">
            <Link to={"/dashboard/add/plans "}>
          <Button text="Add Plans" className={"bg-black text-white p-2 mr-4 rounded-xl"}/>
          </Link>
          <Search />
    
          </div>
        </div>
        <DataTable column={COLUMNS} Data={plan} />
      </div>
    </div>
    {showPlan && modal}
    </>
  );
};
export default ViewPlans
  