import { Button } from 'antd';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import ModalGift from '../../../components/ModalGift';
import ModalAI from '../../../components/ModalAI';
import getCourseHoc from '../../../HOC/getCourseHoc';

const RouteBe = ({ courses, community }) => {
    const navigate = useNavigate();
    const courseBE = courses?.filter(item => item.category === "BE")
    return (
        <div className="row StudyPlan__wrap">
            <div className="col-9 col-xxl-8 col-xl-12">
                <div className="StudyPlan__title">
                    <h1 className="StudyPlan__heading">Các khóa học BackEnd</h1>
                    <p className="StudyPlan__desc">
                        Backend là phần xử lý logic và quản lý dữ liệu của ứng dụng hoặc
                        trang web, bao gồm xử lý yêu cầu từ người dùng, tương tác với cơ
                        sở dữ liệu, xác thực người dùng và các hoạt động logic khác trên
                        máy chủ.
                    </p>
                </div>
                <div className="StudyPlan__list">
                    {courseBE.map((course) => {
                        return (
                            <div key={course.id} className="StudyPlan__item">
                                <div className="row">
                                    <div className="col-4 col-xxl-5 col-md-12">
                                        <picture className="StudyPlan__image">
                                            <img
                                                src={course?.course_image}
                                                alt={course?.title}
                                                className="StudyPlan__img"
                                            />
                                        </picture>
                                    </div>
                                    <div className="col-8 col-xxl-7 col-md-12 gy-md-2">
                                        <div className="StudyPlan__content">
                                            <h3 className="StudyPlan__content-title">
                                                {course.title}
                                            </h3>
                                            <p className="StudyPlan__content--desc line-clamp-3">
                                                {course.description}
                                            </p>
                                            <Button
                                                onClick={navigate("/study-plan/BE")}
                                                type="primary"
                                                style={{ marginTop: 20 }}
                                            >
                                                Vào học ngay
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="StudyPlan__connect">
                    <h1 className="StudyPlan__connect--heading">
                        Tham gia công đồng trên Facebook
                    </h1>
                    <div className="StudyPlan__connect--list">
                        {community.map((item) => {
                            return (
                                <div
                                    key={item.id}
                                    className="StudyPlan__courses--item"
                                >
                                    <div className="row">
                                        <div className="col-4 col-xxl-5 col-md-12">
                                            <picture className="StudyPlan__image">
                                                <img
                                                    src={`${process.env.PUBLIC_URL}${item.img}`}
                                                    alt=""
                                                    className="StudyPlan__img"
                                                />
                                            </picture>
                                        </div>
                                        <div className="col-8 col-xxl-7 col-md-12 gy-md-2">
                                            <div className="StudyPlan__content">
                                                <h3 className="StudyPlan__content-title">
                                                    Cộng đồng Code
                                                    <span className="StudyPlan__highlight">Lab</span>
                                                </h3>
                                                <p className="StudyPlan__content--desc line-clamp-3">
                                                    {item.description}
                                                </p>
                                                <Button
                                                    type="primary"
                                                    onClick={() =>
                                                        navigate(
                                                            "https://www.facebook.com/groups/congdongitsupport?locale=vi_VN"
                                                        )
                                                    }
                                                    style={{ marginTop: "30px" }}
                                                >
                                                    Tham gia ngay
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            <div className="col-3 col-xxl-4 col-xl-12">
                <ModalGift />
                <ModalAI />
            </div>
        </div>
    )
}

export default getCourseHoc(RouteBe)