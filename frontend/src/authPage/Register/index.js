import { useState, useContext } from "react";

import { Col, Row, Form, Input, Button, notification } from "antd";

import { createUser } from "./createUser";
import { Context } from "../../context";

const Register = () => {
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
      message: "Welcome!",
      placement: "bottomLeft",
    });
  };

  const onError = (e) => {
    setIsLoading(false);
    setError(e);
  };

  const onFinish = (values) => {
    setIsLoading(true);
    createUser(values, (r) => onSuccess(r, values), onError);
  };

  return (
    <Row
      style={{
        height: "100vh",
        backgroundColor: "#f0f0f0",
        color: "#141414",
        paddingTop: "25vh",
      }}
    >
      <Col offset={6} xs={12}>
        <h1>Join us</h1>

        <h4 style={{ color: "#8c8c8c" }}>
          First time? Please create an account
        </h4>

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
            <Button type="primary" htmlType="submit" block loading={isLoading}>
              Submit
            </Button>
          </Form.Item>

          <div style={{ color: "#f5222d" }}>{error.toString()}</div>
        </Form>
      </Col>
    </Row>
  );
};

export default Register;
