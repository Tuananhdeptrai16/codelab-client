import React from 'react';
import { Modal, Button, message } from 'antd';
import instanceCore from '../../../services/setUpAxios'; // Cấu hình axios
import API from '../../../services/shared/api'; // Đường dẫn API

const ModalConfirm = ({ open, onClose, inviteId }) => {
  const handleConfirm = async () => {
    try {
      await instanceCore.post(API.API_ACCEPT_INVITE(inviteId));
      message.success('✅ Bạn đã chấp nhận lời mời.');
     
      onClose();
    } catch (err) {
      message.error('❌ Lỗi khi chấp nhận lời mời.');
    }
  };

  const handleReject = async () => {
    try {
      await instanceCore.delete(API.API_REJECT_INVITE(inviteId));
      message.success('🚫 Bạn đã từ chối lời mời.');
 
      onClose();
    } catch (err) {
      message.error('❌ Lỗi khi từ chối lời mời.');
    }
  };

  return (
    <Modal
      title="Xác nhận lời mời"
      open={!!inviteId || open}
      onCancel={onClose}
      className='modal-confirm'
      footer={[
        <Button key="back" onClick={handleReject}>
          Từ chối
        </Button>,
        <Button key="submit" type="primary" onClick={handleConfirm}>
          Xác nhận
        </Button>,
      ]}
    >
      <p>Bạn có muốn tham gia vào board được mời không?</p>
    </Modal>
  );
};

export default ModalConfirm;
