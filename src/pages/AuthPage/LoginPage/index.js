import React from "react";
import { Button, Checkbox, Form, Grid, Input, theme, Typography } from "antd";
import {  CodeSandboxOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import useCallApi from "../../../services/useCallAPi.js";
import instanceCore from "../../../services/setUpAxios.js";
import { toast } from "react-toastify";
import API from "../../../services/shared/api.js";
import { useAuthAction } from "../../../ProviderContext/AppAuthJWTContext.js/index.js";

const { useToken } = theme;
const { useBreakpoint } = Grid;
const { Text, Title } = Typography;

const LoginPage = () => {
  const navigate = useNavigate()
  const { token } = useToken();
  const screens = useBreakpoint();
  const {signInUser } = useAuthAction()
  const { send: login , loading} = useCallApi({
    callApi: (data) => {
      return instanceCore.post(API.API_LOGIN, data )
    },
    success: (res) => {
        navigate('/')
        signInUser(res?.data); 
    },
    error: (err) => {
      signInUser(null, err); 
      toast.error(err?.response?.data?.message || "Đăng nhập thất bại");
    },
  });
  
  // Hàm onFinish để lấy giá trị khi submit form
  const onFinish = (values) => {
    const { remember ,...dataSubmit} = values
    login(dataSubmit)
  };

  const styles = {
    container: {
      margin: "0 auto",
      padding: screens.md ? `${token.paddingXL}px` : `${token.sizeXXL}px ${token.padding}px`,
      width: "380px"
    },
    footer: {
      marginTop: token.marginLG,
      textAlign: "center",
      width: "100%"
    },
    forgotPassword: {
      float: "right"
    },
    header: {
      marginBottom: token.marginXL
    },
    section: {
      alignItems: "center",
      backgroundColor: token.colorBgContainer,
      display: "flex",
      height: screens.sm ? "100vh" : "auto",
      padding: screens.md ? `${token.sizeXXL}px 0px` : "0px"
    },
    text: {
      color: token.colorTextSecondary
    },
    title: {
      fontSize: screens.md ? token.fontSizeHeading2 : token.fontSizeHeading3
    }
  };

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <div style={styles.header}>
          <CodeSandboxOutlined style={{ fontSize: 50 }} />
          <Title style={styles.title}>Đăng nhập</Title>
          <Text style={styles.text}>
            Chào mừng đến với CodeLab! Vui lòng nhập thông tin bên dưới và đăng nhập
          </Text>
        </div>
        <Form
          name="normal_login"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish} 
          layout="vertical"
          requiredMark="optional"
        >
          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                required: true,
                message: "Vui lòng nhập email của bạn!",
              },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mật khẩu",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              type="password"
              placeholder="Mật khẩu"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Nhớ mật khẩu</Checkbox>
            </Form.Item>
            <Link style={styles.forgotPassword} to="/forgot-password">
              Quên mật khẩu ?
            </Link>
          </Form.Item>
          <Form.Item style={{ marginBottom: "0px" }}>
            <Button loading={loading} block type="primary" htmlType="submit">
              Đăng nhập
            </Button>
            <div style={styles.footer}>
              <Text style={styles.text}>Bạn không có tài khoản? </Text>
              <Link to="/signup">Đăng ký ngay</Link>
            </div>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
};

export default LoginPage;
