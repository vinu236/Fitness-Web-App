// import React, { useState } from 'react';
// import { FaCheck } from 'react-icons/fa';
// import { useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import instance from '../api/axios';
// import getListDetails from '../utils/helper';
//TODO DELETE THIS
// const PlanDetails = () => {
//   const [features, setFeatures] = useState([]);

//   useEffect(() => {
//     const {id}=useParams();
//     getListDetails(id);
//   }, []);

//   console.log(features);
//   return (
//     <div className="flex items-center justify-center h-screen w-full bg-gray-900">
  
//       <div>
//         <div className="bg-black py-4 px-6 ">
//           <h1 className="text-3xl font-bold text-white">planName</h1>
//           <div className="flex items-center text-lg my-4">
//             <span className="font-bold text-white mr-2">Duration:</span>
//             <span className="text-white">planDuration</span>
//           </div>
//           <div className="flex items-center text-lg">
//             <span className="font-bold text-white mr-2">Price:</span>
//             <span className="text-green-500">planPrice</span>
//           </div>
//         </div>
//         <ul className="bg-black p-6">
//           {features.map((feature) => (
//             <li key={feature} className="flex items-center text-lg mb-4">
//               <FaCheck className="text-green-500 mr-2" />
//               <span className="text-white">{feature.list}</span>
//             </li>
//           ))}
//         </ul>
       
//       </div>
//     </div>
//   );
// };

// export default PlanDetails;
