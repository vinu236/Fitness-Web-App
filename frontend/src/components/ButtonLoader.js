import{ImSpinner} from "react-icons/im";
const ButtonLoader=({text,className,size})=>{
    return(
        <button className={className} disabled>
        { <ImSpinner className="animate-spin mr-2" size={size}/> }{text}
      </button>
    );
}
//TODO:re use loader pending
export default ButtonLoader;