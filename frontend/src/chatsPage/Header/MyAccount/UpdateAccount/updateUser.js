import { notification } from "antd";
import axios from "axios";

export const updateUser = (currentUser, newValues, onSuccess, onError) => {
  const str = currentUser.username + ":" + currentUser.plaintext_password;
  const token = btoa(str);
  console.log(token);

  axios
    .patch("http://127.0.0.1:8000/users/me/", newValues, {
      headers: { Authorization: `Basic ${token}` },
    })
    .then((r) => {onSuccess(r)
    notification.success({
      message: "Account changed",
      placement: "bottomLeft",
    })}
    )
    .catch((e) => {
      onError(e.response.data)
      if (e.response.data.username[0]==="A user with that username already exists."){
        notification.warning({
          message: "Username already exists",
          placement: "bottomLeft",
        });
      }
      else{
        notification.error({
          message: "Something went wrong",
          placement: "bottomLeft",
        });
      }

      

    });
};
