import React, { useState } from "react";
import { Avatar, Button, List, Modal } from "antd";
import { RightOutlined } from "@ant-design/icons";
import "./index.style.scss";
import FormUpdateName from "../FormUpdateName";
import FormUpdateInfo from "../FormUpdateInfo";
import FormUpdateBio from "../FormUpdateBio";
import FormUpdateAvatar from "../FormUpdateAvatar";
import { useAuthState } from "../../../ProviderContext/AppAuthJWTContext.js";
import useCallApi from "../../../services/useCallAPi.js";
import API from "../../../services/shared/api.js";
import instanceCore from "../../../services/setUpAxios.js";
import { toast } from "react-toastify";



const FormUpdateUserProfile = () => {
  const { auth } = useAuthState()
  const [formData, setFormData] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState({
    key: "",
    title: "",
    value: "",
  });
  
  const handleItemClick = (item) => {
    setModalContent(item);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };
  const renderModalContent = () => {
    const handleChange = (value) => {
      setFormData((prev) => ({
        ...prev,
        [modalContent.key]: value,
      }));
    };
    switch (modalContent.key) {
      case "display_name":
        return <FormUpdateName modalContent={modalContent} onChange={handleChange} />;
      case "email":
        return <FormUpdateInfo modalContent={modalContent} onChange={handleChange} />;
      case "bio":
        return <FormUpdateBio modalContent={modalContent} onChange={handleChange} />;
      case "avatar":
        return <FormUpdateAvatar modalContent={modalContent} onChange={handleChange} />;
      default:
        return null;
    }
  };
  const { send, loading } = useCallApi({
    callApi: (data) => instanceCore.put(API.API_UPDATE_USER, data),
    success: () => {
      setFormData({})
      setModalContent({
        key: "",
        title: "",
        value: "",
      })
    },
    error: (err) => {
      toast.err("Cập nhật thành công");
    },
  });

  return (
    <>
      <List
        itemLayout="horizontal"
        dataSource={[
          {
            key: "email",
            title: "Email",
            value: auth?.user?.email,
          },
          {
            key: "display_name",
            title: "Tên người dùng",
            value: auth?.user?.display_name,
          },
          {
            key: "bio",
            title: "Chỉnh sửa phần giới thiệu",
            value: 'Không có thông tin',
          },
          {
            key: "avatar",
            title: "Ảnh đại diện",
            desc: "Ảnh đại diện giúp mọi người nhận biết bạn dễ dàng hơn qua các bài viết, bình luận, tin nhắn...",
            value: <Avatar src={auth?.user?.avatar}  size={50} style={{ backgroundColor: "#fde3cf", color: "#f56a00", userSelect: 'none' }}>
              {auth?.user?.display_name?.slice(0, 1).toUpperCase() || 'C'}
            </Avatar>,
          },
        ]}
        renderItem={(item) => {
          return (
            <List.Item onClick={() => handleItemClick(item)}>
              <List.Item.Meta title={item.title} description={<strong>{item.value}</strong>} />
              <RightOutlined />
            </List.Item>
          );
        }}
        className="user-profile"
      />
      <Modal
        title={modalContent.title}
        open={isModalVisible}
        onCancel={handleModalClose}
        footer={[
          <Button
            key="ok"
            type="primary"
            className="modal-btn-save"
            loading = {loading}
            onClick={() => {
              send(formData)
              setIsModalVisible(false);
            }}
          >
            Lưu lại
          </Button>

        ]}
        centered={true}
        width={400}
      >
        {renderModalContent()}
      </Modal>
    </>
  );
};

export default FormUpdateUserProfile;
