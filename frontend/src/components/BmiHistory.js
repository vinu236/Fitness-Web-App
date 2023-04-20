import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";


const BmiContainer = () => {
  const [bmiData, setBmiData] = useState([]); // State to store BMI data
  const [isOverflow, setIsOverflow] = useState(false); // State to check if overflow occurs

  // Function to calculate BMI value
  const calculateBmi = (weight, height) => {
    const bmi = weight / ((height / 100) * (height / 100));
    return bmi.toFixed(2);
  };

  // Function to handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const weight = parseFloat(e.target.weight.value);
    const height = parseFloat(e.target.height.value);
    const bmi = calculateBmi(weight, height);
    const bmiType = getBmiType(bmi);
    const newBmiData = {
      weight,
      height,
      bmi,
      bmiType,
    };
    setBmiData([...bmiData, newBmiData]);
    e.target.reset();
  };

  // Function to get BMI type based on BMI value
  const getBmiType = (bmi) => {
    if (bmi < 18.5) {
      return "Underweight";
    } else if (bmi >= 18.5 && bmi < 24.9) {
      return "Normal weight";
    } else if (bmi >= 25 && bmi < 29.9) {
      return "Overweight";
    } else {
      return "Obese";
    }
  };

  // Function to handle delete button click
  const handleDelete = (index) => {
    const updatedBmiData = [...bmiData];
    updatedBmiData.splice(index, 1);
    setBmiData(updatedBmiData);
  };

  return (
    <div className="container mx-auto mt-8">
      <div
        className="w-full bg-ash p-6 rounded-lg"
        style={{ maxHeight: "510px", overflowY: isOverflow ? "scroll" : "auto" }}
      >
        <h2 className="text-lg font-bold mb-4">BMI Values and Details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {bmiData.map((bmi, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg flex items-center justify-between"
            >
              <div>
                <h3 className="text-sm font-semibold">{bmi.bmiType}</h3>
                <p className="text-gray-500 text-xs">BMI: {bmi.bmi}</p>
              </div>
              <button
                onClick={() => handleDelete(index)}
                className="text-red-500"
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
      </div>
      {/* Check if overflow occurs */}
      {bmiData.length > 5 && (
        <div className="mt-4">
          <input
            type="checkbox"
            className="mr-2"
            checked={isOverflow}
            onChange={(e) => setIsOverflow(e.target.checked)}
          />
          <label className="text-xs">
            Enable scrolling when the width reaches 510px
          </label>
          </div>
        )}
      <form onSubmit={handleSubmit} className="mt-4">
        <h2 className="text-lg font-bold mb-4">Add BMI Details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="weight" className="text-sm font-semibold">
              Weight (kg)
            </label>
            <input
              type="number"
              id="weight"
              name="weight"
              className="w-full p-2 mt-1 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="height" className="text-sm font-semibold">
              Height (cm)
            </label>
            <input
              type="number"
              id="height"
              name="height"
              className="w-full p-2 mt-1 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="mt-4 py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Calculate BMI
        </button>
      </form>
    </div>
  );
};

export default BmiContainer;

       
