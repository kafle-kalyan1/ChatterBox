import { useContext } from "react";

import { Context } from "../context";

import Header from "./Header";

import ChatsList from './ChatList/ChatList';

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
        <ChatsList/>
      </div>
    );
  }
};

export default ChatsPage;
