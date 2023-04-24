import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import instance from "../api/axios";
import { useDispatch } from "react-redux";
import { setUserId, setToken,setIsBlocked } from "../Redux/userSlice";
import { setTrainerToken,setTrainerId } from "../Redux/trainerSlice";
const useLogin = (url) => {
  console.log(url);
  const initialValues = { email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [submit, setSubmit] = useState(false);
  const [showAlert, setShowAlert] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    postLogin();
  }, [formErrors]);

  //!handlingChange when user typing on input field making it (Two Data Binding)
  const handleChange = (e) => {
    console.log(e.target);
    //using object destructing getting name and value attributes from synthetic event e
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  //! event handler(e)
  const handleSubmit = (e) => {
    //! preventing from submitting (preventing default behavior)
    e.preventDefault();
    setFormErrors(validate(formValues));
    setSubmit(true);
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
    } else if (values.password.length > 15) {
      error.password = "password cannot be more than 10 characters";
    }
    return error;
  };

  //!after checking formError  -making Api call using axios js library
  const postLogin = async () => {
    try {
      if (Object.keys(formErrors).length === 0 && submit) {
        // destructuring the data from response object
        const { data, status } = await instance.post(url, formValues);
        console.log(data);  

        if (data?.isBlocked === false) {
          console.log("blocked");
          setShowAlert("Your Are Blocked By The Admin--Contact Admin");
          setSubmit(false);
        }
        console.log(status);

        // code to execute if the condition is true
        if (status == 200 && data.traineeToken && data.uid) {
          localStorage.setItem("traineeToken", data.traineeToken);
          localStorage.setItem("uid", data.uid);
          dispatch(setToken(data.traineeToken));
          dispatch(setUserId(data.uid));
          dispatch(setIsBlocked(data.isBlocked))
          toast.success("Logged in Successfully");
          navigate("/");
        }

        //TODO: TRAINER SECTION PENDING
        if (status == 200 && data.trainerToken && data.tid) {
          localStorage.setItem("trainerToken", data.trainerToken);
          localStorage.setItem("tid", data.tid);
          dispatch(setTrainerId(data.tid));
          dispatch(setTrainerToken(data.trainerToken))
          toast.success("Logged in Successfully");
          navigate("/");
        }
      }
    } catch (error) {
      setSubmit(false);
      setShowAlert("")
      console.log(error);
      if (error.response) {
        if (error.response.status == 404) {
          const message = error.response.data;
          setShowAlert(message);
          setSubmit(false);
        } else if (error.response.status === 500) {
          console.log("internal server error");
          setSubmit(false);
        }
      }
    }
  };

  return { formValues, formErrors, handleChange, handleSubmit, showAlert };
};
export default useLogin;
