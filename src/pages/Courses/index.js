import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { NavLink, Link } from "react-router-dom";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import axios from "axios";

import { Spin } from "antd";
import AppHelp from "../../components/AppHelp/index.jsx";
import { useContextAction } from "../../ProviderContext/AppContextProvider/index.js";
import { SETTING_MY_COURSE } from "../../services/settingConfig.js";
export const Courses = () => {
  const { setTargetCourses } = useContextAction();
  const [courses, setCourses] = useState(null);
  const [userInfo, setUserInfo] = useState([]);
  const userLoggedIn = null
  const currentUser = null
  useEffect(() => {
    NProgress.start();
    try {
      const getCourses = async () => {
        const res = await axios.get(
          `${process.env.REACT_APP_API_BACKEND_URL}/courses`
        );
        setCourses(res.data);
      };
      getCourses();
    } catch (error) {
      console.log(error);
    }
    NProgress.done();
  }, []);
  useEffect(() => {
    if (userLoggedIn && currentUser?.uid) {
      try {
        const getUsers = async () => {
          const res = await axios.get(
            `${process.env.REACT_APP_API_BACKEND_URL}/users?populate=favoriteListInfo,notificationInfo,favoriteBlogInfo,CoursesInfo`
          );

          const foundUser = res.data.data.find(
            (item) => item.userId === currentUser.uid
          );
          if (foundUser) {
            setUserInfo(foundUser);
          }
        };
        getUsers();
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }
  }, [currentUser?.uid, userLoggedIn]);

  if (!courses && !userInfo && userInfo.CoursesInfo.length) {
    return (
      <div className="spin-loading">
        <Spin tip="Loading" size="large" />
      </div>
    ); // Nếu dataBlog là null, hiển thị Loading
  }

  return (
    <div className="container">
      <div className="breadcrumb">
        <div className="breadcrumb__wrap">
          <NavLink to="/home" className="breadcrumb__item">
            <p className="breadcrumb__name">Trang chủ</p>
            <img
              src={`${process.env.PUBLIC_URL}/images/icon/iconbread.svg`}
              alt=""
              className="breadcrumb__icon-arrow"
            />
          </NavLink>
          <NavLink to="/courses" className="breadcrumb__item">
            <p className="breadcrumb__name breadcrumb__active">
              Khóa học của tôi
            </p>
          </NavLink>
        </div>
      </div>
      {userLoggedIn &&
        userInfo &&
        userInfo.CoursesInfo &&
        userInfo.CoursesInfo.length >= 3 && (
          <div className="courses">
            <div className="courses__top">
              <div className="courses__left">
                <h1 className="courses__heading">KHÓA HỌC ĐÃ THAM GIA</h1>
              </div>
              <div className="courses__right">
                <Link className="courses__link" to="#!">
                  Xem tất cả
                </Link>
              </div>
            </div>
            <div className="courses__list">
              <div className="slider__container">
                <Slider {...SETTING_MY_COURSE}>
                  {userInfo &&
                    userInfo.CoursesInfo &&
                    userInfo.CoursesInfo.map((course) => {
                      return (
                        <div
                          key={course._id}
                          onClick={() => setTargetCourses(course._id)}
                          className="courses__item"
                        >
                          <div className="courses__content--wrap">
                            <Link to="/courses/form-study">
                              <picture className="courses__picture">
                                <img
                                  src={`${process.env.PUBLIC_URL}${course.courseImage}`}
                                  alt="img"
                                  className="courses__img"
                                />
                              </picture>
                            </Link>

                            <div className="courses__content">
                              <div className="courses__content--top">
                                <h4 className="courses__title">
                                  {course.title}
                                </h4>
                              </div>
                              <p className="courses__content--desc line-clamp">
                                {course.description}
                              </p>

                              <div className="courses__content--bottom">
                                <span className="courses__price">
                                  {course.price.amount === 0
                                    ? "Miễn phí"
                                    : course.price.amount}
                                </span>
                                <div className="courses__total-file">
                                  <img
                                    src={`${process.env.PUBLIC_URL}/images/icon/book.svg`}
                                    alt=""
                                    className="courses__file--icon icon"
                                  />
                                  <p className="courses__file">
                                    {course.lessonInfo.length}
                                  </p>
                                </div>
                                <div className="courses__total-lesson">
                                  <img
                                    src={`${process.env.PUBLIC_URL}/images/icon/pen.svg`}
                                    alt=""
                                    className="courses__lesson--icon icon"
                                  />
                                  <p className="courses__lesson">128</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </Slider>
              </div>
            </div>
          </div>
        )}
      <div className="courses">
        <div className="courses__top">
          <div className="courses__left">
            <h1 className="courses__heading">Kho Khóa Học</h1>
            <p className="courses__desc">
              Mong rằng những khóa học này sẽ giúp ích cho bạn và sẽ là đòn bẩy
              đưa bạn đi xa trên con đường trở thành lập trình viên chuyên
              nghiệp
            </p>
          </div>
        </div>
        <div className="courses__list">
          <div className="slider__container">
            <Slider {...SETTING_MY_COURSE}>
              {courses &&
                courses.data &&
                courses.data.map((course) => {
                  return (
                    <div key={course._id} className="courses__item">
                      <div
                        onClick={() => setTargetCourses(course._id)}
                        className="courses__content--wrap"
                      >
                        <Link
                          to={userLoggedIn ? "/courses/form-study" : "/login"}
                        >
                          <picture className="courses__picture">
                            <img
                              src={course.courseImage}
                              alt="img"
                              className="courses__img"
                            />
                          </picture>
                        </Link>
                        <div className="courses__content">
                          <div className="courses__content--top">
                            <h4 className="courses__title">{course.title}</h4>
                          </div>
                          <p className="courses__content--desc line-clamp">
                            {course.description}
                          </p>
                          <div className="courses__content--bottom">
                            <span className="courses__price">
                              {course.price.amount === 0
                                ? "Miễn phí"
                                : course.price.amount}
                            </span>
                            <div className="courses__total-file">
                              <img
                                src={`${process.env.PUBLIC_URL}/images/icon/file.svg`}
                                alt=""
                                className="courses__file--icon icon"
                              />
                              <p className="courses__file">
                                {course.lessonInfo.length}
                              </p>
                            </div>
                            <div className="courses__total-lesson">
                              <img
                                src={`${process.env.PUBLIC_URL}/images/icon/pen.svg`}
                                alt="pen"
                                className="courses__lesson--icon icon"
                              />
                              <p className="courses__lesson">10</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </Slider>
          </div>
        </div>
      </div>
      <AppHelp />
    </div>
  );
};
