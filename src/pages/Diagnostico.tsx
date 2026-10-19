import { useState, useEffect, useMemo, useRef } from 'react'
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Clock,
  ShieldCheck,
  AlertTriangle,
  RotateCcw,
  Send,
  MessageCircle,
  HelpCircle,
  Calendar,
  Layers,
  ChevronRight,
  Check,
  AlertCircle,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Progress } from '@/components/ui/progress'
import { toast } from '@/hooks/use-toast'
import { Seo } from '@/components/Seo'
import {
  DiagnosticoRespostas,
  DIAGNOSTICO_DEFAULT_RESPOSTAS,
  calcularDiagnostico,
  DiagnosticoCalculado,
  NecessidadeStatus,
  InstrumentoResultado,
} from '@/data/diagnosticoScoring'
import {
  validarLead,
  formatWhatsAppMask,
  salvarDiagnosticoLead,
  salvarRespostasTemporarias,
  carregarRespostasTemporarias,
  limparRespostasTemporarias,
} from '@/services/diagnosticoService'
import { OFFICE_CONTACT } from '@/config/contact'

export default function Diagnostico() {
  // Estados do Wizard: 0 = Intro, 1..7 = Perguntas, 8 = Tela de Resultado e Captura
  const [currentStep, setCurrentStep] = useState<number>(0)
  const [respostas, setRespostas] = useState<DiagnosticoRespostas>(DIAGNOSTICO_DEFAULT_RESPOSTAS)

  // Consentimento obrigatório para visualizar o resultado (Task 3)
  const [consentimento, setConsentimento] = useState<boolean>(false)

  // Formulário de Lead (Task 4)
  const [nome, setNome] = useState<string>('')
  const [whatsapp, setWhatsapp] = useState<string>('')
  const [escolhaProximoPasso, setEscolhaProximoPasso] = useState<string>('')

  // Estados de UX: Loading, Error, Success
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [submissionSuccess, setSubmissionSuccess] = useState<boolean>(false)
  const [submitErrorMessage, setSubmitErrorMessage] = useState<string | null>(null)
  const [desfechoFinal, setDesfechoFinal] = useState<
    'whatsapp' | 'reuniao' | 'especialista' | null
  >(null)

  // Erros de validação inline
  const [fieldErrors, setFieldErrors] = useState<{
    nome?: string
    whatsapp?: string
    escolha?: string
  }>({})

  const containerRef = useRef<HTMLDivElement>(null)

  // Carrega estado prévio do localStorage
  useEffect(() => {
    const saved = carregarRespostasTemporarias()
    if (saved.respostas) {
      setRespostas(saved.respostas)
      if (saved.respostas.q7) {
        setEscolhaProximoPasso(saved.respostas.q7)
      }
    }
    if (saved.step > 0 && saved.step <= 8) {
      setCurrentStep(saved.step)
    }
  }, [])

  // Atualiza a pré-seleção da pergunta 7 se o usuário mudou
  useEffect(() => {
    if (respostas.q7 && !escolhaProximoPasso) {
      setEscolhaProximoPasso(respostas.q7)
    }
  }, [respostas.q7, escolhaProximoPasso])

  // Scroll suave ao mudar de passo
  const scrollToTop = () => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleNextStep = () => {
    const next = Math.min(8, currentStep + 1)
    setCurrentStep(next)
    salvarRespostasTemporarias(respostas, next)
    scrollToTop()
  }

  const handlePrevStep = () => {
    const prev = Math.max(0, currentStep - 1)
    setCurrentStep(prev)
    salvarRespostasTemporarias(respostas, prev)
    scrollToTop()
  }

  const handleRestart = () => {
    limparRespostasTemporarias()
    setRespostas(DIAGNOSTICO_DEFAULT_RESPOSTAS)
    setCurrentStep(0)
    setConsentimento(false)
    setSubmissionSuccess(false)
    setSubmitErrorMessage(null)
    setDesfechoFinal(null)
    setNome('')
    setWhatsapp('')
    setEscolhaProximoPasso('')
    scrollToTop()
  }

  // Cálculos do diagnóstico
  const diagnostico: DiagnosticoCalculado = useMemo(() => {
    return calcularDiagnostico(respostas)
  }, [respostas])

  // Verificação se pode avançar em cada pergunta
  const canAdvance = useMemo(() => {
    switch (currentStep) {
      case 0:
        return true
      case 1:
        return Boolean(respostas.q1)
      case 2:
        return Boolean(respostas.q2)
      case 3:
        return Boolean(respostas.q3)
      case 4:
        return Boolean(respostas.q4)
      case 5:
        return Array.isArray(respostas.q5) && respostas.q5.length > 0
      case 6:
        return Array.isArray(respostas.q6) && respostas.q6.length > 0 && respostas.q6.length <= 2
      case 7:
        return Boolean(respostas.q7)
      default:
        return true
    }
  }, [currentStep, respostas])

  // Handler para Pergunta 5: Escolha Múltipla com "Nenhuma dessas" que limpa outras
  const handleToggleQ5 = (option: string) => {
    const current = respostas.q5 || []
    if (option === 'Nenhuma dessas') {
      const updated = current.includes('Nenhuma dessas') ? [] : ['Nenhuma dessas']
      const newResp = { ...respostas, q5: updated }
      setRespostas(newResp)
      salvarRespostasTemporarias(newResp, currentStep)
      return
    }

    // Se selecionar qualquer outra opção, remove "Nenhuma dessas"
    const semNenhuma = current.filter((x) => x !== 'Nenhuma dessas')
    const updated = semNenhuma.includes(option)
      ? semNenhuma.filter((x) => x !== option)
      : [...semNenhuma, option]

    const newResp = { ...respostas, q5: updated }
    setRespostas(newResp)
    salvarRespostasTemporarias(newResp, currentStep)
  }

  // Handler para Pergunta 6: Máximo 2 seleções
  const handleToggleQ6 = (option: string) => {
    const current = respostas.q6 || []
    if (current.includes(option)) {
      const updated = current.filter((x) => x !== option)
      const newResp = { ...respostas, q6: updated }
      setRespostas(newResp)
      salvarRespostasTemporarias(newResp, currentStep)
    } else {
      if (current.length >= 2) {
        toast({
          title: 'Limite de 2 escolhas',
          description: 'Selecione no máximo 2 prioridades para garantir a precisão do diagnóstico.',
          variant: 'default',
        })
        return
      }
      const updated = [...current, option]
      const newResp = { ...respostas, q6: updated }
      setRespostas(newResp)
      salvarRespostasTemporarias(newResp, currentStep)
    }
  }

  // Mensagem resumida para o WhatsApp
  const gerarMensagemWhatsApp = (nomeLead: string) => {
    const topNomes = diagnostico.topInstrumentos.map((i) => i.instrumento.nome).join(', ')
    const atencaoLista = Object.values(diagnostico.necessidades)
      .filter((n) => n.nivel === 'atencao')
      .map((n) => n.label)

    const atencaoTexto =
      atencaoLista.length > 0 ? atencaoLista.join(', ') : 'Governança e Transmissão'

    return (
      `Olá! Meu nome é ${nomeLead || 'Visitante'}.\n` +
      `Concluí o Diagnóstico Patrimonial no site Damasceno Santos Advocacia.\n` +
      `• Pontos de atenção prioritária: ${atencaoTexto}\n` +
      `• Instrumentos com maior aderência: ${topNomes}\n` +
      `Gostaria de dar o próximo passo: ${escolhaProximoPasso || 'Conversar pelo WhatsApp'}.`
    )
  }

  // Envio do formulário de captura (Task 4 e Task 5)
  const handleSubmitLead = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitErrorMessage(null)

    const validacao = validarLead(nome, whatsapp, escolhaProximoPasso)
    if (!validacao.isValid) {
      setFieldErrors(validacao.errors)
      toast({
        title: 'Atenção aos campos',
        description: 'Por favor, preencha os campos obrigatórios corretamente.',
        variant: 'destructive',
      })
      return
    }
    setFieldErrors({})

    setIsSubmitting(true)

    const necessidadesEmAtencao = Object.values(diagnostico.necessidades)
      .filter((n) => n.nivel === 'atencao')
      .map((n) => n.label)

    const payload = {
      nome: nome.trim(),
      whatsapp: whatsapp.trim(),
      escolha: escolhaProximoPasso,
      respostas: {
        formulario: respostas,
        resultado: {
          topInstrumentos: diagnostico.topInstrumentos.map((t) => t.instrumento.nome),
          necessidadesAtencao: necessidadesEmAtencao,
        },
      },
    }

    let saveFailed = false

    try {
      await salvarDiagnosticoLead(payload)
      setSubmissionSuccess(true)
    } catch (err) {
      console.error('Erro na camada de persistência:', err)
      saveFailed = true
      setSubmitErrorMessage(
        'Houve uma instabilidade ao salvar seu contato. Você ainda pode conversar conosco diretamente pelo WhatsApp!',
      )
      toast({
        title: 'Aviso sobre a gravação',
        description: 'Houve uma falha ao registrar o lead, mas você pode seguir pelo WhatsApp.',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }

    // Tratar os 3 desfechos (mesmo se a gravação falhar, o WhatsApp funciona)
    if (escolhaProximoPasso === 'Conversar pelo WhatsApp') {
      setDesfechoFinal('whatsapp')
      const msg = gerarMensagemWhatsApp(nome.trim())
      const url = `https://wa.me/5511957697373?text=${encodeURIComponent(msg)}`
      // Abre WhatsApp em nova aba
      window.open(url, '_blank', 'noopener,noreferrer')
      if (!saveFailed) {
        toast({
          title: 'Redirecionando para o WhatsApp',
          description: 'Nossa equipe receberá o resumo do seu diagnóstico.',
        })
      }
    } else if (escolhaProximoPasso === 'Entender meu cenário em uma reunião') {
      setDesfechoFinal('reuniao')
      if (!saveFailed) {
        toast({
          title: 'Solicitação registrada',
          description: 'Entraremos em contato para agendar sua reunião estratégica.',
        })
      }
    } else if (escolhaProximoPasso === 'Receber o resultado para análise com um especialista') {
      setDesfechoFinal('especialista')
      toast({
        title: 'Pedido recebido com sucesso',
        description:
          'Recebemos seu pedido. O especialista entrará em contato com a análise do seu resultado.',
      })
    }
  }

  // Progresso do Wizard (1 a 7)
  const wizardProgress = currentStep >= 1 && currentStep <= 7 ? (currentStep / 7) * 100 : 0

  return (
    <div
      ref={containerRef}
      className="min-h-[calc(100vh-72px)] bg-background py-10 px-4 sm:px-6 lg:px-8"
    >
      <Seo
        title="Diagnóstico Patrimonial | Damasceno Santos Advocacia"
        description="Avalie a blindagem, governança e eficiência sucessória do patrimônio da sua família em 7 perguntas."
        canonicalUrl="https://damascenosantosadv.com.br/diagnostico"
      />

      <div className="mx-auto max-w-3xl">
        {/* TELA INTRO (EMPTY STATE DO FUNIL - currentStep === 0) */}
        {currentStep === 0 && (
          <Card className="border-2 border-accent/30 bg-card shadow-xl overflow-hidden animate-in fade-in duration-300">
            <div className="bg-gradient-to-r from-accent/20 via-accent/10 to-transparent p-6 sm:p-10 border-b border-border/60">
              <div className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-accent mb-4">
                <Sparkles className="h-3.5 w-3.5" />
                Matriz de Decisão Patrimonial
              </div>
              <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-foreground">
                Diagnóstico Patrimonial
              </h1>
              <p className="mt-3 text-lg text-accent font-medium">
                7 perguntas, cerca de 3 minutos
              </p>
              <div className="mt-2 inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground bg-background/70 px-3 py-1 rounded-md border border-border/80">
                <CheckCircle2 className="h-3.5 w-3.5 text-accent" />
                Gratuito e educativo
              </div>
            </div>

            <CardContent className="p-6 sm:p-10 space-y-6">
              <p className="text-base text-muted-foreground leading-relaxed">
                Descubra em poucos minutos quais são as principais vulnerabilidades na proteção e
                transmissão do patrimônio da sua família e quais instrumentos jurídicos (Holding,
                Seguro, Testamento, Acordo de Sócios) possuem maior aderência ao seu momento.
              </p>

              <div className="grid gap-3 sm:grid-cols-3 pt-2">
                <div className="rounded-xl border border-border/80 bg-muted/30 p-4">
                  <div className="font-serif text-lg font-bold text-foreground">01. Análise</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Estrutura familiar e concentração de ativos.
                  </p>
                </div>
                <div className="rounded-xl border border-border/80 bg-muted/30 p-4">
                  <div className="font-serif text-lg font-bold text-foreground">02. Liquidez</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Capacidade de resposta em caso de inventário súbito.
                  </p>
                </div>
                <div className="rounded-xl border border-border/80 bg-muted/30 p-4">
                  <div className="font-serif text-lg font-bold text-foreground">03. Matriz</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Mapa de necessidades com pontuação de aderência.
                  </p>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border/60">
                <div className="text-xs text-muted-foreground">
                  Sigilo resguardado pela conduta ética da OAB.
                </div>
                <Button
                  type="button"
                  size="lg"
                  onClick={handleNextStep}
                  className="button-motion w-full sm:w-auto px-8 py-6 text-base font-semibold shadow-lg"
                >
                  Começar
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* WIZARD DE 7 PERGUNTAS (currentStep 1 a 7) */}
        {currentStep >= 1 && currentStep <= 7 && (
          <Card className="border border-border/80 bg-card shadow-xl overflow-hidden animate-in fade-in duration-200">
            {/* Cabeçalho do Wizard */}
            <div className="border-b border-border/60 bg-muted/30 p-5 sm:p-6 space-y-3">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-accent uppercase tracking-wider font-mono">
                  Pergunta {currentStep} de 7
                </span>
                <span className="text-muted-foreground font-mono">
                  {Math.round(wizardProgress)}% concluído
                </span>
              </div>
              <Progress value={wizardProgress} className="h-2" />
            </div>

            <CardContent className="p-6 sm:p-10 space-y-6">
              {/* PERGUNTA 1 */}
              {currentStep === 1 && (
                <div className="space-y-5">
                  <div className="space-y-1.5">
                    <span className="text-xs font-semibold uppercase text-accent">Questão 1</span>
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground leading-snug">
                      Como está composta a sua família hoje?
                    </h2>
                    <p className="text-xs text-muted-foreground">Escolha uma única opção.</p>
                  </div>

                  <RadioGroup
                    value={respostas.q1}
                    onValueChange={(val) => {
                      const newResp = { ...respostas, q1: val }
                      setRespostas(newResp)
                      salvarRespostasTemporarias(newResp, 1)
                    }}
                    className="space-y-3 pt-2"
                  >
                    {[
                      'Casado(a) ou em união estável, com filhos',
                      'Separado(a) ou divorciado(a), com filhos',
                      'Separado(a) ou divorciado(a), sem filhos',
                      'Solteiro(a) ou viúvo(a), com filhos',
                      'Sem filhos no momento',
                    ].map((opt) => (
                      <label
                        key={opt}
                        className={`flex items-center gap-3.5 rounded-xl border p-4 cursor-pointer transition-all ${
                          respostas.q1 === opt
                            ? 'border-accent bg-accent/10 shadow-sm'
                            : 'border-border/80 bg-background/60 hover:border-accent/40 hover:bg-muted/30'
                        }`}
                      >
                        <RadioGroupItem value={opt} id={`q1-${opt}`} />
                        <span className="text-sm sm:text-base font-medium text-foreground">
                          {opt}
                        </span>
                      </label>
                    ))}
                  </RadioGroup>
                </div>
              )}

              {/* PERGUNTA 2 */}
              {currentStep === 2 && (
                <div className="space-y-5">
                  <div className="space-y-1.5">
                    <span className="text-xs font-semibold uppercase text-accent">Questão 2</span>
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground leading-snug">
                      Onde está a maior parte do seu patrimônio?
                    </h2>
                    <p className="text-xs text-muted-foreground">Escolha uma única opção.</p>
                  </div>

                  <RadioGroup
                    value={respostas.q2}
                    onValueChange={(val) => {
                      const newResp = { ...respostas, q2: val }
                      setRespostas(newResp)
                      salvarRespostasTemporarias(newResp, 2)
                    }}
                    className="space-y-3 pt-2"
                  >
                    {[
                      'Imóveis',
                      'Participações em empresas',
                      'Investimentos financeiros',
                      'Propriedade rural',
                      'Distribuído entre esses tipos',
                    ].map((opt) => (
                      <label
                        key={opt}
                        className={`flex items-center gap-3.5 rounded-xl border p-4 cursor-pointer transition-all ${
                          respostas.q2 === opt
                            ? 'border-accent bg-accent/10 shadow-sm'
                            : 'border-border/80 bg-background/60 hover:border-accent/40 hover:bg-muted/30'
                        }`}
                      >
                        <RadioGroupItem value={opt} id={`q2-${opt}`} />
                        <span className="text-sm sm:text-base font-medium text-foreground">
                          {opt}
                        </span>
                      </label>
                    ))}
                  </RadioGroup>
                </div>
              )}

              {/* PERGUNTA 3 */}
              {currentStep === 3 && (
                <div className="space-y-5">
                  <div className="space-y-1.5">
                    <span className="text-xs font-semibold uppercase text-accent">Questão 3</span>
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground leading-snug">
                      Quanto do patrimônio está em um único tipo de ativo?
                    </h2>
                    <p className="text-xs text-muted-foreground">Escolha uma única opção.</p>
                  </div>

                  <RadioGroup
                    value={respostas.q3}
                    onValueChange={(val) => {
                      const newResp = { ...respostas, q3: val }
                      setRespostas(newResp)
                      salvarRespostasTemporarias(newResp, 3)
                    }}
                    className="space-y-3 pt-2"
                  >
                    {[
                      'Praticamente tudo, mais de 80 por cento',
                      'A maior parte, entre 50 e 80 por cento',
                      'Dividido entre alguns ativos',
                      'Bem pulverizado',
                    ].map((opt) => (
                      <label
                        key={opt}
                        className={`flex items-center gap-3.5 rounded-xl border p-4 cursor-pointer transition-all ${
                          respostas.q3 === opt
                            ? 'border-accent bg-accent/10 shadow-sm'
                            : 'border-border/80 bg-background/60 hover:border-accent/40 hover:bg-muted/30'
                        }`}
                      >
                        <RadioGroupItem value={opt} id={`q3-${opt}`} />
                        <span className="text-sm sm:text-base font-medium text-foreground">
                          {opt}
                        </span>
                      </label>
                    ))}
                  </RadioGroup>
                </div>
              )}

              {/* PERGUNTA 4 */}
              {currentStep === 4 && (
                <div className="space-y-5">
                  <div className="space-y-1.5">
                    <span className="text-xs font-semibold uppercase text-accent">Questão 4</span>
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground leading-snug">
                      Se o principal provedor da família falecesse amanhã, quanto a família
                      conseguiria mobilizar em dinheiro nos primeiros 30 dias, sem vender imóvel,
                      empresa ou propriedade rural?
                    </h2>
                    <p className="text-xs text-muted-foreground">
                      Escolha a faixa contínua que melhor retrata o caixa líquido imediato.
                    </p>
                  </div>

                  <RadioGroup
                    value={respostas.q4}
                    onValueChange={(val) => {
                      const newResp = { ...respostas, q4: val }
                      setRespostas(newResp)
                      salvarRespostasTemporarias(newResp, 4)
                    }}
                    className="space-y-3 pt-2"
                  >
                    {[
                      'Até R$ 50 mil',
                      'Entre R$ 50 mil e R$ 200 mil',
                      'Entre R$ 200 mil e R$ 700 mil',
                      'Entre R$ 700 mil e R$ 1,5 milhão',
                      'Mais de R$ 1,5 milhão',
                      'Não sei informar',
                    ].map((opt) => (
                      <label
                        key={opt}
                        className={`flex items-center gap-3.5 rounded-xl border p-4 cursor-pointer transition-all ${
                          respostas.q4 === opt
                            ? 'border-accent bg-accent/10 shadow-sm'
                            : 'border-border/80 bg-background/60 hover:border-accent/40 hover:bg-muted/30'
                        }`}
                      >
                        <RadioGroupItem value={opt} id={`q4-${opt}`} />
                        <span className="text-sm sm:text-base font-medium text-foreground">
                          {opt}
                        </span>
                      </label>
                    ))}
                  </RadioGroup>
                </div>
              )}

              {/* PERGUNTA 5 */}
              {currentStep === 5 && (
                <div className="space-y-5">
                  <div className="space-y-1.5">
                    <span className="text-xs font-semibold uppercase text-accent">Questão 5</span>
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground leading-snug">
                      Alguma dessas situações existe hoje?
                    </h2>
                    <p className="text-xs text-muted-foreground">
                      Escolha múltipla. Selecionar "Nenhuma dessas" limpa as outras seleções.
                    </p>
                  </div>

                  <div className="space-y-3 pt-2">
                    {[
                      'Filhos de diferentes relacionamentos',
                      'Possível conflito entre herdeiros',
                      'Herdeiros menores ou com necessidades especiais',
                      'Empresa com sócios não familiares',
                      'Nenhuma dessas',
                    ].map((opt) => {
                      const isChecked = (respostas.q5 || []).includes(opt)
                      return (
                        <label
                          key={opt}
                          className={`flex items-center gap-3.5 rounded-xl border p-4 cursor-pointer transition-all ${
                            isChecked
                              ? 'border-accent bg-accent/10 shadow-sm'
                              : 'border-border/80 bg-background/60 hover:border-accent/40 hover:bg-muted/30'
                          }`}
                        >
                          <Checkbox
                            checked={isChecked}
                            onCheckedChange={() => handleToggleQ5(opt)}
                            id={`q5-${opt}`}
                          />
                          <span className="text-sm sm:text-base font-medium text-foreground">
                            {opt}
                          </span>
                        </label>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* PERGUNTA 6 */}
              {currentStep === 6 && (
                <div className="space-y-5">
                  <div className="space-y-1.5">
                    <span className="text-xs font-semibold uppercase text-accent">Questão 6</span>
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground leading-snug">
                      O que mais importa para você nesta fase?
                    </h2>
                    <p className="text-xs text-muted-foreground">
                      Escolha múltipla com <strong>MÁXIMO de 2 seleções</strong>. (Selecionadas:{' '}
                      {(respostas.q6 || []).length}/2)
                    </p>
                  </div>

                  <div className="space-y-3 pt-2">
                    {[
                      'Manter os imóveis na família por gerações',
                      'Garantir dinheiro imediato para a família',
                      'Evitar conflitos entre herdeiros',
                      'Proteger o patrimônio dos riscos do negócio',
                      'Reduzir custos e impostos na transferência',
                    ].map((opt) => {
                      const isChecked = (respostas.q6 || []).includes(opt)
                      return (
                        <label
                          key={opt}
                          className={`flex items-center gap-3.5 rounded-xl border p-4 cursor-pointer transition-all ${
                            isChecked
                              ? 'border-accent bg-accent/10 shadow-sm'
                              : 'border-border/80 bg-background/60 hover:border-accent/40 hover:bg-muted/30'
                          }`}
                        >
                          <Checkbox
                            checked={isChecked}
                            onCheckedChange={() => handleToggleQ6(opt)}
                            id={`q6-${opt}`}
                          />
                          <span className="text-sm sm:text-base font-medium text-foreground">
                            {opt}
                          </span>
                        </label>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* PERGUNTA 7 */}
              {currentStep === 7 && (
                <div className="space-y-5">
                  <div className="space-y-1.5">
                    <span className="text-xs font-semibold uppercase text-accent">Questão 7</span>
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground leading-snug">
                      Como você prefere seguir a partir daqui?
                    </h2>
                    <p className="text-xs text-muted-foreground">
                      Escolha única. Esta opção orientará a etapa de retorno após o resultado.
                    </p>
                  </div>

                  <RadioGroup
                    value={respostas.q7}
                    onValueChange={(val) => {
                      const newResp = { ...respostas, q7: val }
                      setRespostas(newResp)
                      setEscolhaProximoPasso(val)
                      salvarRespostasTemporarias(newResp, 7)
                    }}
                    className="space-y-3 pt-2"
                  >
                    {[
                      'Entender meu cenário em uma reunião',
                      'Conversar pelo WhatsApp',
                      'Receber o resultado para análise com um especialista',
                    ].map((opt) => (
                      <label
                        key={opt}
                        className={`flex items-center gap-3.5 rounded-xl border p-4 cursor-pointer transition-all ${
                          respostas.q7 === opt
                            ? 'border-accent bg-accent/10 shadow-sm'
                            : 'border-border/80 bg-background/60 hover:border-accent/40 hover:bg-muted/30'
                        }`}
                      >
                        <RadioGroupItem value={opt} id={`q7-${opt}`} />
                        <span className="text-sm sm:text-base font-medium text-foreground">
                          {opt}
                        </span>
                      </label>
                    ))}
                  </RadioGroup>
                </div>
              )}

              {/* Controles de Navegação do Wizard */}
              <div className="pt-6 flex items-center justify-between gap-4 border-t border-border/60">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrevStep}
                  className="button-motion"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Voltar
                </Button>

                <Button
                  type="button"
                  disabled={!canAdvance}
                  onClick={handleNextStep}
                  className="button-motion px-6 font-semibold"
                >
                  {currentStep === 7 ? 'Concluir e Ver Resultado' : 'Avançar'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* ETAPA 8: GATE DE CONSENTIMENTO, RESULTADO E CAPTURA DE LEAD */}
        {currentStep === 8 && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* CHECKBOX DE CONSENTIMENTO OBRIGATÓRIO (TASK 3) */}
            {!consentimento ? (
              <Card className="border-2 border-accent/40 bg-card shadow-xl p-6 sm:p-10 text-center space-y-6">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/15 text-accent">
                  <ShieldCheck className="h-8 w-8" />
                </div>
                <div className="space-y-2 max-w-xl mx-auto">
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
                    Seu Diagnóstico está Pronto
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Para visualizar o mapa de prioridades e os instrumentos patrimoniais calculados
                    a partir das suas respostas, é necessário o consentimento para tratamento dos
                    dados.
                  </p>
                </div>

                <div className="mx-auto max-w-md text-left rounded-xl border border-border/80 bg-muted/40 p-4">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <Checkbox
                      checked={consentimento}
                      onCheckedChange={(val) => setConsentimento(Boolean(val))}
                      id="consentimento-check"
                      className="mt-1"
                    />
                    <span className="text-xs sm:text-sm font-medium text-foreground leading-relaxed">
                      Autorizo o uso das minhas respostas para retorno do diagnóstico.
                    </span>
                  </label>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setCurrentStep(7)}
                    className="button-motion"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Revisar respostas
                  </Button>
                  <Button
                    type="button"
                    disabled={!consentimento}
                    onClick={() => setConsentimento(true)}
                    className="button-motion px-8 py-6 text-base font-semibold shadow-md"
                  >
                    Visualizar Diagnóstico Completo
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ) : (
              /* RESULTADO COMPLETO APÓS CONSENTIMENTO */
              <div className="space-y-8">
                {/* 1. MAPA DE NECESSIDADES COM PONTOS COLORIDOS */}
                <Card className="border border-border/80 bg-card shadow-lg">
                  <CardHeader className="pb-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div>
                        <Badge
                          variant="outline"
                          className="border-accent text-accent uppercase tracking-wider text-[11px] mb-2"
                        >
                          Mapa de Necessidades
                        </Badge>
                        <CardTitle className="font-serif text-2xl sm:text-3xl font-bold">
                          Diagnóstico das Suas Prioridades
                        </CardTitle>
                        <CardDescription className="text-xs sm:text-sm mt-1">
                          Pontos calculados a partir da estrutura da sua família, concentração de
                          ativos e metas.
                        </CardDescription>
                      </div>

                      {/* Legenda de cores */}
                      <div className="flex flex-wrap items-center gap-3 text-xs bg-muted/50 p-2.5 rounded-lg border border-border/60">
                        <span className="inline-flex items-center gap-1.5 font-medium">
                          <span className="h-2.5 w-2.5 rounded-full bg-red-500 shrink-0" />
                          Atenção
                        </span>
                        <span className="inline-flex items-center gap-1.5 font-medium">
                          <span className="h-2.5 w-2.5 rounded-full bg-amber-500 shrink-0" />
                          Cautela
                        </span>
                        <span className="inline-flex items-center gap-1.5 font-medium">
                          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 shrink-0" />
                          Adequado
                        </span>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4 pt-2">
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                      {Object.values(diagnostico.necessidades).map((nec: NecessidadeStatus) => {
                        const bgCard =
                          nec.cor === 'vermelho'
                            ? 'border-red-500/40 bg-red-500/5'
                            : nec.cor === 'ambar'
                              ? 'border-amber-500/40 bg-amber-500/5'
                              : 'border-emerald-500/40 bg-emerald-500/5'

                        const dotColor =
                          nec.cor === 'vermelho'
                            ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]'
                            : nec.cor === 'ambar'
                              ? 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]'
                              : 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]'

                        const textColor =
                          nec.cor === 'vermelho'
                            ? 'text-red-600 dark:text-red-400'
                            : nec.cor === 'ambar'
                              ? 'text-amber-600 dark:text-amber-400'
                              : 'text-emerald-600 dark:text-emerald-400'

                        return (
                          <div
                            key={nec.key}
                            className={`rounded-xl border p-4 flex flex-col justify-between transition-all ${bgCard}`}
                          >
                            <div>
                              <div className="flex items-center justify-between gap-2">
                                <span className="text-xs font-semibold uppercase text-muted-foreground">
                                  {nec.label}
                                </span>
                                <span className={`h-3 w-3 rounded-full ${dotColor}`} />
                              </div>
                              <div className={`mt-3 font-serif text-lg font-bold ${textColor}`}>
                                {nec.statusTexto}
                              </div>
                            </div>
                            <p className="mt-2 text-[11px] text-muted-foreground leading-snug">
                              {nec.descricao}
                            </p>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>

                {/* 2. OS 3 INSTRUMENTOS COM MAIOR ADERÊNCIA */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-serif text-2xl font-bold text-foreground">
                        Os 3 Instrumentos com Maior Aderência ao Seu Caso
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        Recomendações técnicas baseadas na ponderação dos seus objetivos.
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-3">
                    {diagnostico.topInstrumentos.map((item: InstrumentoResultado, idx: number) => {
                      const inst = item.instrumento
                      return (
                        <Card
                          key={inst.id}
                          className="flex flex-col border border-border/80 bg-card shadow-sm hover:border-accent/50 transition-all"
                        >
                          <CardHeader className="p-5 pb-3">
                            <div className="flex items-center justify-between gap-2">
                              <Badge
                                variant="outline"
                                className="border-accent text-accent font-mono text-xs"
                              >
                                #{idx + 1} Aderência: {item.score}%
                              </Badge>
                              <span className="text-[11px] text-muted-foreground uppercase">
                                {inst.categoria}
                              </span>
                            </div>
                            <CardTitle className="font-serif text-xl font-bold mt-2">
                              {inst.nome}
                            </CardTitle>
                          </CardHeader>

                          <CardContent className="flex flex-1 flex-col justify-between p-5 pt-1 space-y-4 text-xs">
                            <div className="space-y-3">
                              {/* O QUE RESOLVE */}
                              <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3">
                                <span className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 mb-1">
                                  <Check className="h-3.5 w-3.5" />
                                  O que resolve:
                                </span>
                                <p className="text-muted-foreground leading-relaxed">
                                  {inst.oQueResolve}
                                </p>
                              </div>

                              {/* O QUE NÃO RESOLVE */}
                              <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-3">
                                <span className="font-semibold text-amber-600 dark:text-amber-400 flex items-center gap-1.5 mb-1">
                                  <AlertTriangle className="h-3.5 w-3.5" />
                                  O que não resolve:
                                </span>
                                <p className="text-muted-foreground leading-relaxed">
                                  {inst.oQueNaoResolve}
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                </div>

                {/* 3. DISCLAIMER FIXO OBRIGATÓRIO */}
                <div className="rounded-xl border border-border/80 bg-muted/40 p-4 text-xs text-muted-foreground leading-relaxed flex items-start gap-3">
                  <AlertCircle className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                  <div>
                    <strong>Aviso Legal Importante:</strong> Este diagnóstico tem caráter educativo
                    e indicativo. Não constitui consultoria jurídica e não considera a análise do
                    seu caso concreto.
                  </div>
                </div>

                {/* 4. CAPTURA DE CONTATO E PRÓXIMO PASSO (TASK 4) */}
                <Card className="border-2 border-accent/40 bg-gradient-to-br from-card via-card to-accent/5 p-6 sm:p-10 shadow-xl">
                  {submissionSuccess && desfechoFinal ? (
                    <div className="space-y-6 text-center py-4 animate-in fade-in duration-300">
                      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/20 text-accent">
                        <CheckCircle2 className="h-10 w-10" />
                      </div>

                      {desfechoFinal === 'whatsapp' && (
                        <div className="space-y-3 max-w-lg mx-auto">
                          <h4 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
                            Atendimento Iniciado via WhatsApp
                          </h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            Uma conversa com a mensagem pré-formatada do seu diagnóstico foi aberta.
                            Caso não tenha aberto automaticamente, clique no botão abaixo para falar
                            com o escritório:
                          </p>
                          <div className="pt-2">
                            <Button
                              type="button"
                              asChild
                              size="lg"
                              className="button-motion bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold shadow-md"
                            >
                              <a
                                href={`https://wa.me/5511957697373?text=${encodeURIComponent(
                                  gerarMensagemWhatsApp(nome),
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <MessageCircle className="mr-2 h-5 w-5 fill-current" />
                                Abrir WhatsApp ({OFFICE_CONTACT.phoneDisplay})
                              </a>
                            </Button>
                          </div>
                        </div>
                      )}

                      {desfechoFinal === 'reuniao' && (
                        <div className="space-y-3 max-w-lg mx-auto">
                          <h4 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
                            Solicitação de Reunião Confirmada
                          </h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            Obrigado, <strong className="text-foreground">{nome}</strong>! Nossa
                            equipe entrará em contato pelo número{' '}
                            <strong className="text-foreground">{whatsapp}</strong> para alinhar a
                            data da reunião diagnóstica.
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Se preferir agilizar seu agendamento imediatamente, você também pode nos
                            acionar pelo canal direto:
                          </p>
                          <div className="pt-2">
                            <Button
                              type="button"
                              asChild
                              variant="outline"
                              size="lg"
                              className="button-motion border-accent text-accent hover:bg-accent/10"
                            >
                              <a
                                href={`https://wa.me/5511957697373?text=${encodeURIComponent(
                                  `Olá! Sou ${nome} e solicitei uma reunião estratégica pelo Diagnóstico Patrimonial.`,
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <MessageCircle className="mr-2 h-5 w-5" />
                                Falar pelo WhatsApp como alternativa
                              </a>
                            </Button>
                          </div>
                        </div>
                      )}

                      {desfechoFinal === 'especialista' && (
                        <div className="space-y-3 max-w-lg mx-auto">
                          <h4 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
                            Análise Encaminhada ao Especialista
                          </h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            Recebemos seu pedido. O especialista entrará em contato com a análise do
                            seu resultado pelo WhatsApp{' '}
                            <strong className="text-foreground">{whatsapp}</strong>.
                          </p>
                        </div>
                      )}

                      <div className="pt-4 border-t border-border/60">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={handleRestart}
                          className="text-xs text-muted-foreground hover:text-accent"
                        >
                          <RotateCcw className="mr-1.5 h-3.5 w-3.5" />
                          Refazer Diagnóstico com outros dados
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmitLead} className="space-y-6">
                      <div className="space-y-2">
                        <Badge
                          variant="outline"
                          className="border-accent text-accent uppercase tracking-wider text-[11px]"
                        >
                          Próximo Passo
                        </Badge>
                        <h4 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
                          Receba a Análise Completa com um Advogado Especialista
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Preencha seu contato abaixo para receber as orientações individualizadas e
                          dar prosseguimento.
                        </p>
                      </div>

                      {submitErrorMessage && (
                        <div className="rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-xs text-destructive flex items-start gap-2.5">
                          <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <p>{submitErrorMessage}</p>
                            <div className="mt-2 flex gap-2">
                              <Button
                                type="submit"
                                size="sm"
                                variant="outline"
                                className="h-7 text-xs border-destructive/50"
                              >
                                Tentar novamente
                              </Button>
                              <Button
                                type="button"
                                size="sm"
                                className="h-7 text-xs bg-[#25D366] hover:bg-[#20ba59] text-white"
                                onClick={() => {
                                  const msg = gerarMensagemWhatsApp(nome)
                                  window.open(
                                    `https://wa.me/5511957697373?text=${encodeURIComponent(msg)}`,
                                    '_blank',
                                  )
                                }}
                              >
                                Seguir pelo WhatsApp mesmo assim
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="grid gap-5 sm:grid-cols-2">
                        {/* Nome */}
                        <div className="space-y-1.5">
                          <Label htmlFor="lead-nome" className="text-sm font-semibold">
                            Nome Completo *
                          </Label>
                          <Input
                            id="lead-nome"
                            type="text"
                            placeholder="Ex.: Carlos Eduardo Santos"
                            value={nome}
                            onChange={(e) => {
                              setNome(e.target.value)
                              if (fieldErrors.nome) {
                                setFieldErrors((prev) => ({ ...prev, nome: undefined }))
                              }
                            }}
                            className={`h-11 ${fieldErrors.nome ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                            required
                          />
                          {fieldErrors.nome && (
                            <p className="text-xs text-destructive font-medium">
                              {fieldErrors.nome}
                            </p>
                          )}
                        </div>

                        {/* WhatsApp com máscara */}
                        <div className="space-y-1.5">
                          <Label htmlFor="lead-whatsapp" className="text-sm font-semibold">
                            WhatsApp com DDD *
                          </Label>
                          <Input
                            id="lead-whatsapp"
                            type="tel"
                            placeholder="(11) 98765-4321"
                            value={whatsapp}
                            onChange={(e) => {
                              const masked = formatWhatsAppMask(e.target.value)
                              setWhatsapp(masked)
                              if (fieldErrors.whatsapp) {
                                setFieldErrors((prev) => ({ ...prev, whatsapp: undefined }))
                              }
                            }}
                            className={`h-11 ${fieldErrors.whatsapp ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                            required
                          />
                          {fieldErrors.whatsapp && (
                            <p className="text-xs text-destructive font-medium">
                              {fieldErrors.whatsapp}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* RÁDIO PRÉ-SELECIONADO COM ESCOLHA DA PERGUNTA 7 */}
                      <div className="space-y-2 pt-2">
                        <Label className="text-sm font-semibold">Como você prefere seguir? *</Label>
                        <RadioGroup
                          value={escolhaProximoPasso}
                          onValueChange={(val) => {
                            setEscolhaProximoPasso(val)
                            if (fieldErrors.escolha) {
                              setFieldErrors((prev) => ({ ...prev, escolha: undefined }))
                            }
                          }}
                          className="space-y-2.5"
                        >
                          {[
                            'Entender meu cenário em uma reunião',
                            'Conversar pelo WhatsApp',
                            'Receber o resultado para análise com um especialista',
                          ].map((opt) => (
                            <label
                              key={opt}
                              className={`flex items-center gap-3 rounded-lg border p-3.5 cursor-pointer text-xs sm:text-sm transition-all ${
                                escolhaProximoPasso === opt
                                  ? 'border-accent bg-accent/10 shadow-sm font-medium'
                                  : 'border-border/80 bg-background/50 hover:bg-muted/30'
                              }`}
                            >
                              <RadioGroupItem value={opt} id={`lead-opt-${opt}`} />
                              <span>{opt}</span>
                            </label>
                          ))}
                        </RadioGroup>
                        {fieldErrors.escolha && (
                          <p className="text-xs text-destructive font-medium">
                            {fieldErrors.escolha}
                          </p>
                        )}
                      </div>

                      <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border/60">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={handleRestart}
                          className="text-xs text-muted-foreground hover:text-accent"
                        >
                          <RotateCcw className="mr-1.5 h-3.5 w-3.5" />
                          Refazer Diagnóstico
                        </Button>

                        <Button
                          type="submit"
                          size="lg"
                          disabled={isSubmitting}
                          className="button-motion w-full sm:w-auto px-8 py-6 text-base font-semibold shadow-lg"
                        >
                          {isSubmitting ? (
                            <>
                              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-accent" />
                              Gravando lead...
                            </>
                          ) : (
                            <>
                              Quero seguir
                              <Send className="ml-2 h-4 w-4" />
                            </>
                          )}
                        </Button>
                      </div>
                    </form>
                  )}
                </Card>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
