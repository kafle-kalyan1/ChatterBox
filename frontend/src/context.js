import axios from "axios";
import React, { useState, createContext } from "react";

export const Context = createContext();

export const ContextProvider = (props) => {
  const [user, setUser] = useState(undefined);
  const value = { user, setUser };
  const local_user = (localStorage.getItem("users_data"));

  if (local_user !== null) {
    setUser(local_user.username);
  } else {
    console.log("No user data found in local storage");
  }

  return <Context.Provider value={value}>{props.children}</Context.Provider>;
};
