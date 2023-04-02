import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../context";
import "./chat.css";

function ChatsList() {
  const [users, setUsers] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const { user } = useContext(Context);

  function selectUser(sel_user) {
    setSelectedUser(sel_user);
  }

  function closeChat() {
    setSelectedUser(null);
  }

  function showUsers() {

    axios({
      method: "get",
      url: "http://127.0.0.1:8000/users",
    })
      .then((res) => {
  
        setUsers(res.data.results);
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    showUsers();
  }, []);

  function sendMessage(selectedUser){
    console.log(selectedUser)
  }
  return (
    <div className="chat-container">
      <div className="users-container">
        <h1 className="chat-header">Chats</h1>
        {users !== null ? (
          <>
            {users.map((all_user) => {
              if (all_user.username !== user.username) {
                return (
                  <div
                    className={`chat-user ${
                      all_user.username === selectedUser ? "active" : ""
                    }`}
                    onClick={() => selectUser(all_user.username)}
                    key={all_user.username}
                  >
                    <img src="https://www.amongusavatarcreator.com/assets/img/main/icon.png" alt={all_user.username} />
                    <div>
                      <h1>{all_user.username}</h1>
                      <p>Last message</p>
                    </div>
                  </div>
                );
              }
            })}
          </>
        ) : (
          <p>No one</p>
        )}
      </div>
      <div className="chat-history-container">
        {selectedUser !== null ? (
          <div className="chat-window">
            <div className="chat-header">
              <h2>{selectedUser}</h2>
              <button className="close-btn" onClick={closeChat}>
                X
              </button>
            </div>
            <div className="chat-history">
              {/* display the chat history for the selected user here */}
            </div>
            <div className="chat-input">
              <input type="text" placeholder="Type your message here..." />
              <button onClick={()=> sendMessage(selectedUser)}>Send</button>
              
            </div>
          </div>
        ) : (
          <p>Select a user to start chatting</p>
        )}
      </div>
    </div>
  );
}

export default ChatsList;
