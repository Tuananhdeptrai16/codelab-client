// src/components/BoardMoreMenu.jsx
import React from 'react';
import { Dropdown, message } from 'antd';
import { DeleteOutlined, EditOutlined, EllipsisOutlined, EyeOutlined, UserAddOutlined } from '@ant-design/icons';
import { useState } from 'react';
import AppDetailBoard from '../../../components/AppDetailBoard';
import RenameModal from '../RenameModal';
import instanceCore from '../../../services/setUpAxios';
import API from '../../../services/shared/api';
import useCallApi from '../../../services/useCallAPi';
import { toast } from 'react-toastify';
import InviteModal from '../InviteModal';

const BoardMoreMenu = ({ board }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [isOpenModalRename, setIsOpenModalRename] = useState(false)
    const [isOpenModalInvite, setIsOpenModalInvite] = useState(false)

    const { send } = useCallApi({
        callApi: () => {
            return instanceCore.delete(API.API_DELETE_BOARD, {
                data: { ids: [board.id] },
            });
        },
        success: () => {
            message.info(`Đã xóa ${board.id}`);
            window.location.reload();
        },
        error: (err) => {
            toast.error(err?.response?.data?.message || 'Lỗi khi xóa bảng');
        },
    });
    // Define your handlers inside the component
    const onView = () => {
        setIsOpen(true)
        message.info(`Viewing board ${board.id}`);
    };

    const onRename = () => {
        setIsOpenModalRename(true)
        message.info(`Renaming board ${board.id}`);
    };
    const onInvite = () => {
        setIsOpenModalInvite(true)
    };
    // Handle menu item click
    const handleClick = ({ key }) => {
        switch (key) {
            case 'view':
                onView();
                break;
            case 'rename':
                onRename();
                break;
            case 'invite':
                onInvite();
                break;
            case 'delete':
                send();
                break;
            default:
                console.warn('Unknown menu action:', key);
        }
    };

    // Menu items configuration
    const items = [
        {
            icon: <EyeOutlined />,
            key: 'view',
            label: 'Xem chi tiết',
        },
        {
            icon: <EditOutlined />,
            key: 'rename',
            label: 'Đổi tên không gian',
        },
        {
            key: 'invite',
            icon: <UserAddOutlined />,
            label: 'Thêm người dùng vào không gian làm việc',
            onClick: (e) => {
            },
        },
        {
            icon: <DeleteOutlined />,
            key: 'delete',
            label: 'Xoá không gian làm việc',
            danger: true,
        },
    ];

    return (
        <>
            <Dropdown
                menu={{
                    items,
                    onClick: handleClick,
                }}
                trigger={['click']}
                placement="bottomRight"
            >
                <EllipsisOutlined
                    style={{ fontSize: 18, cursor: 'pointer' }}
                    onClick={(e) => e.stopPropagation()}
                />
            </Dropdown>
            <AppDetailBoard open={isOpen} onClose={() => setIsOpen(false)} boardData={board} />
            <RenameModal isOpen={isOpenModalRename} setIsOpen={setIsOpenModalRename} boardID={board?.id} />
            <InviteModal isOpen={isOpenModalInvite} setIsOpen={setIsOpenModalInvite}  boardID={board?.id} />
        </>
    );
};

export default BoardMoreMenu;