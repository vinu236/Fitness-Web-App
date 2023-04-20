import { useState, useEffect } from "react";
import { RxCrossCircled } from "react-icons/rx";
import instance from "../api/axios";
import {useNavigate} from "react-router-dom"

function AddPlanForm() {
  const intialValues = {
    planName: "",
    heading: "",
    price: "",
    duration: "",
    list: "",
    Recommended:false
  };
  const [formValues, setFormValues] = useState(intialValues);
  const [formList, setFormList] = useState([]);
  const[isChecked,setCheck]=useState(false)
  const navigate=useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  console.log(formValues);
  const handleListChange = (event) => {
    const { value } = event.target;
    setFormValues({ ...formValues, list: value });
  };

  const handleAddList = (e) => {
    e.preventDefault();
    //!preventing the default  refreshing behavior when submitting the form
    setFormList([...formList, { list: formValues.list }]);
    setFormValues({ ...formValues, list: "" });
  };
  console.log(formValues);

  const handleDelete = (id) => {
    const ListFilter = formList.filter((list, index) => {
      return id !== index;
    });
    setFormList(ListFilter);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you can add code to submit the form data to the server
    const formData = { ...formValues, list: formList.map((items) => items) };

    postPlan(formData);
  };
  const postPlan = async (formData) => {
    try {
      alert("asd");
      console.log("hell");
      const data = await instance.post(
       "dashboard/addPlan",
        formData
      );
      
      navigate("/dashboard/plans");
    } catch (error) {
      console.log(error);
    }
  };

  const renderedList = formList.map((list, index) => {
    return (
      <li
        key={index}
        className="bg-gray-100 flex  justify-between items-center py-2 px-4 rounded-lg mb-4"
      >
        <span className="text-gray-600 mr-4">{list.list}</span>
        <span className="text-gray-500 cursor-pointer hover:text-red-500">
          <RxCrossCircled onClick={() => handleDelete(index)} />
        </span>
      </li>
    );
  });

  return (
    <div className="w-full md:w-3/4 lg:w-2/3 mx-auto  md:p-6 rounded-lg shadow-md bg-black mt-16 h-1/2 p-11">
      <h2 className="text-2xl font-bold mb-6 text-center text-white">Add New Plan</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between w-full">
          <div className="mb-4 w-[400px]">
            <label
              className="block text-white  font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="rounded-lg shadow-md border-gray-400 appearance-none border w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              name="planName"
              type="text"
              value={formValues.planName}
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
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
                onChange={handleChange}
                placeholder="Enter plan price"
                required
              />
            </div>
          </div>
        </div>
        {/* ---------------------------------------------------------------------------------------------------------- */}
        <div className="mb-4   ">
          <label
            className="block text-white font-bold mb-2 "
            htmlFor="details"
          >
            Details
          </label>
          <input
            name="list"
            className="rounded-lg shadow-md border-gray-400 appearance-none border w-[400px] py-2 px-3  text-black leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            value={formValues.list}
            onChange={handleListChange}
            placeholder="Enter plan detail"
          />
          <button
            onClick={handleAddList}
            className="bg-custom-gym  text-white font-bold ml-6 py-2 px-6 rounded focus:outline-none focus:shadow-outline"
          >
            Add
          </button>

          <ul className="mt-3 max-h-32 overflow-y-auto scrollbar-thumb-black scrollbar-track-black">{renderedList}</ul>
        </div>
        <label className="flex items-center space-x-2 p-3">
          <input
            type="checkbox"
            className="form-checkbox h-5 w-5 checked:bg-custom-gym "
            name="checkbox"
            onChange={(e)=>setFormValues({...formValues,Recommended:e.target.checked})}
            checked={formValues.Recommended}
          />
          <span className="text-white font-medium">Recommended</span>
        </label>
        <div className="w-full flex items-center justify-center">
        <button className="bg-custom-gym text-white font-bold py-2 w-[150px] px-4 rounded focus:outline-none focus:shadow-outline">
          Submit
        </button>
        </div>
      </form>
    </div>
  );
}

export default AddPlanForm;
