import React from "react";

import { Button,  Form, Grid, Input, theme, Typography } from "antd";

import {  CodeSandboxOutlined, LockOutlined } from "@ant-design/icons";
import useCallApi from "../../../services/useCallAPi";
import instanceCore from "../../../services/setUpAxios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import withAuthRedirect from "../../../HOC/withAuthRedirect";
import API from "../../../services/shared/api";
import { getSessionData } from "../../../services/Application/SessionStorage";
import { AUTH_KEY_EMAIL_RESET_PASS } from "../../../services/shared/constants/Key";

const { useToken } = theme;
const { useBreakpoint } = Grid;
const { Text, Title, Link } = Typography;

const ResetPassWord = () => {
    const emailResetCurrent = getSessionData(AUTH_KEY_EMAIL_RESET_PASS)
    const navigate = useNavigate();
    const { token } = useToken();
    const screens = useBreakpoint();
    const { send: resetPass , loading} = useCallApi({
        callApi: (data) => {
          return instanceCore.put(API.API_RESET_FORGOT_PASSWORD, data )
        },
        success: () => {
            toast.success('Cài đặt lại mật khẩu thành công')
            navigate('/login');
        },
        error: (err) => {
           toast.error(err?.response?.data?.message || "Cài đặt mật khẩu thất bại");
        },
      });
    const onFinish = (values) => {
        const {password, confirmPassword } = values
        if(password === confirmPassword) {
            resetPass({
                email : emailResetCurrent,
                new_password : password,
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
                    <CodeSandboxOutlined style={{ fontSize: 40 }} />
                    <Title style={styles.title}>Vui lòng nhập lại mật khẩu mới</Title>
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
                            Đổi mật khẩu
                        </Button>
                        <div style={styles.footer}>
                            <Text style={styles.text}>Bạn đã có tài khoản? </Text>
                            <Link href="/login">Hủy</Link>
                        </div>
                    </Form.Item>
                </Form>
            </div>
        </section>
    );
}
const ProtectedResetPassWord = withAuthRedirect(ResetPassWord)
export default ProtectedResetPassWord