import axios from "axios";
import {notification} from "antd";

export const deleteUser = (currentUser, onSuccess, onError) => {
  const str = currentUser.username + ":" + currentUser.plaintext_password;
  const token = btoa(str);

  axios
    .delete("http://127.0.0.1:8000/users/me/", {
      headers: { Authorization: `Basic ${token}` },
    })
    .then((r) => {onSuccess(r)
    notification.success({
      message: "Sucessfully deleted",
      placement: "bottomLeft",
    }); 
  })
    .catch((e) => onError(e.response.data));
};
