import React from "react";
import { Link } from "react-router-dom";
const ModalAI = () => {
  return (
    <div className="ai">
      <div className="ai__wrap">
        <div className="ai__img">
          <img
            src={`${process.env.PUBLIC_URL}/images/icon/girl.svg`}
            alt="girl"
            className="ai__image"
          />
        </div>
        <div className="ai__content">
          <h1 className="ai__heading">Tạo một LandingPage đơn giản bằng AI</h1>
          <Link to="#!" className="ai__link">
            Coming Soon
          </Link>
        </div>
      </div>
    </div>
  );
};
export  default ModalAI;