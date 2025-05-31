import React, { useState } from 'react';
import { Modal, Button, Input } from 'antd';
import { toast } from 'react-toastify';
import useCallApi from '../../services/useCallAPi';
import instanceCore from '../../services/setUpAxios';
import { useNavigate } from 'react-router-dom';
import API from '../../services/shared/api';
import { AUTH_KEY_OTP } from '../../services/shared/constant';
import { setCookie } from '../../services/Application/Cookie';

const AppOtpModal = ({ isModalOpen, setIsModalOpen, email }) => {
  const navigate = useNavigate()
  const [otp, setOtp] = useState('');

  const { send, loading } = useCallApi({
    callApi: (data) => {
        return instanceCore.post(API.API_VERIFY_FCODE, data)
    },
    success: () => {
        setCookie(AUTH_KEY_OTP, true)
        toast.success("Xác thực tài khoản thành công")
        navigate('/form-reset-password')
    },
    error: (err) => {
        setIsModalOpen(false);
        toast.error(err?.response?.data?.message || "Mã OTP không đúng");
    },
});

  const handleCancel = () => {
    setIsModalOpen(false);
    setOtp('');
  };

  const handleSubmit = () => {
    if (!otp || otp.length < 6) {
      toast.error('Vui lòng nhập đủ mã OTP (6 chữ số)');
      return;
    }
    send({
        email : email, 
        fpcode :otp
    })
    setOtp('');
  };

  return (
    <Modal
      title="Nhập mã OTP được gửi về Email của bạn!"
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
    >
      <Input.OTP
        length={6}
        value={otp}
        onChange={setOtp} // ⚠️ không phải e.target.value
        autoFocus
      />
      <Button
        type="primary"
        loading ={loading}
        onClick={handleSubmit}
        style={{ marginTop: 16, width: '100%' }}
      >
        Xác thực ngay
      </Button>
    </Modal>
  );
};

export default AppOtpModal;
