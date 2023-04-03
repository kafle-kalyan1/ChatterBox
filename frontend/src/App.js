import { useContext, useEffect } from "react";
import "./App.css";
import AuthPage from "./authPage";
import ChatsPage from "./chatsPage";
import { Context } from "./context";

function App() {
  const { user, setUser } = useContext(Context);

  // useEffect(() => {
  //   const local_user = JSON.parse(localStorage.getItem("users_data"));
  //   if (local_user) {
  //     fetch("http://127.0.0.1:8000/users")
  //       .then((response) => response.json())
  //       .then((data) => {
  //         const user_data = data.results.find(
  //           (user_data) => user_data.username === local_user.username
  //         );
  //         if (user_data) {
  //           setUser(user_data);
  //         }
  //       })
  //       .catch((error) => console.error(error));
  //   }
  // }, [setUser]);

  if (user) {
    return <ChatsPage />;
  } else {
    return <AuthPage />;
  }
}

export default App;
