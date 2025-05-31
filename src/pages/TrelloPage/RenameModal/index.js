import React, { useState, useEffect } from 'react';
import { Modal, Input, message } from 'antd';
import API from '../../../services/shared/api';
import instanceCore from '../../../services/setUpAxios';

const RenameModal = ({ isOpen, setIsOpen, boardID }) => {
  const [newName, setNewName] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) setNewName('');
  }, [isOpen]);

  const handleRename = async () => {
    const trimmedName = newName.trim();
    if (!trimmedName) {
      message.warning('Tên không được để trống');
      return;
    }
    setLoading(true);
    try {
      const response = await instanceCore.put(API.API_UPDATE_BOARD(boardID), {
        title: trimmedName,
      });

      if (response) {
        message.success('🎉 Đã đổi tên bảng thành công!');
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
      title="Đổi tên"
      open={isOpen}
      onOk={handleRename}
      onCancel={() => setIsOpen(false)}
      okText="Xác nhận"
      cancelText="Hủy"
      confirmLoading={loading}
    >
      <Input
        placeholder="Nhập tên mới"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
        onPressEnter={handleRename}
      />
    </Modal>
  );
};

export default RenameModal;
