import TextArea from "antd/es/input/TextArea";
import React from "react";
const FormUpdateBio = ({ modalContent }) => {
  return (
    <>
      <p className="modal-sub-title">
        Phần giới thiệu (tiểu sử) được hiển thị tại trang cá nhân của bạn, giúp
        mọi người hiểu rõ hơn về bạn.
      </p>

      <div className="modal-name-content">
        <p className="modal-name-label">Giới thiệu</p>
        <TextArea row={6} value={modalContent.value} />
      </div>
    </>
  );
};

export default FormUpdateBio;
