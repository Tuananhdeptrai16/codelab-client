import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Quote } from "../../components/AppLogoQuote";
import ModalAI from "../../components/ModalAI";
import AppHelp from "../../components/AppHelp";
import { Button } from "antd";
import { RightOutlined } from "@ant-design/icons";
export const FlashCard = () => {
  const navigate = useNavigate();
  const [routePlants, setroutePlants] = useState([]);
  const [comunity, setComunity] = useState([]);
  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/json/db.json`)
      .then((response) => response.json())
      .then((data) => {
        setroutePlants(data.flashcard || []);
        setComunity(data.FacebookCommunity || []);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <div className="container">
      <div className="flashcard">
        <div className="breadcrumb">
          <div className="breadcrumb__wrap">
            <NavLink to="/home" className="breadcrumb__item">
              <p className="breadcrumb__name">Trang chủ</p>
                <RightOutlined/>

            </NavLink>
            <NavLink to="/flashcard" className="breadcrumb__item">
              <p className="breadcrumb__name  breadcrumb__active ">FlashCard</p>
            </NavLink>
          </div>
        </div>
        <div className="row flashcard__wrap">
          <div className="col-8 col-xxl-8 col-xl-12">
            <div className="flashcard__title">
              <h1 className="flashcard__heading">FLASHCARD</h1>
              <p className="flashcard__desc">
                Học đi đôi với hành , hãy cùng luyện tập nhiều hơn với chế độ
                FlashCard để ôn luyện lại kiến thức một cách chỉnh chu nhất
              </p>
            </div>
            <div className="flashcard__list">
              {routePlants.map((routePlant) => {
                return (
                  <div key={routePlant.id} className="flashcard__item">
                    <div className="row">
                      <div className="col-4 col-xxl-5 col-md-12">
                        <picture className="flashcard__image">
                          <img
                            src={`${process.env.PUBLIC_URL}${routePlant.img}`}
                            alt=""
                            className="flashcard__img"
                          />
                        </picture>
                      </div>
                      <div className="col-8 col-xxl-7 col-md-12 gy-md-2">
                        <div className="flashcard__content">
                          <h3 className="flashcard__content-title">
                            {routePlant.title}
                          </h3>
                          <p className="flashcard__content--desc line-clamp-3">
                            {routePlant.description}
                          </p>
                          <Button
                            type="primary"
                            onClick={() => navigate(routePlant.link)}
                            style={{ marginTop: "30px" }}
                          >
                            Luyện tập ngay
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flashcard__connect">
              <h1 className="flashcard__connect--heading">
                Tham gia công đồng trên Facebook
              </h1>
              <div className="flashcard__connect--list">
                {comunity.map((item) => {
                  return (
                    <div key={item.id} className="flashcard__routePlants--item">
                      {" "}
                      <div className="row">
                        <div className="col-4 col-xxl-5 col-md-12">
                          <picture className="flashcard__image">
                            <img
                              src={`${process.env.PUBLIC_URL}${item.img}`}
                              alt=""
                              className="flashcard__img"
                            />
                          </picture>
                        </div>
                        <div className="col-8 col-xxl-7 col-md-12 gy-md-2">
                          <div className="flashcard__content">
                            <h3 className="flashcard__content-title">
                              Cộng đồng Code
                              <span className="flashcard__highlight">Lab</span>
                            </h3>
                            <p className="flashcard__content--desc line-clamp-3">
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
          <div className="col-4 col-xxl-4 col-xl-12">
            <ModalAI />
            <Quote />
          </div>
        </div>
      </div>
      <AppHelp />
    </div>
  );
};
