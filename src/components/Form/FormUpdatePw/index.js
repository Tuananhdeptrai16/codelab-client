import React from "react";
import { Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./index.style.scss";
const FormUpdatePw = () => {
  return (
    <>
      <p className="modal-sub-title">
        Mật khẩu của bạn phải có tối thiểu 8 ký tự, bao gồm cả chữ số, chữ cái
        và ký tự đặc biệt (!$@%...).
      </p>
      <div className="modal-name-content">
        <p className="modal-name-label">Mật khẩu hiện tại</p>
        <Input.Password
          placeholder="Nhập mật khẩu hiện tại của bạn"
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
        />
        <p className="modal-name-label">Mật khẩu mới</p>
        <Input.Password
          placeholder="Nhập mật khẩu mới của bạn"
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
        />
        <p className="modal-name-label">Nhập lại mật khẩu mới</p>
        <Input.Password
          placeholder="Nhập lại mật khẩu mới"
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
        />
        <Link to={"/reset-password"} className="modal-link">
          Bạn quên mật khẩu ư ?
        </Link>
      </div>
    </>
  );
};

export default FormUpdatePw;
