import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Share2, Check, Copy, MessageCircle } from 'lucide-react'
import { encodeSimulationParams } from '@/data/calculatorStorage'
import { SimulationResult, formatCurrencyBRL } from '@/data/calculatorEngine'
import { buildWhatsAppUrl } from '@/config/contact'
import { useToast } from '@/hooks/use-toast'

interface CalculatorShareProps {
  result: SimulationResult
}

export function CalculatorShare({ result }: CalculatorShareProps) {
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const query = encodeSimulationParams(result.params)
  const baseUrl =
    typeof window !== 'undefined' ? `${window.location.origin}/` : 'https://damascenosantos.adv.br/'
  const shareUrl = `${baseUrl}?${query}#calculadora`

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      toast({
        title: 'Link copiado!',
        description: 'Parâmetros da simulação copiados para a sua área de transferência.',
      })
      setTimeout(() => setCopied(false), 2500)
    } catch {
      toast({
        title: 'Erro ao copiar',
        description: 'Selecione o link manualmente.',
        variant: 'destructive',
      })
    }
  }

  const shareTextWhatsApp =
    `Simulação de Proteção Patrimonial - Damasceno Santos Advocacia:\n` +
    `• Patrimônio: ${formatCurrencyBRL(result.params.monteMor)} (${result.ufInfo.uf})\n` +
    `• Custo estimado do Inventário: ${formatCurrencyBRL(result.totalInventario)}\n` +
    `• Custo da Holding (implantação): ${formatCurrencyBRL(result.totalHoldingAno1)}\n` +
    `• Economia estimada: ${formatCurrencyBRL(result.economiaNominal)} (${result.economiaPercentual.toFixed(0)}%)\n\n` +
    `Confira os parâmetros completos da simulação no link:\n${shareUrl}`

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareTextWhatsApp)}`

  return (
    <Card className="border border-border/70 bg-card/70 backdrop-blur-sm">
      <CardContent className="p-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent">
              <Share2 className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-semibold text-sm text-foreground">Compartilhar esta Simulação</h4>
              <p className="text-xs text-muted-foreground">
                Envie o link para sócios, herdeiros ou consulte diretamente com nossos advogados.
              </p>
            </div>
          </div>

          <div className="flex w-full sm:w-auto items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={copyToClipboard}
              className="button-motion flex-1 sm:flex-initial text-xs"
              aria-label="Copiar link com parâmetros"
            >
              {copied ? (
                <>
                  <Check className="mr-1.5 h-3.5 w-3.5 text-accent" />
                  Copiado!
                </>
              ) : (
                <>
                  <Copy className="mr-1.5 h-3.5 w-3.5" />
                  Copiar link
                </>
              )}
            </Button>

            <Button
              type="button"
              size="sm"
              asChild
              className="button-motion flex-1 sm:flex-initial text-xs bg-[#25D366] hover:bg-[#20ba59] text-white"
            >
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Compartilhar simulação no WhatsApp"
              >
                <MessageCircle className="mr-1.5 h-3.5 w-3.5 fill-current" />
                WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
