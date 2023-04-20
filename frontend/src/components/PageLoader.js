import {BiLoaderAlt} from "react-icons/bi";
const PageLoader=()=>{

    return(
        <div className="flex justify-center items-center h-screen bg-black ">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <BiLoaderAlt size={70} className="animate-spin text-custom-gym opacity-100" />
        </div>
      </div>
      
    )
}
export default PageLoader;