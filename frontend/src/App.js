import { useContext, useEffect } from "react";
import "./App.css";
import AuthPage from "./authPage";
import ChatsPage from "./chatsPage";
import { Context } from "./context";

function App() {
  const { user, setUser } = useContext(Context);

  useEffect(() => {
    const local_user = localStorage.getItem("users_data");
    console.log("local_user", local_user)
    if (local_user) {
      fetch("http://127.0.0.1:8000/users")
        .then((response) => response.json())
        .then((data) => {
          const userExists = data.results.map(
            (user_dataa) => user_dataa.username === local_user
          );
          if (userExists) {
            setUser(local_user);
          }
        })
        .catch((error) => console.error(error));
    }
  }, [setUser]);

  if (user) {
    return <ChatsPage />;
  } else {
    return <AuthPage />;
  }
}

export default App;
