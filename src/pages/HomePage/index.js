import React, { useState, useEffect} from "react";
// import NProgress from "nprogress";
import "nprogress/nprogress.css";
import AppHelp from "../../components/AppHelp/index.jsx";
import { useContextAction, useContextProvider } from "../../ProviderContext/AppContextProvider/index.js";
import AppCourseHomePage from "../../components/AppCourseHomePage/index.js";
import AppShareListHomePage from "../../components/AppBlogHomePage/index.js";
import AppCatalog from "../../components/AppCatalog/index.js";
import AppVideoPopular from "../../components/AppVideoPopular/index.js";
import AppSliderHomePage from "../../components/AppSliderHomePage/index.js";
import AppModalEditUser from "../../components/AppModalEditUser/index.js";
export const HomePage = () => {
  const {  showCatalog , isModalEditUser} =
    useContextProvider();
  const { setIsModalEditUser } = useContextAction()
  const [slides, setSlides] = useState([]);
  const [courses, setCourses] = useState([]);
  const [videos, setVideos] = useState([]);
  const [blog, setBlog] = useState([]);
  useEffect(() => {
    try {
      fetch(`${process.env.PUBLIC_URL}/json/db.json`)
        .then((response) => response.json())
        .then((data) => {
          setVideos(data.videos || []);
          setSlides(data.slideShow || []);
        })

    } catch (error) {
      if (error.message === "Network Error") {
        console.log("Không có mạng");
      }
      console.error(error);
    }
  }, []);

 
 
  return (
    <div className="container">
      <AppSliderHomePage slides= {slides}/>
      <AppCourseHomePage courses ={courses} setCourses={setCourses}/>
       <AppShareListHomePage blog={blog} setBlog={setBlog}/>
      <AppVideoPopular videos={videos} />
      <AppHelp/>
      <AppModalEditUser openModal={isModalEditUser} setOpenModal={setIsModalEditUser}/>
      {showCatalog && <AppCatalog/>}
    </div>
  );
};
