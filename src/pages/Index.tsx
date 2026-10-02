import {
  ShieldCheck,
  ArrowRight,
  CheckCircle,
  Building2,
  Stethoscope,
  Tractor,
  TrendingUp,
  FileCheck2,
  ChevronRight,
  PhoneCall,
  Scale,
  Award,
  Landmark,
  Globe2,
  ShieldAlert,
  Clock,
  Sparkles,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { ContactForm } from '@/components/ContactForm'
import { PatrimonialCalculator } from '@/components/calculator/PatrimonialCalculator'
import { FloatingCalculatorTrigger } from '@/components/calculator/FloatingCalculatorTrigger'
import { ChatBotWidget } from '@/components/chat/ChatBotWidget'
import { Seo } from '@/components/Seo'
import { SEO_HOME, LEGAL_SERVICE_SCHEMA } from '@/config/seo'
import {
  segmentosData,
  beneficiosHolding,
  diferenciaisData,
  areasAtuacaoData,
  faqsData,
} from '@/data/landingData'

export default function Index() {
  const scrollToContact = () => {
    const el = document.getElementById('contato')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToCalculator = () => {
    const el = document.getElementById('calculadora')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToAreas = () => {
    const el = document.getElementById('areas-de-atuacao')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="flex flex-col">
      <Seo {...SEO_HOME} jsonLd={LEGAL_SERVICE_SCHEMA} />
      {/* 1. HERO SECTION */}
      <section className="hero-glow relative flex min-h-[calc(100vh-72px)] items-center justify-center overflow-hidden px-5 py-20 text-center sm:px-6 lg:px-8">
        <div className="relative z-10 mx-auto max-w-5xl">
          <div className="hero-enter mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent sm:text-sm">
            <Sparkles className="h-4 w-4" />
            Holding Familiar & Estruturação Patrimonial
          </div>

          <h1 className="hero-enter hero-delay-1 mx-auto max-w-4xl text-[clamp(2.35rem,5.5vw,4.25rem)] font-bold leading-[1.12] tracking-[-0.025em] text-foreground">
            Proteja o patrimônio que levou uma vida para construir.
          </h1>

          <p className="hero-enter hero-delay-2 mx-auto mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg lg:text-xl">
            Consultoria jurídica e tributária de excelência conduzida pelo escritório{' '}
            <strong className="font-semibold text-foreground">Damasceno Santos Advocacia</strong>.
            Construímos uma muralha lícita para blindar seus bens operacionais, otimizar tributos de
            locação e viabilizar a sucessão familiar sem os custos e desgastes do inventário.
          </p>

          <div className="hero-enter hero-delay-3 mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              type="button"
              size="lg"
              className="button-motion w-full px-8 py-6 text-base font-semibold shadow-lg sm:w-auto"
              onClick={scrollToContact}
            >
              Agendar reunião diagnóstica
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="button-motion w-full border-accent/50 px-7 py-6 text-base text-accent hover:bg-accent/10 sm:w-auto"
              onClick={scrollToCalculator}
            >
              Simular Custos do Inventário
            </Button>
          </div>

          {/* Destaques rápidos de autoridade */}
          <div className="hero-enter hero-delay-3 mt-14 grid grid-cols-2 gap-4 border-t border-border/60 pt-8 sm:grid-cols-4 sm:gap-6">
            <div className="flex flex-col items-center">
              <span className="font-serif text-2xl font-bold text-accent sm:text-3xl">
                +30 anos
              </span>
              <span className="mt-1 text-xs text-muted-foreground sm:text-sm">
                Experiência jurídica
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-serif text-2xl font-bold text-accent sm:text-3xl">Zero</span>
              <span className="mt-1 text-xs text-muted-foreground sm:text-sm">
                Paralisia de inventário
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-serif text-2xl font-bold text-accent sm:text-3xl">Até 60%</span>
              <span className="mt-1 text-xs text-muted-foreground sm:text-sm">
                Economia tributária
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-serif text-2xl font-bold text-accent sm:text-3xl">100%</span>
              <span className="mt-1 text-xs text-muted-foreground sm:text-sm">
                Controle com usufruto
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. O QUE É UMA HOLDING FAMILIAR */}
      <section
        id="o-que-e"
        className="scroll-mt-20 border-t border-border/60 bg-muted/30 py-20 lg:py-28"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <Badge
              variant="outline"
              className="border-accent/40 text-accent font-medium uppercase tracking-wider"
            >
              Conceito & Benefícios
            </Badge>
            <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              O que é uma Holding Familiar?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Uma empresa cofre constituída estritamente para deter, organizar e proteger o
              patrimônio de uma família, transformando a gestão de bens imobiliários e participações
              empresariais em um ecossistema seguro, rentável e perene.
            </p>
          </div>

          <div className="mt-14 grid gap-8 lg:grid-cols-12 lg:items-center">
            {/* Bloco de Comparação Didática */}
            <div className="space-y-6 lg:col-span-7">
              <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-sm sm:p-8">
                <h3 className="font-serif text-xl font-bold text-foreground sm:text-2xl">
                  A diferença prática entre Inventário e Holding Familiar
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  No modelo tradicional, o falecimento do patriarca ou matriarca deflagra um
                  inventário custoso e demorado. Contas bancárias são bloqueadas, imóveis não podem
                  ser vendidos sem alvará judicial e o imposto de transmissão (ITCMD) consome
                  quantias vultosas da liquidez da família.
                </p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-4">
                    <div className="flex items-center gap-2 text-destructive font-semibold text-sm">
                      <ShieldAlert className="h-4 w-4 shrink-0" /> Sem Planejamento (Inventário)
                    </div>
                    <ul className="mt-3 space-y-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                      <li className="flex items-start gap-1.5">
                        <span className="text-destructive font-bold">•</span>
                        Custos totais entre 10% a 20% do patrimônio bruto
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="text-destructive font-bold">•</span>
                        Processo demorado (meses a anos de litígio)
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="text-destructive font-bold">•</span>
                        Bens congelados e risco de desgaste familiar
                      </li>
                    </ul>
                  </div>

                  <div className="rounded-xl border border-accent/40 bg-accent/5 p-4">
                    <div className="flex items-center gap-2 text-accent font-semibold text-sm">
                      <ShieldCheck className="h-4 w-4 shrink-0" /> Com Holding Familiar
                    </div>
                    <ul className="mt-3 space-y-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                      <li className="flex items-start gap-1.5">
                        <span className="text-accent font-bold">•</span>
                        Sucessão concluída em vida com reserva de usufruto
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="text-accent font-bold">•</span>
                        Zero inventário: controle passa imediato e sem paralisação
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="text-accent font-bold">•</span>
                        Redução legal do ITCMD e do imposto sobre locações
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-3 rounded-lg border border-border/80 bg-background/50 p-4">
                  <Clock className="h-5 w-5 text-accent shrink-0" />
                  <p className="text-xs text-muted-foreground sm:text-sm">
                    <strong>Atenção à Reforma Tributária:</strong> Com a iminente progressividade
                    obrigatória do ITCMD (podendo alcançar até 16% a depender do Estado), antecipar
                    a estruturação garante alíquotas fixadas nas regras atuais.
                  </p>
                </div>
              </div>
            </div>

            {/* 4 Pilares de Benefícios */}
            <div className="space-y-4 lg:col-span-5">
              {beneficiosHolding.map((b) => {
                const IconComponent = b.icon
                return (
                  <div
                    key={b.title}
                    className="flex gap-4 rounded-xl border border-border/70 bg-card p-5 shadow-sm transition-all hover:border-accent/40"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-accent/15 text-accent">
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground text-sm sm:text-base">
                        {b.title}
                      </h4>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                        {b.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 2.5 SEÇÃO DEDICADA: CALCULADORA COMPARATIVA DE CUSTOS v2 */}
      <section
        id="calculadora"
        className="scroll-mt-20 border-t border-border/60 bg-gradient-to-b from-background via-muted/20 to-background py-20 lg:py-28"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-14">
            <Badge
              variant="outline"
              className="border-accent/40 text-accent font-medium uppercase tracking-wider"
            >
              Simulador Técnico v2
            </Badge>
            <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Calculadora Comparativa de Custos
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Compare em detalhes o custo real do <strong>Inventário Convencional</strong> contra o{' '}
              <strong>Planejamento Precedente com Holding Familiar</strong>. Embutimos a tabela das{' '}
              <strong>27 UFs</strong>, a tabela de honorários da OAB e o{' '}
              <strong>veredito de liquidez imediata</strong> para proteger sua família de vendas
              forçadas.
            </p>
          </div>

          <div className="mx-auto max-w-5xl">
            <PatrimonialCalculator onContactClick={scrollToContact} />
          </div>
        </div>
      </section>

      {/* 3. SEGMENTOS DE ATUAÇÃO / PERSONAS */}
      <section id="segmentos" className="scroll-mt-20 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <Badge
              variant="outline"
              className="border-accent/40 text-accent font-medium uppercase tracking-wider"
            >
              Soluções Especializadas
            </Badge>
            <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Segmentos Atendidos pelo Escritório
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Cada perfil patrimonial possui vulnerabilidades e oportunidades fiscais específicas.
              Desenvolvemos arquiteturas sob medida para o seu setor.
            </p>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-2">
            {segmentosData.map((seg) => {
              const IconComp = seg.icon
              return (
                <Card
                  key={seg.id}
                  className="flex flex-col border border-border/80 bg-card shadow-sm transition-all duration-200 hover:border-accent/50 hover:shadow-md"
                >
                  <CardHeader className="p-6 pb-4 sm:p-8 sm:pb-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent">
                        <IconComp className="h-6 w-6" />
                      </div>
                      <Badge variant="secondary" className="text-xs font-normal">
                        {seg.tag}
                      </Badge>
                    </div>
                    <CardTitle className="mt-4 font-serif text-2xl font-bold text-foreground">
                      {seg.title}
                    </CardTitle>
                    <CardDescription className="text-sm font-medium text-accent">
                      {seg.subtitle}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="flex flex-1 flex-col justify-between p-6 pt-2 sm:p-8 sm:pt-2">
                    <div className="space-y-4">
                      <div className="rounded-lg border border-border/60 bg-muted/40 p-4">
                        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          O Risco Comum
                        </span>
                        <p className="mt-1 text-sm leading-relaxed text-foreground/90">
                          {seg.problem}
                        </p>
                      </div>

                      <div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                          Como a Holding Resolve
                        </span>
                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                          {seg.solution}
                        </p>
                      </div>

                      <div className="pt-2">
                        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          Ganhos Estruturais
                        </span>
                        <ul className="mt-2 space-y-2 text-xs text-muted-foreground sm:text-sm">
                          {seg.highlights.map((h, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 shrink-0 text-accent" />
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-border/60">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="group w-full justify-between text-accent hover:text-accent hover:bg-accent/10"
                        onClick={scrollToContact}
                      >
                        <span>Estruturar holding para este perfil</span>
                        <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* 4. DIFERENCIAIS COMPETITIVOS */}
      <section
        id="diferenciais"
        className="scroll-mt-20 border-y border-border/60 bg-muted/30 py-20 lg:py-28"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <Badge
              variant="outline"
              className="border-accent/40 text-accent font-medium uppercase tracking-wider"
            >
              Por que Damasceno Santos
            </Badge>
            <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Diferenciais do Escritório
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Estruturar uma holding familiar não é mero registro contábil de contrato. É uma
              operação de alta responsabilidade que exige maturidade, vivência bancária e rigor
              regulatório.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {diferenciaisData.map((dif) => {
              const DifIcon = dif.icon
              return (
                <div
                  key={dif.title}
                  className="group relative flex flex-col justify-between rounded-2xl border border-border/80 bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-lg sm:p-7"
                >
                  <div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                      <DifIcon className="h-6 w-6" />
                    </div>
                    <span className="mt-5 inline-block text-xs font-semibold uppercase tracking-wider text-accent">
                      {dif.tagline}
                    </span>
                    <h3 className="mt-2 font-serif text-xl font-bold text-foreground">
                      {dif.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {dif.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Banner de Autoridade adicional */}
          <div className="mt-12 rounded-2xl border border-accent/30 bg-primary p-8 text-primary-foreground sm:p-10">
            <div className="grid gap-6 md:grid-cols-[1.5fr_1fr] md:items-center">
              <div>
                <h3 className="font-serif text-2xl font-bold sm:text-3xl text-primary-foreground">
                  Mais de 30 Anos de Segurança Jurídica e Tradição
                </h3>
                <p className="mt-3 text-sm leading-relaxed opacity-90 sm:text-base">
                  A solidez do escritório Damasceno Santos foi construída assessorando famílias
                  empresárias, cooperados, executivos e produtores rurais. Atuamos com visão
                  holística: do direito societário à governança familiar mais íntima.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
                <Button
                  type="button"
                  variant="secondary"
                  size="lg"
                  className="button-motion font-semibold"
                  onClick={scrollToContact}
                >
                  Falar com um advogado sênior
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. ÁREAS DE ATUAÇÃO / SERVIÇOS */}
      <section id="areas-de-atuacao" className="scroll-mt-20 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <Badge
              variant="outline"
              className="border-accent/40 text-accent font-medium uppercase tracking-wider"
            >
              Prática Jurídica Integrada
            </Badge>
            <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Áreas de Atuação Especializadas
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Soluções completas e interdisciplinares para blindagem, governança e eficiência
              tributária do seu patrimônio familiar e empresarial.
            </p>
          </div>

          <div className="mt-14 grid gap-8 sm:grid-cols-2">
            {areasAtuacaoData.map((area, idx) => (
              <Card
                key={area.title}
                className="border border-border/80 bg-card p-6 shadow-sm transition-all hover:border-accent/40 sm:p-8"
              >
                <div className="flex items-center gap-3">
                  <span className="font-serif text-xl font-bold text-accent">0{idx + 1}.</span>
                  <h3 className="font-serif text-2xl font-bold text-foreground">{area.title}</h3>
                </div>
                <p className="mt-2 text-sm font-medium text-muted-foreground">{area.subtitle}</p>
                <div className="mt-6 space-y-3 border-t border-border/60 pt-4">
                  {area.items.map((it, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-sm text-foreground/85">
                      <CheckCircle className="h-4 w-4 shrink-0 text-accent mt-0.5" />
                      <span>{it}</span>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 6. SOBRE O ESCRITÓRIO */}
      <section
        id="sobre"
        className="scroll-mt-20 border-t border-border/60 bg-muted/20 py-20 lg:py-28"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="space-y-6 lg:col-span-7">
              <Badge
                variant="outline"
                className="border-accent/40 text-accent font-medium uppercase tracking-wider"
              >
                Damasceno Santos Advocacia
              </Badge>
              <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                Advocacia estratégica guiada por ética, precisão e sobriedade
              </h2>
              <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                Fundado com o compromisso inegociável de oferecer segurança preventiva e
                estruturação robusta, o escritório{' '}
                <strong className="font-semibold text-foreground">
                  Damasceno Santos Advocacia
                </strong>{' '}
                se posiciona na vanguarda do planejamento patrimonial e sucessório no Brasil.
              </p>
              <p className="text-base leading-relaxed text-muted-foreground">
                Com mais de 30 anos de atuação acumulada, unimos a vivência em compliance de alto
                nível, experiência em bancos internacionais e sensibilidade com os valores do
                agronegócio para proteger o que famílias e empreendedores levaram gerações inteiras
                para construir.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4 sm:grid-cols-3">
                <div className="border-l-2 border-accent pl-4">
                  <h4 className="font-serif text-xl font-bold text-foreground">Sobriedade</h4>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Conduta pautada pela ética estrita da OAB
                  </p>
                </div>
                <div className="border-l-2 border-accent pl-4">
                  <h4 className="font-serif text-xl font-bold text-foreground">Personalização</h4>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Sem contratos pré-fabricados ou genéricos
                  </p>
                </div>
                <div className="border-l-2 border-accent pl-4">
                  <h4 className="font-serif text-xl font-bold text-foreground">Multidisciplinar</h4>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Direito societário, tributário e imobiliário
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-2xl border border-accent/30 bg-card p-8 shadow-xl">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-1 bg-accent rounded-full" />
                    <span className="font-serif text-lg font-semibold text-foreground">
                      Nosso Propósito Institucional
                    </span>
                  </div>
                  <blockquote className="italic font-serif text-lg text-foreground/90 leading-relaxed">
                    “Por uma sociedade mais justa — assegurando que a riqueza honestamente gerada
                    continue a amparar as futuras gerações de forma pacífica, equilibrada e
                    legalmente blindada.”
                  </blockquote>
                  <div className="border-t border-border/80 pt-4 text-sm text-muted-foreground">
                    <p className="font-semibold text-foreground">Damasceno Santos Advocacia</p>
                    <p className="text-xs">São Paulo • Brasil • Atendimento Nacional</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FAQ - DÚVIDAS FREQUENTES */}
      <section className="border-t border-border/60 py-20 lg:py-28">
        <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge
              variant="outline"
              className="border-accent/40 text-accent font-medium uppercase tracking-wider"
            >
              Esclarecimentos Jurídicos
            </Badge>
            <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Perguntas Frequentes sobre Holding Familiar
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Tire suas principais dúvidas sobre custos, controle, segurança e o momento certo de
              iniciar.
            </p>
          </div>

          <div className="mt-12">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqsData.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="rounded-xl border border-border/80 bg-card px-5 data-[state=open]:border-accent/40"
                >
                  <AccordionTrigger className="text-left font-serif text-base font-semibold hover:no-underline sm:text-lg">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-muted-foreground sm:text-base pb-5">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* ITEM FLUTUANTE DA CALCULADORA COM CTA DISCRETO */}
      <FloatingCalculatorTrigger onContactClick={scrollToContact} />

      {/* WIDGET FLUTUANTE DE CHAT DE DÚVIDAS E QUALIFICAÇÃO */}
      <ChatBotWidget onScheduleClick={scrollToContact} />

      {/* 8. CONTATO COM FORMULÁRIO DE LEAD */}
      <section
        id="contato"
        className="scroll-mt-20 border-t border-border/60 bg-muted/40 py-20 lg:py-28"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
            <div className="space-y-6 lg:col-span-5">
              <Badge
                variant="outline"
                className="border-accent/40 text-accent font-medium uppercase tracking-wider"
              >
                Atendimento Personalizado
              </Badge>
              <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                Dê o primeiro passo para proteger seu legado
              </h2>
              <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                Agende uma reunião inicial de diagnóstico com nossa equipe de advogados
                especialistas. Analisaremos o arranjo societário e familiar da sua empresa com total
                confidencialidade.
              </p>

              <div className="space-y-4 pt-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/15 text-accent">
                    <PhoneCall className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground text-sm sm:text-base">
                      Atendimento Humanizado e Estratégico
                    </h4>
                    <p className="text-xs text-muted-foreground sm:text-sm">
                      Reuniões presenciais ou virtuais via videoconferência segura para clientes em
                      todo o Brasil.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/15 text-accent">
                    <Scale className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground text-sm sm:text-base">
                      Diagnóstico de Viabilidade Sem Custos Ocultos
                    </h4>
                    <p className="text-xs text-muted-foreground sm:text-sm">
                      Mapeamos a viabilidade real e os números comparativos antes de propor qualquer
                      estrutura.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-border/80 bg-card p-5 text-xs text-muted-foreground">
                <p>
                  <strong>Compromisso de Sigilo:</strong> Todas as informações fornecidas estão
                  protegidas pelo dever legal de sigilo profissional do Estatuto da Advocacia e da
                  OAB (Lei Federal nº 8.906/94).
                </p>
              </div>
            </div>

            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
