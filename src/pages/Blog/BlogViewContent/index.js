import { useLocation } from "react-router-dom";
import { useContextAction, useContextProvider } from "../../../ProviderContext/AppContextProvider";
import useFetch from "../../../services/useFetch";
import AppLoader from "../../../components/AppLoader";
import { Col, Row } from "antd";
import CodeEditorPage from "../../CodeEditor";
import API from "../../../services/shared/api";
import AppViewBlog from "../../../components/AppViewBlog";
import { useEffect } from "react";


const BlogViewContent = () => {
    const { devMode } = useContextProvider()
    const {setDataBlog} = useContextAction()
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const blogId = searchParams.get("id");
    const { data: dataBlog, loading: loadingGetBlog } = useFetch(API.API_GET_BLOG_BY_ID(blogId))
    useEffect(() => {
      setDataBlog(dataBlog)
    }, [dataBlog, setDataBlog])
    
    if (loadingGetBlog) {
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
        <Row gutter={[12, 12]} className='wrap-code' justify={"center"}>
            {devMode && <Col span={7}>
                <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                    <div className='code-component-wrap'><CodeEditorPage /></div>
                </div>
            </Col>}

            <Col span={devMode ? 17 : 20}>
                <div className='content'>
                    <AppViewBlog data={dataBlog} />
                </div>
            </Col>
        </Row>

    );
};
export default BlogViewContent