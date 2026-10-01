import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from '@/components/Layout'

const Index = lazy(() => import('@/pages/Index'))
const Obrigado = lazy(() => import('@/pages/Obrigado'))

function LoadingFallback() {
  return (
    <div
      className="flex min-h-[calc(100vh-72px)] items-center justify-center bg-background"
      role="status"
      aria-label="Carregando página"
    >
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-muted border-t-accent" />
      <span className="sr-only">Carregando...</span>
    </div>
  )
}

export default function App() {
  return (
    <Layout>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/obrigado" element={<Obrigado />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </Layout>
  )
}
