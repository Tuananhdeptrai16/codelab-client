import React, { useState } from 'react';
import { Avatar, Button, List } from 'antd';
import './index.style.scss'
import AppDrawerDetailsCourse from '../AppDrawerDetailsCourse';
import { LinkOutlined } from '@ant-design/icons';

const AppItemSearchHome = ({ course }) => {
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    return (
        <>
            <List
                dataSource={[course]}
                renderItem={(item) => (
                    <List.Item
                        key={item.id}
                        className='item-search'
                    >
                        <Avatar
                            src={item.course_image}
                            shape="square"
                            size={50}
                            style={{ marginRight: "10px", flexShrink: 0 }}
                        />
                        <div style={{ flex: 1 }}>
                            <div className='item-search__title' >
                                {item.title}
                            </div>
                            <Button
                                type="link"
                                icon={<LinkOutlined />}
                                onClick={() => showDrawer(item)}
                                style={{ padding: 0, fontSize: "12px" }}
                            >
                                Xem nhanh
                            </Button>
                        </div>
                    </List.Item>
                )}
            />
            <AppDrawerDetailsCourse onClose={onClose} open={open} course={course} />

        </>
    );
};
export default AppItemSearchHome;