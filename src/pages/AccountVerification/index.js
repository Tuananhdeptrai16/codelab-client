import { Button, Card, Typography } from "antd"
import styles from "./index.module.scss"
import { useNavigate, useSearchParams } from "react-router-dom"
import { toast } from "react-toastify"
import instanceCore from "../../services/setUpAxios"
import { UserOutlined } from "@ant-design/icons"
import { IconCheckCircle } from "../../assets/icon"
import API from "../../services/shared/api"
import useCallApi from "../../services/useCallAPi"

const { Title, Paragraph } = Typography

const AccountVerification = () => {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams();
    const email = searchParams.get('email');
    const token = searchParams.get('token');
    const { send: verify, loading } = useCallApi({
        callApi: (data) => {
            return instanceCore.put(API.API_VERIFY, data)
        },
        success: () => {
            toast.success('Xác thực tài khoản thành công')
            navigate('/login');
        },
        error: (err) => {
            toast.error(err?.response?.data?.message || "Đăng ký thất bại");
        },
    });
    const handleVerify = () => {
        verify({
            email : email,
            token : token
        })
        navigate('/login')
    }
    return (
        <div className={styles.confirmationContainer}>
            <Card className={styles.confirmationCard}>
                <div className={styles.confirmationHeader}>
                    <IconCheckCircle className={styles.confirmationIcon} />
                    <Title level={3} className={styles.confirmationTitle}>
                        Xác thực tài khoản của bạn
                    </Title>
                    <Paragraph className={styles.confirmationDescription}>
                        Email của bạn đã được xác minh. Vui lòng xác nhận loại tài khoản của bạn để tiếp tục.
                    </Paragraph>
                </div>

                <Button
                    type="primary"
                    size="large"
                    loading={loading}
                    onClick={() => handleVerify()}
                    icon={<UserOutlined />}
                    className={styles.confirmButton}
                >
                    Xác thực tài khoản
                </Button>

            </Card>
        </div>
    )
}
export default AccountVerification
