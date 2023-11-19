import React, { useEffect, useRef, useState } from "react";

import './Chat.css';

const Chat = ({socket, username, room})=>{
  const [currentMessage, setCurrentMessage] = useState("");
  const effectRan = useRef(false);
  const [messageList, setMessageList] = useState([]);
  const msgRef = useRef();

  useEffect(() => {
  if (msgRef.current) {
    msgRef.current.scrollIntoView(
      {
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest'
      })
  }
},
[messageList]);


const SendMessage = async () =>{
  if(currentMessage !== ""){
    
    const messageData = {
         room :room,
        author : username,
        message : currentMessage,
        time : new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
      };
           
      await socket.emit("send_msg",messageData);
      setMessageList((list)=>[...list, messageData]);
      setCurrentMessage("");
      
    }};
    
    useEffect(() => {
    if(effectRan.current === false){
document.getElementById('container').scrollIntoView(false);
    socket.on("receive_message", (data) => {
      console.log(data);
      setMessageList((list)=>[...list, data]);
       
    });
      effectRan.current = true;
   

    }
    },[socket]);

 




  return(
    <div>
    <div className="chat-header">
      <p>Live Chat</p> 
      </div>
      <div  className="chat-container" id="container">
                 {
            messageList.map((list)=>{
              return(
               <div className="chat-body">
                <div className="chat-wrapper"  id={username==list.author ? "me" : "other"}>
                 <p className="msg">{list.message}</p>
                </div>
                <div className={username==list.author ? "meta-me" : "meta-other"}>
                   <p><small><small>{list.time}&nbsp;</small></small></p>
                 <p  ref={msgRef}><small><small>{list.author}</small></small></p>
                
                </div>
                </div>
              )
                 
            })
                     }
        
     
    </div>

       <div className="chat-footer">
      <input type="text" value={currentMessage} id="msg-box" placeholder="Hey..." onChange={(e)=>setCurrentMessage(e.target.value)} />
      <button onClick={SendMessage}>&#9658;</button>

      </div>

  </div>

  ); 
};

export default Chat;
