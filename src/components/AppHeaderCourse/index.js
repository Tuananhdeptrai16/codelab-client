import React from "react";
import "./index.style.scss";
import {  CodeSandboxOutlined } from "@ant-design/icons";
import AppSwitchDevMode from "../AppSwitchDevMode";
import { useNavigate } from "react-router-dom";
import { useContextProvider } from "../../ProviderContext/AppContextProvider";

const AppHeaderCourse = () => {
  const navigate = useNavigate();
  const {dataCourse} = useContextProvider() 
 
  
  return (
    <div className="header-course">
      <div className="left">
        <CodeSandboxOutlined onClick={() => navigate('/')} style={{ fontSize: 30 }}></CodeSandboxOutlined>
        <p className="course-title">{dataCourse?.title}</p>
      </div>
      <div className="right">
        <AppSwitchDevMode />
        <div className="progress">
          <div className="progress-circle">85%</div>
          <span className="progress-text">15/20 bài học</span>
        </div>
      </div>
    </div>
  );
};

export default AppHeaderCourse;
