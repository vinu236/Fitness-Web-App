import { format } from "timeago.js";

const Message = ({ receive,message}) => {

 console.log(message);
  return (
    <div className={receive ? 'flex flex-col items-end' : 'flex flex-col'}>
      <div className="flex">
        <img
          src=""
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

export default Message;
