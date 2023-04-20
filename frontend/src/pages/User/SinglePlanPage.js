import { useEffect, useState } from "react";
import { FaCheckCircle, FaCalendar } from "react-icons/fa";
import fetchData from "../../utils/helper";
import { useParams } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import instance from "../../api/axios";
import ShimmerListItem from "../../components/ShimmerList";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const SinglePlanPage = () => {
  const [features, setFeatures] = useState([]);
  const navigate=useNavigate();

  const handleToken = async (token) => {
    try {
      const uid= localStorage.getItem("uid")
      const body = {
        token,
        uid,
       features
      };
      const {data,status} = await instance.post("plan/booking", body);
      console.log(data);

      if(status===200){
        toast.success("Payment is Success");
        navigate("/");
      }


    } catch (error) {
     if(error){
      toast.error("Something Went Wrong");
     }
    }
  };

  const { id } = useParams();
  useEffect(() => {
    console.log(id);
    getListDetails(id);
  }, []);

  const getListDetails = async (id) => {
    try {
      const data = await fetchData(id);
      console.log(data);
      setFeatures(data?.data);
    } catch (error) {
      console.log(error);
    }
  };
  const renderList = (
    <>
    {features.list ? (features.list.map((list, index) => {
      return (
        <li key={index} className="flex  text-white p-1">
          <FaCheckCircle className="text-green-500 mr-2" />
          {list.list}
        </li>
      );
    })):
    <>
    <ShimmerListItem />
    <ShimmerListItem />
    <ShimmerListItem />
  </>
    }
    </>
    );


  return (
    <div className="flex flex-col gap-5 shadow-2xl md:flex-row bg-gray-900 mx-4 lg:mx-16 h-[450px] mt-6 rounded-lg ">
      {/* Image section */}
      <div className="md:w-1/2 h-72 md:h-auto relative md:mr-4">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <img
          src="https://wallpapercave.com/w/wp10467299.jpg"
          alt="Plan image"
          className="h-full w-full object-cover animate-pulse"
        />
      </div>

      {/* Plan details section */}
      <div className="md:w-1/2 py-8 px-4 md:px-10 ">
        <h1 className="text-4xl  mb-2 text-white ml-8 font-bold">{features.planName}</h1>
        <p className="flex items-center text-white text-center mb-6 ml-8 mt-5">
          <FaCalendar className="text-green-500 mr-2" />
          <span> Duration: {features.duration}</span>
        </p>
        <ul className="list-disc list-inside mb-4 ml-4 p-4 text-2xl mt-7 ">{renderList}</ul>
        <div className="flex items-center justify-center flex-col md:flex-row">
          {/* <span className="text-2xl font-bold mb-4 md:mb-0 md:mr-4 animate-pulse">
           {features.price}
          </span> */}
          <StripeCheckout
            stripeKey={process.env.REACT_APP_KEY}
            currency="INR"
            amount={features.price * 100}
            token={handleToken}
          >
            <button className="bg-custom-gym hover:bg-custom-head text-white font-bold w-96 py-2 px-4 rounded-xl transform hover:translate-x-1 hover:translate-y-1 transition duration-500 ease-in-out">
              BE A MEMBER
            </button>
          </StripeCheckout>
        </div>
      </div>
    </div>
  );
};

export default SinglePlanPage;
