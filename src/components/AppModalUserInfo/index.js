import React, { forwardRef } from 'react';
import {useNavigate } from 'react-router-dom';
import { Avatar, Button, Divider } from 'antd';
import { LoginOutlined} from "@ant-design/icons";
import './index.style.scss'
import { useAuthAction, useAuthState } from '../../ProviderContext/AppAuthJWTContext.js';
import { toast } from 'react-toastify';
import { useContextAction} from '../../ProviderContext/AppContextProvider/index.js';
const AppModalUserInfo = forwardRef(({ handleChangeTheme, theme }, userRef) => {
    const { auth } = useAuthState()
    const navigate = useNavigate();
    const { logoutUser } = useAuthAction()

    const {setIsModalEditUser} = useContextAction()
    return (
       <>
       
         <div className="header__user" ref={userRef}>
            <div className="header__user--wrap">
                <div className="header__user--info">
                    <Avatar src={auth?.user?.avatar} size={50} style={{ backgroundColor: "#fde3cf", color: "#f56a00", userSelect: 'none' }}>
                        {auth?.user?.display_name?.slice(0, 1).toUpperCase() || 'C'}
                    </Avatar>
                    <div className="header__user--info-wrap">
                        <p className="header__user--name">
                            {auth?.user?.username|| 'Người dùng'}
                        </p>
                        <p className="header__user--id">
                            {auth?.email || ''}
                        </p>
                    </div>
                </div>

                <Divider />
                <ul className="header__user--list">
                    <Button onClick={() => setIsModalEditUser(true) }>
                        Chỉnh sửa thông tin cá nhân
                    </Button>
                    <Divider />
                  
                    <li>
                        <button onClick={() => handleChangeTheme(theme)} className="header__user--theme">
                            Chủ đề: <span>{theme === "light" ? "Tối" : "Sáng"}</span>
                        </button>
                    </li>

                    <Divider />
                    <li>
                        <button
                            onClick={() => {
                                logoutUser();
                                toast.success("Đã đăng xuất");
                                navigate("/login");
                            }}
                            className="header__user--link"
                        >
                            <LoginOutlined/> {" "}
                            Đăng xuất
                        </button>
                    </li>
                </ul>
            </div>
        </div>
       </>
    );
});

export default AppModalUserInfo;
