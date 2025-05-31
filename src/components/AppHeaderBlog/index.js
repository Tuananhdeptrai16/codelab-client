import React from "react";
import {CodeSandboxOutlined } from "@ant-design/icons";
import AppSwitchDevMode from "../AppSwitchDevMode";
import { useNavigate } from "react-router-dom";
import { useContextProvider } from "../../ProviderContext/AppContextProvider";

const AppHeaderBlog = () => {
  const navigate = useNavigate();
  const {dataBlog} = useContextProvider() 
 
  
  return (
    <div className="header-course">
      <div className="left">
        <CodeSandboxOutlined onClick={() => navigate('/')} style={{ fontSize: 30 }}></CodeSandboxOutlined>
        <p className="course-title">{dataBlog?.title}</p>
      </div>
      <div className="right">
        <AppSwitchDevMode />
      </div>
    </div>
  );
};

export default AppHeaderBlog;
