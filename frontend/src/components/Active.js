import { useEffect } from "react";
import instance from "../api/axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Active = ({ children }) => {
  const id = useSelector((store) => store.user.uid);
  const navigate = useNavigate();

  useEffect(() => {
    activeCheck();
  }, []);

  const activeCheck = async () => {
    try {
      const { data, status } = await instance.get(`/user/${id}`);
      console.log(data?.getUser.isActive);
      console.log(status);
      if (status == 200) {
        if (!data?.getUser.isActive) {
          localStorage.removeItem("traineeToken");
          localStorage.removeItem("tid");
          toast.error("You are Block By the admin");
          navigate("/login");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return children;
};

export default Active;
