import { Link } from "react-router-dom";
import useLogin from "../../Hooks/useLogin";
import Alert from "../../components/Alert"
const Login = () => {
  const traineeUrl="/login"
  //!custom hooks for Login and using destructuring  to get values returning from useLogin hook
  const { formValues, formErrors, handleChange, handleSubmit,showAlert } = useLogin(traineeUrl);

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden bg-black">
      <div className="w-full p-6 m-auto bg-black rounded-md shadow-xl shadow-rose-600/40  ring-purple-600 lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-custom-gym underline uppercase decoration-slice">
          Login
        </h1>
        <form className="mt-6" onSubmit={handleSubmit}>
        {showAlert && <Alert text={showAlert} className={"bg-red-600 rounded-md font-sans"} />}
          <div className="mb-2 mt-4">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-white"
              >
              Email
            </label>   
                {formErrors.email  && (
                  <p className="text-red-500">{formErrors.email}</p>
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
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-white"
            >
              Password
            </label>
            {formErrors.password && (
              <p className="text-red-500">{formErrors.password}</p>
            )}
            <input
              type="password"
              name="password"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-orange-600 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              value={formValues.password}
              onChange={handleChange}
            />
          </div>

          <div className="mt-6">
            <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-custom-gym rounded-md hover:bg-orange-500 focus:outline-none focus:bg-orange-600">
              Login
            </button>
          </div>
        </form>

        <p className="mt-8 text-xs font-light text-center text-white">
          Don't have an account?{" "}
          <Link
            to={"/signup"}
            className="font-medium text-custom-gym hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};
export default Login;
