import ReactDOM  from "react-dom";
import { useEffect } from "react";
const Modal=({onClose, heading,children})=>{
console.log("MODAL")
    //!only want to run the useEffect fn one time when the component is render
    useEffect(()=>{
        console.log("use effect from modal")
        // ! restrict the user to scroll when modal comp display
        document.body.classList.add('overflow-hidden');

        //! cleanup function
        return()=>{ 
          
        document.body.classList.remove("overflow-hidden");
       
        }
    },[])

    return ReactDOM.createPortal(
        <div className="">
        <div onClick={onClose} className="absolute inset-0 bg-neutral-800 opacity-80"></div>
        <div className="fixed left-1/3 top-1/4  p-10  bg-black text-white w-[40%] min-h-fit rounded-lg">
            <div className="flex flex-col gap-5 h-full">
            {heading}
            {children}
            </div>
          
            </div>
       </div>,  
       document.querySelector('.modal-container')
    )
    }
export default Modal;