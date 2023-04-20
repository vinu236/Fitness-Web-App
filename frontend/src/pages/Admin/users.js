import { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
import { TbLockOpen, TbLockOff } from "react-icons/tb";
import {BsArrowRightCircleFill} from "react-icons/bs"
import TableShimmer from "../../components/TableShimmer";
import DataTable from "../../components/DataTable";
import Search from "../../components/Search";
import Heading from "../../components/Heading";
import { URL } from "../../../config";
import { Link } from "react-router-dom";
const User = () => {
  const [trainees, setTrainees] = useState([]);
  const [text, setText] = useState("gggg");
  useEffect(() => {
    getUserData();
  }, []);

  const handleLock = (row) => {
    const user = row?.values;
    console.log(user);
    if (!user) {
      console.log("User is not found");
    }

    swal({
      title: ` ${user.isActive ? "Block" : "Unblock"}`,
      text: "Are you Sure ?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((result) => {
      if (result) {
        updateStatus(user);

        swal(`Successfully ${user.isActive ? "Block" : "Unblock"}`, {
          icon: "success",
        });
      } else {
        swal("Cancelled the request successfully");
      }
    });
  };

  const updateStatus = async (user) => {
    try {
      const { data } = await axios.patch(`${URL}/dashboard/users/${user._id}`, {
        isActive: !user.isActive,
      });

      console.log(data);
      const updateUser = trainees.map((trainee) => {
        if (trainee._id === data._id) {
          return { ...trainee, isActive: data.isActive };
        }
        return trainee;
      });
      console.log(updateUser);
      setTrainees(updateUser);
      console.log(trainees);
    } catch (error) {
      console.log(error);
    }
  };



  const COLUMNS = [
    {
      Header: "ID",
      accessor: "_id",
    },
    {
      Header: "User Name",
      accessor: "userName",
    },
    {
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "Block User",
      accessor: "isActive",
      Cell: ({ row }) => {
        return row.values.isActive ? (
          <TbLockOpen
            className="inline-block cursor-pointer"
            onClick={() => {
              handleLock(row);
            }}
          />
        ) : (
          <TbLockOff
            className="inline-block cursor-pointer"
            onClick={() => {
              handleLock(row);
            }}
          />
        );
      },
    },
    {
      Header: "More Details",
      accessor: "",
      Cell:({row})=>{
        return(
          <Link to={"/dashboard/user/"+row.values._id}>
          <BsArrowRightCircleFill className="inline-block cursor-pointer" />
          </Link>
        )

      }
    },
  ];

  const getUserData = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/dashboard/users");
      console.log(data);
      setTrainees(data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!trainees) return null;

  //!here iam using conditional rendering
  //if there is no trainee data i will show shimmer UI and if there is i will display my table data,
  return trainees.length === 0 ? (
    <TableShimmer />
  ) : (
  <div className="relative w-full  bg-gray-200">
    <div className=" absolute top-20  w-full">
      <div className="flex justify-between mb-2 items-center">
        

        <Heading text="Trainee Details" />
        <Search />
      </div>
      <DataTable column={COLUMNS} Data={trainees} />
    </div>
  </div>
  );
};

export default User;
