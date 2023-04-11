import React, { useState, useContext } from "react";
import { Context } from "../../context";

function Send_message({ selectedUser }) {
  const { user } = useContext(Context);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessageHandler = () => {
    const messageObj = {
      sender: user.username,
      receiver: selectedUser,
      message: message,
    };
    
    // Create a new WebSocket connection
    const ws = new WebSocket(`ws://localhost:8000/ws/${user.username}/${selectedUser}/`);

    // Handle WebSocket events
    ws.onopen = (event) => {
      console.log("WebSocket connection established.");
      ws.send(JSON.stringify(messageObj));
      setMessage("");
      setMessages([...messages, messageObj]);
    };

    ws.onmessage = (event) => {
      console.log("Received message:", event.data);
    };

    ws.onclose = (event) => {
      console.log("WebSocket connection closed.");
    };

    ws.onerror = (event) => {
      console.error("WebSocket error:", event);
    };
  };

  return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            {msg.sender}: {msg.message}
          </div>
        ))}
      </div>
      <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={sendMessageHandler}>Send Message</button>
    </div>
  );
}

export default Send_message;
