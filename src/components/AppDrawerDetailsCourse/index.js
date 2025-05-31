import { Col, Divider, Drawer, Row, Image, Tag } from 'antd'
import React from 'react'
import AppDescriptionItem from '../AppDescriptionItem'
import './index.style.scss'
const AppDrawerDetailsCourse = ({ onClose, open, course }) => {
    return (
        <Drawer width={640} placement="right" closable={false} onClose={onClose} open={open}>
            <p className="site-description-item-profile-p" style={{ marginBottom: 24 }}>
                {course.title}
            </p>
            <Image src={course.course_image} style={{width : "100%"}}/>
            <Divider />
            <p className="site-description-item-profile-p">Thông tin chi tiết</p>
            <Row>
                <Col span={12}>
                    <AppDescriptionItem title="Tên khóa học" content={course.title} />
                </Col>
                <Col span={12}>
                    <AppDescriptionItem title="Thời gian" content={`${course.duration} giờ`} />
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <AppDescriptionItem title="Tình trạng" content={<Tag>{course.enrollment_status}</Tag>} />
                </Col>
                <Col span={12}>
                    <AppDescriptionItem title="Chứng nhận khi hoàn thành"  content={course?.completion_certificate === 1 ? 'Hỗ trợ' : 'Không hỗ trợ'}  />
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <AppDescriptionItem
                        title="Mô tả"
                        content={course.description}
                    />
                </Col>
            </Row>
            <Divider />
        </Drawer>
    )
}

export default AppDrawerDetailsCourse