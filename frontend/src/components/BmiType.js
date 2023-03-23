const BmiType=({bmiName})=>{

    const handleClick=()=>{
        alert("submit")
    }   
    return(
        <h1 className="text-xl font-semibold text-green-400 cursor-pointer" onClick={handleClick}>{bmiName}</h1>
    )
}

export default BmiType;