import { Dropdown, Button, Popconfirm } from 'antd';
import { MoreOutlined, EditOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';

const LaneHeaderActions = ({
    laneId,
    title,
    onDelete,
    onRename,
    onView
}) => {
    const items = [
        {
            key: 'rename',
            icon: <EditOutlined />,
            label: 'Đổi tên',
            onClick: (e) => {
                e.domEvent.stopPropagation();
                onRename(laneId, title);
            },
        },
        {
            key: 'view',
            icon: <EyeOutlined />,
            label: 'Xem chi tiết',
            onClick: (e) => {
                e.domEvent.stopPropagation();
                onView(laneId);
            },
        },

        {
            key: 'delete',
            icon: <DeleteOutlined />,
            danger: true,
            label: (
                <Popconfirm
                    title={`Xóa cột "${title}"?`}
                    okText="Xóa"
                    cancelText="Hủy"
                    onConfirm={(e) => {
                        onDelete(laneId);
                    }}
                    onPopupClick={(e) => e?.stopPropagation()}
                >
                    <span onClick={(e) => e?.stopPropagation()}>Xóa</span>
                </Popconfirm>
            ),
        }
    ];

    return (
        <>
            <Dropdown
                menu={{ items }}
                trigger={['click']}
                placement="bottomRight"
            >
                <Button
                    type="text"
                    icon={<MoreOutlined />}
                    onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                    }}
                    style={{ marginLeft: 8 }}
                />
            </Dropdown>
        </>
    );
};

export default LaneHeaderActions;
