import { useState, useId } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent } from '@/components/ui/card'
import { Loader2, ShieldCheck, CheckCircle2, Lock } from 'lucide-react'

export interface ContactFormValues {
  name: string
  email: string
  phone: string
  segment: string
  patrimonyRange: string
  message: string
}

const segmentOptions = [
  { value: 'empresario', label: 'Empresário / PME / Sócio de Empresa' },
  { value: 'medico', label: 'Médico / Profissional da Saúde' },
  { value: 'agro', label: 'Produtor Rural / Agronegócio' },
  { value: 'investidor', label: 'Investidor / Patrimônio Imobiliário' },
  { value: 'outro', label: 'Outro Perfil / Família com Bens' },
]

const patrimonyOptions = [
  { value: 'ate-2m', label: 'Até R$ 2 milhões' },
  { value: '2m-5m', label: 'De R$ 2 a R$ 5 milhões' },
  { value: '5m-15m', label: 'De R$ 5 a R$ 15 milhões' },
  { value: 'acima-15m', label: 'Acima de R$ 15 milhões' },
  { value: 'nao-informar', label: 'Prefiro não informar agora' },
]

export function ContactForm() {
  const navigate = useNavigate()
  const formId = useId()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [segment, setSegment] = useState('')
  const [patrimonyRange, setPatrimonyRange] = useState('')
  const [message, setMessage] = useState('')

  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormValues, string>>>({})
  const [isLoading, setIsLoading] = useState(false)

  const formatPhone = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 11)
    if (digits.length <= 2) return digits ? `(${digits}` : ''
    if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(formatPhone(e.target.value))
    if (errors.phone) {
      setErrors((prev) => ({ ...prev, phone: undefined }))
    }
  }

  const validate = (): boolean => {
    const errs: Partial<Record<keyof ContactFormValues, string>> = {}

    if (!name.trim()) {
      errs.name = 'Por favor, informe seu nome completo.'
    } else if (name.trim().length < 3) {
      errs.name = 'O nome deve conter ao menos 3 letras.'
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email.trim()) {
      errs.email = 'Por favor, informe seu e-mail de contato.'
    } else if (!emailRegex.test(email.trim())) {
      errs.email = 'Por favor, informe um endereço de e-mail válido.'
    }

    const phoneDigits = phone.replace(/\D/g, '')
    if (!phone.trim()) {
      errs.phone = 'Por favor, informe seu telefone ou WhatsApp.'
    } else if (phoneDigits.length < 10) {
      errs.phone = 'Informe um telefone válido com DDD (mínimo 10 dígitos).'
    }

    if (!segment) {
      errs.segment = 'Por favor, selecione seu perfil de atuação.'
    }

    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setIsLoading(true)

    // Simula validação e envio seguro de lead sem backend, redirecionando para /obrigado
    setTimeout(() => {
      setIsLoading(false)
      navigate('/obrigado')
    }, 700)
  }

  return (
    <Card className="border border-border/80 bg-card shadow-xl transition-all duration-300 hover:shadow-2xl">
      <CardContent className="p-6 sm:p-8 lg:p-10">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3.5 py-1 text-xs font-semibold text-accent">
            <Lock className="h-3.5 w-3.5" /> Sigilo Profissional Absoluto
          </div>
          <h3 className="mt-4 font-serif text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Agende uma Sessão Estratégica de Diagnóstico
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
            Preencha os campos abaixo para que nossa equipe avalie a viabilidade jurídica e
            tributária da sua holding familiar com a devida confidencialidade.
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          {/* Nome */}
          <div className="space-y-2">
            <Label htmlFor={`${formId}-name`} className="text-sm font-medium">
              Nome completo <span className="text-destructive">*</span>
            </Label>
            <Input
              id={`${formId}-name`}
              type="text"
              placeholder="Ex.: Carlos Eduardo Santos"
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }))
              }}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? `${formId}-name-err` : undefined}
              className={errors.name ? 'border-destructive focus-visible:ring-destructive' : ''}
              disabled={isLoading}
            />
            {errors.name && (
              <p id={`${formId}-name-err`} className="text-xs text-destructive">
                {errors.name}
              </p>
            )}
          </div>

          {/* Grid Email e Telefone */}
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor={`${formId}-email`} className="text-sm font-medium">
                E-mail corporativo ou pessoal <span className="text-destructive">*</span>
              </Label>
              <Input
                id={`${formId}-email`}
                type="email"
                placeholder="seu.email@exemplo.com.br"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }))
                }}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? `${formId}-email-err` : undefined}
                className={errors.email ? 'border-destructive focus-visible:ring-destructive' : ''}
                disabled={isLoading}
              />
              {errors.email && (
                <p id={`${formId}-email-err`} className="text-xs text-destructive">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor={`${formId}-phone`} className="text-sm font-medium">
                Telefone / WhatsApp com DDD <span className="text-destructive">*</span>
              </Label>
              <Input
                id={`${formId}-phone`}
                type="tel"
                placeholder="(00) 00000-0000"
                value={phone}
                onChange={handlePhoneChange}
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? `${formId}-phone-err` : undefined}
                className={errors.phone ? 'border-destructive focus-visible:ring-destructive' : ''}
                disabled={isLoading}
              />
              {errors.phone && (
                <p id={`${formId}-phone-err`} className="text-xs text-destructive">
                  {errors.phone}
                </p>
              )}
            </div>
          </div>

          {/* Segmento / Perfil */}
          <div className="space-y-2">
            <Label htmlFor={`${formId}-segment`} className="text-sm font-medium">
              Segmento / Perfil de atuação <span className="text-destructive">*</span>
            </Label>
            <Select
              value={segment}
              onValueChange={(val) => {
                setSegment(val)
                if (errors.segment) setErrors((prev) => ({ ...prev, segment: undefined }))
              }}
              disabled={isLoading}
            >
              <SelectTrigger
                id={`${formId}-segment`}
                className={errors.segment ? 'border-destructive focus:ring-destructive' : ''}
                aria-label="Segmento de atuação"
              >
                <SelectValue placeholder="Selecione o perfil que melhor descreve sua situação" />
              </SelectTrigger>
              <SelectContent>
                {segmentOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.segment && <p className="text-xs text-destructive">{errors.segment}</p>}
          </div>

          {/* Faixa Patrimonial Estimada */}
          <div className="space-y-2">
            <Label
              htmlFor={`${formId}-patrimony`}
              className="text-sm font-medium text-muted-foreground"
            >
              Estimativa do patrimônio a proteger (opcional)
            </Label>
            <Select value={patrimonyRange} onValueChange={setPatrimonyRange} disabled={isLoading}>
              <SelectTrigger id={`${formId}-patrimony`} aria-label="Estimativa de patrimônio">
                <SelectValue placeholder="Selecione uma faixa para personalizar o estudo" />
              </SelectTrigger>
              <SelectContent>
                {patrimonyOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Mensagem adicional */}
          <div className="space-y-2">
            <Label
              htmlFor={`${formId}-message`}
              className="text-sm font-medium text-muted-foreground"
            >
              Observações ou particularidades da família / empresa (opcional)
            </Label>
            <Textarea
              id={`${formId}-message`}
              rows={3}
              placeholder="Descreva brevemente seus principais objetivos (ex.: evitar inventário futuro, proteger imóveis de locação, sucessão entre filhos sócios etc.)"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={isLoading}
            />
          </div>

          {/* Botão de envio */}
          <Button
            type="submit"
            size="lg"
            className="button-motion w-full py-6 text-base font-semibold shadow-md"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Validando e agendando consulta...
              </>
            ) : (
              <>Solicitar Diagnóstico Jurídico Personalizado</>
            )}
          </Button>

          {/* Garantias de segurança */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground border-t border-border/60">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-accent shrink-0" />
              Sigilo garantido pelo Código de Ética da OAB
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-accent shrink-0" />
              Retorno prioritário em até 24 horas úteis
            </span>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
