import React, { useState, useContext } from "react";
import { sendMessage } from "../services/utils/socket";
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
    sendMessage(messageObj);
    setMessage("");
    setMessages([...messages, messageObj]);
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
