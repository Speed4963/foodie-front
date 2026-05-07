// ============================================================
// App.tsx — 잇픽 (EAT PICK)
// ⚠️ react-router-dom 불필요 — useState로 페이지 전환
// ============================================================
import { useState } from 'react'
// App.css import 제거 — index.css 하나로 통합
import './index.css'
import MainPage from './pages/MainPage'
import MapPage from './pages/MapPage'
import Layout from './components/Layout'

export type PageType = 'home' | 'map'

function App() {
  const [page, setPage] = useState<PageType>('home')

  return (
    <Layout currentPage={page} onNavigate={setPage}>
      {page === 'home' && <MainPage onNavigate={setPage} />}
      {page === 'map'  && <MapPage />}
    </Layout>
  )
}

export default App