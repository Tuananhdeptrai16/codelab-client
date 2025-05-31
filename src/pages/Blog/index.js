import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Pagination, Spin } from "antd";
import ModalGift from "../../components/ModalGift";
import AppListBlog from "../../components/AppListBlog";
import ModalAI from "../../components/ModalAI";
import { RightOutlined } from "@ant-design/icons";
const Blog = () => {
  const [blog, setBlog] = useState([]);

  
  if (!blog) {
    return <Spin>Loading...</Spin>;
  }
  return (
    <div className="container">
      <div className="product">
        <div className="breadcrumb">
          <div className="breadcrumb__wrap">
            <NavLink to="/home" className="breadcrumb__item">
              <p className="breadcrumb__name">Trang chủ</p>
                 <RightOutlined/>
            </NavLink>
            <NavLink to="/link" className="breadcrumb__item">
              <p className="breadcrumb__name breadcrumb__active">Bài viết</p>
            </NavLink>
          </div>
        </div>
        <div className="row">
          <div className="col-8 col-xl-12">
            <h1 className="product__heading">Bài viết nổi bật</h1>
            <p className="product__desc">
              Tổng hợp các bài viết chia sẻ về kinh nghiệm tự học lập trình online và các kỹ thuật lập trình web.
            </p>
            <AppListBlog blog = {blog} setBlog={setBlog} />
          </div>
          <div className="col-4 col-xl-12">
            <div className="product__gift">
              <ModalGift/>
              <ModalAI/>
            </div>
          </div>
        </div>
      </div>
      <div className="product__pagination">
        <Pagination
          align="center"
          defaultCurrent={1}
          total={50}
        />
      </div>
    </div>
  );
};
export default Blog