import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Modal from "../../components/User/Modal";
import Button from "../../components/User/Button";
import { useNavigate } from "react-router-dom";
import InputField from "../../components/Input";
import axios from "axios";
import Alert from "../../components/Alert"
import { useDispatch } from "react-redux";
import { setUserId,setToken } from "../../Redux/userSlice";

const ModalLogin = () => {
  const [showLogin, setLogin] = useState(false);
  const initialValues = { email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const[submit,setSubmit]=useState(false)
  const[showAlert,setShowAlert]=useState("")
  const navigate = useNavigate();
  const dispatch=useDispatch()
  useEffect(()=>{
   
    postLogin();
  },[formErrors])
  const handleClickShow = () => {
   setLogin(true);
   setFormErrors({})
   setFormValues(initialValues)
   setShowAlert(false);
   setSubmit(false);
   
  };
  const handleClickHide = () => {
 setLogin(false);
  };

  //!handlingChange when user typing on input field making it (Two Data Binding)
  const handleChange = (e) => {
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
          console.log(status)
        if(data?.isBlocked===false){
          console.log("blocked")
          setShowAlert("Your Are Blocked By The Admin--Contact Admin");
        }

        if (status === 200 && data.traineeToken && data.uid) {
          //set token and uuid in the localStorage from {data}  using localStorage Api
          localStorage.setItem("traineeToken", data.traineeToken);
          localStorage.setItem("uid", data.uid);
          dispatch(setToken(data.traineeToken));
          dispatch(setUserId(data.uid));
          setLogin(false);
          navigate("/");
        }
      }
    } catch (error) {
      console.log(error);
      if(error.response){
        if(error.response.status==401){
          const message=error.response.data
          setShowAlert(message)
        }else if(error.response.status===500){
          console.log("internal server error");
        }
      }
    
     
    }
  };

  //!heading React Element
  const heading = (
    <div>
      <h1 className="text-3xl font-sans font-medium">Login</h1>
    </div>
  );

  //! modal React element
  const modal = (
    //The component is composed of a Modal component with props onClose and heading
    <Modal onClose={handleClickHide} heading={heading}>
      <div className="h-full">
        <form className="flex flex-col gap-7 h-full" onSubmit={handleSubmit}>
          {showAlert && <Alert text={showAlert} className={"bg-red-600 rounded-md font-sans"} />}
          <div>
            <label className="text-xl">Email</label>
            {formErrors.email && (
              <p className="text-red-500">{formErrors.email}</p>
            )}
            <InputField
              type={"text"}
              className={"p-3 w-full mt-1 rounded-md text-black"}
              placeholder={"email address"}
              name={"email"}
              value={formValues.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="text-xl">Password</label>
            {formErrors.password && (
              <p className="text-red-500">{formErrors.password}</p>
            )}
            <InputField
              type="password"
              placeholder="password"
              className="p-3 mt-1 w-full text-black rounded-md"
              name="password"
              value={formValues.password}
              onChange={handleChange}
            />
          </div>
          <div>{<Button name={"Login"} />}</div>
          <div className="mt-4">
            <p className="text-center">
              Don't You have account ?{" "}
              <Link className="text-custom-gym  hover:text-white">Sigup</Link>{" "}
            </p>
          </div>
        </form>
      </div>
    </Modal>
  );

  //! Returning JSX
  return (
    <div>
      <Link onClick={handleClickShow}>Login</Link>
      {/* //modal will show up when showLogin is true. (when the user click the
      login link and change the state to true) */}
      {showLogin && modal}
    </div>
  );
};

export default ModalLogin;
