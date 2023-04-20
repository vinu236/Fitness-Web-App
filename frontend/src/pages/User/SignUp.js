import { Link } from "react-router-dom";
import useSignUp from "../../Hooks/useSignUp";
import  Alert  from "../../components/Alert";
import ButtonLoader from "../../components/ButtonLoader";


const SignUp = () => {
  //! here im using custom hook for signup and  using destructuring  to get values returning from useSignup hook
    const{formErrors,formValues,handleChange,handleSubmit,showAlert,isLoading}=useSignUp()
  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden bg-black">
  
      <div className="w-full p-6 m-auto bg-black rounded-md shadow-xl shadow-rose-600/40  ring-purple-600 lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-custom-gym underline uppercase decoration-slice">
          SignUp
        </h1>
        <form className="mt-6" onSubmit={handleSubmit}>
        {showAlert && <Alert text={showAlert} className={"bg-red-600 rounded-md font-sans flex justify-center"} />}
          <div className="mb-2 mt-4">
            <label className="block text-sm font-semibold text-white" htmlFor="userName">
              Username
            </label>
            {formErrors.username && (
              <p className="text-red-600">{formErrors.username}</p>
            )}
            <input
              type="text"
              name="username"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-orange-600 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              value={formValues.username}
              onChange={handleChange}
            />
          </div>

          <div className="mb-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-white"
            >
              Email
            </label>
            {formErrors.email && (
              <p className="text-red-600">{formErrors.email}</p>
            )}
            <input
              type="email"
              name="email"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-orange-600 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              value={formValues.email}
              onChange={handleChange}

            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-semibold text-white">
              Password
            </label>
            {formErrors.password && (
              <p className="text-red-600">{formErrors.password}</p>
            )}
            <input
              type="password"
              name="password"
             value={formValues.password}
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-orange-600 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              onChange={handleChange}
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-semibold text-white">
              Confirm Password
            </label>
            {formErrors.confirmpassword && (
              <p className="text-red-600">{formErrors.confirmpassword}</p>
            )}
            <input
              type="password"
              name="confirmpassword"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-orange-600 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              value={formValues.confirmpassword}
              onChange={handleChange}
            />
          </div>

          <div className="mt-6">
            {isLoading ? (<ButtonLoader className={"w-full flex items-center justify-center px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-custom-gym rounded-md hover:bg-orange-500 focus:outline-none focus:bg-orange-600"} text={"Signing Up"} size={20}/>) :
            (<button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-custom-gym rounded-md hover:bg-orange-500 focus:outline-none focus:bg-orange-600">
              SignUp
            </button>)
            }
          </div>
        </form>

        <p className="mt-8 text-xs font-light text-center text-white">
          Already have an account? 
            <Link
            to={"/login"}
            className="font-medium text-custom-gym hover:underline"
          >
             Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
