import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { URL_PHONE_NUMBER } from "../../services/urlFix";
const AppHelp = () => {
  const [notification, setNotification] = useState(true);
  const [className, setClassName] = useState(false);
 
  return (
    <div className="help">
      <button className="help__picture">
        <>
          <div
            onMouseEnter={() => setClassName(true)}
            onMouseLeave={() => setClassName(false)}
            className="help__action--wrap"
          >
            <NavLink
              to={URL_PHONE_NUMBER}
              className={`help__action help__unActive ${
                className && "help__active"
              }`}
            >
              <img
                src={`${process.env.PUBLIC_URL}/images/icon/zalo.svg`}
                alt="zalo"
                className="help__icon--social"
              />
            </NavLink>
            <a
              href="tel:+84373696603"
              className={`help__action help__unActive ${
                className && "help__active"
              }`}
            >
              <img
                src={`${process.env.PUBLIC_URL}/images/icon/phone.svg`}
                alt=""
                className="help__icon--social help__icon--active"
              />
            </a>
            <div className="help__icon-wrap">
              <img
                src={`${process.env.PUBLIC_URL}/images/icon/${
                  className ? "cancelBlack.svg" : "capy.svg"
                }`}
                alt="capy"
                className={`help__icon ${className && "help__setbg "}`}
              />
            </div>
          </div>
        </>
      </button>
      {notification && className === false && (
        <div className="help__notification">
          <button
            onClick={() => setNotification(!notification)}
            className="help__cancel"
          >
            <img
              src={`${process.env.PUBLIC_URL}/images/icon/cancel.svg`}
              alt="cancel"
              className="help__cancel--icon"
            />
          </button>
          <p className="help__desc">
            Xin chào, CodeLab rất vui được hỗ trợ bạn. Hãy chọn cách thức kết
            nối và gửi vấn đề cụ thể mà bạn cần CodeLab hỗ trợ nhé!
          </p>
        </div>
      )}
    </div>
  );
};
export default AppHelp;