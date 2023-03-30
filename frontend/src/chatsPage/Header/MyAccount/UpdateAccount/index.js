import { useState, useContext } from "react";

import { Col, Row, Button, Form, Input, notification } from "antd";

import { updateUser } from "./updateUser";
import { Context } from "../../../../context";

const EditAccount = (props) => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { user, setUser } = useContext(Context);

  const onUpdateSuccess = (r, values) => {
    setIsLoading(false);
    setError("");

    const user = r.data;
    // Hashed password for Chat Engine
    user.hashed_password = user.password;
    // Plaintext password for Basic Auth
    user.plaintext_password = values.password;
    setUser(user);

    notification.success({
      message: "Account changed",
      placement: "bottomLeft",
    });
    props.onComplete();
  };

  const onUpdateError = (e) => {
    setIsLoading(false);
    setError(e);
  };

  const onFinish = (values) => {
    setIsLoading(true);
    updateUser(user, values, (r) => onUpdateSuccess(r, values), onUpdateError);
  };

  return (
    <Form
      name="register"
      labelCol={{ span: 0 }}
      wrapperCol={{ span: 24 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
      style={{ paddingTop: "18px" }}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input placeholder="Username" />
      </Form.Item>
      <Row gutter={12}>
        <Col xs={24} sm={12}>
          <Form.Item
            label="First Name"
            name="first_name"
            rules={[
              { required: true, message: "Please input your first name!" },
            ]}
          >
            <Input placeholder="First name" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item
            label="Last Name"
            name="last_name"
            rules={[
              { required: true, message: "Please input your last name!" },
            ]}
          >
            <Input placeholder="Last name" />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: "Please input your email!" }]}
      >
        <Input placeholder="Email" />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password placeholder="Password" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          Edit Account
        </Button>
      </Form.Item>

      <div style={{ color: "#f5222d" }}>{error.toString()}</div>
    </Form>
  );
};
export default EditAccount;
