
// login.js
import axios from "axios";
import { notification } from 'antd';

export const login = (values, onSuccess, onError) => {
  const str = values.username + ":" + values.password;
  const token = btoa(str);

  axios
    .get("http://127.0.0.1:8000/users/me/", {
      headers: { Authorization: `Basic ${token}` },
    })
    .then((response) => {
      const user_data = response.data;
      onSuccess(response);

      notification.success({
        message: "Successfully logged in",
        placement: "bottomLeft",
      });
      
      localStorage.setItem("users_data", JSON.stringify(user_data)); // store the entire user data object
    })
    .catch((error) => {
      onError(error.response.data);

      notification.warning({
        message: "Username or password incorrect",
        placement: "bottomLeft",
      });
    });
};



