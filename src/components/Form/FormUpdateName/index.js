import React, { useState, useEffect } from "react";
import "./index.style.scss";
import Input from "antd/es/input/Input";

const FormUpdateName = ({ modalContent, onChange }) => {
  const [displayName, setDisplayName] = useState(modalContent.value || "");

  useEffect(() => {
    setDisplayName(modalContent.value || "");
  }, [modalContent]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setDisplayName(newValue);
    onChange && onChange(newValue); // gửi lên component cha
  };

  return (
    <>
      <p className="modal-sub-title">
        Tên sẽ được hiển thị trên trang cá nhân, trong các bình luận và bài viết của bạn.
      </p>

      <div className="modal-name-content">
        <p className="modal-name-label">Họ và tên</p>
        <Input value={displayName} onChange={handleChange} />
        <p className="modal-name-label">Tên khác</p>
        <Input disabled value={displayName} />
        <p className="modal-sub">
          Tên sẽ được hiển thị trên trang cá nhân, trong các bình luận và bài viết của bạn.
        </p>
      </div>
    </>
  );
};

export default FormUpdateName;
