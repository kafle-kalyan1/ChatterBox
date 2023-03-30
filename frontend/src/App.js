import { useContext } from "react";

import "./App.css";

import AuthPage from "./authPage";
import ChatsPage from "./chatsPage";

import { Context } from "./context";

function App() {
  const { user } = useContext(Context);

  if (user) {
    return <ChatsPage />;
  } else {
    return <AuthPage />;
  }
}

export default App;
