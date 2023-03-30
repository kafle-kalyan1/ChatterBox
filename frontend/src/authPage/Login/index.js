import { useState, useContext } from "react";

import { Col, Row, Form, Input, Button, Checkbox, notification } from "antd";

import { login } from "./login";
import { Context } from "../../context";

const Login = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useContext(Context);

  const onSuccess = (r, values) => {
    setIsLoading(false);
    setError("");

    const user = r.data;
    // Hashed password for Chat Engine
    user.hashed_password = user.password;
    // Plaintext password for Basic Auth
    user.plaintext_password = values.password;
    setUser(user);

    notification.success({
      message: "Welcome back!",
      placement: "bottomLeft",
    });
  };

  const onError = (e) => {
    setIsLoading(false);
    setError(e.detail);
  };

  const onFinish = (values) => {
    setIsLoading(true);
    login(values, (r) => onSuccess(r, values), onError);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Row
      style={{
        height: "100vh",
        backgroundColor: "#fafafa",
        color: "#262626",
        paddingTop: "25vh",
      }}
    >
      <Col offset={6} xs={12}>
        <h1>Welcome back</h1>

        <h4 style={{ color: "#8c8c8c" }}>
          Welcome back! Please enter your details
        </h4>

        <Form
          name="login"
          labelCol={{ span: 0 }}
          wrapperCol={{ span: 24 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
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

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={isLoading}>
              Submit
            </Button>
          </Form.Item>
        </Form>

        <div style={{ color: "#f5222d" }}>{error}</div>
      </Col>
    </Row>
  );
};

export default Login;
