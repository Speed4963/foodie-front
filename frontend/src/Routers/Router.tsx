import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "../components/Layout";
import VegaPage from "../pages/VegaPage";
import StranPage from "../pages/StranPage";
import ExotPage from "../pages/ExotPage";
import KidsPage from "../pages/KidsPage";
import ChefPage from "../pages/ChefPage";
import MichPage from "../pages/MichPage";
import LiquPage from "../pages/LiquPage";
import AniPage from "../pages/AniPage";
import MainPage from "../pages/VegaPage";
import MapPage from "../pages/MapPage";
import BlogPage from "../pages/BlogPage";
import Home from "../pages/Home";
import Fpage from "../pages/Fpage";
import Commu from "../pages/Commu";
import Cus from "../pages/Cus";
import LoginPage from "../pages/LoginPage";
import MembershipPage from "../pages/MembershipPage";

const router = createBrowserRouter([
  /* 1️⃣ 레이아웃이 아예 필요 없는 독립적인 페이지들 */
  {
    path: "/",
    element: <Home />, // 👈 홈 화면에서 햄버거 버튼과 사이드바가 완벽히 제거됩니다.
  },
  {
    path: "/login",
    element: <LoginPage />, // 👈 로그인 화면도 레이아웃 없이 단독으로 렌더링됩니다.
  },
  {
    path: "/membership",
    element: <MembershipPage />, // 👈 회원가입 화면도 레이아웃에서 분리합니다.
  },

  /* 2️⃣ 햄버거 버튼과 사이드바(Layout)를 공통으로 띄워야 하는 페이지들 */
  {
    element: <Layout />, // 부모 path를 적지 않고 그룹으로 묶어 내부 하위 경로만 추적합니다.
    children: [
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
      { path: "VegaPage", element: <VegaPage /> },    // 채식주의
      { path: "ExotPage", element: <ExotPage /> },   // 이국요리
      { path: "ChefPage", element: <ChefPage /> },     // 유명쉐프
      { path: "MichPage", element: <MichPage /> }, // 미슐랭
      { path: "KidsPage", element: <KidsPage /> },     // 키즈존
      { path: "AniPage", element: <AniPage /> },       // 애견동반
      { path: "StranPage", element: <StranPage /> },   // 특이한괴식
      { path: "LiquPage", element: <LiquPage /> },   // 세계주류
      {
        path: "cus",
        element: <Cus />,
      },
      {
        path: "commu",
        element: <Commu />,
      },
      {
        path: "fpage",
        element: <Fpage />,
      },
    ],
  },

  /* 3️⃣ 잘못된 주소 접근 시 첫 화면("/")으로 리다이렉트 */
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

export default router;
