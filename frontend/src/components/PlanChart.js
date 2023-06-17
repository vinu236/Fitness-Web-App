import '../pages/User/Plan/Plan.css';
import { FaCheckCircle, FaCalendar } from "react-icons/fa";
const PlanChart=()=>{
        return(
            <section className="plans_section">
            <div className="containr">
              <span className="subheading ">Pricing</span>
              {/* <h2 className="heading-secondary">Work Hard Stay Healthy</h2> */}
              {/* /// */}
              <div className="containr grid grid-cols-3 gap-9 ">
                <div className="text-white princing-plan princing-plan--starter justify-self-end rounded-xl shadow-md p-4 bg-[#111]">
                  <header className="plan-header">
                    <p className="plan-name">BASIC PLAN</p>
                    <p className="plan-price">
                      <span>RS</span>2500
                    </p>
                  </header>
                  <ul className="list">
                    <li className="list-item">
                      <FaCheckCircle className="text-custom-gym text-2xl" />
                      <span className="text-xl">Event Details</span>
                    </li>
                    <li className="list-item">
                      <FaCheckCircle className="text-custom-gym text-2xl" />
                      <span className="text-xl">Event Details</span>
                    </li>
                    <li className="list-item">
                      <FaCheckCircle className="text-custom-gym text-2xl" />
                      <span className="text-xl">Event Details</span>
                    </li>
                  </ul>
                  <div className="w-full flex justify-center mt-2">
                    <button className="p-3 w-35 bg-custom-gym rounded-md hover:bg-orange-600 font-bold">
                      Choose Plan
                    </button>
                  </div>
                </div>
    
                <div className="text-black princing-plan princing-plan--complete justify-self-end rounded-xl shadow-md shad p-4">
                  <header className="plan-header">
                    <p className="plan-name">BASIC PLAN</p>
                    <p className="plan-price">
                      <span>RS</span>2500
                    </p>
                  </header>
                  <ul className="list">
                    <li className="list-item">
                      <FaCheckCircle className="text-custom-gym text-2xl" />
                      <span className="text-xl">Event Details</span>
                    </li>
                    <li className="list-item">
                      <FaCheckCircle className="text-custom-gym text-2xl" />
                      <span className="text-xl">Event Details</span>
                    </li>
                    <li className="list-item">
                      <FaCheckCircle className="text-custom-gym text-2xl" />
                      <span className="text-xl">Event Details</span>
                    </li>
                  </ul>
                  <div className="w-full flex justify-center mt-2">
                    <button className="p-3 w-35 bg-custom-gym rounded-md hover:bg-orange-600 font-bold text-white">
                      Choose Plan
                    </button>
                  </div>
                </div>
                <div className="text-white princing-plan princing-plan--starter justify-self-end rounded-xl shadow-md p-4 bg-[#111]">
                  <header className="plan-header">
                    <p className="plan-name">BASIC PLAN</p>
                    <p className="plan-price">
                      <span>RS</span>2500
                    </p>
                  </header>
                  <ul className="list ">
                    <li className="list-item ">
                      <FaCheckCircle className="text-custom-gym text-2xl" />
                      <span className="text-xl">Event Details</span>
                    </li>
                    <li className="list-item">
                      <FaCheckCircle className="text-custom-gym text-2xl" />
                      <span className="text-xl">Event Details</span>
                    </li>
                    <li className="list-item">
                      <FaCheckCircle className="text-custom-gym text-2xl" />
                      <span className="text-xl">Event Details</span>
                    </li>
                  </ul>
                  <div className="w-full flex justify-center mt-2">
                    <button className="p-3 w-35 bg-custom-gym rounded-md hover:bg-orange-600 font-bold">
                      Choose Plan
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )
}

export default PlanChart;