import React, { useState } from "react";
import { Button, Form, Grid, Input, theme, Typography } from "antd";
import { CodeSandboxOutlined, MailOutlined } from "@ant-design/icons";
import useCallApi from "../../../services/useCallAPi";
import instanceCore from "../../../services/setUpAxios";
import { toast } from "react-toastify";
import AppOtpModal from "../../../components/AppOTPModal";
import API from "../../../services/shared/api";
import { saveSessionData } from "../../../services/Application/SessionStorage";
import { AUTH_KEY_EMAIL_RESET_PASS } from "../../../services/shared/constants/Key";

const { useToken } = theme;
const { useBreakpoint } = Grid;
const { Text, Title, Link } = Typography;

const ForgotPage = () => {
    const { token } = useToken();
    const screens = useBreakpoint();
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [emailCurrent, setEmailCurrent] = useState(false)
    const { send, loading } = useCallApi({
        callApi: (data) => {
            return instanceCore.post(API.API_FORGOT_PASSWORD, data)
        },
        success: (data) => {
            setIsOpenModal(true)
            toast.success(data.message)
        },
        error: (err) => {
            toast.error(err?.response?.data?.message || "Đăng ký thất bại");
        },
    });

    const onFinish = (values) => {
        const { email } = values
        setEmailCurrent(email)
        saveSessionData(AUTH_KEY_EMAIL_RESET_PASS, email)
        send({
            email: email
        })
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
        <>
            <section style={styles.section}>
                <div style={styles.container}>
                    <div style={styles.header}>
                         <CodeSandboxOutlined style={{ fontSize: 40 }} />
                        <Title style={styles.title}>Quên mật khẩu</Title>
                        <Text style={styles.text}>
                            Bạn đã quên mật khẩu ? Vui lòng để lại email bên dưới để cài lại mật khẩu
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
                        <Form.Item style={{ marginBottom: "0px" }}>
                            <Button  loading={loading} block="true" type="primary" htmlType="submit">
                                Cài đặt lại mật khẩu
                            </Button>
                            <div style={styles.footer}>
                                <Link href="/login">Đăng nhập ngay</Link>
                            </div>
                        </Form.Item>
                    </Form>
                </div>
            </section>
            <AppOtpModal isModalOpen={isOpenModal} setIsModalOpen={setIsOpenModal} email={emailCurrent}/>
        </>
    );
}
export default ForgotPage