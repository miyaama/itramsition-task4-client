import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, Typography } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";

import { IS_LOGIN_LOCAL_STORAGE } from "../../constants";
import "./AuthorizationPage.css";

const { Title } = Typography;

const AuthorizationPage = () => {
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [error, setError] = useState("");

  const register = () => {
    axios
      .post("https://itransition-task4-server.herokuapp.com/api/register", {
        email: email,
        password: password,
        name: userName,
      })
      .then((response) => {
        if (response.data.message) {
          setError(response.data.message);
          setTimeout(() => {
            setError("");
          }, 5000);
        } else if (response.status === 200) {
          localStorage.setItem(
            IS_LOGIN_LOCAL_STORAGE,
            JSON.stringify({
              id: response.data.insertId,
              isLogin: true,
            })
          );
          navigate("/users");
        }
      });
  };

  return (
    <div className="autorization-container">
      <Form
        form={form}
        layout="vertical"
        labelAlign="right"
        size="large"
        name="register"
        onFinish={register}
        className="authorization-form"
      >
        <Title level={4}>Autorization</Title>
        <Form.Item
          name="email"
          label="E-mail"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        {error && <span>{error}</span>}
        <Form.Item
          name="password"
          label="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="name"
          label="Name"
          onChange={(e) => {
            setUserName(e.target.value);
          }}
          rules={[
            {
              required: true,
              message: "Please input your name!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="authorization-form-button"
          >
            Register
          </Button>
        </Form.Item>
        <Form.Item>
          <Link to="/">Already have an account?</Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AuthorizationPage;
