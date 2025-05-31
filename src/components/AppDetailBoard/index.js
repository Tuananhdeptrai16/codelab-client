import { Avatar, Col, Divider, Drawer, Row, Tag } from 'antd'
import React from 'react'
import AppDescriptionItem from '../AppDescriptionItem'
import './index.style.scss'
import useFetch from '../../services/useFetch'
import API from '../../services/shared/api'
import AppLoader from '../AppLoader'
import Title from 'antd/es/typography/Title'
const AppDetailBoard = ({ onClose, open, boardData }) => {
    const { data, loading } = useFetch(API.API_LIST_USER_IN_BOARD(boardData?.id))
    const { data: dataBoard, loading: loadingBoard } = useFetch(API.API_GET_BOARD_DETAILS(boardData?.id))
    return (
        <Drawer width={640} placement="right" closable={false} onClose={onClose} open={open}>
            {loading || loadingBoard ? <AppLoader /> : (
                <>
                    <p className="site-description-item-profile-p" style={{ marginBottom: 24 }}>
                        {boardData?.title}
                    </p>
                    <Divider />
                    <Row style={{ marginTop: 20 }}>
                        <Col span={12}>
                            <AppDescriptionItem title="Số công việc" content={boardData?.lanes?.length} />
                        </Col>
                        <Col span={12}>
                            <AppDescriptionItem title="Kiểu không gian" content={<Tag  >{dataBoard?.type}</Tag>} />
                        </Col>
                    </Row>

                    <Row style={{ marginTop: 30 }}>
                        <Col span={24}>
                            <Title level={4}>Thành viên bảng</Title>
                            <Avatar.Group>
                                {data?.users?.map(user => {
                                    return (
                                            <Avatar key={user.id} size={50} style={{ backgroundColor: "#fde3cf", color: "#f56a00", userSelect: 'none' }}>
                                                {user.username?.slice(0, 1).toUpperCase() || 'C'}
                                            </Avatar>
                                    )
                                })}
                            </Avatar.Group>


                        </Col>
                    </Row>

                    <Row style={{ marginTop: 20 }}>
                        <Col span={24}>
                            <AppDescriptionItem
                                title="Miêu tả"
                                content={dataBoard?.description}
                            />
                        </Col>
                    </Row>
                    <Divider />
                </>
            )}

        </Drawer>
    )
}

export default AppDetailBoard