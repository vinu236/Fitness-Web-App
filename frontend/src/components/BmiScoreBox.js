import BmiType from "./BmiType";
import { FaSave } from "react-icons/fa";
import instance from "../api/axios"
import axios from "axios";
const BmiScoreBox=({bmi,bmiName,save})=>{

    const handleSave=async()=>{
      alert("adsd")
        const id=localStorage.getItem("uid");
        const bmiData={
            bmiValue:bmi,
            bmiType:bmiName
        }
        console.log(bmiData)

        try {
           const {data}=await axios.patch(`http://localhost:3000/add/bmi/${id}`,bmiData);
           console.log(data);
           

        } catch (error) {
            console.log(error)
        }
    }

    return(
        
            <div className="w-[580px] shadow-2xl s h-[380px] flex flex-col justify-center items-center gap-5">
                <h1 className="text-2xl font-bold text-white">Your BMI Score</h1>
                <div className="min-w-[200px] h-[200px] bg-green-400    flex justify-center items-center shadow-2xl rounded-lg">
                    <h1 className="text-[4rem] tracking-widest font-semibold text-white ">{bmi}</h1>
                </div>
               <BmiType  bmiName={bmiName}/>
              {save &&  <FaSave className="inline-block mr-2  cursor-pointer text-white" size={20} onClick={handleSave} />}
            </div>
          )
    
}

export default BmiScoreBox;