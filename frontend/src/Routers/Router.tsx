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
    // ✅ Layout이 모든 페이지를 감쌈
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
      // Home — 자체 햄버거 사이드바 보유 (Layout FAB은 숨겨짐)
      { index: true,            element: <Home />       },

      // 지도 / 블로그
      { path: "map",            element: <MapPage />    },
      { path: "blog",           element: <BlogPage />   },

      // 카테고리 페이지들
      { path: "VegaPage",       element: <VegaPage />   },
      { path: "ExotPage",       element: <ExotPage />   },
      { path: "ChefPage",       element: <ChefPage />   },
      { path: "MichPage",       element: <MichPage />   },
      { path: "KidsPage",       element: <KidsPage />   },
      { path: "AniPage",        element: <AniPage />    },
      { path: "StranPage",      element: <StranPage />  },
      { path: "LiquPage",       element: <LiquPage />   },

      // 기타
      // { path: "login",          element: <Login />       },
      { path: "membership",     element: <Membership /> },
      { path: "cus",            element: <Cus />        },
      { path: "commu",          element: <Commu />      },
      { path: "fpage",          element: <Fpage />      },
    ],
  },

  // 잘못된 주소 → 홈
  { path: "*", element: <Navigate to="/" replace /> },
]);

export default router;
