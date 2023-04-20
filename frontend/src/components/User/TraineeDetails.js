import { useState, useEffect } from "react";
import axios from "axios";
import instance from "../../api/axios";
const TraineeDetails = () => {
  const [trainers, setTrainer] = useState([]);

  useEffect(() => {
    getTrainerInfo();
  }, []);

  const getTrainerInfo = async () => {
    try {
      const { data } = await instance.get("/dashboard/users");
     setTrainer(data);
    } catch (error) {
      console.log(error);
    }
  };
  const theadDetails = [
    {
      head: "#",
    },
    {
      head: "Name",
    },
    {
      head: "Email",
    },
    {
      head: "Active",
    },
  ];
  const [traineeDetails, setTraineeDetails] = useState([
    {
      id: 1,
      name: "Jane Doe",
      email: "janedoe@example.com",
      phone: "+1 234-567-8901",
      address: "123 Main St, Anytown, USA",
    },
    {
      id: 2,
      name: "Bob Smith",
      email: "bobsmith@example.com",
      phone: "+1 234-567-8902",
      address: "456 Elm St, Anytown, USA",
    },
    {
      id: 3,
      name: "Alice Johnson",
      email: "alicejohnson@example.com",
      phone: "+1 234-567-8903",
      address: "789 Maple St, Anytown, USA",
    },
    {
      id: 4,
      name: "Mark Brown",
      email: "markbrown@example.com",
      phone: "+1 234-567-8904",
      address: "101 Oak St, Anytown, USA",
    },
    {
      id: 5,
      name: "Sarah Lee",
      email: "sarahlee@example.com",
      phone: "+1 234-567-8905",
      address: "222 Pine St, Anytown, USA",
    },
  ]);
  const renderThead = theadDetails.map((head, index) => {
    return <th className="px-4 py-2 text-white">{head.head}</th>;
  });

  const renderTableData = trainers.map((trainee) => (
    <tr key={trainee.id}>
      <td className="border px-4 py-2 text-white text-center">{trainee._id}</td>
      <td className="border px-4 py-2 text-white text-center">{trainee.userName}</td>
      <td className="border px-4 py-2 text-white text-center">{trainee.email}</td>
      <td className={`border px-4 py-2  text-center ${ trainee.isActive ? "text-green-400" : "text-red-500"}`}>{trainee.isActive ? "Active":"Not Active"}</td>
    </tr>
  ));
  return (
    <table className="table-auto w-full">
      <thead>
        <tr className="border-b-2 border-gray-300">{renderThead}</tr>
      </thead>
      <tbody>{renderTableData}</tbody>
    </table>
  );
};
export default TraineeDetails;
