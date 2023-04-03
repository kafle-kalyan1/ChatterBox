import { useContext } from "react";

import { Context } from "../../context";

import MyAccount from "./MyAccount";

import { Menu, notification } from "antd";
import { CommentOutlined, LogoutOutlined } from "@ant-design/icons";

const Header = () => {
  const { setUser } = useContext(Context);

  const onLogout = () => {
    setUser(undefined);
    localStorage.removeItem("users_data")
    notification.success({
      message: "See you later!",
      placement: "bottomLeft",
    });
  };

  return (
    <div style={{ height: "64px", width: "100vw", backgroundColor: "#001529" }}>
      <div
        style={{
          paddingTop: "14px",
          paddingLeft: "14px",
          fontSize: "24px",
          color: "white",
          float: "left",
        }}
      >
        <div>
          ChatterBox
        </div>
      </div>

      <Menu
        style={{ height: "64px", float: "right" }}
        theme="dark"
        selectedKeys={"mail"}
        mode="horizontal"
      >
        <Menu.Item
          style={{ lineHeight: "64px" }}
          key="mail"
          icon={<CommentOutlined />}
        >
          My Chats
        </Menu.Item>
        <MyAccount />
        <Menu.Item
          style={{ lineHeight: "64px" }}
          key="logout"
          icon={<LogoutOutlined />}
          onClick={onLogout}
        >
          Logout
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default Header;
