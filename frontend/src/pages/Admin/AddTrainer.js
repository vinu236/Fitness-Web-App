import InputField from "../../components/Input";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import instance from "../../api/axios";
const AddTrainer = () => {
  const initialValues = { userName: "", email: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formError, setFormError] = useState({});
  const [isSubmit, setSubmit] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(e.target.value);
    setFormValues({ ...formValues, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError(validation(formValues));
    // ! to avoid initial rendering
    setSubmit(true);
  };
  useEffect(() => {
    postAddTrainer();
  }, [formError]);

  async function postAddTrainer() {
   
    try {
      if (Object.keys(formError).length === 0 && isSubmit) {
        const { data, status } = await instance.post(
          `/dashboard/addTrainer`,
          formValues
        );
        console.log(data);

        if (status === 201) {
          toast.success(`otp successfully sent to ${formValues.email}`);
          navigate("/dashboard/trainer");
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  const validation = (values) => {
    console.log(values);
    let error = {};
    if (!values.userName) {
      error.userName = "Username Cannot Be Empty";
    }
    if (!values.email) {
      error.email = "Email Cannot Be Empty";
    }
    return error;
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen w-full  bg-gray-200">
        <div className="w-1/2 bg-black rounded shadow-2xl p-8 m-4">
          <h1 className="block w-full text-center text-custom-gym text-2xl font-semibold mb-6">
            Add Trainer
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col mb-4">
              <label className="mb-2 font-semibold text-lg text-white">
                Trainer Name
              </label>
              {formError.userName && (
                <p className="text-red-500">{formError.userName}</p>
              )}
              <InputField
                type="text"
                value={formValues.userName}
                onChange={handleChange}
                name="userName"
                className={"border py-2 px-3 text-grey-800"}
              />
            </div>
            <div className="flex flex-col mb-4">
              <label className="mb-2 font-semibold text-lg text-white">
                Email
              </label>
              {formError.email && (
                <p className="text-red-500">{formError.email}</p>
              )}
              <InputField
                type="email"
                value={formValues.email}
                onChange={handleChange}
                name="email"
                className={"border py-2 px-3 text-grey-800"}
              />
            </div>
            {/* <div className="flex flex-col mb-4">
                    <label className="mb-2 font-semibold text-lg text-white" >Date Of Join </label>
                    <InputField  type="date" value={fromValues.date} onChange={handleChange}/>
                </div> */}

            <button className="block bg-custom-gym hover:bg-orange-500 text-white uppercase text-lg mx-auto p-2 mt-5 rounded">
              Add Trainer
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddTrainer;
