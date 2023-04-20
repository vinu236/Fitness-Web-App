import { format } from "timeago.js";

const TrainerMessage = ({ receive,message}) => {
//TODO: trainer section TRAINER IMAG , HERE TRAINER WHO SENT Messages
 console.log(message);
  return (
    <div className={receive ? 'flex flex-col items-end' : 'flex flex-col'}>
      <div className="flex">
        <img
        src="https://images.unsplash.com/photo-1508919801845-fc2ae1bc2a28?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1211&q=80"
          alt=""
          className="w-[45px] h-[45px] rounded-full object-cover mr-5"
        />{" "}
        <p className="text-black bg-custom-gym max-w-md rounded-lg rounded-l-none font-normal">
          {message.text}
        </p>
      </div>
      <div className="mt-1">

        <p className="text-gray-400">{format(message.createdAt)}</p>
      </div>
    </div>
  );
};

export default TrainerMessage;
