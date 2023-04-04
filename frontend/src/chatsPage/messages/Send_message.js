import React, { useContext } from "react";
import { sendMessage } from "../services/utils/socket";
import { Context } from "../../context";

function Send_message({ message, selectedUser,setMessage }) {
  const { user } = useContext(Context);

  const sendMessageHandler = () => {
    const messageObj = {
      sender: user.username,
      receiver: selectedUser,
      message: message,
    };
    sendMessage(messageObj);
    setMessage("")
  };

  return (
    <div>
      <button onClick={sendMessageHandler}>Send</button>
    </div>
  );
}

export default Send_message;
