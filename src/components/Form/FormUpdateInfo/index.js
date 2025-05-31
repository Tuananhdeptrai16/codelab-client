import React, { useEffect, useState } from "react";
import { Input } from "antd";
const FormUpdateInfo = ({ modalContent , onChange}) => {
  const [email, setEmail] = useState(modalContent.value || "");

  useEffect(() => {
    setEmail(modalContent.value || "");
  }, [modalContent]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setEmail(newValue);
    onChange && onChange(newValue); 
  };
  return (
    <>
      <p className="modal-sub-title">
        Email sẽ được hiển thị trên trang cá nhân, trong các bình luận và bài viết
        của bạn.
      </p>

      <div className="modal-name-content">
        <p className="modal-name-label">Email người dùng</p>
        <Input value={email} onChange={handleChange} />
        <p className="modal-sub">
          URL: https://geobay.vn/p/Tuananhbobo1608wwww
        </p>
      </div>
    </>
  );
};

export default FormUpdateInfo;
