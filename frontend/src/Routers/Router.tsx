import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import Home from "../pages/Home";


const router = createBrowserRouter([
  // 첫 페이지
  {
    path: "/",
    element: <Home />,
  },

  // navbar 포함 페이지
  {
    path: "/main",
    element: < Home/>,
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




