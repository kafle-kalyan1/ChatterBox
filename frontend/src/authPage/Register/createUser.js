import axios from "axios";
import { notification } from 'antd';

export const createUser = (values, onSuccess, onError) => {
  axios
    .post("http://127.0.0.1:8000/users/me/", values)
    .then((r) => {onSuccess(r)
      notification.success({
        message: "Sucessfully Registered and Logged in",
        placement: "bottomLeft",
      })
    })
    .catch((e) =>{ onError(e.response.data)
    notification.error({
      message: "Username already exists please log in or change your username",
      placement: "bottomLeft",
    })});
};
