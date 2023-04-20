import { useEffect } from "react";
import usePlans from "../../Hooks/usePlans";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";

const Plans = () => {
  const[plan]=usePlans();
  console.log(plan);
  useEffect(() => {
    AOS.init();
  }, []);
  console.log(plan)
  const renderPlan=plan.map(plan=>{
    return(
      <article data-aos="fade-up"
      data-aos-anchor-placement="top-bottom"
      className="bg-black rounded-md m-3 inline-block w-[30%] p-8 align-middle text-center first-letter  text-white  hover:bg-white hover:text-black transition-colors duration-500
    
    shadow-md offset-x-6 offset-y-2 blur-16 bg-opacity-80 shadow-white offset-x--6 offset-y--2"
    >
       {plan.Recommended ? <h1 className="text-xl text-black bg-green-400 rounded-full hover:scale-75 transform transition duration-500">
            Recommended Plan
          </h1> :""}

      <h1 className="text-2xl ">{plan.planName}</h1>
      <h2 className="text-xl">{plan.price}</h2>
      <h3 className="text-lg">{plan.duration}</h3>
      <ul className="leading-7">
      
          {plan.list.map(list=>{
            return(
              <li>{list.list}</li>
            )
          })}
      </ul>
      <div className="mt-2">
        <Link to={`/single/plan/${plan._id}`}>
        <button className="font-semibold p-2 bg-custom-gym rounded-xl text-sm min-w-[50%] tracking-wider"
        
        >
          CHOOSE plan
        </button>
          </Link>
       
      </div>
    </article>
    )
  })

  console.log(plan)
  if(plan.length >0) return    (
     <section className="bg-black text-white w-full">
      <h1 className="text-4xl text-center m-5">Choose Your Plans</h1>

      <div className="text-center">
        {renderPlan}
      </div>
    </section>
    
  );
};
export default Plans;
