import React from "react";
import { Flex, Modal } from "antd";
import "./index.style.scss";
import Logo from "../AppLogoMain";
import FormUpdateUserProfile from "../Form/FormUpdateUserProfile";

const AppModalEditUser = ({ openModal, setOpenModal }) => {
  return (
    <Flex vertical gap="middle" align="flex-start">
      <Modal
        centered
        open={openModal}
        onOk={() => setOpenModal(false)}
        okText="Lưu thay đổi"
        cancelText="Hủy bỏ"
        onCancel={() => setOpenModal(false)}
        width={800}
        className="modal-edit-user"
        footer={null}
      >
        <Logo />
        <h1 className="edit-user-title">Chỉnh sửa thông tin cá nhân</h1>
        <p className="edit-user-sub-title">
          Quản lý cài đặt tài khoản của bạn như thông tin cá nhân, cài đặt bảo
          mật, quản lý thông báo, v.v.
        </p>
        <div className="edit-user-content">
          <FormUpdateUserProfile />
        </div>
      </Modal>
    </Flex>
  );
};
export default AppModalEditUser;
