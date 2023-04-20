// BookingHistory.js

import React, { useState,useEffect } from "react";
import instance from "../api/axios";

const BookingHistory = () => {
  const [bookingData, setBookingData] = useState([]);
  useEffect(()=>{
    getBookings();
  },[])

  const getBookings=async()=>{
    try {
      const id=localStorage.getItem("uid")
      const {data}=await instance.get(`/booking/${id}`);
      console.log(data?.data);
      setBookingData(data?.data);
    } catch (error) {
      console.log(error);
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
    <div className=" max-h-[510px] overflow-y-auto">
      <h1 className="text-2xl font-bold mb-4 text-white">Booking History</h1>
      <table className="w-full">
        <thead>
          <tr className="sticky top-0 bg-white text-center px-6 py-3 border-b border-gray-200">
            <th className="px-4 py-2 ">Plan Name</th>
            <th className="px-4 py-2">Payment Date</th>
            <th className="px-4 py-2">Plan Expiry Date</th>
          </tr>
        </thead>
        <tbody>
          {bookingData.map((booking) => (
            <tr key={booking.id} className="border-t border-gray-300 text-white`">
              <td className="px-4 py-2 text-white font-bold text-center ">{booking.Plan.planName}</td>
              <td className="px-4 py-2 text-white font-bold text-center ">{formatDate(booking.dateOfBooking)}</td>
              <td className="px-4 py-2 text-white font-bold text-center ">{formatDate(booking.expirationDate)}</td>
            </tr>
          ))}
        </tbody>
      </table> text-center 
    </div>
  );
};

export default BookingHistory;
