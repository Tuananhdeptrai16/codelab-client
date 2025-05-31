import React from "react";
import { NavLink  } from "react-router-dom";
import { useState, useEffect } from "react";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import AppHelp from "../../../components/AppHelp";
import RouteFe from "./routeFe";
import { RightOutlined } from "@ant-design/icons";
const StudyPlanFrontEnd = () => {
  const [courses, setCourses] = useState([]);
  const [community, setCommunity] = useState([]);
  useEffect(() => {
    NProgress.start();
    fetch(`${process.env.PUBLIC_URL}/json/db.json`)
      .then((response) => response.json())
      .then((data) => {
        setCommunity(data.FacebookCommunity || []);
      })
      .catch((error) => console.log(error));
    NProgress.done();
  }, []);
  return (
    <div className="container">
      <div className="StudyPlan">
        <div className="breadcrumb">
          <div className="breadcrumb__wrap">
            <NavLink to="/home" className="breadcrumb__item">
              <p className="breadcrumb__name">Trang chủ</p>
              <RightOutlined/>
            </NavLink>
            <NavLink to="/study-plan" className="breadcrumb__item">
              <p className="breadcrumb__name ">StudyPlan</p>
              <RightOutlined/>
            </NavLink>
            <NavLink to="/study-plan/FE" className="breadcrumb__item">
              <p className="breadcrumb__name breadcrumb__active">FrontEnd</p>
            </NavLink>
          </div>
        </div>
        <RouteFe courses={courses} setCourses={setCourses} community={community}/>
      </div>
      <AppHelp />
    </div>
  );
};
export default StudyPlanFrontEnd;
