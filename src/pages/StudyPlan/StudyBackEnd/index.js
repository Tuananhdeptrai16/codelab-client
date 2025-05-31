import React from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import AppHelp from "../../../components/AppHelp";
import { RightOutlined } from "@ant-design/icons";
import RouteBe from "./routeBe";
const StudyPlanBackEnd = () => {
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
  useEffect(() => {
    const getCourses = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_API_BACKEND_URL}/courses?populate=lessonInfo`
      );
      const foundCourses = res.data.data.filter(
        (item) => item.category === "BackEnd"
      );
      setCourses(foundCourses);
    };
    getCourses();
  }, []);
  return (
    <div className="container">
      <div className="StudyPlan">
        <div className="breadcrumb">
          <div className="breadcrumb__wrap">
            <NavLink to="/home" className="breadcrumb__item">
              <p className="breadcrumb__name">Trang chủ</p>
              <RightOutlined />
            </NavLink>
            <NavLink to="/study-plan" className="breadcrumb__item">
              <p className="breadcrumb__name ">StudyPlan</p>
              <RightOutlined />
            </NavLink>
            <NavLink to="/study-plan/BE" className="breadcrumb__item">
              <p className="breadcrumb__name breadcrumb__active">BackEnd</p>
            </NavLink>
          </div>
        </div>
       <RouteBe courses={courses} setCourses={setCourses} community={community}/>
      </div>
      <AppHelp />
    </div>
  );
};
export default StudyPlanBackEnd;