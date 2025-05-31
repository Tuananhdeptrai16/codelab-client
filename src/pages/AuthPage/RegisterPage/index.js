import React from "react";

import { Button,  Form, Grid, Input, theme, Typography } from "antd";

import {  CodeSandboxCircleFilled, LockOutlined, MailOutlined } from "@ant-design/icons";
import useCallApi from "../../../services/useCallAPi.js";
import instanceCore from "../../../services/setUpAxios.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import API from "../../../services/shared/api.js";
import { useAuthAction } from "../../../ProviderContext/AppAuthJWTContext.js/index.js";

const { useToken } = theme;
const { useBreakpoint } = Grid;
const { Text, Title, Link } = Typography;

const RegisterPage = () => {
    const navigate = useNavigate();
    const { token } = useToken();
    const screens = useBreakpoint();
    const {signUpUser} = useAuthAction();
    const { send: register , loading} = useCallApi({
        callApi: (data) => {
          return instanceCore.post(API.API_REGISTER, data )
        },
        success: (res) => {
            
            navigate('/login');
            signUpUser(res?.data); 
        },
        error: (err) => {
           signUpUser(null, err); 
           toast.error(err?.response?.data?.message || "Đăng ký thất bại");
        },
      });
    const onFinish = (values) => {
        const { email,password, confirmPassword } = values
        if(password === confirmPassword) {
            register({
                email : email,
                password : password,
            })
        } else {
            toast.error('Nhập lại mật khẩu không khớp');
        }
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
                   <CodeSandboxCircleFilled style={{ fontSize: 40 }} />
                    <Title style={styles.title}>Đăng ký</Title>
                    <Text style={styles.text}>
                        Chào mừng đến với CodeLab ! Vui lòng nhập thong tin bên dưới và đăng ký
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
                    <Form.Item
                        name="confirmPassword"
                        rules={[
                            {
                                required: true,
                                message: "Vùi lòng nhập lại mật khẩu",
                            },
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined />}
                            type="password"
                            placeholder="Nhập lại mật khẩu"
                        />
                    </Form.Item>
                    <Form.Item style={{ marginBottom: "0px" }}>
                        <Button loading={loading} block="true" type="primary" htmlType="submit">
                            Đăng ký
                        </Button>
                        <div style={styles.footer}>
                            <Text style={styles.text}>Bạn đã có tài khoản? </Text>
                            <Link href="/login">Đăng nhập ngay</Link>
                        </div>
                    </Form.Item>
                </Form>
            </div>
        </section>
    );
}
export default RegisterPage