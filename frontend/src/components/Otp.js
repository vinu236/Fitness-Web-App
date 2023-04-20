import { useState, useRef, useEffect } from "react";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import{ImSpinner} from "react-icons/im";
import instance from "../api/axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const Otp = () => {
  const inputRef = useRef({});
  const location=useLocation();
  const navigate=useNavigate();
  console.log(location);
  const [otp, setOtp] = useState({
    digit1: "",
    digit2: "",
    digit3: "",
    digit4: "",
    digit5: "",
    digit6: "",
  });

  const[submit,setSubmit]=useState(false);
  const[formError,setFormErrors]=useState({});
  const[isLoading,setLoading]=useState(false);

  useEffect(()=>{
    if(!location?.state){
    navigate("/login")
    }
  },[]);
  useEffect(() => {
    inputRef.current[0].focus();
  }, []);

   useEffect(()=>{
    postOtp();
   },[formError,submit])

  const handleChange = (event, index) => {
    const { name, value } = event.target;

    if (/[a-z]/gi.test(value)) return;

    setOtp({ ...otp, [name]: value.at(-1) });
    
    if (index < 5 && value) {
      // event.target.nextSibling.focus()
      inputRef.current[index + 1].focus();
    }
  };

  const handleBackSpace = (event, index) => {
    if (event.key === "Backspace" && index > 0) {
        console.log(otp)
      inputRef.current[index - 1].focus();
    }
    


  };
  const handleSubmit=async(event)=>{
        event.preventDefault();
        setFormErrors(validate(otp));
        setSubmit(true)
  }

 
  const validate=(otp)=>{
    let err={};
    for(let i=1;i<7;i++){
        const digit =`digit${i}`
        if(!otp[digit]){
            err.message="Please Enter the Otp fields"
            break;
        }
    }
    return err;
  }
  const postOtp=async()=>{
    console.log(formError)
    console.log({submit} ? "true":"false");
  try {
      if(Object.keys(formError).length===0 && submit){
        setLoading(true)
          const email=location?.state
          const Otp = parseInt(otp.digit1 + otp.digit2 + otp.digit3 + otp.digit4 + otp.digit5 + otp.digit6);
          const {data,status}=await instance.post("/verify/otp",{Otp,email});
          
          if(status===201){
            navigate("/login");
            toast.success("Account Created Successfully")
          }
      }

  } catch (error) {
      console.log(error)
  }
}

  const renderInput = Object.keys(otp).map((keys, index) => {
    return (
        <>
      <input
        ref={(element) => (inputRef.current[index] = element)}
        type="text"
        name={keys}
        value={otp[keys]}
        key={index}
        onChange={(event) => handleChange(event, index)}
        className="rounded-md border border-custom-gym bg-black text-custom-gym w-20 h-12 mr-3 text-xl text-center"
        onKeyUp={(event) => handleBackSpace(event, index)}
        disabled={isLoading}
      />

      </>
    );
  });

  return (
    <div className="w-full h-screen bg-black grid place-items-center">
      <form onSubmit={handleSubmit}>
        {formError.message && <div className="text-center mb-4">
            <p className="text-red-600 text-xl">{formError.message}</p>
            </div>}
        {renderInput}
        <div className="flex justify-center mt-5">
          {isLoading ?(
        <button className="bg-custom-gym   px-3 py-2 rounded-md flex items-center justify-center text-xl font-bold" disabled>
        
        { <ImSpinner className="animate-spin mr-2"/> } Verifying
      </button>
          ):(
        <button className="bg-custom-gym hover:bg-custom-head px-3 py-2 rounded-md flex items-center justify-center text-xl font-medium" >
        
        Verify Otp  <BsFillArrowRightCircleFill className="ml-2 hover:  scale-50"  /> 
      </button>
          )}
    </div>
      </form>
    </div>
  );
};
export default Otp;
