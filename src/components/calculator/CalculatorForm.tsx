import { useState, useId } from 'react'
import { SimulationParams, formatCurrencyBRL, formatPercent } from '@/data/calculatorEngine'
import { ITCMD_ESTADOS } from '@/data/itcmdEstados'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  Calculator,
  ChevronDown,
  Info,
  Sliders,
  DollarSign,
  Building,
  Scale,
  Sparkles,
} from 'lucide-react'

interface CalculatorFormProps {
  params: SimulationParams
  onChange: (updated: SimulationParams) => void
  onCalculate: () => void
}

export function CalculatorForm({ params, onChange, onCalculate }: CalculatorFormProps) {
  const formId = useId()
  const [showAdvanced, setShowAdvanced] = useState(false)

  const selectedUfData = ITCMD_ESTADOS[params.uf] || ITCMD_ESTADOS['SP']

  const update = <K extends keyof SimulationParams>(key: K, val: SimulationParams[K]) => {
    onChange({
      ...params,
      [key]: val,
    })
  }

  // Atalhos de patrimônio rápido
  const quickPatrimonyValues = [
    { label: 'R$ 2 mi', value: 2000000 },
    { label: 'R$ 5 mi', value: 5000000 },
    { label: 'R$ 10 mi', value: 10000000 },
    { label: 'R$ 25 mi', value: 25000000 },
  ]

  const handlePatrimonyChange = (num: number) => {
    const valid = Math.max(100000, num)
    // Ajusta proporcionalmente valor de imóveis se maior que novo monte-mor
    const nextImoveis = Math.min(valid, params.valorImoveis || Math.round(valid * 0.7))
    onChange({
      ...params,
      monteMor: valid,
      valorImoveis: nextImoveis,
    })
  }

  return (
    <div className="space-y-6">
      {/* CARD PRINCIPAL: PARÂMETROS BÁSICOS E DIRETOS */}
      <Card className="border border-border/80 bg-card shadow-lg">
        <CardContent className="p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-5">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-accent mb-1">
                <Sliders className="h-3.5 w-3.5" />
                Configuração Patrimonial
              </div>
              <h3 className="font-serif text-2xl font-bold text-foreground">
                Informe o Patrimônio da Família
              </h3>
            </div>
            <div className="text-xs text-muted-foreground bg-muted/60 px-3 py-1.5 rounded-md">
              Sede do escritório: <strong className="text-foreground">São Paulo (SP)</strong>
            </div>
          </div>

          {/* 1. Monte-mor (Valor total dos bens) */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <Label htmlFor={`${formId}-monte-mor`} className="text-base font-semibold">
                Valor Total do Patrimônio Familiar (Monte-mor)
              </Label>
              <span className="font-serif text-2xl font-bold text-accent">
                {formatCurrencyBRL(params.monteMor)}
              </span>
            </div>

            {/* Slider interativo */}
            <Slider
              value={[params.monteMor]}
              min={500000}
              max={30000000}
              step={250000}
              onValueChange={([val]) => handlePatrimonyChange(val)}
              className="py-2"
              aria-label="Slider de patrimônio familiar"
            />

            {/* Atalhos rápidos de valor */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-xs text-muted-foreground mr-1">Atalhos rápidos:</span>
              {quickPatrimonyValues.map((q) => (
                <Button
                  key={q.value}
                  type="button"
                  variant={params.monteMor === q.value ? 'default' : 'outline'}
                  size="sm"
                  className="h-7 text-xs px-2.5"
                  onClick={() => handlePatrimonyChange(q.value)}
                >
                  {q.label}
                </Button>
              ))}
            </div>
          </div>

          {/* 2. Seleção de UF (Tabela embutida das 27 UFs) e Parcela de Imóveis */}
          <div className="grid gap-5 sm:grid-cols-2 pt-2">
            {/* UF */}
            <div className="space-y-2">
              <Label htmlFor={`${formId}-uf`} className="text-sm font-medium">
                Estado de Residência / Situação dos Bens (27 UFs)
              </Label>
              <Select
                value={params.uf}
                onValueChange={(val) => {
                  update('uf', val)
                }}
              >
                <SelectTrigger id={`${formId}-uf`} className="w-full">
                  <SelectValue placeholder="Selecione a UF" />
                </SelectTrigger>
                <SelectContent className="max-h-72">
                  {Object.values(ITCMD_ESTADOS).map((state) => (
                    <SelectItem key={state.uf} value={state.uf}>
                      {state.uf} — {state.nome}{' '}
                      {state.regime === 'progressivo'
                        ? `(Progressivo ${state.herancaMin}% a ${state.herancaMax}%)`
                        : `(Fixo ${state.herancaMax}%)`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground leading-snug">
                {selectedUfData.descricao}
              </p>
            </div>
            {/* Parcela em Imóveis */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor={`${formId}-imoveis`} className="text-sm font-medium">
                  Valor Estimado dos Imóveis
                </Label>
                <span className="text-xs font-mono font-medium text-foreground">
                  {formatCurrencyBRL(params.valorImoveis)} (
                  {((params.valorImoveis / params.monteMor) * 100).toFixed(0)}%)
                </span>
              </div>
              <Slider
                value={[params.valorImoveis]}
                min={0}
                max={params.monteMor}
                step={100000}
                onValueChange={([val]) => update('valorImoveis', val)}
                className="py-2"
                aria-label="Slider de valor dos imóveis"
              />
              <p className="text-xs text-muted-foreground">
                Base para custas de cartório de notas e RGI (no inventário) e eventual ITBI.
              </p>
            </div>{' '}
          </div>

          {/* 3. Seletor de Regime: Litigioso vs Extrajudicial */}
          <div className="space-y-3 pt-2">
            <Label className="text-sm font-medium">
              Regime de Inventário Pretendido (Honorários OAB)
            </Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div
                onClick={() => update('regimeHonorarios', 'extrajudicial')}
                className={`cursor-pointer rounded-xl border p-4 transition-all duration-200 ${
                  params.regimeHonorarios === 'extrajudicial'
                    ? 'border-accent bg-accent/10 shadow-sm'
                    : 'border-border/80 bg-background/50 hover:border-accent/40'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm text-foreground">
                    Extrajudicial (Em Cartório)
                  </span>
                  <span className="font-mono text-xs font-bold text-accent">8% OAB</span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  Consensual entre herdeiros maiores e capazes. Prazo menor, sem contencioso
                  judicial.
                </p>
              </div>

              <div
                onClick={() => update('regimeHonorarios', 'litigioso')}
                className={`cursor-pointer rounded-xl border p-4 transition-all duration-200 ${
                  params.regimeHonorarios === 'litigioso'
                    ? 'border-destructive bg-destructive/10 shadow-sm'
                    : 'border-border/80 bg-background/50 hover:border-destructive/40'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm text-foreground">
                    Litigioso / Judicial
                  </span>
                  <span className="font-mono text-xs font-bold text-destructive">10% OAB</span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  Disputa entre herdeiros, menores ou testamento contestado. Processo de anos na
                  vara de família.
                </p>
              </div>
            </div>
          </div>

          {/* 4. Liquidez Imediata da Família (Para o Veredito) */}
          <div className="space-y-2 pt-2 rounded-xl border border-border/80 bg-muted/30 p-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <Label htmlFor={`${formId}-liquidez`} className="text-sm font-medium">
                Quanto a família possui hoje em dinheiro/reserva líquida para arcar com o
                inventário?
              </Label>
              <span className="font-mono text-sm font-semibold text-foreground">
                {formatCurrencyBRL(params.reservaLiquidezFamilia ?? 0)}
              </span>
            </div>
            <Slider
              value={[params.reservaLiquidezFamilia ?? 0]}
              min={0}
              max={2000000}
              step={25000}
              onValueChange={([val]) => update('reservaLiquidezFamilia', val)}
              className="py-2"
              aria-label="Slider de liquidez imediata"
            />
            <p className="text-xs text-muted-foreground">
              Fundamental para emitirmos o <strong>veredito de capacidade imediata</strong>:
              indicará se as contas bancárias serão bloqueadas ou se haverá risco de venda forçada.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* PARÂMETROS AVANÇADOS / MODELO V2 COMPLETO (ACCORDION) */}
      <Accordion
        type="single"
        collapsible
        className="w-full rounded-2xl border border-border/80 bg-card overflow-hidden shadow-sm"
      >
        <AccordionItem value="advanced" className="border-none px-6 sm:px-8">
          <AccordionTrigger className="py-5 font-serif text-base font-semibold hover:no-underline">
            <div className="flex items-center gap-2 text-foreground">
              <Scale className="h-4 w-4 text-accent" />
              <span>
                Ajustar Parâmetros Detalhados do Modelo v2 (Custas, ITBI, Prazos e Venda Forçada)
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-6 pt-2 pb-6">
            {/* Bloco 1: Venda Forçada de Bens para Custear */}
            <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-4 sm:p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-sm text-foreground">
                    Necessidade de Vender Bens para Custear o Inventário?
                  </h4>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Se a família não dispuser de caixa imediato, terá que alienar imóveis com
                    pressa.
                  </p>
                </div>
                <Switch
                  checked={params.venderBensParaCustear}
                  onCheckedChange={(val) => update('venderBensParaCustear', val)}
                  aria-label="Vender bens para custear"
                />
              </div>

              {params.venderBensParaCustear && (
                <div className="grid gap-4 sm:grid-cols-3 pt-3 border-t border-destructive/20 animate-in fade-in-50">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium">
                      Deságio por Pressa ({params.desagioVendaForcadaPerc}%)
                    </Label>
                    <Slider
                      value={[params.desagioVendaForcadaPerc]}
                      min={10}
                      max={30}
                      step={1}
                      onValueChange={([val]) => update('desagioVendaForcadaPerc', val)}
                      aria-label="Deságio de venda forçada"
                    />
                    <p className="text-[11px] text-muted-foreground">Venda rápida de 10% a 30%</p>
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium">
                      Valor a Vender ({formatCurrencyBRL(params.valorVendaForcada)})
                    </Label>
                    <Slider
                      value={[params.valorVendaForcada]}
                      min={100000}
                      max={params.monteMor}
                      step={50000}
                      onValueChange={([val]) => update('valorVendaForcada', val)}
                      aria-label="Valor a ser vendido"
                    />
                    <p className="text-[11px] text-muted-foreground">
                      Fatia do monte-mor a liquidar
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium">
                      IRPF Ganho de Capital ({params.aliquotaIrpfGanhoCapital}%)
                    </Label>
                    <Select
                      value={String(params.aliquotaIrpfGanhoCapital)}
                      onValueChange={(val) => update('aliquotaIrpfGanhoCapital', Number(val))}
                    >
                      <SelectTrigger className="h-9 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15% (Até R$ 5 mi de ganho)</SelectItem>
                        <SelectItem value="17.5">17,5% (De R$ 5 mi a 10 mi)</SelectItem>
                        <SelectItem value="20">20% (De R$ 10 mi a 30 mi)</SelectItem>
                        <SelectItem value="22.5">22,5% (Acima de R$ 30 mi)</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-[11px] text-muted-foreground">Tributação federal de PF</p>
                  </div>
                </div>
              )}
            </div>

            {/* Bloco 2: Custos de Inventário (Prazos, Cartório e Judiciais) */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {/* Prazo */}
              <div className="space-y-1.5">
                <Label className="text-xs font-medium">
                  Prazo do Inventário ({params.prazoInventarioAnos} anos)
                </Label>
                <Slider
                  value={[params.prazoInventarioAnos]}
                  min={1}
                  max={5}
                  step={0.5}
                  onValueChange={([val]) => update('prazoInventarioAnos', val)}
                  aria-label="Prazo do inventário em anos"
                />
                <p className="text-[11px] text-muted-foreground">Multiplicador do custo contábil</p>
              </div>

              {/* Honorários Contábeis Espólio */}
              <div className="space-y-1.5">
                <Label className="text-xs font-medium">
                  Contabilidade Espólio ({formatCurrencyBRL(params.honorariosContabeisMensais)}/mês)
                </Label>
                <Slider
                  value={[params.honorariosContabeisMensais]}
                  min={800}
                  max={2500}
                  step={100}
                  onValueChange={([val]) => update('honorariosContabeisMensais', val)}
                  aria-label="Honorários contábeis mensais espólio"
                />
                <p className="text-[11px] text-muted-foreground">Faixa de R$ 800 a R$ 2.500</p>
              </div>

              {/* Escrituras e Atas */}
              <div className="space-y-1.5">
                <Label className="text-xs font-medium">
                  Escrituras e Atas ({formatPercent(params.percEscriturasNotas)})
                </Label>
                <Slider
                  value={[params.percEscriturasNotas]}
                  min={0.5}
                  max={2}
                  step={0.1}
                  onValueChange={([val]) => update('percEscriturasNotas', val)}
                  aria-label="Percentual de escrituras"
                />
                <p className="text-[11px] text-muted-foreground">~1% sobre imóveis</p>
              </div>

              {/* Registro Cartório */}
              <div className="space-y-1.5">
                <Label className="text-xs font-medium">
                  Registro Cartório ({formatPercent(params.percRegistroCartorio)})
                </Label>
                <Slider
                  value={[params.percRegistroCartorio]}
                  min={0.2}
                  max={1.5}
                  step={0.1}
                  onValueChange={([val]) => update('percRegistroCartorio', val)}
                  aria-label="Percentual de registro"
                />
                <p className="text-[11px] text-muted-foreground">~0,5% sobre imóveis</p>
              </div>
            </div>

            {/* Bloco 3: Custos do Planejamento com Holding */}
            <div className="rounded-xl border border-accent/40 bg-accent/5 p-4 sm:p-5 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <h4 className="font-semibold text-sm text-foreground">
                  Parâmetros Específicos do Planejamento com Holding
                </h4>
                <span className="text-[11px] text-accent font-medium">
                  Honorários holding média 2% • ITBI padrão R$ 0 (CF/88)
                </span>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {/* 1. ITBI na Integralização (Padrão 0% com fundamento art. 156 CF/88) */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <Label className="text-xs font-medium">ITBI na Integralização</Label>
                    <span className="font-mono text-xs font-bold text-accent">
                      {params.aliquotaItbiIntegralizacao === 0
                        ? '0% (R$ 0)'
                        : formatPercent(params.aliquotaItbiIntegralizacao)}
                    </span>
                  </div>
                  <Slider
                    value={[params.aliquotaItbiIntegralizacao]}
                    min={0}
                    max={4}
                    step={0.25}
                    onValueChange={([val]) => update('aliquotaItbiIntegralizacao', val)}
                    aria-label="Alíquota ITBI na integralização"
                  />
                  <p className="text-[11px] text-muted-foreground leading-tight">
                    Padrão 0% (ajustável para testar cenários com cobrança municipal).
                  </p>
                </div>

                {/* 2. Honorários Advocatícios da Holding (~2% do monte-mor) */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <Label className="text-xs font-medium">Honorários Advocatícios</Label>
                    <span className="font-mono text-xs font-bold text-accent">
                      {formatPercent(params.percHonorariosAdvHolding ?? 2)} (
                      {formatCurrencyBRL(
                        params.monteMor * ((params.percHonorariosAdvHolding ?? 2) / 100),
                      )}
                      )
                    </span>
                  </div>
                  <Slider
                    value={[params.percHonorariosAdvHolding ?? 2]}
                    min={1}
                    max={4}
                    step={0.25}
                    onValueChange={([val]) => update('percHonorariosAdvHolding', val)}
                    aria-label="Honorários advocatícios da holding percentual do monte-mor"
                  />
                  <p className="text-[11px] text-muted-foreground leading-tight">
                    Estimados em <strong>2% em média do monte-mor</strong>, a depender da
                    complexidade do caso.
                  </p>
                </div>

                {/* 3. Custo Estrutural de Constituição Fixo (R$ 30k a R$ 80k) */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <Label className="text-xs font-medium">Custo Estrutural Fixo</Label>
                    <span className="font-mono text-xs font-bold text-foreground">
                      {formatCurrencyBRL(params.custoConstituicaoHolding)}
                    </span>
                  </div>
                  <Slider
                    value={[params.custoConstituicaoHolding]}
                    min={30000}
                    max={80000}
                    step={5000}
                    onValueChange={([val]) => update('custoConstituicaoHolding', val)}
                    aria-label="Custo de constituição estrutural fixo"
                  />
                  <p className="text-[11px] text-muted-foreground leading-tight">
                    Arquitetura societária, acordo de sócios, Junta e registros (R$ 30k a R$ 80k).
                  </p>
                </div>

                {/* 4. Manutenção Contábil PJ */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <Label className="text-xs font-medium">Contabilidade Holding</Label>
                    <span className="font-mono text-xs font-semibold text-foreground">
                      {formatCurrencyBRL(params.honorariosContabeisHoldingMensal)}/mês
                    </span>
                  </div>
                  <Slider
                    value={[params.honorariosContabeisHoldingMensal]}
                    min={800}
                    max={2500}
                    step={100}
                    onValueChange={([val]) => update('honorariosContabeisHoldingMensal', val)}
                    aria-label="Contabilidade mensal holding"
                  />
                  <p className="text-[11px] text-muted-foreground leading-tight">
                    Escrituração e conformidade contábil anual da pessoa jurídica.
                  </p>
                </div>
              </div>

              {/* Fundamento legal do ITBI zerado visível no bloco */}
              <div className="rounded-lg border border-accent/30 bg-background/70 p-3 text-xs text-muted-foreground leading-relaxed flex items-start gap-2">
                <Info className="h-4 w-4 shrink-0 text-accent mt-0.5" />
                <div>
                  <strong className="text-foreground">Fundamento do ITBI zerado:</strong> ITBI
                  zerado com base no art. 156 da CF/88 (integração de bens ao capital da sociedade
                  não configura fato gerador do ITBI); exceções para empresas do ramo imobiliário
                  serão analisadas caso a caso.
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* BOTÃO PRINCIPAL DE CÁLCULO */}
      <Button
        type="button"
        size="lg"
        onClick={onCalculate}
        className="button-motion w-full py-6 text-base font-semibold shadow-xl"
      >
        <Calculator className="mr-2 h-5 w-5" />
        Calcular e Comparar Custos (Inventário × Holding)
      </Button>
    </div>
  )
}
