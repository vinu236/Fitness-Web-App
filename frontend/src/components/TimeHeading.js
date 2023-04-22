import{BsClock} from "react-icons/bs"
import { Quotes } from "../../config";
const TimeHeading=()=>{

    
    return(
        <div className="flex flex-wrap p-5 mt-10     ml-6 mr-7 rounded-tl-[200px] rounded-br-[200px] rounded-3xl justify-center gap-[12px] items-center  bg-neutral-800 opacity-90 shadow-2xl max-md:rounded-lg ">
           <div>
           <BsClock className="text-custom-head text-7xl animate-spin max-md:text-xl " />
            </div> 
            <div className="w-80 p-5">
                <p className="text-white  text-2xl">"Time and health are two precious assets that we don't recognize and appreciate until they have been depleted." - <span className="text-custom-head capitalize">Denis Waitley</span> </p>
            </div>
        </div>
    )
}

export default TimeHeading;