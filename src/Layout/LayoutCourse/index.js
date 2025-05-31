import React from "react";
import { Outlet } from "react-router-dom";
import AppHeaderCourse from "../../components/AppHeaderCourse";
import './index.style.scss'
import FooterWithoutText from "../FooterWithoutText";
const LayoutCourse = () => {
  return (
    <div className="layout-course">
      <AppHeaderCourse />
      <div className="course-content">
        <Outlet />
      </div>
      <FooterWithoutText/>
    </div>
  );
};

export default LayoutCourse;
