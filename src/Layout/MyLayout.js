import { Outlet } from "react-router-dom";
import React, { useRef, useState, useEffect } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import {  Button, Layout, Menu } from "antd";
import Logo from "../components/AppLogoMain/index.js";
import { LogoOnly } from "../components/AppLogoOnly";
import AppSearch from "../components/AppSearch";
import { Footer } from "./Footer/index.js";
import { useNavigate } from "react-router-dom";
import "nprogress/nprogress.css";
import {
  useThemeAction,
  useThemeState,
} from "../ProviderContext/AppThemeContext.js/index.js";
import { routeConfig } from "../pages/routeConfig.js";
import AppNotificationHeader from "../components/AppNotificationHeader/index.js";
import AppHeaderUser from "../components/AppHeaderUser/index.js";
import { useAuthState } from "../ProviderContext/AppAuthJWTContext.js/index.js";
import LogoMedium from "../components/AppLogoMd/index.js";
import AppBell from "../components/AppBell/index.js";
const { Header, Sider, Content } = Layout;
const MyLayout = () => {
  const {auth} = useAuthState()
  const navigate = useNavigate();
  const { theme } = useThemeState();
  const { handleChangeTheme } = useThemeAction();
  const [collapsed, setCollapsed] = useState(true);
  const [notification, setNotification] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const [courses, setCourses] = useState([]);
  const bellRef = useRef(null);
  const userRef = useRef(null);
  useEffect(() => {
    document.documentElement.className = theme;
    const handleClickOutSide = (e) => {
      if (bellRef.current && !bellRef.current.contains(e.target)) {
        setNotification(false);
      }
      if (userRef.current && !userRef.current.contains(e.target)) {
        setShowUser(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutSide);
    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  }, [theme]);
  return (
    <Layout className="layout">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className={`layout__background ${
          collapsed ? "d-md-none" : "logo-only"
        }`}
      >
        {collapsed === false ? <Logo /> : <LogoOnly />}
        <Menu
          style={{
            backgroundColor:
              theme === "light"
                ? "#f5f5f5f5"
                : theme === "dark"
                ? "#171c28"
                : "#f5f5f5f5",
          }}
          mode="inline"
          items={routeConfig(collapsed)}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            position: "relative",
          }}
        >
          <div
            className="header__wrap"
            style={{
              backgroundColor: theme === "light" ? "#fff" : "#292E39",
            }}
          >
            <Button
              type="button"
              icon={
                collapsed ? (
                  <MenuUnfoldOutlined
                    style={{ color: theme === "light" ? "#292E39" : "#ffff" }}
                  />
                ) : (
                  <MenuFoldOutlined
                    style={{ color: theme === "light" ? "#292E39" : "#ffff" }}
                  />
                )
              }
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "20px",
                width: 64,
                height: 64,
              }}
            />
            <div className="logo__header d-none d-md-block">
              <LogoMedium />
            </div>
            <div className="header__action">
              {auth?.token ? (
                <>
                  <div className="search d-md-none">
                    <AppSearch courses={courses} setCourses={setCourses} />
                  </div>

                  <AppBell/>
                  <AppHeaderUser
                    ref={userRef}
                    showUser={showUser}
                    setShowUser={setShowUser}
                    notification={notification}
                    handleChangeTheme={handleChangeTheme}
                  />
                </>
              ) : (
                <div className="header__action">
                  <AppSearch courses={courses} setCourses={setCourses} />
                  <div className="header__button">
                    <Button onClick={() => navigate("/login")} type="primary">
                      Đăng nhập
                    </Button>
                    <Button
                      onClick={() => navigate("/signup")}
                      className="d-md-none"
                    >
                      Đăng ký
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            minHeight: 280,
            background:
              theme === "light"
                ? "#fff"
                : theme === "dark"
                ? "#292E39"
                : "#ffff",
            borderRadius: 10,
          }}
        >
          <Outlet />
        </Content>
        <Footer />
      </Layout>
      {collapsed === false && (
        <div onClick={() => setCollapsed(!collapsed)} className="overlay"></div>
      )}
    </Layout>
  );
};

export default MyLayout;
