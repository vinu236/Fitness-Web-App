import { useEffect, useState } from "react";
import { FaChevronLeft, FaEdit } from "react-icons/fa";
import { HiOutlineClipboardCopy } from "react-icons/hi";
import instance from "../api/axios";

function Detail({ name, planName, planValidity, bmiValue, notes, onClose }) {
  const [newNotes, setNewNotes] = useState(notes);
  

  const handleNotesChange = (event) => {
    setNewNotes(event.target.value);
  };

  const handleCopyNotes = () => {
    navigator.clipboard.writeText(newNotes);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 overflow-hidden">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-semibold">{name}</h2>
        <button onClick={onClose} title="Go back">
          <FaChevronLeft />
        </button>
      </div>
      <div className="flex mb-4">
        <div className="w-1/3">
          <p className="text-gray-600">Plan Name</p>
          <p className="font-semibold">{planName}</p>
        </div>
        <div className="w-1/3">
          <p className="text-gray-600">Plan Validity</p>
          <p className="font-semibold">{planValidity}</p>
        </div>
        <div className="w-1/3">
          <p className="text-gray-600">BMI Value</p>
          <p className="font-semibold">{bmiValue}</p>
        </div>
      </div>
      <div>
        <p className="text-gray-600">Notes</p>
        <textarea
          className="border border-gray-300 rounded-lg p-2 w-full"
          value={newNotes}
          onChange={handleNotesChange}
        />
      </div>
      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={handleCopyNotes}
          title="Copy notes"
          className="flex items-center text-gray-500 hover:text-black"
        >
          <HiOutlineClipboardCopy className="mr-1" /> Copy notes
        </button>
        <button title="Edit" className="text-gray-500 hover:text-black">
          <FaEdit />
        </button>
      </div>
    </div>
  );
}

function TraineeList() {
  const [selectedTrainee, setSelectedTrainee] = useState(false);
  const [trainees, setTrainees] = useState([]);


  const handleTraineeClick = (trainee) => {
    console.log(trainee);
    setSelectedTrainee(trainee);
  };

  const handleBackClick = () => {
    setSelectedTrainee(false);
  };
  useEffect(()=>{
    getBookedUsers()
  },[])

  const getBookedUsers=async()=>{
    try {
      const id=localStorage.getItem("tid");
      const {data}=await instance(`/assigned/trainee/${id}`);
      console.log(data?.data);
      setTrainees(data?.data);
    } catch (error) {
      console.log(error)
    }
  }


    /* ============Date formatting================== */
    function formatDate(dateString) {
      const date = new Date(dateString);
      const year = date.getUTCFullYear();
      const month = `0${date.getUTCMonth() + 1}`.slice(-2);
      const day = `0${date.getUTCDate()}`.slice(-2);
      return `${year}-${month}-${day}`;
    }
    /* ================================================= */



  return (
    <div
      className={
        selectedTrainee ? "overflow-hidden" : "h-[400px] overflow-y-scroll"
      }
    >
      {/*  //here im using conditional rendering  */}
      {selectedTrainee ? (
        <Detail
          name={selectedTrainee.name}
          planName={selectedTrainee.planName}
          planValidity={selectedTrainee.planValidity}
          bmiValue={selectedTrainee.bmiValue}
          notes={selectedTrainee.notes}
          onClose={handleBackClick}
        />
      ) : (
        <div className="bbg-[#0f172a] rounded-lg shadow-lg p-4 ">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {trainees && trainees.map((trainee) => (
              <div
                key={trainee._id}
                className="border border-gray-300 rounded-lg p-4 cursor-pointer text-white hover:bg-white hover:text-black "
                onClick={() => handleTraineeClick(trainee)}
              >
                <h3 className="text-lg font-medium mb-2 ">{trainee.user.userName}</h3>
                <p className="mb-1">Plan Name: {trainee.Plan.planName}</p>
                <p className=" mb-1">Plan Validity: {formatDate(trainee.expirationDate)} to {formatDate(trainee.expirationDate)}</p>
                <p className=" mb-1">BMI Value: {""}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default TraineeList;
