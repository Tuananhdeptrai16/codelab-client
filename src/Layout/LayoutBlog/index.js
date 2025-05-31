import React from "react";
import { Outlet } from "react-router-dom";
import FooterWithoutText from "../FooterWithoutText";
import AppHeaderBlog from "../../components/AppHeaderBlog";
const LayoutBlog = () => {
  return (
    <div className="layout-course">
      <AppHeaderBlog />
      <div className="course-content">
        <Outlet />
      </div>
      <FooterWithoutText/>
    </div>
  );
};

export default LayoutBlog;
