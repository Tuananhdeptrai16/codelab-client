import React, { useState, useEffect } from "react";
import { Avatar, Button, Upload, message } from "antd";
import "./index.style.scss";
import API from "../../../services/shared/api";
import { useAuthState } from "../../../ProviderContext/AppAuthJWTContext.js";
import { UploadOutlined } from "@ant-design/icons";

const FormUpdateAvatar = ({ modalContent, onChange }) => {
  const [imageUrl, setImageUrl] = useState(modalContent.avatar);
  const { auth } = useAuthState()
  useEffect(() => {
    return () => {
      if (imageUrl && imageUrl.startsWith("blob:")) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageUrl]);

  const handleBeforeUpload = (file) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("Bạn chỉ có thể tải lên file ảnh!");
      return false;
    }


    const reader = new FileReader();
    reader.onload = (e) => {
      setImageUrl(e.target.result);
    };
    reader.readAsDataURL(file);

    return true; 
  };

  return (
    <>
      <p className="modal-sub-title">
        Ảnh đại diện giúp mọi người nhận biết bạn dễ dàng hơn qua các bài viết,
        bình luận, tin nhắn...
      </p>
      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <Avatar size={150} src={imageUrl} />
      </div>
      <div className="modal-upload">
        <Upload
          action={`${process.env.REACT_APP_BASE_URL_API_LOCAL}${API.API_UPLOAD_IMAGE}`}
          headers={{
            Authorization: `Bearer ${auth?.token}`,
            "X-Custom-Header": "value",
          }}
          name="file"
          showUploadList={false}
          beforeUpload={handleBeforeUpload}
          onChange={(info) => {
            const { status, response } = info.file;
            
            if (status === 'done' && response && typeof response === 'object') {
              if (response.url && typeof response.url === 'string') {
                onChange(response.url);
                message.success('Upload thành công');
              } else {
                message.error('URL ảnh không hợp lệ');
              }
            } else if (status === 'error') {
              message.error('Upload thất bại');
            }
          }}
        >
          <Button icon={<UploadOutlined/>}>Chọn ảnh</Button>
        </Upload>

      </div>
    </>
  );
};

export default FormUpdateAvatar;
