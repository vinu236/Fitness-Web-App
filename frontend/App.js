import SideBar from "./src/components/Admin/SideBar";
import DashBoard from "./src/pages/Admin/Dashboard";
import Trainer from "./src/pages/Admin/Trainer";
import Home from "./src/pages/User/Home";
import AdminLogin from "./src/pages/Admin/AdminLogin";
import User from "./src/pages/Admin/users";
import AddTrainer from "./src/pages/Admin/AddTrainer";
import UserProfile from "./src/pages/User/UserProfile.";
import Navbar from "./src/components/User/Navbar";
import Login from "./src/pages/User/Login";
import SignUp from "./src/pages/User/SignUp";
import UserVerification from "./src/Verification/UserVerification";
import { createBrowserRouter, Outlet } from "react-router-dom";
import {  ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import TrainerLogin from "./src/pages/User/TrainerLogin";
import AddPlanForm from "./src/components/Plans";
import ViewPlans from "./src/pages/Admin/Plans";
import TrainerProfile from "./src/pages/User/TrainerProfile";
import SinglePlanPage from "./src/pages/User/SinglePlanPage";
import Bookings from "./src/pages/Admin/Bookings";
import { useDispatch } from "react-redux";
import { setToken, setUserId } from "./src/Redux/userSlice";
import { setTrainerId,setTrainerToken } from "./src/Redux/trainerSlice";
import Otp from './src/components/Otp';
import PageLoader from "./src/components/PageLoader";
import EditPlan from "./src/components/EditPlan";
import Active from "./src/components/Active";

const AdminLayout = () => {
  return (
    <>
    <ToastContainer/>
    <div className="flex">
      <SideBar /> 
      <Outlet />
    </div>
    </>
  );
};
const UserAppLayout = () => {
const userToken=localStorage.getItem("traineeToken");
const userId=localStorage.getItem("uid");
const trainerToken=localStorage.getItem("trainerToken");
const tid=localStorage.getItem("tid");
const dispatch=useDispatch();

  if(userToken && userId){
    dispatch(setToken(userToken));
    dispatch(setUserId(userId));

  }
  if(trainerToken && tid){
    dispatch(setTrainerId(tid))
    dispatch(setTrainerToken(trainerToken))
  }
  return (
    <>
    <ToastContainer/>
    <div className="h-screen bg-black">

      <Navbar />
      
      <Outlet />
    </div>
    </>
  );
};

export const AppRouter = createBrowserRouter([
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },
  {
    path: "/dashboard",
    element: <AdminLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/dashboard",
        element: <DashBoard />,
      },
      {
        path: "/dashboard/users",
        element: <User />,
      },
      {
        path: "/dashboard/trainer",
        element: <Trainer />,
      },
      {
        path: "/dashboard/plans",
        element: <ViewPlans/>,
      },
      {
        path: "/dashboard/addTrainer",
        element: <AddTrainer />,
      },
      //TODO: CHECK THIS 
      // {
      //   path:"/dashboard/trainer/:id",
      //   element:<UserDetails/>
      
      // },
      {
        path:"/dashboard/add/plans",
        element:<AddPlanForm/>
      }
      ,
      {
        path:"/dashboard/bookings",
        element:<Bookings/>
      }
      ,
      {
        path:"/dashboard/edit/plan/:id",
        element:<EditPlan/>
      }
     
    ],
  },
  {
    path: "/",
    element: <UserAppLayout />,
    children: [
      {
        path: "/",
        element:  <Home />,
      },
      { path: "/user/profile", element:  <UserVerification> <UserProfile /> </UserVerification>},
      {
        path:"/trainer/profile",
        element:<TrainerProfile/>
      },
      {
        path:"/single/plan/:id",
        element:<SinglePlanPage/>
      }
      
    ],
  },
  {
    path:"/login",
    element: <><ToastContainer/><Login/></> 
  },
  {
    path:"/signup",
    element:<SignUp/>
  },
  {
    path:"/trainer/login",
    element:<TrainerLogin/>
  },
  {
    path:"/otp",
    element:<><ToastContainer/><Otp/></>
  },
  {
    path:"/loader",
    element:<PageLoader/>
  }

  
]);
