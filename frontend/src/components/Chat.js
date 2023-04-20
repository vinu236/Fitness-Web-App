import Conversation from "./Conversation";
import Message from "./message";
import Button from "./Button";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import instance from "../api/axios";
import NoChat from "./NoChat";
import { io } from "socket.io-client";

const Chat = () => {

  const [conversation, setConversation] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [messages, setMessage] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const[arrivalMessage,setArrivalMessage]=useState(null)
  const scrollRef = useRef();
  const socket=useRef()
  const uid = useSelector((store) => store.user.uid);
  console.log("user id is ", uid);
  console.log(uid);

  useEffect(()=>{
    socket.current=io("http://localhost:3000");
    socket.current.on("getMessage",(data)=>{
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
  socket.current.emit("addUser",uid);
  socket.current.compress("getUsers",users=>{
  })
 },[uid])



  useEffect(() => {
    getConversation();
  }, [uid]);

  const getConversation = async () => {
    try {
      const { data, status } = await instance(`/conversation/${uid}`);
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

      const { data, status } = await instance.get(
        `/message/${currentUser._id}`
      );
      setMessage(data?.messages);


    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: uid,
      text: newMessage,
      conversationId: currentUser._id,
    };

    const receiverId=currentUser.members.find(member=>member!==uid)
    socket.current.emit("sendMessage",{
      senderId:uid,
      receiverId,
      text:newMessage
    })

    try {
      const { data, status } = await instance.post("/message", message);
      setMessage([...messages, data?.savedMessage]);
      setNewMessage("");
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
                <Conversation key={c._id} conversation={c} currentUser={uid} />
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
                    <Message receive={m.sender===uid} message={m} />
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

export default Chat;
