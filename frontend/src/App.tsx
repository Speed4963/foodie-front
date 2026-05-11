// ============================================================
// App.tsx — 잇픽 (EAT PICK)
// 페이지: home | map | blog
// ============================================================
import { useState } from 'react'
import './index.css'
import MainPage from './pages/MainPage'
import MapPage from './pages/MapPage'
import BlogPage from './pages/BlogPage'
import Layout from './components/Layout'

export type PageType = 'home' | 'map' | 'blog'

function App() {
  const [page, setPage] = useState<PageType>('home')

  return (
    <Layout currentPage={page} onNavigate={setPage}>
      {page === 'home' && <MainPage onNavigate={setPage} />}
      {page === 'map'  && <MapPage />}
      {page === 'blog' && <BlogPage />}
    </Layout>
  )
}

export default App