import axios from "axios";
import React, { useState, createContext } from "react";

export const Context = createContext();

export const ContextProvider = (props) => {
  const [user, setUser] = useState(undefined);
  const value = { user, setUser };

  // Retrieve users_data from local storage and parse it to an object
  // const local_user = JSON.parse(localStorage.getItem("users_data"));

  // if (local_user) {
  //   axios({
  //     method: "get",
  //     url: "http://127.0.0.1:8000/users",
  //   })
  //     .then((response) => {
  //       response.data.results.forEach((user_data) => {
  //         if (local_user.username === user_data.username) {
  //           setUser(user_data); // set the entire user data object as the user
  //         }
  //       });
  //     })
  //     .catch((e) => console.log(e));
  // }

  return <Context.Provider value={value}>{props.children}</Context.Provider>;
};
