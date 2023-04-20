import React, { useState } from "react";
import {
  FaUserCircle,
  FaLock,
  FaEdit,
  FaSignOutAlt,
  FaRegAddressCard,
} from "react-icons/fa";
import { HiOutlineMail, HiOutlinePhone } from "react-icons/hi";

const TrainerProfil = () => {
  const [password, setPassword] = useState("");
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

  const handleChangePassword = () => {
    // Code to handle password change
  };

  const handleLogout = () => {
    // Code to handle logout
  };

  return (
    <div className="w-full mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="bg-gray-200 text-center py-4">
        <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src="/trainer-profile-image.jpg"
            alt="Trainer Profile Image"
          />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
            <button className="bg-gray-600 text-white rounded-full px-3 py-1">
              <FaEdit />
            </button>
          </div>
        </div>
        <h1 className="text-2xl font-bold mt-4">John Doe</h1>
      </div>
      <div className="px-4 py-2">
        <div className="flex items-center mb-4">
          <HiOutlineMail className="w-4 h-4 mr-2" />
          <span className="font-bold">ajithvinu23@gmail.com</span>
        </div>
        <div className="flex items-center mb-4">
          <HiOutlinePhone className="w-4 h-4 mr-2" />
          <span className="font-bold">will Add</span>
        </div>
        <hr className="my-4" />
        <h2 className="text-lg font-bold mb-2">Trainee Details</h2>
    <div className="overflow-auto max-h-60">
      <table className="table-auto w-full">
        <thead>
          <tr className="border-b-2 border-gray-300">
            <th className="px-4 py-2">#</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Phone</th>
            <th className="px-4 py-2">Address</th>
          </tr>
        </thead>
        <tbody>
          {traineeDetails.map((trainee) => (
            <tr key={trainee.id}>
              <td className="border px-4 py-2">{trainee.id}</td>
              <td className="border px-4 py-2">{trainee.name}</td>
              <td className="border px-4 py-2">{trainee.email}</td>
              <td className="border px-4 py-2">{trainee.phone}</td>
              <td className="border px-4 py-2">{trainee.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <hr className="my-4" />
    <div className="flex justify-between items-center">
      <div className="flex items-center">
        <FaRegAddressCard className="w-5 h-5 mr-2" />
        <span className="font-bold">123 Main St, Anytown, USA</span>
      </div>
      <button className="text-blue-500 font-bold hover:underline">
        Edit
      </button>
    </div>
    <hr className="my-4" />
    <div className="flex justify-between items-center">
      <div className="flex items-center">
        <FaLock className="w-5 h-5 mr-2" />
        <span className="font-bold">Change Password</span>
      </div>
      <form onSubmit={handleChangePassword}>
        <input
          type="password"
          className="border border-gray-400 p-2 rounded-md"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2"
        >
          Save
        </button>
      </form>
    </div>
    <hr className="my-4" />
    <div className="text-center">
      <button
        className="bg-red-500 text-white font-bold py-2 px-4 rounded-md hover:bg-red-700 transition-colors duration-300"
        onClick={handleLogout}
      >
        <FaSignOutAlt className="w-5 h-5 inline-block mr-2" />
        Logout
      </button>
    </div>
  </div>
</div>
);
};

export default TrainerProfil;