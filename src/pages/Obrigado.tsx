import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Seo } from '@/components/Seo'
import { SEO_OBRIGADO } from '@/config/seo'

export default function Obrigado() {
  return (
    <section className="flex min-h-[calc(100vh-72px)] items-center justify-center px-6 py-20">
      <Seo {...SEO_OBRIGADO} />
      <div className="w-full max-w-2xl text-center">
        <div className="mx-auto mb-7 h-px w-20 bg-accent" />
        <h1 className="text-[clamp(2.25rem,5vw,3.75rem)] font-bold leading-tight">
          Recebemos seu contato
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Nossa equipe entrará em contato em breve para agendar a sua reunião.
        </p>
        <Button asChild variant="outline" size="lg" className="button-motion mt-9">
          <Link to="/">Voltar para a página inicial</Link>
        </Button>
      </div>
    </section>
  )
}
