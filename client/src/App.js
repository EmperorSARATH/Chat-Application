import './App.css';
import io from "socket.io-client";
import { useState } from 'react';
import Chat from './Chat';

const socket = io.connect("http://localhost:3001");



function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

const JoinRoom=()=>{
  if(username !== "" && room !==""){
    socket.emit("join_room", room);
    console.log("Room joined");
    setShowChat(true);
  
  }
}

  return (
   <div className="App">
    {
      !showChat ? (
          <div>
           <h3>Chat Application</h3> 
      <input type="text" placeholder='Enter name..' onChange={(e)=>setUsername(e.target.value)}/>
      <input type="text" placeholder='Room ID..' onChange={(e)=>setRoom(e.target.value)}/>
      <button onClick={JoinRoom}>Join</button> 
      </div>
      ) : (
             <Chat socket={socket} username={username} room={room}/>
      )


    }
   



             </div>
  );
}



export default App;
