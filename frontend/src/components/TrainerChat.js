import TrainerConversation from "./TrainerConversation";
import TrainerMessage from "./TrainerMessage";
import Button from "./Button";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import instance from "../api/axios";
import { io } from "socket.io-client";
import NoChat from "./NoChat";
const TrainerChat = () => {
  const [conversation, setConversation] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [messages, setMessage] = useState([]);
  const[arrivalMessage,setArrivalMessage]=useState(null)
  const socket=useRef()
  const [newMessage, setNewMessage] = useState("");
  const scrollRef = useRef();
  const tid = useSelector((store) => store.trainer.tid);

  useEffect(()=>{
    socket.current=io(("https://api.getfitgo.online"));
    socket.current.on("getMessage",data=>{
      setArrivalMessage({
        sender:data.senderId,
        text:data.text,
        createdAt:Date.now()
      })
    })
  },[])

  useEffect(()=>{
    arrivalMessage && currentUser.members.includes(arrivalMessage.sender) &&
    setMessage((prev)=>[...prev,arrivalMessage])
  },[arrivalMessage,currentUser])

  useEffect(()=>{
    socket.current.emit("addUser",tid);
    socket.current.compress("getUsers",users=>{
      console.log(users);
    })
   },[tid])
  

  useEffect(() => {
    getConversation();
  }, []);

  const getConversation = async () => {
    try {
      const { data, status } = await instance(`/conversation/${tid}`);
      console.log(data.conversation);
      console.log(status)


      if (status === 200) {
        setConversation(data?.conversation);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMessage();
  }, [currentUser]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getMessage = async () => {
    try {
      console.log(currentUser);
      const { data, status } = await instance.get(
        `/message/${currentUser._id}`
      );
      console.log(data);
      console.log(data.messages);
      setMessage(data?.messages);

      console.log(status);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: tid,
      text: newMessage,
      conversationId: currentUser._id,
    };
    const receiverId=currentUser.members.find(member=>member!==tid)
    socket.current.emit("sendMessage",{
      senderId:tid,
      receiverId,
      text:newMessage
    })
    try {
      const { data, status } = await instance.post("/message", message);
      console.log(data?.savedMessage);
      setMessage([...messages, data?.savedMessage]);
      setNewMessage("");
      console.log(status);
    } catch (error) {
      console.log(error);
    }
  };

  return conversation.length === 0 ? (
    <NoChat />
  ) : (
    //container
    <div className="flex max-h-[500px] ">
      {/*  //chatMenu */}
      <div className="flex-[4]">
        {/* //chatMenuWrapper */}
        <div className="p-3 h-[100%] overflow-y-scroll">
          <input
            type="text"
            placeholder="Search for friends"
            className=" p-3 border-none sticky inset-0"
          />
          {conversation.map((c, index) => {
            return (
              <div onClick={() => setCurrentUser(c)}>
                <TrainerConversation key={c._id} conversation={c} currentUser={tid} />
              </div>
            );
          })}
        </div>
      </div>
      {/* //chatBox */}
      <div className="flex-[6] text-white">
        {/* //chatBox Wrapper */}
        {currentUser && (
          <>
            <div className="p-3 bg-black flex flex-col justify-between h-[90%] overflow-y-scroll" >
              {messages.map((m) => {
                console.log(m);
                return (
                  <div  >
                    <TrainerMessage receive={m.sender===tid} message={m} />
                  </div>
                );
              })}
            </div>
            <div>
              <div className="w-full ml-2">
                <input
                  type="text"
                  placeholder="Write something...."
                  className=" text-black w-[600px] p-3  rounded-full"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                ></input>
                <Button
                  className={
                    "p-2 w-36 rounded-full ml-2 bg-custom-gym text-black"
                  }
                  text={"Send"}
                  onClick={handleSubmit}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TrainerChat;
