import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import Modal from "../../components/User/Modal";
import Button from "../../components/User/Button";
import axios from "axios";

const ModalSignUp = () => {
 
  // ! creating a local state variable
  const [isShow, setShow] = useState(false);
  const initialValues = { username: "", email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const[isSubmit,setSubmit]=useState(false)

  //! state =>true=> modal display
  const handleShow = () => {
     setShow(true);
     
  };

  //! state=>false =>modal hide
  const handleClickHide = () => {

    setShow(false);
    setFormValues(initialValues);
    
  };
   

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
  useEffect(()=>{
    postSignup();
  },[formErrors])

 

  console.log(formErrors)

  //validation
  const validate = (values) => {
    
  
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
    } else if (values.password.length < 3) {
      error.password = "Password should more than 3 characters";
    } else if (values.password.length > 10) {
      error.password = "Password should not exceed more than 10 characters";
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
        console.log("hey")
        const data = await axios.post(
          "http://localhost:3000/signup",
          formValues
        );
        console.log("data");
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };


  //! React Element
  const heading = (
    <>
      <div>
        <h1 className="text-2xl">SignUp</h1>
      </div>
    </>
  );
  
  const modal = (
    <Modal onClose={handleClickHide} heading={heading}>
      <div className="h-full">
      
        <form
          className="flex flex-col justify-between h-full "
          onSubmit={handleSubmit}
        >
          <div>
            <label className="text-xl">User name</label>

            {formErrors.username && (
              <p className="text-red-600">{formErrors.username}</p>
            )}
            <input
              type="text"
              name="username"
              placeholder="User Name"
              className="p-3 w-full rounded-md mt-1  text-black"
              value={formValues.username}
              onChange={handleChange}
            />
          </div>
          <div className="mt-3">
            <label className="text-xl">Email</label>
            {formErrors.email && (
              <p className="text-red-600">{formErrors.email}</p>
            )}
            <input
              type="text"
              placeholder="email address"
              name="email"
              className="p-3 w-full rounded-md mt-1 text-black"
              onChange={handleChange}
              value={formValues.email}
            />
          </div>
          <div className="mt-3">
            <label className="text-xl">Password</label>
            {formErrors.password && (
              <p className="text-red-600">{formErrors.password}</p>
            )}
            <input
              type="password"
              placeholder="password"
              name="password"
              className="p-3  w-full text-black rounded-md mt-1"
              onChange={handleChange}
              value={formValues.password}
            />
          </div>
          <div className="mt-9">{<Button name={"Signup"} />}</div>
          <div className="mt-7">
            <p className="text-center">
              Already have account ?{" "}
              <Link className="text-custom-gym  hover:text-white">Login</Link>{" "}
            </p>
          </div>
        </form>
      </div>
    </Modal>
  );
  return (
    <div>
      <Link onClick={handleShow}>SignUp</Link>
      {isShow && modal}
    </div>
  );
};

export default ModalSignUp;
