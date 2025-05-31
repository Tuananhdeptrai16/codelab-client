import React from "react";
import {  useNavigate } from "react-router-dom";
import { Row, Col, Tag } from "antd";
import getBlogHoc from "../../HOC/getBlogHoc";
import { truncate } from 'lodash';
import { ClockCircleOutlined, EyeOutlined } from "@ant-design/icons";
import Title from "antd/es/typography/Title";
const AppBlogListHomePage = ({ blog }) => {
    const navigate = useNavigate();
    return (
        <div className="shares">
            <div className="shares__top">
                <div className="shares__top--left">
                    <h2 className="shares__heading">Blog được chia sẻ</h2>
                    <p className="shares__desc">
                        Học hỏi từ tiền bối giúp bạn rút ra những kinh nghiệm quý giá và
                        xây dựng lộ trình học tập hiệu quả trong sự nghiệp.
                    </p>
                </div>
            </div>
            <div className="shares__list">
                <Row gutter={[16, 16]}>
                    {blog &&
                        blog.map((share) => (
                            <Col
                                key={share.id}
                                xs={24}
                                sm={12}
                                md={12}
                                lg={8}
                                xl={6}
                            >
                                <div  onClick={() => navigate(`/blog-view/?id=${share?.id}`)} className="shares__item">
                                    <div className="shares__item--wrap">
                                        <picture className="shares__pictures">
                                            <img
                                                src={share?.url_image}
                                                alt={`Hình ảnh của bài viết: ${share.title}`}
                                                className="shares__img"
                                            />
                                        </picture>
                                        <div className="shares__content">
                                            <div className="shares__date">
                                                <span>{share.date}</span>
                                            </div>
                                            <div className="separate"></div>
                                            <Title level={4} style={{fontWeight : 700}}>{share.title}</Title>
                                            <p style={{ marginTop: 15, lineHeight : 1.6 }}>{truncate(share.description, {
                                                length: 100,
                                            })}</p>
                                            <div className="shares__bottom">
                                                <div className="shares__timeRead">
                                                    <Tag icon={<ClockCircleOutlined />} color="#2db7f5">
                                                        {" "}   {share.duration} phút đọc
                                                    </Tag>
                                                </div>
                                                <div className="shares__views">
                                                    <EyeOutlined />
                                                    <span className="shares__views--number">{share.views}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        ))}
                </Row>
            </div>
        </div>
    );
};

export default getBlogHoc(AppBlogListHomePage);
