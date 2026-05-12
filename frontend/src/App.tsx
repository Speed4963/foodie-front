import { RouterProvider } from 'react-router-dom'
import router from '../src/Routers/Router' // 👈 질문자님의 router.tsx 파일 경로로 수정하세요!

function App() {
  // ✅ 더 이상 useState로 페이지를 관리하지 않습니다. 
  // URL 주소에 따라 라우터가 알아서 페이지를 보여줍니다.
  return <RouterProvider router={router} />
}

export default App