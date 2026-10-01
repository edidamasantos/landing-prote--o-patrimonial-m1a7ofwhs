import { useState } from 'react'
import {
  SimulationParams,
  SimulationResult,
  formatCurrencyBRL,
  formatPercent,
} from '@/data/calculatorEngine'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  ShieldAlert,
  ShieldCheck,
  TrendingDown,
  Clock,
  ArrowRight,
  MessageCircle,
  HelpCircle,
  Calendar,
  AlertTriangle,
  Building,
} from 'lucide-react'
import { CalculatorShare } from './CalculatorShare'
import { CalculatorDisclaimers } from './CalculatorDisclaimers'
import { buildWhatsAppUrl, OFFICE_CONTACT } from '@/config/contact'

interface CalculatorResultsViewProps {
  result: SimulationResult
  onRecalculate?: () => void
  onContactClick?: () => void
}

export function CalculatorResultsView({
  result,
  onRecalculate,
  onContactClick,
}: CalculatorResultsViewProps) {
  const [activeTab, setActiveTab] = useState<'geral' | 'tabela'>('geral')

  const whatsAppMessage =
    `Olá! Realizei a simulação na calculadora com monte-mor de ${formatCurrencyBRL(result.params.monteMor)} (${result.ufInfo.uf}).\n` +
    `• Custo Inventário: ${formatCurrencyBRL(result.totalInventario)}\n` +
    `• Custo Holding (implantação): ${formatCurrencyBRL(result.totalHoldingAno1)}\n` +
    `• Economia estimada: ${formatCurrencyBRL(result.economiaNominal)}\n` +
    `Gostaria de agendar a reunião diagnóstica para avaliar a estrutura da minha família.`

  const whatsappUrl = buildWhatsAppUrl(whatsAppMessage)

  const inv = result.inventarioComponents
  const hld = result.holdingComponents

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-300">
      {/* 1. HERO DO RESULTADO: ECONOMIA & TOTAIS LADO A LADO */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Card Destaque de Economia */}
        <div className="lg:col-span-12 rounded-2xl border-2 border-accent/40 bg-gradient-to-br from-accent/10 via-card to-card p-6 sm:p-8 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <Badge
                variant="outline"
                className="border-accent text-accent font-semibold uppercase tracking-wider mb-3"
              >
                Diagnóstico Comparativo Concluído
              </Badge>
              <h3 className="font-serif text-2xl sm:text-4xl font-bold text-foreground">
                Economia estimada de{' '}
                <span className="text-accent underline decoration-accent/40 underline-offset-4">
                  {formatCurrencyBRL(result.economiaNominal)}
                </span>
              </h3>
              <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-2xl">
                Ao estruturar a sucessão em vida com Holding Familiar no estado de{' '}
                <strong className="text-foreground">{result.ufInfo.nome}</strong>, sua família
                preserva até{' '}
                <strong className="text-accent">{result.economiaPercentual.toFixed(0)}%</strong> do
                custo que seria consumido pelo inventário convencional.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                type="button"
                size="lg"
                asChild
                className="button-motion bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold shadow-md"
              >
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-5 w-5 fill-current" />
                  Agendar no WhatsApp
                </a>
              </Button>
              {onRecalculate && (
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={onRecalculate}
                  className="button-motion"
                >
                  Ajustar Parâmetros
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Card Cenário Inventário */}
        <div className="lg:col-span-6 rounded-2xl border border-destructive/40 bg-destructive/5 p-6 sm:p-8 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-destructive/20">
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-destructive/15 text-destructive">
                <ShieldAlert className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-serif text-xl font-bold text-foreground">
                  Inventário Convencional
                </h4>
                <p className="text-xs text-muted-foreground">
                  Cenário sem planejamento prévio ({result.params.regimeHonorarios})
                </p>
              </div>
            </div>
            <Badge variant="destructive" className="font-mono text-xs">
              Risco alto de bloqueio
            </Badge>
          </div>

          <div className="mt-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Custo Total Estimado
            </span>
            <div className="mt-1 font-serif text-3xl sm:text-4xl font-bold text-destructive">
              {formatCurrencyBRL(result.totalInventario)}
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Representa{' '}
              <strong>
                {((result.totalInventario / result.params.monteMor) * 100).toFixed(1)}%
              </strong>{' '}
              do patrimônio bruto de {formatCurrencyBRL(result.params.monteMor)}.
            </p>
          </div>

          <div className="mt-6 space-y-3 border-t border-destructive/20 pt-4 text-xs">
            <div className="flex justify-between items-center text-muted-foreground">
              <span>ITCMD Causa Mortis ({result.ufInfo.uf}):</span>
              <span className="font-semibold text-foreground">
                {formatCurrencyBRL(inv.itcmdHeranca.valor)}
              </span>
            </div>
            <div className="flex justify-between items-center text-muted-foreground">
              <span>Honorários Advocatícios (OAB):</span>
              <span className="font-semibold text-foreground">
                {formatCurrencyBRL(inv.honorariosAdvocaticios.valor)}
              </span>
            </div>
            <div className="flex justify-between items-center text-muted-foreground">
              <span>Cartórios (Escritura + RGI + Certidões):</span>
              <span className="font-semibold text-foreground">
                {formatCurrencyBRL(
                  inv.escriturasNotas.valor +
                    inv.registroCartorio.valor +
                    inv.certidoesCustasFixas.valor,
                )}
              </span>
            </div>
            <div className="flex justify-between items-center text-muted-foreground">
              <span>
                Custas Judiciárias + Contabilidade ({result.params.prazoInventarioAnos}a):
              </span>
              <span className="font-semibold text-foreground">
                {formatCurrencyBRL(inv.custasJudiciarias.valor + inv.honorariosContabeis.valor)}
              </span>
            </div>
            {result.params.venderBensParaCustear && (
              <div className="flex justify-between items-center text-destructive font-medium pt-1 border-t border-destructive/20">
                <span>Perdas por Venda Forçada (Deságio + IR):</span>
                <span>
                  {formatCurrencyBRL(inv.desagioVendaForcada.valor + inv.irGanhoCapital.valor)}
                </span>
              </div>
            )}
          </div>

          <div className="mt-6 rounded-xl border border-destructive/30 bg-destructive/10 p-3.5 text-xs text-foreground/90">
            <div className="flex items-center gap-2 font-semibold text-destructive mb-1">
              <Clock className="h-4 w-4 shrink-0" />
              Tempo de Indisponibilidade dos Bens:
            </div>
            <p className="text-muted-foreground leading-relaxed">
              {result.veredito.tempoIndisponibilidade}. Contas e aplicações sofrem bloqueio até
              emissão do formal de partilha.
            </p>
          </div>
        </div>

        {/* Card Cenário Holding */}
        <div className="lg:col-span-6 rounded-2xl border border-accent/40 bg-accent/5 p-6 sm:p-8 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-accent/20">
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15 text-accent">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-serif text-xl font-bold text-foreground">
                  Planejamento com Holding
                </h4>
                <p className="text-xs text-muted-foreground">
                  Sucessão em vida com reserva vitalícia de usufruto
                </p>
              </div>
            </div>
            <Badge
              variant="outline"
              className="border-accent text-accent font-mono text-xs bg-accent/10"
            >
              Zero inventário futuro
            </Badge>
          </div>

          <div className="mt-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Investimento de Implantação (Ano 1)
            </span>
            <div className="mt-1 font-serif text-3xl sm:text-4xl font-bold text-accent">
              {formatCurrencyBRL(result.totalHoldingAno1)}
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Investimento único amortizado e planejado com controle total dos fundadores.
            </p>
          </div>

          <div className="mt-6 space-y-3 border-t border-accent/20 pt-4 text-xs">
            <div className="flex justify-between items-center text-muted-foreground">
              <span>
                Honorários Advocatícios Holding (~
                {formatPercent(result.params.percHonorariosAdvHolding ?? 2)}):
              </span>
              <span className="font-semibold text-foreground">
                {formatCurrencyBRL(hld.honorariosAdvHolding.valor)}
              </span>
            </div>
            <div className="flex justify-between items-center text-muted-foreground">
              <span>Constituição Estrutural Societária:</span>
              <span className="font-semibold text-foreground">
                {formatCurrencyBRL(hld.constituicaoHolding.valor)}
              </span>
            </div>
            <div className="flex justify-between items-center text-muted-foreground">
              <span className="flex items-center gap-1">
                ITBI na Integralização (
                {result.params.aliquotaItbiIntegralizacao === 0
                  ? '0% - Art. 156 CF/88'
                  : `${formatPercent(result.params.aliquotaItbiIntegralizacao)}`}
                ):
              </span>
              <span
                className={`font-semibold ${hld.itbiIntegralizacao.valor === 0 ? 'text-accent' : 'text-foreground'}`}
              >
                {hld.itbiIntegralizacao.valor === 0
                  ? 'R$ 0 (Imunidade CF/88)'
                  : formatCurrencyBRL(hld.itbiIntegralizacao.valor)}
              </span>
            </div>
            <div className="flex justify-between items-center text-muted-foreground">
              <span>ITCMD sobre Doação de Quotas ({result.ufInfo.uf}):</span>
              <span className="font-semibold text-foreground">
                {formatCurrencyBRL(hld.itcmdDoacaoEmVida.valor)}
              </span>
            </div>
            <div className="flex justify-between items-center text-muted-foreground">
              <span>Manutenção Contábil da PJ (1º ano):</span>
              <span className="font-semibold text-foreground">
                {formatCurrencyBRL(hld.manutencaoContabilAnual.valor)}
              </span>
            </div>
            <div className="flex justify-between items-center text-muted-foreground pt-1 border-t border-accent/20">
              <span>
                Total considerando {result.params.prazoInventarioAnos} anos de contabilidade:
              </span>
              <span className="font-semibold text-foreground">
                {formatCurrencyBRL(result.totalHoldingHorizonte)}
              </span>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-accent/30 bg-accent/10 p-3.5 text-xs text-foreground/90">
            <div className="flex items-center gap-2 font-semibold text-accent mb-1">
              <Building className="h-4 w-4 shrink-0" />
              Continuidade e Disponibilidade Imediata:
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Sem bloqueio de contas. Administração vitalícia, cláusulas de incomunicabilidade,
              impenhorabilidade e inalienabilidade nas quotas.
            </p>
          </div>
        </div>
      </div>

      {/* 2. VEREDITO DE LIQUIDEZ E PARALISIA PATRIMONIAL */}
      <Card
        className={`border-2 ${
          result.veredito.riscoParalisia === 'alto'
            ? 'border-destructive/60 bg-destructive/5'
            : result.veredito.riscoParalisia === 'medio'
              ? 'border-accent/60 bg-accent/5'
              : 'border-border bg-card'
        }`}
      >
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            {result.veredito.riscoParalisia === 'alto' ? (
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-destructive/15 text-destructive">
                <AlertTriangle className="h-5 w-5" />
              </div>
            ) : (
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent">
                <TrendingDown className="h-5 w-5" />
              </div>
            )}
            <div>
              <CardTitle className="font-serif text-xl sm:text-2xl font-bold">
                Veredito Técnico de Liquidez do Inventário
              </CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">
                Avaliação da capacidade de pagamento da família no momento da abertura da sucessão
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 pt-1">
          <p className="text-sm sm:text-base leading-relaxed text-foreground font-medium">
            {result.veredito.mensagemVeredito}
          </p>

          <div className="grid gap-4 sm:grid-cols-3 pt-2">
            <div className="rounded-xl border border-border/80 bg-background/60 p-4">
              <span className="text-xs uppercase text-muted-foreground font-semibold">
                Custo de Desbloqueio
              </span>
              <p className="font-serif text-xl font-bold text-destructive mt-1">
                {formatCurrencyBRL(result.totalInventario)}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Tributos e custas no ato do falecimento
              </p>
            </div>

            <div className="rounded-xl border border-border/80 bg-background/60 p-4">
              <span className="text-xs uppercase text-muted-foreground font-semibold">
                Reserva de Liquidez Informada
              </span>
              <p className="font-serif text-xl font-bold text-foreground mt-1">
                {result.params.reservaLiquidezFamilia
                  ? formatCurrencyBRL(result.params.reservaLiquidezFamilia)
                  : 'Não especificada'}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Caixa livre sem comprometer ativos
              </p>
            </div>

            <div className="rounded-xl border border-border/80 bg-background/60 p-4">
              <span className="text-xs uppercase text-muted-foreground font-semibold">
                Risco de Venda Forçada
              </span>
              <p
                className={`font-serif text-xl font-bold mt-1 ${
                  result.veredito.riscoParalisia === 'alto' ? 'text-destructive' : 'text-accent'
                }`}
              >
                {result.veredito.riscoParalisia === 'alto'
                  ? 'Crítico (30% deságio)'
                  : 'Moderado a Baixo'}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Urgência para levantar caixa com terceiros
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 3. TABELA BREAKDOWN DETALHADA POR COMPONENTE */}
      <Card className="border border-border/80 bg-card shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="font-serif text-xl sm:text-2xl font-bold">
                Tabela Comparativa Discriminada (v2)
              </CardTitle>
              <p className="text-xs text-muted-foreground mt-1">
                Memória de cálculo detalhada de cada rubrica do inventário convencional × holding
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs font-mono">
                UF: {result.ufInfo.nome} ({result.ufInfo.regime})
              </Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0 sm:p-6 sm:pt-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead className="w-[32%] min-w-[200px]">Rubrica / Componente</TableHead>
                  <TableHead className="min-w-[170px]">Base de Cálculo</TableHead>
                  <TableHead className="min-w-[130px]">Alíquota / Regra</TableHead>
                  <TableHead className="text-right min-w-[130px]">Valor (R$)</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody className="text-sm">
                {/* Seção Inventário */}
                <TableRow className="bg-destructive/10 font-semibold hover:bg-destructive/10">
                  <TableCell colSpan={4} className="text-destructive font-serif text-base py-3">
                    1. Componentes do Inventário Convencional ({result.params.regimeHonorarios})
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="font-medium">
                    {inv.itcmdHeranca.label}
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {inv.itcmdHeranca.descricao}
                    </p>
                  </TableCell>
                  <TableCell>{inv.itcmdHeranca.baseCalculo}</TableCell>
                  <TableCell>{inv.itcmdHeranca.aliquotaOuRegra}</TableCell>
                  <TableCell className="text-right font-mono font-semibold text-destructive">
                    {formatCurrencyBRL(inv.itcmdHeranca.valor)}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="font-medium">
                    {inv.honorariosAdvocaticios.label}
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {inv.honorariosAdvocaticios.descricao}
                    </p>
                  </TableCell>
                  <TableCell>{inv.honorariosAdvocaticios.baseCalculo}</TableCell>
                  <TableCell>{inv.honorariosAdvocaticios.aliquotaOuRegra}</TableCell>
                  <TableCell className="text-right font-mono font-semibold text-destructive">
                    {formatCurrencyBRL(inv.honorariosAdvocaticios.valor)}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="font-medium">
                    {inv.escriturasNotas.label}
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {inv.escriturasNotas.descricao}
                    </p>
                  </TableCell>
                  <TableCell>{inv.escriturasNotas.baseCalculo}</TableCell>
                  <TableCell>{inv.escriturasNotas.aliquotaOuRegra}</TableCell>
                  <TableCell className="text-right font-mono text-muted-foreground">
                    {formatCurrencyBRL(inv.escriturasNotas.valor)}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="font-medium">
                    {inv.registroCartorio.label}
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {inv.registroCartorio.descricao}
                    </p>
                  </TableCell>
                  <TableCell>{inv.registroCartorio.baseCalculo}</TableCell>
                  <TableCell>{inv.registroCartorio.aliquotaOuRegra}</TableCell>
                  <TableCell className="text-right font-mono text-muted-foreground">
                    {formatCurrencyBRL(inv.registroCartorio.valor)}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="font-medium">
                    {inv.certidoesCustasFixas.label}
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {inv.certidoesCustasFixas.descricao}
                    </p>
                  </TableCell>
                  <TableCell>{inv.certidoesCustasFixas.baseCalculo}</TableCell>
                  <TableCell>{inv.certidoesCustasFixas.aliquotaOuRegra}</TableCell>
                  <TableCell className="text-right font-mono text-muted-foreground">
                    {formatCurrencyBRL(inv.certidoesCustasFixas.valor)}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="font-medium">
                    {inv.custasJudiciarias.label}
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {inv.custasJudiciarias.descricao}
                    </p>
                  </TableCell>
                  <TableCell>{inv.custasJudiciarias.baseCalculo}</TableCell>
                  <TableCell>{inv.custasJudiciarias.aliquotaOuRegra}</TableCell>
                  <TableCell className="text-right font-mono text-muted-foreground">
                    {formatCurrencyBRL(inv.custasJudiciarias.valor)}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="font-medium">
                    {inv.honorariosContabeis.label}
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {inv.honorariosContabeis.descricao}
                    </p>
                  </TableCell>
                  <TableCell>{inv.honorariosContabeis.baseCalculo}</TableCell>
                  <TableCell>{inv.honorariosContabeis.aliquotaOuRegra}</TableCell>
                  <TableCell className="text-right font-mono text-muted-foreground">
                    {formatCurrencyBRL(inv.honorariosContabeis.valor)}
                  </TableCell>
                </TableRow>

                {result.params.venderBensParaCustear && (
                  <>
                    <TableRow>
                      <TableCell className="font-medium text-destructive">
                        {inv.desagioVendaForcada.label}
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {inv.desagioVendaForcada.descricao}
                        </p>
                      </TableCell>
                      <TableCell>{inv.desagioVendaForcada.baseCalculo}</TableCell>
                      <TableCell>{inv.desagioVendaForcada.aliquotaOuRegra}</TableCell>
                      <TableCell className="text-right font-mono font-semibold text-destructive">
                        {formatCurrencyBRL(inv.desagioVendaForcada.valor)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium text-destructive">
                        {inv.irGanhoCapital.label}
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {inv.irGanhoCapital.descricao}
                        </p>
                      </TableCell>
                      <TableCell>{inv.irGanhoCapital.baseCalculo}</TableCell>
                      <TableCell>{inv.irGanhoCapital.aliquotaOuRegra}</TableCell>
                      <TableCell className="text-right font-mono font-semibold text-destructive">
                        {formatCurrencyBRL(inv.irGanhoCapital.valor)}
                      </TableCell>
                    </TableRow>
                  </>
                )}

                <TableRow className="bg-destructive/15 font-bold border-b-2 border-destructive/40">
                  <TableCell colSpan={3} className="text-destructive font-serif text-base py-3">
                    SUBTOTAL DO INVENTÁRIO CONVENCIONAL
                  </TableCell>
                  <TableCell className="text-right font-mono font-bold text-destructive text-base py-3">
                    {formatCurrencyBRL(result.totalInventario)}
                  </TableCell>
                </TableRow>

                {/* Seção Holding */}
                <TableRow className="bg-accent/10 font-semibold hover:bg-accent/10">
                  <TableCell colSpan={4} className="text-accent font-serif text-base py-3">
                    2. Componentes do Planejamento Precedente com Holding Familiar
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="font-medium">
                    {hld.honorariosAdvHolding.label}
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {hld.honorariosAdvHolding.descricao}
                    </p>
                  </TableCell>
                  <TableCell>{hld.honorariosAdvHolding.baseCalculo}</TableCell>
                  <TableCell>{hld.honorariosAdvHolding.aliquotaOuRegra}</TableCell>
                  <TableCell className="text-right font-mono font-semibold text-accent">
                    {formatCurrencyBRL(hld.honorariosAdvHolding.valor)}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="font-medium">
                    {hld.constituicaoHolding.label}
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {hld.constituicaoHolding.descricao}
                    </p>
                  </TableCell>
                  <TableCell>{hld.constituicaoHolding.baseCalculo}</TableCell>
                  <TableCell>{hld.constituicaoHolding.aliquotaOuRegra}</TableCell>
                  <TableCell className="text-right font-mono font-semibold text-foreground">
                    {formatCurrencyBRL(hld.constituicaoHolding.valor)}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-1.5">
                      <span>{hld.itbiIntegralizacao.label}</span>
                      {hld.itbiIntegralizacao.valor === 0 && (
                        <Badge
                          variant="outline"
                          className="text-[10px] py-0 px-1.5 border-accent text-accent"
                        >
                          Imunidade CF/88
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {hld.itbiIntegralizacao.descricao}
                    </p>
                  </TableCell>
                  <TableCell>{hld.itbiIntegralizacao.baseCalculo}</TableCell>
                  <TableCell>{hld.itbiIntegralizacao.aliquotaOuRegra}</TableCell>
                  <TableCell className="text-right font-mono font-semibold text-accent">
                    {formatCurrencyBRL(hld.itbiIntegralizacao.valor)}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="font-medium">
                    {hld.itcmdDoacaoEmVida.label}
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {hld.itcmdDoacaoEmVida.descricao}
                    </p>
                  </TableCell>
                  <TableCell>{hld.itcmdDoacaoEmVida.baseCalculo}</TableCell>
                  <TableCell>{hld.itcmdDoacaoEmVida.aliquotaOuRegra}</TableCell>
                  <TableCell className="text-right font-mono font-semibold text-accent">
                    {formatCurrencyBRL(hld.itcmdDoacaoEmVida.valor)}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="font-medium">
                    {hld.manutencaoContabilAnual.label}
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {hld.manutencaoContabilAnual.descricao}
                    </p>
                  </TableCell>
                  <TableCell>{hld.manutencaoContabilAnual.baseCalculo}</TableCell>
                  <TableCell>{hld.manutencaoContabilAnual.aliquotaOuRegra}</TableCell>
                  <TableCell className="text-right font-mono text-muted-foreground">
                    {formatCurrencyBRL(hld.manutencaoContabilAnual.valor)}
                  </TableCell>
                </TableRow>

                <TableRow className="bg-accent/15 font-bold border-b-2 border-accent/40">
                  <TableCell colSpan={3} className="text-accent font-serif text-base py-3">
                    SUBTOTAL DA HOLDING (IMPLANTAÇÃO + ANO 1)
                  </TableCell>
                  <TableCell className="text-right font-mono font-bold text-accent text-base py-3">
                    {formatCurrencyBRL(result.totalHoldingAno1)}
                  </TableCell>
                </TableRow>

                {/* Linha Final de Diferença / Economia */}
                <TableRow className="bg-muted font-bold">
                  <TableCell colSpan={3} className="font-serif text-lg py-4 text-foreground">
                    ECONOMIA LÍQUIDA ESTIMADA DA FAMÍLIA
                  </TableCell>
                  <TableCell className="text-right font-mono font-bold text-accent text-xl py-4">
                    +{formatCurrencyBRL(result.economiaNominal)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* 4. COMPARTILHAMENTO DA SIMULAÇÃO */}
      <CalculatorShare result={result} />

      {/* 5. CTA FINAL PÓS-RESULTADO */}
      <div className="rounded-2xl border-2 border-accent/40 bg-card p-6 sm:p-10 shadow-xl text-center sm:text-left">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
              Quer transformar essa economia em segurança real para sua família?
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Agende uma sessão diagnóstica com os sócios do escritório{' '}
              <strong className="text-foreground">{OFFICE_CONTACT.name}</strong>. Analisaremos sua
              matrícula de imóveis, quadro societário e viabilidade tributária em estrito sigilo.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <Button
              type="button"
              size="lg"
              asChild
              className="button-motion w-full sm:w-auto px-7 py-6 text-base font-semibold bg-[#25D366] hover:bg-[#20ba59] text-white shadow-lg"
            >
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-5 w-5 fill-current" />
                Agendar via WhatsApp ({OFFICE_CONTACT.phoneDisplay})
              </a>
            </Button>

            {onContactClick && (
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={onContactClick}
                className="button-motion w-full sm:w-auto px-6 py-6 text-base"
              >
                Formulário da Página
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* 6. AVISOS LEGAIS E DISCLAIMERS */}
      <CalculatorDisclaimers />
    </div>
  )
}
