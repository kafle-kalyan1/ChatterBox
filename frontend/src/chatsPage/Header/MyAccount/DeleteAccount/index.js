import { useContext } from "react";

import { Button } from "antd";

import { deleteUser } from "./deleteUser";
import { Context } from "../../../../context";

const DeleteAccount = () => {
  const { user, setUser } = useContext(Context);

  const onDelete = () => {
    deleteUser(
      user,
      () => {
        console.log("Deleted user...");
        setUser(undefined);
      },
      (e) => console.log("Delete user error", e)
    );
  };

  return (
    <Button type="danger" onClick={onDelete}>
      Delete Account
    </Button>
  );
};

export default DeleteAccount;
