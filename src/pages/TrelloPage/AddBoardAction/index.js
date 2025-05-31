import React, { useState } from 'react';
import { Button, Modal, Input, Form, message } from 'antd';
import instanceCore from '../../../services/setUpAxios';
import API from '../../../services/shared/api';
import { PlusCircleOutlined } from '@ant-design/icons';

const AddBoardAction = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleAdd = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      const res = await instanceCore.post(API.API_ADD_BOARD, {
        title: values.title,
        description: values.description,
      });

      if (res?.data) {
        message.success('🎉 Bảng đã được tạo!');
        form.resetFields();
        setOpen(false);
        window.location.reload();
      }
    } catch (err) {
      if (err?.response?.data?.message) {
        message.error(err.response.data.message);
      } else if (!err.errorFields) {
        message.error('Lỗi khi tạo bảng!');
        console.error(err);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button icon={<PlusCircleOutlined/>} type="primary" onClick={() => setOpen(true)} style={{width : '100%', marginTop : 20}}>
         Thêm bảng
      </Button>

      <Modal
        title="Tạo bảng mới"
        open={open}
        onOk={handleAdd}
        onCancel={() => setOpen(false)}
        okText="Thêm"
        cancelText="Hủy"
        confirmLoading={loading}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Tên bảng"
            name="title"
            rules={[{ required: true, message: 'Tên bảng không được để trống' }]}
          >
            <Input placeholder="Nhập tên bảng" />
          </Form.Item>

          <Form.Item label="Mô tả" name="description">
            <Input.TextArea rows={3} placeholder="Nhập mô tả (tùy chọn)" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddBoardAction;
