import { Col, Row } from "antd";

import Login from "./Login";
import Register from "./Register";

const AuthPage = (props) => {
  return (
    <Row>
      <Col md={12} sm={24}>
        <Login onAuth={props.onAuth} />
      </Col>

      <Col md={12} sm={24}>
        <Register onAuth={props.onAuth} />
      </Col>
    </Row>
  );
};

export default AuthPage;
