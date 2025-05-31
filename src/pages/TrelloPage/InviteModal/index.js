import React, { useState, useEffect } from 'react';
import { Modal, Input, message } from 'antd';
import API from '../../../services/shared/api';
import instanceCore from '../../../services/setUpAxios';
import { MailOutlined } from '@ant-design/icons';

const InviteModal = ({ isOpen, setIsOpen, boardID }) => {
  const [newName, setNewName] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) setNewName('');
  }, [isOpen]);

  const handleInvited = async () => {
    const trimEmail = newName.trim();
    if (!trimEmail) {
      message.warning('Email không được để trống');
      return;
    }
    setLoading(true);
    try {
      const response = await instanceCore.post(API.API_INVITE_USER ,{
        inviteeEmail: trimEmail,
        boardId :boardID
      });
      if (response) {
        message.success('🎉 Người dùng sẽ nhật được thông báo về lời mời của bạn!');
        setIsOpen(false);
      } 
    } catch (error) {
      message.error('Lỗi kết nối đến máy chủ.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Nhập email để mời người dùng mới vào không gian làm việc"
      open={isOpen}
      onOk={handleInvited}
      onCancel={() => setIsOpen(false)}
      okText="Xác nhận"
      cancelText="Hủy"
      confirmLoading={loading}
    >
      <Input
        placeholder="Nhập Email"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
        onPressEnter={handleInvited}
        prefix={<MailOutlined />}
      />
    </Modal>
  );
};

export default InviteModal;
