import { createBrowserRouter } from "react-router-dom";
import Main from "../pages/Main";
import Layout from "../components/Layout";

const router = createBrowserRouter([
  // 첫 페이지
  {
    path: "/",
    element: <Main />,
  },

  // navbar 포함 페이지
  {
    path: "/main",
    element: < Main/>,
    children: [
      // 예시
      // {
      //   path: "map",
      //   element: <MapPage />,
      // },
    ],
  },
]);

export default router;