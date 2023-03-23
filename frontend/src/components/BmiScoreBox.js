import BmiType from "./BmiType";
const BmiScoreBox=({bmi,bmiName})=>{

    return(
        
            <div className="w-[580px] shadow-2xl s h-[380px] flex flex-col justify-center items-center gap-5">
                <h1 className="text-2xl font-bold text-white">Your BMI Score</h1>
                <div className="min-w-[200px] h-[200px] bg-green-400    flex justify-center items-center shadow-2xl rounded-lg">
                    <h1 className="text-[4rem] tracking-widest font-semibold text-white ">{bmi}</h1>
                </div>
               <BmiType  bmiName={bmiName}/>
            </div>
          )
    
}

export default BmiScoreBox;