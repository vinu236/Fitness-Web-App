import React from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Toaster(){
  const notify = () => toast("Wow so easy!");

  return (
    <div>
      <button onClick={notify}>Notify!</button>
      <ToastContainer
position="bottom-left"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
    </div>
  );
}
export default Toaster;