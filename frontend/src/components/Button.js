
const  Button=({text ,className,onClick})=>{

    return(
        <button className={className} onClick={onClick}>
        {text}
      </button>
    );
}
/* className="bg-black text-white p-2 font-sans rounded-lg" */
export default Button;