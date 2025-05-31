import React from "react";
import { CodeSandboxOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthState } from "../../ProviderContext/AppAuthJWTContext.js";
import { Avatar } from "antd";
import './index.style.scss'
const AppHeaderPrimary = () => {
  const { auth } = useAuthState()
  const navigate = useNavigate();
  const location = useLocation();
  const pathName = location?.pathname
  return (
    <div className="header-course">
      <div className="left">
        <CodeSandboxOutlined onClick={() => navigate('/')} style={{ fontSize: 30 }}></CodeSandboxOutlined>
        <p className="course-title"><span style={{ fontWeight: 800 }}>{pathName === '/chat' ? 'CHAT CODE LAB' : 'TRELLO CODELAB'}</span></p>
      </div>
      <div className="user-info-header-primary">
        <Avatar src={auth?.user?.avatar} size={30} style={{ backgroundColor: "#fde3cf", color: "#f56a00", userSelect: 'none' }}>
          {auth?.user?.display_name?.slice(0, 1).toUpperCase() || 'U'}
        </Avatar>
        <p>{auth?.user?.display_name}</p>
      </div>
    </div>
  );
};

export default AppHeaderPrimary;
