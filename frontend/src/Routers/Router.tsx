import { createBrowserRouter } from "react-router-dom";
import Main from "../pages/Main";
import Layout from "../components/Layout";
import type { PageType } from "../App";


const router = createBrowserRouter([
  // ✅ Door - 첫 진입 페이지 (navbar 없음)
  {
    path: "/",
    element: <Main />,
  },

  // ✅ Layout(navbar) 있는 페이지들
  {
    path: "/main",
    element: <Layout currentPage={"map"} onNavigate={function (page: PageType): void {
      throw new Error("Function not implemented.");
    } } children={undefined} />,
    children: [
     
    ],
  },
]);

export default router;
