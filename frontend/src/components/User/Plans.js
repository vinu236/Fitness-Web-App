const Plans = () => {
  console.log("plans");
  return (
    <section className="bg-black text-white w-full">
      <h1 className="text-4xl text-center m-5">Choose Your Plans</h1>

      <div className="text-center">
        <article className="bg-black rounded-md m-3 inline-block w-[30%] p-8 align-middle text-center first-letter  text-white  hover:bg-white hover:text-black transition-colors duration-500
        
        shadow-md offset-x-6 offset-y-2 blur-16 bg-opacity-80 shadow-white offset-x--6 offset-y--2">
          <h1 className="text-2xl ">FREE</h1>
          <h2 className="text-xl">$0/MONTH</h2>
          <h3 className="text-lg">For hobby project</h3>
          <ul className="leading-7">
            <li>1 WorkSpace</li>
            <li>Unlimited</li>
            <li>Traffic</li>
            <li>10GB storage</li>
            <li>Basic Support</li>
          </ul>
          <div className="mt-2">
            <button className="font-semibold p-2 bg-custom-gym rounded-xl text-sm min-w-[50%] tracking-wider">
              CHOOSE plan
            </button>
          </div>
        </article>
        <article className="bg-black  rounded-md  m-3 inline-block w-[30%] p-4 align-middle text-center  text-white  hover:bg-white hover:text-black transition-colors duration-500
        shadow-md offset-x-6 offset-y-2 blur-16 bg-opacity-80 shadow-white offset-x--6 offset-y--2">
          <h1 className="text-2xl text-black bg-green-400 rounded-full p-1 hover:scale-75 transform transition duration-500">
            Recommended Plan
          </h1>
          <h1 className="text-2xl m-2">Premium</h1>
          <h2 className="text-xl m-2">$39/month</h2>
          <h3 className="text-lg m-3">Small Heading</h3>
          <ul>
            <li>No Time Limit</li>
            <li>Diet Guidance</li>
            <li>Event Ticket</li>
            <li>Event Ticket</li>
          </ul>
          <div className="mt-2">
            <button className="font-semibold p-2 bg-custom-gym rounded-xl text-sm min-w-[50%] tracking-wider ">
              CHOOSE plan
            </button>
          </div>
        </article>
        <article className="bg-black  rounded-md m-3 inline-block w-[30%] p-7 align-middle text-center  text-white  hover:bg-white hover:text-black transition-colors duration-500
        shadow-md offset-x-6 offset-y-2 blur-16 bg-opacity-80 shadow-white offset-x--6 offset-y--2">
          <h1 className="text-2xl">FREE</h1>
          <h2 className="text-xl">$0/MONTH</h2>
          <h3 className="text-lg">For hobby project</h3>
          <ul className="leading-7">
            <li>1 WorkSpace</li>
            <li>Unlimited</li>
            <li>Traffic</li>
            <li>10GB storage</li>
            <li>Basic Support</li>
          </ul>
          <div className="mt-2">
            <button className="font-semibold p-2 bg-custom-gym rounded-xl text-sm min-w-[50%] tracking-wider">
              CHOOSE plan
            </button>
          </div>
        </article>
      </div>
    </section>
  );
};
export default Plans;
