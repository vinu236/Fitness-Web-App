import SideBar from "./src/components/Admin/SideBar";
import DashBoard from "./src/pages/Admin/Dashboard";
import Trainer from "./src/pages/Admin/Trainer";
import Plans from "./src/pages/Admin/Plans";
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
  return (
    <div className="h-screen bg-black">
     console.log("im in home in now ")
      <Navbar />
      <Outlet />
    </div>
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
        element: <Plans />,
      },
      {
        path: "/dashboard/addTrainer",
        element: <AddTrainer />,
      },
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
      { path: "/user/profile", element:  <UserVerification> <UserProfile /> </UserVerification> },
    ],
  },
  {
    path:"/login",
    element:<Login/>
  },
  {
    path:"/signup",
    element:<SignUp/>
  }
]);
