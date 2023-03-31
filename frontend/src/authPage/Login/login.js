import axios from "axios";
import { notification } from 'antd';

export const login = (values, onSuccess, onError) => {
  const str = values.username + ":" + values.password;
  const token = btoa(str);

  axios
    .get("http://127.0.0.1:8000/users/me/", {
      headers: { Authorization: `Basic ${token}` },
    })
    .then((r) => {onSuccess(r)
      notification.success({
        message: "Sucessfully logged in",
        placement: "bottomLeft",
      });
    })
    .catch((e) => {onError(e.response.data)
      notification.warning({
        message: "Something went wrong",
        placement: "bottomLeft",
      });
    
    });
};
