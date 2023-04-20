import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import instance from "../api/axios";

const EditPlan = () => {
  const [formValues, setFormValues] = useState({});
  const[list,setList]=useState([]);
  const { id } = useParams();

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
        <div className="flex justify-between w- full">
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
        <div className="mb-4   ">
          <label className="block text-white font-bold mb-2 " htmlFor="details">
            Details
          </label>
          <input
            name="list"
            className="rounded-lg shadow-md border-gray-400 appearance-none border w-[400px] py-2 px-3  text-black leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            value={formValues.list}
            placeholder="Enter plan detail"
          />
          <button className="bg-custom-gym  text-white font-bold ml-6 py-2 px-6 rounded focus:outline-none focus:shadow-outline">
            Add
          </button>

          <ul className="mt-3 max-h-32 overflow-y-auto scrollbar-thumb-black scrollbar-track-black">
            {"renderedList"}
          </ul>
        </div>
        <label className="flex items-center space-x-2 p-3">
          <input
            type="checkbox"
            className="form-checkbox h-5 w-5 checked:bg-custom-gym "
            name="checkbox"
            //   onChange={(e)=>setFormValues({...formValues,Recommended:e.target.checked})}
            //   checked={formValues.Recommended}
          />
          <span className="text-white font-medium">Recommended</span>
        </label>
        <div className="w-full flex items-center justify-center">
          <button className="bg-custom-gym text-white font-bold py-2 w-[150px] px-4 rounded focus:outline-none focus:shadow-outline">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPlan;
