import { Button } from '@/components/ui/button'

export default function Index() {
  return (
    <section className="hero-glow relative flex min-h-[calc(100vh-72px)] items-center justify-center overflow-hidden px-6 py-20 text-center">
      <div className="relative z-10 mx-auto max-w-4xl">
        <div className="hero-enter mx-auto mb-7 h-px w-20 bg-accent" />
        <h1 className="hero-enter hero-delay-1 text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.08] tracking-[-0.025em] text-foreground">
          Proteção Patrimonial
        </h1>
        <p className="hero-enter hero-delay-2 mx-auto mt-7 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Consultoria jurídica, fiscal e contábil para construir uma muralha invisível e legal ao
          redor do patrimônio que sustenta a sua família.
        </p>
        <div className="hero-enter hero-delay-3 mt-9">
          <Button type="button" size="lg" className="button-motion px-7">
            Agendar reunião
          </Button>
        </div>
      </div>
    </section>
  )
}
