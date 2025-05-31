import React, { useEffect, useState } from 'react';
import { Button, Modal, Input, Form, message, List, Avatar, Dropdown, Spin, Popconfirm } from 'antd';
import instanceCore from '../../../services/setUpAxios';
import API from '../../../services/shared/api';
import { BellFilled, EyeOutlined, PlusCircleOutlined } from '@ant-design/icons';
import useFetch from '../../../services/useFetch';

const AddColumnAction = ({ boardId, handleReload }) => {
    const [open, setOpen] = useState(false);
    const [invitedCurrentId, setInvitedCurrentId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const [dataInvite, setDataInvite] = useState([]);
    const { data: dataInviteApi, loading: loadingApi } = useFetch(API.API_GET_INVITE_FOR_ME);
    useEffect(() => {
        if (dataInviteApi) {
            const dataNotification = dataInviteApi.filter(item => item.status === 'PENDING')
            setDataInvite(dataNotification);
        }
    }, [dataInviteApi]);
    const handleAdd = async () => {
        try {
            const values = await form.validateFields();
            setLoading(true);

            const res = await instanceCore.post(API.ADD_NEW_COLUMN, {
                title: values.title,
                board_id: boardId,
            });

            if (res?.data) {
                message.success('🎉 Danh sách đã được tạo!');
                form.resetFields();
                setOpen(false);
                handleReload();
                window.location.reload();
            }
        } catch (err) {
            if (err?.response?.data?.message) {
                message.error(err.response.data.message);
            } else if (!err.errorFields) {
                message.error('Lỗi khi tạo danh sách!');
                console.error(err);
            }
        } finally {
            setLoading(false);
        }
    };
    const handleConfirm = async () => {
        try {
            const res = await instanceCore.put(API.API_UPDATE_INVITE(invitedCurrentId), { status: "ACCEPTED" });
            message.success('✅ Bạn đã chấp nhận lời mời.');
            return res;
        } catch (error) {
            if (error.response?.data?.message) {
                message.warning(`⚠️ ${error.response.data.message}`);
            } else {
                message.error('❌ Đã xảy ra lỗi khi chấp nhận lời mời.');
            }
        }
    };

    const handleReject = async () => {
        try {
            const res = await instanceCore.put(API.API_UPDATE_INVITE(invitedCurrentId), { status: "REJECTED" });
            message.success('🚫 Bạn đã từ chối lời mời.');
            return res;
        } catch (error) {
            if (error.response?.data?.message) {
                message.warning(`⚠️ ${error.response.data.message}`);
            } else {
                message.error('❌ Đã xảy ra lỗi khi từ chối lời mời.');
            }
        }
    };
    // Dropdown content custom
    const notificationContent = (
        <div className="notification-list">
            {loadingApi && <Spin />}
            <List
                dataSource={dataInvite}
                renderItem={(item) => {
                    return (
                        <List.Item key={item.id}>
                                <>
                                    <List.Item.Meta
                                         avatar={<Avatar>{item?.name_inviter?.charAt(0).toUpperCase()}</Avatar>}
                                         title={
                                            <span>
                                              <strong style={{color : '#ffb900'}}>{item?.name_inviter}</strong> đã mời bạn vào không gian làm việc của họ
                                            </span>
                                          }
                                        description={item?.board_title || 'Không có board'}
                                    />
                                    <Popconfirm
                                        title="Bạn có muốn tham gia không gian làm việc này?"
                                        onConfirm={handleConfirm}
                                        onCancel={handleReject}
                                        okText="Xác nhận"
                                        cancelText="Từ chối"
                                    >
                                        <Button icon={<EyeOutlined />} onClick={() => setInvitedCurrentId(item.id)} type="primary">Xem</Button>
                                    </Popconfirm>
                                </>
                        </List.Item>

                    );
                }}
                locale={{ emptyText: 'Không có thông báo nào.' }}
            />
        </div>
    );

    return (
        <>
            <Button
                className="button-add-column"
                type="primary"
                icon={<PlusCircleOutlined />}
                onClick={() => setOpen(true)}
            >
                Thêm danh sách
            </Button>

            <Dropdown dropdownRender={() => notificationContent} trigger={['click']} placement="bottomRight">
                <div className="bell-button">
                    <Button type="primary" icon={<BellFilled />} />
                    <span className='total-stat'>{dataInvite?.length}</span>
                </div>
            </Dropdown>

            <Modal
                title="Tạo danh sách mới"
                open={open}
                onOk={handleAdd}
                onCancel={() => setOpen(false)}
                okText="Thêm"
                cancelText="Hủy"
                confirmLoading={loading}
            >
                <Form form={form} layout="vertical">
                    <Form.Item name="title" rules={[{ required: true, message: 'Tên cột không được để trống' }]}>
                        <Input placeholder="Nhập tên danh sách" />
                    </Form.Item>
                </Form>
            </Modal>

        </>
    );
};

export default AddColumnAction;
