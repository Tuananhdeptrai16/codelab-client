import React from "react";
import "./index.style.scss"; // tạo file CSS riêng
import { MoreOutlined, PhoneOutlined, TeamOutlined, UserOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { Avatar, Tag } from "antd";

const AppHeaderChat = ({ userSelected }) => {
  return (
    <div className="chat-header">
      <div className="chat-header__left">
        <Avatar size={40} style={{ backgroundColor: "#fde3cf", color: "#f56a00", userSelect: 'none', marginRight: 10 }}>
          {userSelected?.name?.slice(0, 1).toUpperCase() || 'C'}
        </Avatar>
        <div className="chat-header__info">
          <div className="chat-header__name">{userSelected?.name || userSelected?.username
          }</div>
          <div className="chat-header__status">{
            userSelected?.is_group ? (
              <>
                <TeamOutlined style={{ marginRight: 4 }} />
                <Tag color="blue">Nhóm</Tag>
              </>
            ) : (
              <>
                <UserOutlined style={{ marginRight: 4 }} />
                <Tag color="green">1-1</Tag>
              </>
            )
          }</div>
        </div>
      </div>
      <div className="chat-header__right">
        <PhoneOutlined className="chat-header__icon" />
        <VideoCameraOutlined className="chat-header__icon" />
        <MoreOutlined className="chat-header__icon" />
      </div>
    </div>
  );
};

export default AppHeaderChat;
