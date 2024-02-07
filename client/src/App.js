// App.js
import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      {!showChat ? (
        <div className="joinChatContainer flex flex-col gap-3 text-center">
          <h3 className="text-3xl font-semibold mb-4">Join A Chat</h3>
          <input
            type="text"
            placeholder="Enter name..."
            onChange={(event) => setUsername(event.target.value)}
            className="input-field w-52 h-10 border-2 border-[#0080FF] rounded px-2 text-lg"
          />
          <input
            type="text"
            placeholder="Room ID..."
            onChange={(event) => setRoom(event.target.value)}
            className="input-field w-52 h-10 border-2 border-[#0080FF] rounded px-2 text-lg"
          />
          <button
            onClick={joinRoom}
            className="join-button w-52 h-12 bg-[#0080FF] text-white text-lg rounded hover:bg-green-600"
          >
            Join A Room
          </button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;
