import { calcularAliquotasUf, ITCMD_ESTADOS } from './itcmdEstados'

export type RegimeHonorarios = 'extrajudicial' | 'litigioso'

export interface SimulationParams {
  // Parâmetros Gerais
  monteMor: number // Base patrimonial total (valor dos bens) ex: R$ 3.000.000
  uf: string // UF selecionada (ex: 'SP')
  valorImoveis: number // Parcela em imóveis (base do ITBI na holding e escrituras/registro)

  // Inventário Convencional
  regimeHonorarios: RegimeHonorarios // 'extrajudicial' (8%) ou 'litigioso' (10%)
  aliquotaHonorariosAdv?: number // Opcional se customizado; default 8% ou 10%
  honorariosContabeisMensais: number // R$ 800 a R$ 2.500/mês
  prazoInventarioAnos: number // 2 a 5 anos judicial; ~0.5 a 1 ano extrajudicial (default 3)
  percEscriturasNotas: number // ~1% (ajustável)
  percRegistroCartorio: number // ~0.5% (ajustável)
  certidoesCartorarias: number // R$ 2.000 a R$ 5.000 (fixo)
  percCustasJudiciarias: number // 0.5% a 1%
  venderBensParaCustear: boolean // toggle: família precisará vender bens com pressa?
  desagioVendaForcadaPerc: number // 10% a 30% ("pressa para levantar caixa")
  valorVendaForcada: number // montante a ser vendido (estimado ou parte do monte-mor)
  ganhoDeCapitalVenda: number // ganho apurado na venda forçada
  aliquotaIrpfGanhoCapital: number // 15% a 22.5%

  // Planejamento com Holding
  aliquotaItbiIntegralizacao: number // Padrão 0% com esteio no art. 156, § 2º, I da CF/88 (ajustável de 0% a 4%)
  percHonorariosAdvHolding: number // Honorários advocatícios da holding: média de 2% do monte-mor (ajustável conforme complexidade, ex.: 1% a 4%)
  custoConstituicaoHolding: number // Custo de constituição estrutural fixo separado (R$ 30.000 a R$ 80.000)
  honorariosContabeisHoldingMensal: number // R$ 800 a R$ 2.500/mês
  aliquotaItcmdDoacaoCustom?: number // Alíquota da doação em vida (se override da UF)
  aliquotaItcmdHerancaCustom?: number // Alíquota do inventário (se override da UF)

  // Liquidez Imediata da Família para o Inventário (Veredito)
  reservaLiquidezFamilia?: number // Quanto a família tem em caixa hoje (para comparar se dispõe)
}

export interface ComponentBreakdown {
  id: string
  label: string
  baseCalculo: string
  aliquotaOuRegra: string
  valor: number
  descricao: string
}

export interface SimulationResult {
  params: SimulationParams

  // Totais
  totalInventario: number
  totalHoldingAno1: number
  totalHoldingHorizonte: number // Holding ao longo do mesmo prazo do inventário (para justiça comparativa)
  economiaNominal: number // totalInventario - totalHoldingHorizonte
  economiaPercentual: number // % economizado em relação ao inventário

  // Detalhamento Inventário
  inventarioComponents: {
    itcmdHeranca: ComponentBreakdown
    honorariosAdvocaticios: ComponentBreakdown
    honorariosContabeis: ComponentBreakdown
    escriturasNotas: ComponentBreakdown
    registroCartorio: ComponentBreakdown
    certidoesCustasFixas: ComponentBreakdown
    custasJudiciarias: ComponentBreakdown
    desagioVendaForcada: ComponentBreakdown
    irGanhoCapital: ComponentBreakdown
  }

  // Detalhamento Holding
  holdingComponents: {
    itbiIntegralizacao: ComponentBreakdown
    honorariosAdvHolding: ComponentBreakdown
    constituicaoHolding: ComponentBreakdown
    itcmdDoacaoEmVida: ComponentBreakdown
    manutencaoContabilAnual: ComponentBreakdown
    manutencaoContabilHorizonte: ComponentBreakdown
  }

  // Veredito de Liquidez & Paralisia
  veredito: {
    dispoeDoMontante: boolean | null
    diferencaLiquidez: number // reserva - totalInventario
    mensagemVeredito: string
    tempoIndisponibilidade: string
    riscoParalisia: 'alto' | 'medio' | 'baixo'
    alertaVendaForcada: boolean
  }

  // Metadados da UF
  ufInfo: {
    uf: string
    nome: string
    regime: 'fixo' | 'progressivo'
    baseLegal: string
    aliquotaHerancaCalculada: number
    aliquotaDoacaoCalculada: number
  }
}

export const DEFAULT_SIMULATION_PARAMS: SimulationParams = {
  monteMor: 5000000, // R$ 5 milhões padrão
  uf: 'SP',
  valorImoveis: 3500000, // R$ 3,5 milhões em imóveis
  regimeHonorarios: 'extrajudicial',
  honorariosContabeisMensais: 1500,
  prazoInventarioAnos: 3,
  percEscriturasNotas: 1.0,
  percRegistroCartorio: 0.5,
  certidoesCartorarias: 3500,
  percCustasJudiciarias: 1.0,
  venderBensParaCustear: false,
  desagioVendaForcadaPerc: 20,
  valorVendaForcada: 800000,
  ganhoDeCapitalVenda: 400000,
  aliquotaIrpfGanhoCapital: 15,

  // Holding
  aliquotaItbiIntegralizacao: 0, // Padrão R$ 0 com fundamento no art. 156, § 2º, I da CF/88
  percHonorariosAdvHolding: 2.0, // Honorários advocatícios holding em média 2% do monte-mor
  custoConstituicaoHolding: 45000, // Custo de constituição estrutural fixo separado (R$ 30k a R$ 80k)
  honorariosContabeisHoldingMensal: 1200,

  // Reserva imediata de liquidez da família (para o veredito)
  reservaLiquidezFamilia: 150000,
}

export function formatCurrencyBRL(value: number): string {
  if (isNaN(value)) return 'R$ 0,00'
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(value)
}

export function formatCurrencyBRLWithCents(value: number): string {
  if (isNaN(value)) return 'R$ 0,00'
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(value)
}

export function formatPercent(value: number): string {
  if (isNaN(value)) return '0%'
  return `${value.toLocaleString('pt-BR', { maximumFractionDigits: 1, minimumFractionDigits: 0 })}%`
}

/**
 * Executa o cálculo comparativo completo da simulação v2
 */
export function calculateSimulation(params: SimulationParams): SimulationResult {
  const ufData = ITCMD_ESTADOS[params.uf] || ITCMD_ESTADOS['SP']
  const aliquotasCalculadas = calcularAliquotasUf(params.uf, params.monteMor)

  const aliquotaHeranca =
    params.aliquotaItcmdHerancaCustom !== undefined
      ? params.aliquotaItcmdHerancaCustom
      : aliquotasCalculadas.aliquotaHeranca

  const aliquotaDoacao =
    params.aliquotaItcmdDoacaoCustom !== undefined
      ? params.aliquotaItcmdDoacaoCustom
      : aliquotasCalculadas.aliquotaDoacao

  // --- CÁLCULO INVENTÁRIO CONVENCIONAL ---

  // 1. ITCMD Causa Mortis
  const valorItcmdHeranca = params.monteMor * (aliquotaHeranca / 100)

  // 2. Honorários Advocatícios
  const taxaAdv =
    params.aliquotaHonorariosAdv !== undefined
      ? params.aliquotaHonorariosAdv
      : params.regimeHonorarios === 'litigioso'
        ? 10
        : 8
  const valorHonorariosAdv = params.monteMor * (taxaAdv / 100)

  // 3. Honorários Contábeis
  const mesesInventario = Math.max(1, Math.round(params.prazoInventarioAnos * 12))
  const valorHonorariosContabeisInv = params.honorariosContabeisMensais * mesesInventario

  // 4. Escrituras e Atas (cartório de notas)
  const baseImoveisCartorio = Math.min(params.monteMor, Math.max(0, params.valorImoveis))
  const valorEscrituras = baseImoveisCartorio * (params.percEscriturasNotas / 100)

  // 5. Registro no Cartório de Imóveis
  const valorRegistro = baseImoveisCartorio * (params.percRegistroCartorio / 100)

  // 6. Certidões e Custas Fixas
  const valorCertidoes = params.certidoesCartorarias

  // 7. Custas Judiciárias / Taxa Judiciária
  // No extrajudicial pode ser dispensada taxa judicial ou reduzida, mas usuário estipulou 0.5% a 1%
  const taxaJudiciaria =
    params.regimeHonorarios === 'litigioso'
      ? params.percCustasJudiciarias
      : params.percCustasJudiciarias * 0.5
  const valorCustasJudiciarias = params.monteMor * (taxaJudiciaria / 100)

  // 8 e 9. Deságio e IR sobre Ganho de Capital em Venda Forçada
  let valorDesagio = 0
  let valorIrGanhoCapital = 0
  if (params.venderBensParaCustear) {
    const baseVenda = Math.min(params.monteMor, Math.max(0, params.valorVendaForcada))
    valorDesagio = baseVenda * (params.desagioVendaForcadaPerc / 100)
    valorIrGanhoCapital =
      Math.max(0, params.ganhoDeCapitalVenda) * (params.aliquotaIrpfGanhoCapital / 100)
  }

  const totalInventario =
    valorItcmdHeranca +
    valorHonorariosAdv +
    valorHonorariosContabeisInv +
    valorEscrituras +
    valorRegistro +
    valorCertidoes +
    valorCustasJudiciarias +
    valorDesagio +
    valorIrGanhoCapital

  // --- CÁLCULO PLANEJAMENTO COM HOLDING ---

  // 1. ITBI na Integralização (padrão 0%, calculado sobre valor de imóveis)
  const taxaItbi = params.aliquotaItbiIntegralizacao ?? 0
  const valorItbi = baseImoveisCartorio * (taxaItbi / 100)

  // 2. Honorários Advocatícios da Holding (média de ~2% do monte-mor)
  const taxaHonorariosAdvHolding =
    params.percHonorariosAdvHolding !== undefined ? params.percHonorariosAdvHolding : 2.0
  const valorHonorariosAdvHolding = params.monteMor * (taxaHonorariosAdvHolding / 100)

  // 3. Custo de Constituição Estrutural Fixo da Holding (R$ 30.000 a R$ 80.000)
  const valorConstituicao = params.custoConstituicaoHolding

  // 4. ITCMD sobre Doação em Vida com Usufruto
  // Freqüentemente com alíquotas menores ou faixas antecipadas antes de elevação da reforma
  const valorItcmdDoacao = params.monteMor * (aliquotaDoacao / 100)

  // 5. Honorários Contábeis de Manutenção da Holding
  const valorContabilHoldingAno = params.honorariosContabeisHoldingMensal * 12
  const valorContabilHoldingHorizonte = params.honorariosContabeisHoldingMensal * mesesInventario

  // Totais Holding: Ano 1 (honorários adv holding + constituição estrutural + ITBI + ITCMD doação + 1 ano contábil)
  const totalHoldingAno1 =
    valorItbi +
    valorHonorariosAdvHolding +
    valorConstituicao +
    valorItcmdDoacao +
    valorContabilHoldingAno

  // Total Holding no horizonte do inventário (para confronto justo prazo a prazo)
  const totalHoldingHorizonte =
    valorItbi +
    valorHonorariosAdvHolding +
    valorConstituicao +
    valorItcmdDoacao +
    valorContabilHoldingHorizonte

  const economiaNominal = Math.max(0, totalInventario - totalHoldingHorizonte)
  const economiaPercentual =
    totalInventario > 0 ? Math.min(100, (economiaNominal / totalInventario) * 100) : 0

  // --- VEREDITO DE LIQUIDEZ ---
  const reserva = params.reservaLiquidezFamilia ?? 0
  const temReservaInformada =
    params.reservaLiquidezFamilia !== undefined && params.reservaLiquidezFamilia > 0
  const dispoe = temReservaInformada ? reserva >= totalInventario : null
  const diferencaLiquidez = reserva - totalInventario

  let mensagemVeredito = ''
  let riscoParalisia: 'alto' | 'medio' | 'baixo' = 'baixo'

  if (!temReservaInformada) {
    mensagemVeredito =
      'O inventário exigirá desembolso imediato estimado de ' +
      formatCurrencyBRL(totalInventario) +
      ' para destravar os bens da família. Sem caixa livre, a família é obrigada a contrair dívidas caras ou queimar patrimônio com deságio.'
    riscoParalisia = params.regimeHonorarios === 'litigioso' ? 'alto' : 'medio'
  } else if (dispoe) {
    mensagemVeredito =
      'A família dispõe de liquidez em tese para arcar com o inventário, porém perderá ' +
      formatCurrencyBRL(totalInventario) +
      ' do seu patrimônio acumulado em impostos e custas que poderiam ser preservados com holding.'
    riscoParalisia = 'medio'
  } else {
    mensagemVeredito =
      'ALERTA DE ILIQUIDEZ: A família NÃO dispõe do montante imediato necessário (' +
      formatCurrencyBRL(totalInventario) +
      '). Faltam ' +
      formatCurrencyBRL(Math.abs(diferencaLiquidez)) +
      '. Há risco iminente de bloqueio judicial das contas, venda forçada de imóveis com até 30% de perda e desgaste severo entre herdeiros.'
    riscoParalisia = 'alto'
  }

  const tempoIndisponibilidade =
    params.regimeHonorarios === 'litigioso'
      ? `${params.prazoInventarioAnos} anos (contencioso em vara de família)`
      : `${params.prazoInventarioAnos <= 1 ? '6 a 12 meses' : `${params.prazoInventarioAnos} anos`} (via cartório extrajudicial)`

  return {
    params,
    totalInventario,
    totalHoldingAno1,
    totalHoldingHorizonte,
    economiaNominal,
    economiaPercentual,

    inventarioComponents: {
      itcmdHeranca: {
        id: 'itcmd-heranca',
        label: `ITCMD Causa Mortis (${params.uf})`,
        baseCalculo: `Monte-mor integral (${formatCurrencyBRL(params.monteMor)})`,
        aliquotaOuRegra: `${formatPercent(aliquotaHeranca)} (${ufData.regime})`,
        valor: valorItcmdHeranca,
        descricao: `Tributo estadual sucessório sobre todo o monte-mor conforme regras de ${ufData.nome}.`,
      },
      honorariosAdvocaticios: {
        id: 'honorarios-adv',
        label: `Honorários Advocatícios (${params.regimeHonorarios === 'litigioso' ? 'Litigioso' : 'Extrajudicial'})`,
        baseCalculo: `Monte-mor integral (${formatCurrencyBRL(params.monteMor)})`,
        aliquotaOuRegra: `${formatPercent(taxaAdv)} (Tabela OAB)`,
        valor: valorHonorariosAdv,
        descricao:
          params.regimeHonorarios === 'litigioso'
            ? 'Atuação contenciosa em inventário litigioso com disputa de herança (mínimo de 10%).'
            : 'Atuação em inventário extrajudicial amigável perante cartório de notas (mínimo de 8%).',
      },
      honorariosContabeis: {
        id: 'honorarios-contabeis-inv',
        label: 'Honorários Contábeis do Espólio',
        baseCalculo: `${formatCurrencyBRL(params.honorariosContabeisMensais)}/mês × ${mesesInventario} meses`,
        aliquotaOuRegra: `${params.prazoInventarioAnos} ano(s) de processo`,
        valor: valorHonorariosContabeisInv,
        descricao: 'Obrigações acessórias, declarações finais de espólio e apuração de tributos.',
      },
      escriturasNotas: {
        id: 'escrituras-notas',
        label: 'Escrituras e Atas Notariais',
        baseCalculo: `Imóveis (${formatCurrencyBRL(baseImoveisCartorio)})`,
        aliquotaOuRegra: `~${formatPercent(params.percEscriturasNotas)}`,
        valor: valorEscrituras,
        descricao: 'Custas de lavratura de escritura pública de partilha em cartório de notas.',
      },
      registroCartorio: {
        id: 'registro-cartorio',
        label: 'Registro de Imóveis (RGI)',
        baseCalculo: `Imóveis (${formatCurrencyBRL(baseImoveisCartorio)})`,
        aliquotaOuRegra: `~${formatPercent(params.percRegistroCartorio)}`,
        valor: valorRegistro,
        descricao: 'Emolumentos de averbação da partilha nas matrículas imobiliárias.',
      },
      certidoesCustasFixas: {
        id: 'certidoes-custas',
        label: 'Certidões e Custas Cartorárias',
        baseCalculo: 'Valor fixo por processo',
        aliquotaOuRegra: 'Valor estimado',
        valor: valorCertidoes,
        descricao: 'Emissão de certidões cíveis, fiscais, de ônus e testamentos (CENSEC).',
      },
      custasJudiciarias: {
        id: 'custas-judiciais',
        label: 'Custas e Taxa Judiciária',
        baseCalculo: `Monte-mor integral (${formatCurrencyBRL(params.monteMor)})`,
        aliquotaOuRegra: `${formatPercent(taxaJudiciaria)}`,
        valor: valorCustasJudiciarias,
        descricao:
          params.regimeHonorarios === 'litigioso'
            ? 'Taxa judiciária estadual cobrada na distribuição do processo judicial.'
            : 'Custas de distribuição e atos perante o Tribunal / Corregedoria.',
      },
      desagioVendaForcada: {
        id: 'desagio-venda',
        label: 'Deságio por Venda Forçada de Bens',
        baseCalculo: params.venderBensParaCustear
          ? `Bens alienados (${formatCurrencyBRL(params.valorVendaForcada)})`
          : 'Não aplicável',
        aliquotaOuRegra: params.venderBensParaCustear
          ? `${formatPercent(params.desagioVendaForcadaPerc)} de deságio`
          : '0%',
        valor: valorDesagio,
        descricao: params.venderBensParaCustear
          ? 'Perda patrimonial causada pela urgência em levantar liquidez para pagar o inventário.'
          : 'Família dispõe de reserva ou optou por não queimar patrimônio.',
      },
      irGanhoCapital: {
        id: 'ir-ganho-capital',
        label: 'IR sobre Ganho de Capital na Venda',
        baseCalculo: params.venderBensParaCustear
          ? `Lucro imobiliário (${formatCurrencyBRL(params.ganhoDeCapitalVenda)})`
          : 'Não aplicável',
        aliquotaOuRegra: params.venderBensParaCustear
          ? `${formatPercent(params.aliquotaIrpfGanhoCapital)} (PF)`
          : '0%',
        valor: valorIrGanhoCapital,
        descricao: params.venderBensParaCustear
          ? 'Imposto de renda sobre ganho de capital recolhido na venda com pressa de ativos.'
          : 'Sem incidência imediata por ausência de venda forçada.',
      },
    },

    holdingComponents: {
      itbiIntegralizacao: {
        id: 'itbi-holding',
        label: 'ITBI na Integralização de Imóveis',
        baseCalculo:
          taxaItbi === 0
            ? 'Imunidade Constitucional (CF/88, art. 156)'
            : `Imóveis integrais (${formatCurrencyBRL(baseImoveisCartorio)})`,
        aliquotaOuRegra: taxaItbi === 0 ? 'R$ 0 (Isento/Imune)' : `${formatPercent(taxaItbi)}`,
        valor: valorItbi,
        descricao:
          'ITBI zerado com base no art. 156 da CF/88 (integração de bens ao capital da sociedade não configura fato gerador do ITBI); exceções para empresas do ramo imobiliário serão analisadas caso a caso.',
      },
      honorariosAdvHolding: {
        id: 'honorarios-adv-holding',
        label: 'Honorários Advocatícios da Holding',
        baseCalculo: `Monte-mor integral (${formatCurrencyBRL(params.monteMor)})`,
        aliquotaOuRegra: `~${formatPercent(taxaHonorariosAdvHolding)} (Estimativa média)`,
        valor: valorHonorariosAdvHolding,
        descricao:
          'Honorários advocatícios especializados para assessoria no planejamento sucessório e holding familiar, estimados em 2% em média do monte-mor conforme a complexidade.',
      },
      constituicaoHolding: {
        id: 'constituicao-holding',
        label: 'Constituição Estrutural e Atos Societários',
        baseCalculo: 'Estruturação societária e taxas públicas',
        aliquotaOuRegra: 'Valor fixo estrutural',
        valor: valorConstituicao,
        descricao:
          'Custo de constituição estrutural fixo: arquitetura do contrato/estatuto social, acordo de sócios, protocolo familiar, taxas da Junta Comercial e averbações.',
      },
      itcmdDoacaoEmVida: {
        id: 'itcmd-doacao',
        label: `ITCMD sobre Doação de Quotas em Vida (${params.uf})`,
        baseCalculo: `Monte-mor integral (${formatCurrencyBRL(params.monteMor)})`,
        aliquotaOuRegra: `${formatPercent(aliquotaDoacao)} (${ufData.regime})`,
        valor: valorItcmdDoacao,
        descricao:
          'Tributação da doação de quotas com reserva vitalícia de usufruto aos patriarcas, aproveitando faixas menores e regras vigentes.',
      },
      manutencaoContabilAnual: {
        id: 'contabil-holding-ano',
        label: 'Honorários Contábeis (1º ano)',
        baseCalculo: `${formatCurrencyBRL(params.honorariosContabeisHoldingMensal)}/mês × 12 meses`,
        aliquotaOuRegra: '12 meses',
        valor: valorContabilHoldingAno,
        descricao: 'Balanço anual, escrituração contábil digital e obrigações da pessoa jurídica.',
      },
      manutencaoContabilHorizonte: {
        id: 'contabil-holding-horizonte',
        label: `Manutenção Contábil no Horizonte do Inventário (${params.prazoInventarioAnos} anos)`,
        baseCalculo: `${formatCurrencyBRL(params.honorariosContabeisHoldingMensal)}/mês × ${mesesInventario} meses`,
        aliquotaOuRegra: `${mesesInventario} meses comparados`,
        valor: valorContabilHoldingHorizonte,
        descricao:
          'Custo de conformidade contábil da holding projetado pelo mesmo prazo em que o inventário tramitaria.',
      },
    },

    veredito: {
      dispoeDoMontante: dispoe,
      diferencaLiquidez,
      mensagemVeredito,
      tempoIndisponibilidade,
      riscoParalisia,
      alertaVendaForcada: params.venderBensParaCustear,
    },

    ufInfo: {
      uf: ufData.uf,
      nome: ufData.nome,
      regime: ufData.regime,
      baseLegal: ufData.baseLegal,
      aliquotaHerancaCalculada: aliquotaHeranca,
      aliquotaDoacaoCalculada: aliquotaDoacao,
    },
  }
}
