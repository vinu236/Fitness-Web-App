import Table from "../../components/Admin/Table";
import Shimmer from "../../components/Shimmer";
import { TbLockOpen, TbLockOff } from "react-icons/tb";
import { useState, useEffect } from "react";
import axios from "axios";
import instance from "../../api/axios";
const Trainee = () => {
  const [trainees, setTrainees] = useState([]);
  useEffect(() => {
    getUserData();
  }, [trainees]);

  const handleLock = async (user) => {
    if (!user) {
      console.log("invalid user");
    }

    try {
      alert("ASFD")
      const { data } = await instance.patch(
        `/${user._id}`,
        { isActive: !erthytrhyuser.isActive }
      );
      const updatedUser = trainees.map((trainee) => {
        if (trainee._id == data._id) {
          return { ...trainee, isActive: data.isActive };
        }
        return trainee;
      });

      return updatedUser;
    } catch (error) {
      console.log(error);
    }
  };

  console.log(trainees);

  const config = [
    { label: "Id", render: (trainees) => trainees._id },
    { label: "TraineeName", render: (trainees) => trainees.userName },
    { label: "email", render: (trainees) => trainees.email },
    {
      label: "Block",
      render: (trainees) => {
        return trainees.isActive ? (
          <TbLockOpen
            className="inline-block cursor-pointer"
            onClick={() => {
              handleLock(trainees);
            }}
          />
        ) : (
          <TbLockOff
            className="inline-block cursor-pointer"
            onClick={() => {
              handleLock(trainees);
            }}
          />
        );
      },
    },
  ];
 

  const getUserData = async () => {
   try {
    const { data } = await axios.get("http://localhost:3000/dashboard/users");
    setTrainees(data);
   } catch (error) {
    console.log(error)
   }
  };

  const keyFn = (trainees) => {
    return trainees._id;
  };

  //!Early return
  if (!trainees) return null;

  //!here iam using conditional rendering
  //if there is no trainee data i will show shimmer UI and if there is i will display my table data,
  return trainees.length === 0 ? (
    <Shimmer />
  ) : (
    <Table config={config} data={trainees} keyFn={keyFn} />
  );
};
export default Trainee;
