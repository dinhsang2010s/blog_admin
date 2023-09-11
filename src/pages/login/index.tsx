import {
  Button,
  Checkbox,
  Form,
  FormInstance,
  Input,
  Tabs,
  TabsProps,
  message,
} from "antd";
import { useRequest } from "../../hooks/useRequest";
import { LoginModel, RegisterModel, Token } from "../../interfaces/client";
import "./index.less";
import { useRef, useState } from "react";
import { useHistory } from "../../hooks/useHistory";

export const Login = () => {
  const [activeKey, setActiveKey] = useState("1");
  const formRegisterRef = useRef<FormInstance>(null);
  const formLoginRef = useRef<FormInstance>(null);

  const onFinishLogin = (values: LoginModel) => {
    const { name, password } = values;
    useRequest<Token>({
      url: "auth/login",
      method: "POST",
      body: {
        name,
        password,
      },
    })
      .then((res) => {})
      .catch((err) => console.log("asdasd", err));
  };

  const onFinishRegister = (values: RegisterModel) => {
    const { name, password } = values;
    useRequest<{ name: string }>({
      url: "auth/register",
      method: "POST",
      body: {
        name,
        password,
      },
    })
      .then((res) => {
        if (res.name) {
          formRegisterRef.current?.resetFields();
          formLoginRef.current?.setFieldValue("name", res.name);
          setActiveKey("1");
          message.success(
            `Welcome to ${res.name}. You have successfully registered!`
          );
        }
      })
      .catch((err) => {
        formRegisterRef.current?.setFields([
          {
            name: "name",
            errors: [err.message],
          },
        ]);
      });
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Login",
      children: (
        <Form
          ref={formLoginRef}
          name="loginForm"
          className="from-login"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onFinishLogin}
          autoComplete="off"
        >
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your username (*)",
              },
            ]}
          >
            <Input
              className="input-form-item"
              placeholder="Username"
              bordered={false}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password (*)",
              },
            ]}
          >
            <Input.Password
              className="input-form-item"
              placeholder="Password"
              bordered={false}
            />
          </Form.Item>
          <Form.Item
            style={{ paddingTop: 10 }}
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 0, span: 16 }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 0 }}>
            <Button
              className="btn-form-item w-full"
              type="primary"
              htmlType="submit"
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      ),
    },
    {
      key: "2",
      label: "Register",
      children: (
        <Form
          ref={formRegisterRef}
          name="registerForm"
          className="from-login"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onFinishRegister}
          autoComplete="off"
        >
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your username (*)",
              },
            ]}
          >
            <Input
              className="input-form-item"
              placeholder="Username"
              bordered={false}
            />
          </Form.Item>
          <Form.Item name="displayName">
            <Input
              className="input-form-item "
              placeholder="Displayname"
              bordered={false}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password (*)",
              },
              { min: 6, message: "Passwords must be at least 6 characters!" },
            ]}
          >
            <Input.Password
              className="input-form-item"
              placeholder="Password"
              bordered={false}
            />
          </Form.Item>
          <Form.Item style={{ paddingTop: 20 }} wrapperCol={{ offset: 0 }}>
            <Button
              className="btn-form-item w-full"
              type="primary"
              htmlType="submit"
            >
              Register
            </Button>
          </Form.Item>
        </Form>
      ),
    },
  ];

  return (
    <div className="login">
      <img className="wave" src="../../../src/assets/wave.png" />
      <div className="row flex-center">
        <div className="flex-cell">
          <img className="w-full" src="../../../src/assets/bg.svg" />
        </div>
        <div className="flex-cell">
          <div className="container">
            <img src="../../../src/assets/avatar.svg" />
            <Tabs
              className="tabs-login w-full"
              activeKey={activeKey}
              items={items}
              onTabClick={(k) => {
                setActiveKey(k);
                useHistory(k === "1" ? `/login` : "/register", {
                  replace: true,
                });
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
