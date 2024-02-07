// Chat.js
import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

function Chat({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
     setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    const handleReceiveMessage = (data) => {
      setMessageList((list) => [...list, data]);
    };
  
    socket.on("receive_message", handleReceiveMessage);
  
    return () => {
      socket.off("receive_message", handleReceiveMessage);
    };
  }, [socket]);

  return (
    <div className="chat-window border-1 border-[#0080FF] w-72 h-96">
      <div className="chat-header bg-[#0080FF] rounded-t-lg flex items-center justify-center h-12 cursor-pointer">
        <p className="text-white text-lg font-semibold">Servv Chat</p>
      </div>
      <div className="chat-body bg-white border border-gray-300 overflow-hidden px-[5px]">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent) => (
            <div
                className="message"
                id={username === messageContent.author ? "you" : "other"}
              >
              <div>
                <div className="message-content bg-[#0080FF] rounded-[10px] px-2 py-1 text-white inline-block">
                  <p>{messageContent.message}</p>
                </div>
                <div className="message-meta flex justify-between mt-1">
                  <p id="time">{messageContent.time}</p>
                  <p id="author" className="font-bold">
                    {messageContent.author}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </ScrollToBottom>
      </div>
      <div className="chat-footer border-t border-gray-300 flex">
        <input
          type="text"
          value={currentMessage}
          placeholder="Hey..."
          onChange={(event) => setCurrentMessage(event.target.value)}
          className="flex-1 p-2 focus:outline-none"
        />
        <button onClick={sendMessage} className="px-3 bg-gray-200">
          &#9658;
        </button>
      </div>
    </div>
  );
}

export default Chat;
