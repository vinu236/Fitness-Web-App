import axios from "axios";
import {useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
// import Alert from "../../components/Alert"
const useLogin=()=>{
    const initialValues = { email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const[submit,setSubmit]=useState(false)
  const[showAlert,setShowAlert]=useState("")
  const navigate=useNavigate()

  useEffect(()=>{
   
    postLogin();
  },[formErrors])


  //!handlingChange when user typing on input field making it (Two Data Binding)
  const handleChange = (e) => {
    console.log(e.target)
    //using object destructing getting name and value attributes from synthetic event e
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  //! event handler(e)
  const handleSubmit = (e) => {
    //! preventing from submitting (preventing default behaviour)
    e.preventDefault();
    setFormErrors(validate(formValues));
    setSubmit(true)
   
  };

  //!client side validation -formValues(user credentials)
  const validate = (values) => {
    const error = {};
    const emailRegex = /^([A-Za-z]|[0-9])+$/;
    if (!values.email) {
      error.email = "Email cannot be blank";
    } else if (emailRegex.test(values.email)) {
      error.email = "Invalid Email";
    }
    if (!values.password) {
      error.password = "password field cannot be blank";
    } else if (values.password.length < 3) {
      error.password = "password should be more than 3 characters";
    } else if (values.password.length > 10) {
      error.password = "password cannot be more than 10 characters";
    }
    return error;
  };

  //!after checking formError  -making Api call using axios js library
  const postLogin = async () => {
    try {
      
      if (Object.keys(formErrors).length === 0 && submit) {
       
        // destructuring the data from response object
        const { data, status } = await axios.post(
          "http://localhost:3000/login",
          formValues
        );
          console.log(data)
        if(data?.isBlocked===false){
          console.log("blocked")
          setShowAlert("Your Are Blocked By The Admin--Contact Admin");
          setSubmit(false)
        }
            console.log(status)
            
            console.log(data.traineeToken)
        if (status === 200 && data.traineeToken && data.uid) {
           alert("login")
          //set token and uuid in the localStorage from {data}  using localStorage Api
          localStorage.setItem("traineeToken", data.traineeToken);
          localStorage.setItem("uuid", data.uid);
          
            navigate("/")
        
        }
      }
    } catch (error) {
      console.log(error);
      setSubmit(false)  
      if(error.response){
        if(error.response.status==401){
          const message=error.response.data
          setShowAlert(message)
          setSubmit(false)   
        }else if(error.response.status===500){
          console.log("internal server error");
          setSubmit(false)  
        }
      }
    
     
    }
  };


  return  { formValues, formErrors, handleChange, handleSubmit,showAlert }
}
export default useLogin; 