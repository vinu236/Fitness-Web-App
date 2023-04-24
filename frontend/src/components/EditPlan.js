import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import instance from "../api/axios";
import { RxCrossCircled } from "react-icons/rx";
import { FaTimes } from "react-icons/fa";
import{AiFillEdit} from "react-icons/ai"
import ButtonLoader from "./ButtonLoader";


const EditPlan = () => {
  const [formValues, setFormValues] = useState({});
  const[list,setList]=useState("");
  const { id } = useParams();
  const [imageUrl, setImageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const[editList,setListEdit]=useState(false)
  

  useEffect(() => {
    getPlan();
  }, []);

  const getPlan = async () => {
    try {
        const {data,status}=await instance.get(`/dashboard/getPlans/details/${id}`);
        console.log(data?.data);
        setFormValues(data?.data);
       
    } catch (error) {
        console.log(error);
    }
  };

  const handleDelete = (id) => {
    const filteredList = formValues.list.filter((item, index) => index !== id);
    setFormValues({ ...formValues, list: filteredList });
    setList("");
    setListEdit(false);
  };
  
  const handleEdit=(id)=>{
    const filteredList = formValues.list.filter((item, index) => index === id);
    setList(filteredList[0].list);
    setListEdit(true);

  };

  console.log(list);
  


  const renderedList = formValues?.list?.length > 0 && formValues.list.map((list, index) => {
       return (
      <li
        key={index}
        className="bg-gray-100 flex  justify-between items-center py-2 px-4 rounded-lg mb-4"
      >
        <span className="text-gray-600 mr-4">{list.list}</span>
       <div className="flex gap-3">
       <span className="text-gray-500 cursor-pointer hover:text-blue-400">
          <AiFillEdit onClick={()=>handleEdit(index)}/>
        </span>
        <span className="text-gray-500 cursor-pointer hover:text-red-500">
          <RxCrossCircled onClick={() => handleDelete(index)} />
        </span>
       </div>
      </li>
    );
     
  });
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    setImageUrl(url);
    setFormValues({ ...formValues, img: file });
  };
  const handleCancel = () => {
    setImageUrl(null);
    setFormValues({ ...formValues, img: "" });
  
  };

  const handleListCancel=(e)=>{
    e.preventDefault()
    setList("");
    setListEdit(false);
  }
  const handleUpdate=(e)=>{
    e.preventDefault()
    
    console.log(list);
    console.log(formValues);
    
  }
  const handleChange=(e)=>{
    const {name,value}=e.target;
    setList(value)
    console.log(value)
  }

  const handleAddList=(e)=>{
    e.preventDefault();
    setFormValues({...formValues,list:[...formValues.list,{list}]});
    setList("");
  }

  return (
    <div className="w-full md:w-3/4 lg:w-2/3 mx-auto  md:p-6 rounded-lg shadow-md bg-black mt-16 h-1/2 p-11">
      <h2 className="text-2xl font-bold mb-6 text-center text-white">
        Edit Plan
      </h2>
      <form onSubmit={""}>
        <div className="flex justify-between w-full">
          <div className="mb-4 w-[400px]">
            <label className="block text-white  font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              className="rounded-lg shadow-md border-gray-400 appearance-none border w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              name="planName"
              type="text"
              value={formValues.planName}
              onChange={""}
              placeholder="Enter plan name"
              required
            />
          </div>
          <div className="mb-4 w-[400px]">
            <label
              className="block text-white font-bold mb-2"
              htmlFor="heading"
            >
              Heading
            </label>
            <input
              className="rounded-lg shadow-md border-gray-400 appearance-none border w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
              id="heading"
              type="text"
              value={formValues.heading}
              placeholder="Enter plan heading"
              required
              name="heading"
            />
          </div>
        </div>
        <div className="flex justify-between w-full">
          <div className="mb-4 w-[400px]">
            <label
              className="block text-white font-bold mb-2"
              htmlFor="duration"
            >
              Duration (in months)
            </label>
            <input
              className="rounded-lg shadow-md border-gray-400 appearance-none border w-full py-2 px-3  text-black leading-tight focus:outline-none focus:shadow-outline"
              id="duration"
              type="number"
              name="duration"
              min="1"
              value={formValues.duration}
              placeholder="Enter plan duration"
              required
            />
          </div>
          <div className="mb-4 w-[400px]">
            <label
              className="block text-white font-bold mb-2 w-full text-left"
              htmlFor="price"
            >
              Price
            </label>
            <div className="flex items-center">
              <input
                className="rounded-lg shadow-md border-gray-400 appearance-none border w-full py-2 px-3  text-black leading-tight focus:outline-none focus:shadow-outline"
                id="price"
                type="number"
                name="price"
                min="0.01"
                step="0.01"
                value={formValues.price}
                placeholder="Enter plan price"
                required
              />
            </div>
          </div>
        </div>
        {/* ---------------------------------------------------------------------------------------------------------- */}
        <div className="mb-4">
          
          <label className="block text-white font-bold mb-2 " htmlFor="details">
            Details
          </label>
          <div className="flex">
          <input
            name="list"
            className="rounded-lg shadow-md border-gray-400 appearance-none border w-[400px] py-2 px-3  text-black leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            value={list}
            placeholder="Enter plan detail"
           
            onChange={handleChange}
          />
         {!editList? <button
            className="bg-custom-gym  text-white font-bold ml-6 py-2 px-6 rounded focus:outline-none focus:shadow-outline hover:bg-custom-head"
           onClick={handleAddList}
          >
            Add
          </button>
          :(
          <div >
          <button
            className="bg-custom-gym  text-white font-bold ml-6 py-2 px-6 rounded focus:outline-none focus:shadow-outline hover:bg-custom-head"
            onClick={handleUpdate}
            >
            Update
          </button>
          <button
            className="bg-custom-gym  text-white font-bold ml-6 py-2 px-6 rounded focus:outline-none focus:shadow-outline hover:bg-custom-head"
            onClick={handleListCancel}
            >
            Cancel
          </button>
            </div>)
          
        }
          </div>
          <ul className="mt-3 max-h-24 overflow-y-auto scrollbar-thumb-black scrollbar-track-black">
            {renderedList}
          </ul>
        </div>
        <div className="w-full flex justify-between">
          <div className="flex items-start gap-2 ml-5">
            <div className="w-28 h-28 border border-dashed flex items-center justify-center rounded-sm">
              <label
                className="w-full h-full flex items-center justify-center cursor-pointer hover:opacity-60  relative"
                htmlFor="addPlanImg"
              >
                {imageUrl ? (
                  <img src={imageUrl} className="w-full h-full" alt="img" />
                ) : (
                  <h1 className="text-white text-lg font-bold  absolute top-[38%]">
                    Add Photo
                  </h1>
                )}
                <input
                  type="file"
                  className="hidden"
                  id="addPlanImg"
                  onChange={handleFileChange}
                  name="img"
                  accept="image/*"
                />
              </label>
            </div>
            {imageUrl && (
              <FaTimes
                size={24}
                className="text-red-600 cursor-pointer hover:text-custom-head"
                title="cancel"
                onClick={handleCancel}
              />
            )}
          </div>
          <label className="flex items-center space-x-2 p-3 mr-10">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 rounded-2xl checked:bg-custom-gym "
              name="checkbox"
              onChange={(e) =>
                setFormValues({ ...formValues, Recommended: e.target.checked })
              }
              checked={formValues.Recommended}
            />
            <span className="text-white font-medium">Recommended</span>
          </label>
        </div>
      
        <div className="w-full flex items-center justify-center">
          {!isLoading ? (
            <button className="bg-custom-gym text-white font-bold py-2 w-[150px] px-4 rounded focus:outline-none focus:shadow-outline hover:bg-custom-head">
              Submit
            </button>
          ) : (
            <ButtonLoader
              text={"Updating..."}
              size={24}
              className={
                "bg-custom-gym flex text-white font-bold py-2 w-[150px] px-4 rounded focus:outline-none focus:shadow-outline hover:bg-custom-head"
              }
            />
          )}
        </div>
      </form>
    </div>
  );
};

export default EditPlan;
