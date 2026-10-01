import { useState, useId } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Lock, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react'
import { CalculatorLeadData, saveLead } from '@/data/calculatorStorage'
import { SimulationParams } from '@/data/calculatorEngine'

interface CalculatorLeadGateProps {
  params: SimulationParams
  onSuccess: (lead: CalculatorLeadData) => void
}

export function CalculatorLeadGate({ params, onSuccess }: CalculatorLeadGateProps) {
  const formId = useId()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [newsletter, setNewsletter] = useState(true)
  const [errors, setErrors] = useState<{ name?: string; email?: string; phone?: string }>({})
  const [isLoading, setIsLoading] = useState(false)

  const formatPhone = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 11)
    if (digits.length <= 2) return digits ? `(${digits}` : ''
    if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(formatPhone(e.target.value))
    if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }))
  }

  const validate = (): boolean => {
    const errs: { name?: string; email?: string; phone?: string } = {}

    if (!name.trim()) {
      errs.name = 'Informe seu nome completo.'
    } else if (name.trim().length < 3) {
      errs.name = 'O nome deve conter ao menos 3 caracteres.'
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email.trim()) {
      errs.email = 'Informe seu e-mail de contato.'
    } else if (!emailRegex.test(email.trim())) {
      errs.email = 'Informe um e-mail válido.'
    }

    const digits = phone.replace(/\D/g, '')
    if (!phone.trim()) {
      errs.phone = 'Informe seu WhatsApp com DDD.'
    } else if (digits.length < 10) {
      errs.phone = 'Informe um telefone com DDD válido (10 ou 11 dígitos).'
    }

    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setIsLoading(true)

    const lead: CalculatorLeadData = {
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      newsletter,
      simulatedAt: new Date().toISOString(),
      monteMor: params.monteMor,
      uf: params.uf,
    }

    saveLead(lead)

    setTimeout(() => {
      setIsLoading(false)
      onSuccess(lead)
    }, 400)
  }

  return (
    <Card className="border-2 border-accent/40 bg-card shadow-2xl">
      <CardHeader className="text-center pb-2 pt-8">
        <div className="mx-auto mb-3 inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-xs font-semibold text-accent uppercase tracking-wider">
          <Sparkles className="h-3.5 w-3.5" />
          Resultado Pronto para Exibição
        </div>
        <CardTitle className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
          Liberar Estudo Comparativo Completo
        </CardTitle>
        <CardDescription className="max-w-md mx-auto text-sm text-muted-foreground mt-2">
          Insira seus dados de contato para desbloquear instantaneamente a análise discriminada, o
          breakdown de economia e o veredito de liquidez patrimonial.
        </CardDescription>
      </CardHeader>

      <CardContent className="p-6 sm:p-8">
        <form onSubmit={handleSubmit} noValidate className="space-y-4 max-w-lg mx-auto">
          {/* Nome */}
          <div className="space-y-1.5">
            <Label htmlFor={`${formId}-lead-name`} className="text-sm font-medium">
              Nome completo <span className="text-destructive">*</span>
            </Label>
            <Input
              id={`${formId}-lead-name`}
              placeholder="Ex.: Marcelo Souza Santos"
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

          {/* Grid Email / Telefone */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor={`${formId}-lead-email`} className="text-sm font-medium">
                E-mail <span className="text-destructive">*</span>
              </Label>
              <Input
                id={`${formId}-lead-email`}
                type="email"
                placeholder="seu.email@empresa.com.br"
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

            <div className="space-y-1.5">
              <Label htmlFor={`${formId}-lead-phone`} className="text-sm font-medium">
                WhatsApp com DDD <span className="text-destructive">*</span>
              </Label>
              <Input
                id={`${formId}-lead-phone`}
                type="tel"
                placeholder="(11) 98765-4321"
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

          {/* Newsletter Checkbox */}
          <div className="flex items-start space-x-3 pt-2">
            <Checkbox
              id={`${formId}-newsletter`}
              checked={newsletter}
              onCheckedChange={(checked) => setNewsletter(Boolean(checked))}
              disabled={isLoading}
            />
            <Label
              htmlFor={`${formId}-newsletter`}
              className="text-xs leading-snug text-muted-foreground font-normal cursor-pointer"
            >
              Quero receber conteúdos e análises exclusivas sobre proteção patrimonial, ITCMD e
              reforma tributária no meu e-mail.
            </Label>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            size="lg"
            className="button-motion w-full py-6 text-base font-semibold shadow-lg mt-4"
            disabled={isLoading}
          >
            {isLoading ? (
              'Calculando economia...'
            ) : (
              <>
                Ver Diagnóstico e Economia Estimada
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>

          {/* Disclaimer / Sigilo */}
          <div className="pt-3 flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <Lock className="h-3.5 w-3.5 text-accent" />
            <span>Dados mantidos em estrito sigilo no seu navegador. Sem spam.</span>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
