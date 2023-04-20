import { RiLockPasswordFill } from "react-icons/ri";
import { AiOutlineSave } from "react-icons/ai";
import { useState } from "react";

const ChangePassword=()=>{
    const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const handleChangePassword = () => {
    // Code to handle password change
    alert("sadf")
  };

return(
    <div className="flex flex-col items-center justify-center p-6">
    <div className="flex items-center justify-center w-full">
      <span className="font-bold text-gray-500 text-2xl">Change Password</span>
    </div>
    <form className="flex flex-col items-center w-full justify-center" onSubmit={handleChangePassword}>
      <div className="flex flex-col items-center w-full mt-4">
        <div className="flex items-center p-3 mb-2">
          <RiLockPasswordFill className="w-6 h-6 text-gray-500 mr-2" />
          <input
            type="password"
            placeholder="Current Password"
            className="border border-gray-400 p-2 rounded-md w-72"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center p-3 mb-2">
          <RiLockPasswordFill className="w-6 h-6 text-gray-500 mr-2" />
          <input
            type="password"
            placeholder="New Password"
            className="border border-gray-400 p-2 rounded-md w-72"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="flex items-center justify-center bg-custom-gym text-white px-4 py-2 rounded-md mt-4 w-44 "
        >
          <AiOutlineSave className="w-6 h-6 text-white mr-2" />
          Save
        </button>
      </div>
    </form>
  </div>
)
}

export default ChangePassword;