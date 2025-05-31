import React from 'react'
import getBlogHoc from '../../HOC/getBlogHoc';
import { NavLink } from 'react-router-dom';
import { Avatar, Image, Tag } from 'antd';
import { CalendarOutlined, ClockCircleOutlined, DislikeOutlined, EyeOutlined, HeartOutlined, LikeOutlined,  UserOutlined } from '@ant-design/icons';
import AppLoader from '../AppLoader';
import { FormatDateToDayMonth } from '../../services/formatDateToDayMonth';

const AppListBlog = ({ blog }) => {
    if (!blog) {
        return <AppLoader />
    }
    return (
        <div className="product__list">
            {
                blog.map((product) => {
                    return (
                        <div key={product.id}>
                            <div className="product__item">
                                <div className="product__item--top">
                                    <div className="product__info-user">
                                        <div className="product__avatar">
                                            <Avatar size={40} icon={<UserOutlined />} />
                                        </div>
                                        <p className="product__user-name">
                                            Tuấn Anh
                                        </p>
                                    </div>
                                    <div className="product__action">
                                        <button className="product__save icon">
                                            <HeartOutlined style={{ fontSize: 24 }} />
                                        </button>
                                    </div>
                                </div>
                                <div className="product__item--bottom">
                                    <div className="row">
                                        <div className="col-8 col-md-12">
                                            <h2 className="product__title">
                                                <NavLink
                                                    to={`/blog-view/?id=${product?.id}`}
                                                    className="product__link"
                                                >
                                                    {product.title}
                                                </NavLink>
                                            </h2>
                                            <p className="product__item--desc line-clamp">
                                                {product.description}
                                            </p>
                                            <div className="product__info">
                                                {/* {product.category.map((cate) => {
                                                     return (
                                                         <div className="product__tag">
                                                             <p className="product__tag-name">
                                                                 {cate}
                                                             </p>
                                                         </div>
                                                     );
                                                 })} */}
                                                <p className="product__tag-name">
                                                    <Tag icon={<EyeOutlined />} color="#108ee9">
                                                       {" "} {product.views}
                                                    </Tag>
                                                </p>
                                                <p className="product__tag-name">
                                                    <Tag icon={<LikeOutlined />} color="green">
                                                     {" "}   {product.likes}
                                                    </Tag>
                                                </p>
                                                <p className="product__tag-name">
                                                    <Tag icon={<DislikeOutlined />} color="#f50">
                                                     {" "}  {product.likes}
                                                    </Tag>
                                                </p>
                                                <p className="product__tag-name">
                                                    <Tag icon={<ClockCircleOutlined />} color="#2db7f5">
                                                     {" "}   {product.duration}
                                                    </Tag>
                                                </p>
                                                <div className="product__time">
                                                    <Tag icon={<CalendarOutlined/>} color="blue">
                                                     {" "}    {FormatDateToDayMonth(product.created_at)}
                                                    </Tag>
                                                </div>

                                            </div>
                                        </div>
                                        <div className="col-4 col-md-12 gy-md-3">
                                            <div className="product__image">
                                                <Image
                                                    src={product.url_image}
                                                    alt={product.title}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
        </div>
    )
}

export default getBlogHoc(AppListBlog)