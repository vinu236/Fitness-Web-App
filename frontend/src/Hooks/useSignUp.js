import { useEffect,useState } from "react"
import axios from "axios";
import {useNavigate} from "react-router-dom" ;
import instance from "../api/axios";
import { toast } from "react-toastify";


const useSignUp=()=>{
    const initialValues = { username: "", email: "", password: "" ,confirmpassword:""};
    //creating local variable for that useState is used
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const[isSubmit,setSubmit]=useState(false)
    const[showAlert,setShowAlert]=useState("");
    const[isLoading,setLoading]=useState(false);
    
    const navigate=useNavigate();
     
  
    //! Two way data binding
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormValues({ ...formValues, [name]: value });
    };
   
    const handleSubmit = (e) => {
      //!preventing refreshing the page when i submit the button
      e.preventDefault();
      setFormErrors(validate(formValues));   
      setSubmit(true) 
    };
    //making post  signup request and second argument as dependency fromError  array 
    useEffect(()=>{
      postSignup();
    },[formErrors])
  
   
  
    console.log(formErrors)
  
    //validation
    const validate = (values) => {
      
      console.log("form checking..................................");
      const error = {};
      const emailRegex = /^([A-Za-z]|[0-9])+$/;
  
      if (!values.username) {
        error.username = "Username cannot be blank";
      } else if (values.username.length < 3) {
        error.username = "User name cannot be less than 3 characters";
      }
      if (!values.email) {
        error.email = "Email address cannot be blank";
      } else if (emailRegex.test(values.email)) {
        error.email = "Invalid Email address";
      }
      if (!values.password) {
        error.password = "Password cannot be blank";
     }
       else if (values.password.length < 3) {
        error.password = "Password should more than 3 characters";
      } else if (values.password.length > 10) {
        error.password = "Password should not exceed more than 10 characters";
      }
      if(!values.confirmpassword){
        error.confirmpassword="Password field cannot be blank"
      }
      else if(values.confirmpassword!==values.password){
        error.password="Password is not Match"
      }
  
      return error;
    };
  
    // useEffect(() => {
    //   console.log("use effect");
    //   //! here i am making  Api call
  
    // }, [formErrors]);
  
    const postSignup = async () => {
      console.log(formErrors)
      try {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
          setLoading(true);
          const {data,status} = await  instance.post(
            "/signup",
            formValues
          );
          
          if(status===201){
           setLoading(false);
           const email=formValues.email
           toast.success(`Otp has sent to ${email}`);
            navigate("/otp",{state:email})
          }
          
        }
      } catch (error) {
        console.log(error);
        if(error.response){
          if(error.response.status===409){
            const message=error.response.data
            setShowAlert(message)
            setSubmit(false)
          }else if(error.response.status===500){
            console.log("Internal Server Error")
            setSubmit(false)
          }
        }
      }
    };
   
  return {formErrors,formValues,handleChange,handleSubmit,showAlert,isLoading}
}


export default useSignUp;