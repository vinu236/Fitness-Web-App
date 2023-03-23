import img from "../../assets/img/control.png";
import Menu from "../../../config.js"
import { useState } from "react";
import { Link } from "react-router-dom";

const SideBar=()=>{
    const [open,setOpen]=useState(true);
    
    console.log("HEY nAVBAR COMP FROM ADMIN")
    return(
        <>
        <div className="flex">
            <div className={ `${open ? "w-72" : "w-20"} p-8 pt-10 duration-300 h-screen bg-black relative`} >
                <img src={img} className={`absolute cursor-pointer rounded=full -right-3 top-9 w-7  border-dark-purple ${!open && "rotate-180"} text-custom-gym`} 
                alt="hi"
                onClick={()=>{
                    setOpen(!open)
                }} />
                <div className="flex gap-x-4 items-centre">
                   
                <h1 className={`text-custom-gym origin-left font-medium text-xl duration-300 ${!open && "scale-0"}` }>
                   SWEAT
                </h1>
                </div>
                <ul>
               {Menu.map((menu,index)=>{
                return(
                   
                <li key={index} className="text-white pt-8 cursor-pointer">
                    <Link className="flex items-center gap-2 " to={`/dashboard${menu.route}`}>
                    <span className="text-custom-gym">
                {menu.icons}
                </span>
                    <span className={`${!open && 'hidden'} origin-left duration-500`}>
                    {menu.title}
                    </span>
                    </Link>
                </li>
                   
               )})}
               </ul>
                </div>
        </div>
        
        </>
    );
}
export default SideBar;