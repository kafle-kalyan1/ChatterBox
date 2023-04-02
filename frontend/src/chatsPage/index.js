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
        <Header />
        <ChatsList />
      </div>
    );
  }
};

export default ChatsPage;
