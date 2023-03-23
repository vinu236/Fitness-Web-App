import InputField from "./Input";
import { GiBodyHeight, GiWeightScale } from "react-icons/gi";
import { useState } from "react";

const BmiForm=({getData})=>{
    const[weight,setWeight]=useState("");
    const[height,setHeight]=useState("");
    const handleWeightChange=(e)=>{
      //updating the weight local variable
      setWeight(e.target.value)
    }
    
    const handleHeightChange=(e)=>{
      //updating the height local variable
      setHeight(e.target.value)
    }
  
    //onsubmit
    const handleSubmit=(e)=>{
      //preventdefault is given because normally, HTML will refresh the page after clicking submit button. To avoid that refreshing this is given.
      e.preventDefault();
      
        getData(weight,height);
    }

    return(
        <form className=" flex  flex-col gap-14 justify-center" onSubmit={handleSubmit}>
        <div className="flex items-center gap-5">
          <GiWeightScale className="text-white " size={24} />
          
          <InputField
            type={"number"}
            className={"rounded-2xl p-2 w-72 px-11 border-0 focus:outline-none focus:shadow-custom-gym "}
            placeholder={"Weight in Kg"}
            value={weight}
            name={"weight"}
            onChange={handleWeightChange}
            required
          />
          {/* <label className="text-sm">Height in m</label> */}
        </div>
        <div className="flex items-center gap-5">
          < GiBodyHeight className="text-white" size={24} />

          <InputField
            type={"number"}
            className={"rounded-2xl p-2 w-72 px-11 border-0 focus:outline-none focus:shadow-custom-gym "}
            placeholder={"Height in m"}
            value={height}
            name={"height"}
            onChange={handleHeightChange}
          />
         {/*  <label className="text-sm text-white">Weight in kg</label> */}
        </div>
        <div className="flex justify-center">
            <button className="bg-green-400 text-black p-2 rounded-xl w-36">Get BMI</button>
        </div>
      </form>
    )
}

export default BmiForm;