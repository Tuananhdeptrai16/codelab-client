import React from "react";
import { Route, Routes } from "react-router-dom";
import { PageNotFound } from "../pages/AuthPage/PageError/PageNotFound";
import { HomePage } from "../pages/HomePage";
import { ComingSoon } from "../pages/AuthPage/PageError/ComingSoon";
import { Courses } from "../pages/Courses";
import { FlashCard } from "../pages/FlashCard";
import { QuestionFlashCard } from "../pages/FlashCard/FormFlashCard";
import  Product  from "../pages/Product";
import { FormPractice } from "../pages/FormPractice";
import TrelloPage from "../pages/TrelloPage";
import { Profile } from "../pages/Profile";
import AdminWithAuth from "../pages/Admin/AdminWithAuth";
import MyLayout from "../Layout/MyLayout";
import Pay from "../pages/Pay";
import LoginPage from "../pages/AuthPage/LoginPage";
import RegisterPage from "../pages/AuthPage/RegisterPage";
import ForgotPage from "../pages/AuthPage/ForgotPage";
import ProtectedResetPassWord from "../pages/AuthPage/ResetPassword";
import AccountVerification from "../pages/AccountVerification";
import StudyPlanFrontEnd from "../pages/StudyPlan/StudyPlanFrontEnd";
import StudyPlanBackEnd from "../pages/StudyPlan/StudyBackEnd";
import  StudyPlan  from "../pages/StudyPlan/StudyPlant";
import Blog from "../pages/Blog";
import CourseContentView from "../pages/CourseContentView";
import LayoutCourse from "../Layout/LayoutCourse";
import BlogViewContent from "../pages/Blog/BlogViewContent";
import LayoutBlog from "../Layout/LayoutBlog";
import ChatRealTime from "../pages/ChatRealTime";
import LayoutPrimary from "../Layout/LayoutPrimary";
import PrivateRoute from "./privateRoute";

const MyRoute = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/account/verification" element={<AccountVerification />} />
      <Route path="/signup" element={<RegisterPage />} />
      <Route path="*" element={<PageNotFound />} />
      <Route path="/forgot-password" element={<ForgotPage />} />
      <Route path="/form-reset-password" element={<ProtectedResetPassWord />} />
      <Route path="/pay" element={<Pay />} />
      <Route element={<LayoutCourse />}>
        <Route path="/view" element={<CourseContentView />} />
      </Route>
      <Route element={<LayoutBlog />}>
        <Route path="/blog-view" element={<BlogViewContent />} />
      </Route>
      <Route element={<LayoutPrimary />}>
        <Route path="/chat" element={<ChatRealTime />} />
        <Route path="/trello" element={<TrelloPage />} />
      </Route>
      <Route element={<MyLayout />}>
        <Route path="/" element={<PrivateRoute><HomePage/></PrivateRoute>} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/study-plan" element={<StudyPlan />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/study-plan/FE" element={<StudyPlanFrontEnd />} />
        <Route path="/study-plan/BE" element={<StudyPlanBackEnd />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/form-practice" element={<FormPractice />} />
        <Route path="/flashcard" element={<FlashCard />} />
        <Route path="/link" element={<Product />} />
        <Route path="/user" element={<ComingSoon />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<AdminWithAuth />} />
        <Route
          path="/study-plan/FE/fl-html-css"
          element={<QuestionFlashCard />}
        />
        <Route
          path="/study-plan/FE/fl-card-react"
          element={<QuestionFlashCard />}
        />
        <Route
          path="/study-plan/FE/flash-card-javascript"
          element={<QuestionFlashCard />}
        />
      </Route>
    </Routes>
  );
};

export default MyRoute;
