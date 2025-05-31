import { Col, Row } from 'antd';
import AppSidebarLesson from '../../components/AppSidebarLesson';
import './index.style.scss'
import CodeEditorPage from '../CodeEditor';
import { useContextAction, useContextProvider } from '../../ProviderContext/AppContextProvider';
import AppViewContent from '../../components/AppViewContent';
import { useLocation } from 'react-router-dom';
import useFetch from '../../services/useFetch';
import API from '../../services/shared/api';
import AppLoader from '../../components/AppLoader';
import { useState } from 'react';
import AppQuizModal from '../../components/AppQuizModal';
import instanceCore from '../../services/setUpAxios';

const CourseContentView = () => {
    const [quizData, setQuizData] = useState([])
    const [dataLesson, setDataLesson] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { setDataCourse } = useContextAction()
    const { devMode } = useContextProvider()
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("id");
    const { data, loading } = useFetch(API.API_GET_LESSON_BY_COURSE_ID(id))
    const { data: dataCourse, loading: loadingGetCourse } = useFetch(API.API_GET_COURSE_BY_ID(id))
    setDataCourse(dataCourse)
    if (loading && loadingGetCourse) {
        return (
            <>
                <AppLoader />
                <AppLoader />
                <AppLoader />
                <AppLoader />
            </>
        )
    }
    return (
        <Row gutter={[12, 12]} className='wrap-code'>
            {devMode && <Col span={7}>
                <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                    <div className='code-component-wrap'>  <CodeEditorPage /></div>
                </div>
            </Col>}

            <Col span={devMode ? 12 : 18}>
                <div className='content'>
                    <AppViewContent data={dataLesson} />
                </div>
            </Col>
            <Col span={devMode ? 5 : 6}>
                <div className='course-content-wrap'>
                    <div className='course-content-wrap'>
                        <AppSidebarLesson
                            lessons={data}
                            setDataLesson={setDataLesson}
                            onSelectLesson={async (lesson) => {
                                try {
                                    const data = await instanceCore.get(API.API_GET_QUIZ_BY_ID(lesson));
                                    setQuizData(data?.data);
                                    setIsModalOpen(true);
                                } catch (error) {
                                    console.error("Error fetching quiz data:", error);
                                }
                            }}
                        />
                    </div>

                </div>
            </Col>
            <AppQuizModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} quizData={quizData}></AppQuizModal>
        </Row>

    );
};
export default CourseContentView