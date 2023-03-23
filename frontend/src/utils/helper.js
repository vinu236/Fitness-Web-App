export const LoginHelper=()=>{

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

    postLogin();
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
      if (Object.keys(formErrors).length === 0) {
        // destructuring the data from response object
        const { data, status } = await axios.post(
          "http://localhost:3000/login",
          formValues
        );
        console.log(data);

        if (status === 200 && data.token && data.uid) {
          //set token and uuid in the localStorage from {data}  using localStorage Api
          localStorage.setItem("token", data.token);
          localStorage.setItem("uuid", data.uid);
          setLogin(false);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
}
