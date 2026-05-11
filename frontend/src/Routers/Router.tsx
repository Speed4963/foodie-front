import { createBrowserRouter } from "react-router-dom";



const router = createBrowserRouter([
  // ✅ Door - 첫 진입 페이지 (navbar 없음)
  {
    path: "/",
    element: <Main />,
  },

  // ✅ Layout(navbar) 있는 페이지들
  {
    path: "/main",
    element: <Layout />,
    children: [
     
    ],
  },
]);

export default router;

