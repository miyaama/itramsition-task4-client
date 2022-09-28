import React, { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, Typography } from "antd";
import { Link } from "react-router-dom";
import "antd/dist/antd.css";
import axios from "axios";

import "./LoginPage.css";
import { IS_LOGIN_LOCAL_STORAGE } from "../../constants";

const { Title, Text } = Typography;

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const login = () => {
    axios
      .post("https://fathomless-headland-55323.herokuapp.com/api/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        console.log(response);
        if (response.data.message) {
          setError(response.data.message);
          setTimeout(() => {
            setError("");
          }, 3000);
        } else if (response.data[0].status === "blocked") {
          setError("Your account is blocked");
          setTimeout(() => {
            setError("");
          }, 3000);
        } else if (response.status === 200) {
          localStorage.setItem(
            IS_LOGIN_LOCAL_STORAGE,
            JSON.stringify({
              id: response.data[0].id,
              isLogin: true,
            })
          );
          navigate("/users");
        }
      });
  };

  return (
    <div className="login-container">
      <Form
        name="normal_login"
        size="large"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={login}
      >
        <Title level={4}>Log in</Title>
        <Form.Item
          name="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          rules={[
            {
              required: true,
              message: "Please input your Email!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        {error && <Text type="danger">{error} </Text>}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
        </Form.Item>
        <Form.Item>
          Or <Link to="/authorization">register now!</Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;
