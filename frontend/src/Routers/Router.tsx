import { createBrowserRouter, Navigate } from "react-router-dom";
// import Login from "../pages/LoginPage";
import Membership from "../pages/MembershipPage";
import Layout from "../components/Layout";
import VegePage from "../pages/VegePage"; // 실제 메인 콘텐츠 컴포넌트 (파일 확인 필요)
import StranPage from "../pages/StranPage"; // 실제 메인 콘텐츠 컴포넌트 (파일 확인 필요)
import ExotPage from "../pages/ExotPage"; // 실제 메인 콘텐츠 컴포넌트 (파일 확인 필요)
import KidsPage from "../pages/KidsPage"; // 실제 메인 콘텐츠 컴포넌트 (파일 확인 필요)
import ChefPage from "../pages/ChefPage"; // 실제 메인 콘텐츠 컴포넌트 (파일 확인 필요)
import MichPage from "../pages/MichPage"; // 실제 메인 콘텐츠 컴포넌트 (파일 확인 필요)
import LiquPage from "../pages/LiquPage"; // 실제 메인 콘텐츠 컴포넌트 (파일 확인 필요)
import AniPage from "../pages/AniPage"; // 실제 메인 콘텐츠 컴포넌트 (파일 확인 필요)
import MainPage from "../pages/VegePage"; // 실제 메인 콘텐츠 컴포넌트 (파일 확인 필요)
import MapPage from "../pages/MapPage";
import BlogPage from "../pages/BlogPage";
import Home from "../pages/Home";


const router = createBrowserRouter([
  // 1️⃣ Layout을 부모로 사용하는 메인 그룹 (첫 화면 포함)
  {
    path: "/",
    element: <Layout />, 
    children: [
      {
        // 앱에 처음 들어왔을 때("/") 바로 보여줄 페이지
        index: true, 
        element: <Home />, 
      },
      {
        path: "Main", 
        element: <MainPage />, 
      },
      {
        path: "map",
        element: <MapPage />,
      },
      {
        path: "blog",
        element: <BlogPage />,
      },
      // {
      //   path: "cus",
      //   element: <Cus />,
      // },
      //   {
      //   path: "commu",
      //   element: <Commu />,
      // },
      //   {
      //   path: "fpage",
      //   element: <Fpage />,
      // },
    ],
  },

  // 2️⃣ 레이아웃이 필요 없는 단독 페이지 (로그인, 회원가입)
  // {
  //   path: "/login",
  //   element: <Login />,
  // },
  {
    path: "/membership",
    element: <Membership />,
  },

  // 3️⃣ 잘못된 주소 접근 시 메인("/")으로 보내기
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

export default router;
