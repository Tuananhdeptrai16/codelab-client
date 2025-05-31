import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Col, Row, Tooltip } from 'antd';
import getCourseHoc from '../../HOC/getCourseHoc';
import { FilePdfOutlined } from "@ant-design/icons";
import { truncate } from 'lodash';

const AppCourseHomePage = ({ courses }) => {
    const navigate = useNavigate()

    return (
        <div className="courses">
            <div className="courses__top">
                <div className="courses__left">
                    <h1 className="courses__heading">Kho Khóa Học</h1>
                    <p className="courses__desc">
                        Mong rằng những khóa học này sẽ là đòn bẩy giúp bạn phát triển và
                        tiến xa trong hành trình trở thành lập trình viên chuyên nghiệp.
                    </p>
                </div>
                <div className="courses__right">
                </div>
            </div>
            <div className="courses__list">
                <Row gutter={[24, 24]}>
                    {courses &&
                        courses.map((course) => (
                            <Col
                                key={course.id}
                                xs={24}
                                sm={12}
                                md={12}
                                lg={8}
                                xl={6}
                            >
                                <div
                                    onClick={() => navigate(`/view/?id=${course.id}`)}
                                    className="courses__content--wrap"
                                >
                                    <picture className="courses__picture">
                                        <img
                                            src={course?.course_image}
                                            alt={course?.title}
                                            className="courses__img"
                                        />
                                    </picture>
                                    <div className="courses__content">
                                        <div className="courses__content--top">
                                            <Tooltip title={course?.title}><h4 className="courses__title">
                                                {truncate(course?.title, {
                                                    length: 30,
                                                })}
                                            </h4></Tooltip>
                                        </div>
                                        <p className="courses__content--desc line-clamp">
                                            {course.description}
                                        </p>
                                        <div className="courses__content--bottom">
                                            <span className="courses__price">
                                                Miễn phí
                                            </span>
                                            <div className="courses__total-file">
                                                <img
                                                    src={`${process.env.PUBLIC_URL}/images/icon/book.svg`}
                                                    alt="book"
                                                    className="courses__file--icon icon"
                                                />
                                                <p className="courses__file">{course?.total_lesson}</p>
                                            </div>
                                            <div className="courses__total-lesson">
                                                <FilePdfOutlined />
                                                <p className="courses__lesson">{course?.total_quiz}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        ))}
                </Row>
            </div>

        </div>
    )
}
export default getCourseHoc(AppCourseHomePage);
