import { Component, type ErrorInfo, type ReactNode } from 'react'
import { Button } from '@/components/ui/button'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = { hasError: false }

  public static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  public componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Erro não tratado na aplicação:', error, info)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <main className="flex min-h-screen items-center justify-center bg-background px-6 text-foreground">
          <section className="w-full max-w-lg rounded-xl border border-border bg-card p-8 text-center shadow-lg sm:p-12">
            <div className="mx-auto mb-6 h-px w-16 bg-accent" />
            <h1 className="text-3xl font-bold">Algo deu errado</h1>
            <p className="mt-4 text-muted-foreground">
              Não foi possível carregar esta página. Tente recarregar para continuar.
            </p>
            <Button className="mt-8" onClick={() => window.location.reload()}>
              Recarregar página
            </Button>
          </section>
        </main>
      )
    }

    return this.props.children
  }
}
