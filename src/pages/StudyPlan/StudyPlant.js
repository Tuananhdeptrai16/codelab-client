import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ModalGift from "../../components/ModalGift";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import AppHelp from "../../components/AppHelp";
import { Button } from "antd";
const StudyPlan = () => {
  const navigate = useNavigate();
  const [routePlants, setRoutePlants] = useState([]);
  const [community, setCommunity] = useState([]);
  useEffect(() => {
    NProgress.start();
    fetch(`${process.env.PUBLIC_URL}/json/db.json`)
      .then((response) => response.json())
      .then((data) => {
        setRoutePlants(data.studyRoute || []);
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
              <img
                src={`${process.env.PUBLIC_URL}/images/icon/iconbread.svg`}
                alt="iconbread"
                className="breadcrumb__icon-arrow"
              />
            </NavLink>
            <NavLink to="/study-plan" className="breadcrumb__item">
              <p className="breadcrumb__name breadcrumb__active">StudyPlan</p>
            </NavLink>
          </div>
        </div>
        <div className="row StudyPlan__wrap">
          <div className="col-9 col-xxl-8 col-xl-12">
            <div className="StudyPlan__title">
              <h1 className="StudyPlan__heading">Lộ trình học </h1>
              <p className="StudyPlan__desc">
                Lộ trình học lập trình web từ cơ bản đến nâng cao giúp bạn thành
                thạo giao diện và tương tác người dùng hiệu quả
              </p>
            </div>
            <div className="StudyPlan__list">
              {routePlants.map((routePlant) => {
                return (
                  <div key={routePlant.id} className="StudyPlan__item">
                    <div className="row">
                      <div className="col-4 col-xxl-5 col-md-12">
                        <picture className="StudyPlan__image">
                          <img
                            src={`${process.env.PUBLIC_URL}${routePlant.img}`}
                            alt="routePlant"
                            className="StudyPlan__img"
                          />
                        </picture>
                      </div>
                      <div className="col-8 col-xxl-7 col-md-12 gy-md-2">
                        <div className="StudyPlan__content">
                          <h3 className="StudyPlan__content-title">
                            {routePlant.title}
                          </h3>
                          <p className="StudyPlan__content--desc line-clamp-3">
                            {routePlant.description}
                          </p>
                          <Button
                            type="primary"
                            onClick={() => navigate(routePlant.link)}
                            style={{ marginTop: "30px" }}
                          >
                            Xem chi tiết
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="StudyPlan__connect">
              <h1 className="StudyPlan__connect--heading">
                Tham gia công đồng trên Facebook
              </h1>
              <div className="StudyPlan__connect--list">
                {community.map((item) => {
                  return (
                    <div
                      key={item.id}
                      className="StudyPlan__routePlants--item"
                    >
                      {" "}
                      <div className="row">
                        <div className="col-4 col-xxl-5 col-md-12">
                          <picture className="StudyPlan__image">
                            <img
                              src={`${process.env.PUBLIC_URL}${item.img}`}
                              alt="StudyPlan__img"
                              className="StudyPlan__img"
                            />
                          </picture>
                        </div>
                        <div className="col-8 col-xxl-7 col-md-12 gy-md-2">
                          <div className="StudyPlan__content">
                            <h3 className="StudyPlan__content-title">
                              Cộng đồng Code
                              <span className="StudyPlan__highlight">Lab</span>
                            </h3>
                            <p className="StudyPlan__content--desc line-clamp-3">
                              {item.description}
                            </p>
                            <Button
                              type="primary"
                              onClick={() =>
                                navigate(
                                  "https://www.facebook.com/groups/congdongitsupport?locale=vi_VN"
                                )
                              }
                              style={{ marginTop: "30px" }}
                            >
                              Tham gia ngay
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="col-3 col-xxl-4 col-xl-12">
            <ModalGift />
            <ModalGift />
          </div>
        </div>
      </div>
      <AppHelp />
    </div>
  );
};
export  default StudyPlan