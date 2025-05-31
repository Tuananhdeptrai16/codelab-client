import React from "react";
import { Outlet } from "react-router-dom";
import FooterWithoutText from "../FooterWithoutText";
import AppHeaderPrimary from "../../components/AppHeaderPrimary";
const LayoutPrimary = () => {
  return (
    <div className="layout-course">
      <AppHeaderPrimary />
      <div className="course-content">
        <Outlet />
      </div>
      <FooterWithoutText/>
    </div>
  );
};

export default LayoutPrimary;
