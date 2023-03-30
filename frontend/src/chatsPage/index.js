import { useContext } from "react";

import { Context } from "../context";

import Header from "./Header";

const ChatsPage = () => {
  const { user } = useContext(Context);

  if (!user) {
    return <div />;
  } else {
    return (
      <div>
        <Header userName={user.username} />
        {console.log(user.username)}
        {user.username}'s chats...
      </div>
    );
  }
};

export default ChatsPage;
