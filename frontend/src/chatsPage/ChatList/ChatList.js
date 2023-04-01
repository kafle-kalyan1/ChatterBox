import axios from "axios";
import React, { useEffect, useState } from "react";
import "./chat.css";

function ChatsList() {
  const [users, setUsers] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  function selectUser(user) {
    setSelectedUser(user);
  }

  function closeChat() {
    setSelectedUser(null);
  }

  function showUsers() {
    console.log("users");
    axios({
      method: "get",
      url: "http://127.0.0.1:8000/users",
    })
      .then((res) => {
        console.log(res.data.results);
        setUsers(res.data.results);
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    showUsers();
  }, []);

  return (
    <div className="chat-container">
      <div className="users-container">
        <h1 className="chat-header">Chats</h1>
        {users !== null ? (
          <>
            {users.map((user) => {
              return (
                <div
                  className={`chat-user ${
                    user.username === selectedUser ? "active" : ""
                  }`}
                  onClick={() => selectUser(user.username)}
                  key={user.username}
                >
                  <img src={user.image} alt={user.username} />
                  <div>
                    <h1>{user.username}</h1>
                    <p>Last message</p>
                  </div>
                </div>
              );
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
              <button>Send</button>
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
