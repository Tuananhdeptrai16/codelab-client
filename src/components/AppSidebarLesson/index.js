import React, { useEffect, useState } from 'react';
import { CheckCircleFilled, EditOutlined, FileOutlined, PlayCircleFilled } from '@ant-design/icons';
import { Collapse, List, Spin } from 'antd';
import './index.style.scss';
import API from '../../services/shared/api';
import instanceCore from '../../services/setUpAxios';
import { truncate } from 'lodash';
import useFetch from '../../services/useFetch';
const { Panel } = Collapse;

const iconType = {
    video: <PlayCircleFilled />,
    doc: <FileOutlined />,
    edit: <EditOutlined />,
};

const AppSidebarLesson = ({ lessons, onSelectLesson, setDataLesson }) => {
    const [quizMap, setQuizMap] = useState({});
    const [loadingId, setLoadingId] = useState(null);
    const [arrLessonId, setArrLessonId] = useState()
    const { data: lessonIdArr } = useFetch(API.API_LIST_QUIZ_ANSWERED)
    useEffect(() => {
        setArrLessonId(lessonIdArr?.map(item => item.id))
    }, [lessonIdArr])
    const handlePanelChange = async (keyArr) => {
        const key = keyArr[keyArr.length - 1];
        const section = lessons.find((s) => s.id.toString() === key);
        setDataLesson(section)
        if (!section || quizMap[section.id]) return;
        setLoadingId(section.id);
        try {
            const res = await instanceCore.get(API.API_GET_QUIZ_BY_LESSON_ID(section.id));
            setQuizMap((prev) => ({ ...prev, [section.id]: res.data.data }));
        } catch (err) {
            console.log(err);
        } finally {
            setLoadingId(null);
        }
    };
    useEffect(() => {
        if (lessons?.length) {
            handlePanelChange([lessons[0].id.toString()]);
        }
    }, [lessons]);
    return (
        <div className="sidebar-wrap" style={{ display: 'flex', flexDirection: 'column' }}>
            <Collapse
                accordion
                onChange={handlePanelChange}
                defaultActiveKey={lessons?.[0]?.id?.toString()}
            >

                {lessons?.map((section) => (
                    <Panel
                        style={{ userSelect: 'none' }}
                        header={<strong>
                            {
                                truncate(section.title, {
                                    length: 40,
                                })
                            }
                        </strong>}
                        key={section.id.toString()}
                    >
                        {loadingId === section.id ? (
                            <Spin />
                        ) : (
                            <List
                                dataSource={quizMap[section.id] || []}
                                renderItem={(lesson, i) => {
                                    return (
                                        <List.Item
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                cursor: onSelectLesson ? 'pointer' : 'default',
                                            }}
                                            onClick={() => onSelectLesson?.(lesson.id)}
                                        >
                                            <div>
                                                <span style={{ marginRight: 8 }}><EditOutlined /></span>
                                                {iconType[lesson.type]}
                                                <span style={{ marginLeft: 8 }}><strong>{truncate(lesson.question, {
                                                    length:40,
                                                })}</strong></span>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                                {arrLessonId?.includes(lesson?.id) && <CheckCircleFilled style={{ color: '#52c41a' }} />}
                                            </div>
                                        </List.Item>
                                    )
                                }}
                            />
                        )}
                    </Panel>
                ))}
            </Collapse>
        </div>
    );
};

export default AppSidebarLesson;
