import React, { useEffect, useState } from 'react';
import { Button,  message, List, Avatar, Dropdown, Spin, Popconfirm } from 'antd';
import useFetch from '../../services/useFetch';
import API from '../../services/shared/api';
import instanceCore from '../../services/setUpAxios';
import { BellFilled, EyeOutlined } from '@ant-design/icons';
import './index.style.scss'

const AppBell = () => {
    const [invitedCurrentId, setInvitedCurrentId] = useState(null);
    const [dataInvite, setDataInvite] = useState([]);
    const { data: dataInviteApi, loading: loadingApi } = useFetch(API.API_GET_INVITE_FOR_ME);
    useEffect(() => {
        if (dataInviteApi) {
            const dataNotification = dataInviteApi.filter(item => item.status === 'PENDING')
            setDataInvite(dataNotification);
        }
    }, [dataInviteApi]);
   
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
            <Dropdown dropdownRender={() => notificationContent} trigger={['click']} placement="bottomRight">
                <div className="bell-home-page">
                    <Button type="primary" icon={<BellFilled />} />
                    <span className='total-stat-home-page'>{dataInvite?.length}</span>
                </div>
            </Dropdown>
    );
};

export default AppBell;
