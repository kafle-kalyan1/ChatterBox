// import React, { useState, useContext } from "react";
// import { Context } from "../../context";

// function Send_message({ selectedUser }) {
//   const { user } = useContext(Context);
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);

//   const sendMessageHandler = () => {
//     const messageObj = {
//       sender: user.username,
//       receiver: selectedUser,
//       message: message,
//     };
    
//     // Create a new WebSocket connection
//     const ws = new WebSocket(`ws://localhost:8000/ws/${user.username}/${selectedUser}/`);

//     // Handle WebSocket events
//     ws.onopen = (event) => {
//       console.log("WebSocket connection established.");
//       ws.send(JSON.stringify(messageObj));
//       setMessage("");
//       setMessages([...messages, messageObj]);
//     };

//     ws.onmessage = (event) => {
//       console.log("Received message:");
//       let rec_data = (JSON.parse(event.data))
//       let sender = rec_data.sender
//       let message = rec_data.text
//       console.log(messages);
//       // setMessages([...messages,{sender:sender,message:message}])

//     };

//     ws.onclose = (event) => {
//       console.log("WebSocket connection closed.");
//     };

//     ws.onerror = (event) => {
//       console.error("WebSocket error:", event);
//     };
//   };

//   return (
//     <div>
//       <div>
//         {messages.map((msg, index) => (
//           <div key={index}>
//             {msg.sender}: {msg.message}
//           </div>
//         ))}
//       </div>
//       <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
//       <button onClick={sendMessageHandler}>Send Message</button>
//     </div>
//   );
// }

// export default Send_message;

import React, { useState, useContext, useEffect } from "react";
import { sendMessage, onMessageReceived } from "../services/utils/socket";
import { Context } from "../../context";
import axios from "axios";

function Send_message({ selectedUser }) {
  const { user } = useContext(Context);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  // useEffect(() => {
  //   console.log("Send_message");

    onMessageReceived((data) => {
      // console.log("....",data);
      const messageObj = JSON.parse(data);
        setMessages([...messages, messageObj]);

      // if (messageObj.sender === selectedUser || messageObj.receiver === selectedUser) {
      //   setMessages([...messages, messageObj]);
      // }
    });

  //   axios
  //     .get("http://127.0.0.1:8000/chats/list/?format=json")
  //     .then((response) => console.log(response.data.results))
  //     .catch((error) => console.log(error));
  // }, [selectedUser, messages]);

  const sendMessageHandler = () => {
    const messageObj = {
      sender: user.username,
      receiver: selectedUser,
      message: message,
    };
    sendMessage(messageObj);
    setMessage("");
    // setMessages([...messages, messageObj]);
  };

  return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            {msg.sender}: {msg.text}
          </div>
        ))}
      </div>
      <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={sendMessageHandler}>Send Message</button>
    </div>
  );
}

export default Send_message;
