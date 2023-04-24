import instance from "../api/axios";
import Button from "./Button";
import { useEffect, useState } from "react";
import { FaTimes, FaUpload } from "react-icons/fa";
import { useSelector } from "react-redux";
import{ImSpinner9} from "react-icons/im"
import { toast } from "react-toastify";
import PageLoader from "./PageLoader";
import { traineeAuth } from "../../config";
import { useNavigate } from "react-router-dom";
const UserProfileSection = ({ src, onClick }) => {
  const [user, setUser] = useState({});
  const[isFileSelected,setIsFileSelected]=useState(false);
  const[selectedFile,setSelectedFile]=useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const[isLoading,setIsLoading]=useState(false)
  const uid=useSelector(store=>store.user.uid);
  const navigate=useNavigate();

  const id = localStorage.getItem("uid");
  const token=localStorage.getItem("traineeToken");
  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      console.log(traineeAuth);
      const { data, status } = await instance.get(`/user/${id}`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      });
      console.log(data);
      if (status === 200) {
        setUser(data?.getUser);
      }
    } catch (error) {
      if(error.response){
        console.log(error.response)
        if(error.response.status===403){
          const message=error.response.data
          localStorage.removeItem("traineeToken")
          localStorage.removeItem("uid");
          toast.error(message);
          navigate("/login");
        }
        if(error.response.status===401){
          const message=error.response.data
          console.log(message);
          localStorage.removeItem("traineeToken");
          localStorage.removeItem("uid")
          navigate("/login")
          toast.error(message);
        }
      }
    }
  };
  const handleFileChange=(e)=>{
    
    const file=e.target.files[0]
    setSelectedFile(file);
    setIsFileSelected(true);
    setImageUrl(URL.createObjectURL(file))

  }
  const handleUpload=async()=>{
    const formData  =new FormData();
    console.log(selectedFile)
    formData.append("img",selectedFile);

    // console.log(formData.get("avatar").size);
    // console.log(formData.get("avatar").type);
    try {
        setIsLoading(true)  
        setIsFileSelected(false)
      const {data,status}=await instance.patch(`/update/img/${uid}`,formData,{
        headers:{
          "Content-Type":"multipart/form-data",
          Authorization:`Bearer ${token}`
        },
      })
      console.log(status)
      console.log(data);
      if(status===403){
        localStorage.removeItem("traineeToken")
        localStorage.removeItem("uid");
        toast.error("You are Blocked By the Admin");
        navigate("/login");
      
      }
      if(status===201){
        setIsLoading(false);
        
        toast.success("Image Uploaded Successfully")
      }
    } catch (error) {
      if(error.response){
        console.log(error.response)
        if(error.response.status===403){
          const message=error.response.data
          localStorage.removeItem("traineeToken")
          localStorage.removeItem("uid");
          toast.error(message);
          navigate("/login");
        }
        if(error.response.status===401){
          const message=error.response.data
          console.log(message);
          localStorage.removeItem("traineeToken");
          localStorage.removeItem("uid")
          navigate("/login")
          toast.error(message);
        }
      }
    }

 


  }
  const handleCancel=()=>{
    setSelectedFile(null);
    setIsFileSelected(false);
    setImageUrl(null)

  }
  console.log(user);
  return Object.keys(user).length === 0 ? <PageLoader/>:(
    <div className="text-red-200 h-[610px] bg-black  w-[254px] shadow-lg flex flex-col items-center gap-4 border-t-custom-gym border-r-2 border-r-custom-gym rounded-tr-[24px] rounded-br-[98px]">
      <label
        htmlFor="profile-image"
        className=" relative rounded-full w-24 h-24 mt-8 cursor-pointer flex items-center justify-center"
      >
        <img
          src={imageUrl||user?.proImg?.url || src}
          alt="Profile avatar"
          className="rounded-full w-full h-full"
          
        />
        {!isLoading &&<input type="file" id="profile-image" className="hidden" name="img" onChange={handleFileChange} accept="image/*" />}
       {!isLoading ?( <div className="absolute inset-0 bg-black opacity-0 rounded-full flex justify-center items-center cursor-pointer hover:opacity-40 transition-all duration-300">
          <FaUpload className="text-white text-3xl" />
        </div>)
        :
        (<div className="absolute inset-0 bg-black rounded-full opacity-80 flex justify-center items-center">
          <ImSpinner9 className="text-custom-gym animate-spin opacity-100" />
        </div>)
}
      </label>
      {isFileSelected && (
        <div className="flex items-center justify-center gap-4">
          <FaUpload className="text-red-600 cursor-pointer" size={24} title="Upload" onClick={handleUpload}/>
          <FaTimes
            size={24}
            className="text-red-600 cursor-pointer"
            title="cancel"
            onClick={handleCancel}
          />
        </div>
      )}
      <p className="text-white font-medium ">{user.userName}</p>
      <p className="text-sm">{user.email}</p>
      <div>
        <span>Plan: </span>
        <p
          className={
            user.plan
              ? "text-green-600 text-md inline font-bold"
              : "text-red-600  text-md inline font-bold"
          }
        >
          {user.plan ? "Active" : "Not Active"}
        </p>
      </div>
      <div>
        <span>Bmi: </span>
        <p
          className={
            user.plan
              ? "text-green-600 text-md inline font-bold"
              : "text-red-600  text-md inline font-bold"
          }
        ></p>
      </div>
      <Button
        className={"bg-custom-head p-2 w-[80px] mt-8 rounded-xl"}
        text={"Logout"}
        onClick={onClick}
      />
    </div>
  );
};

export default UserProfileSection;
