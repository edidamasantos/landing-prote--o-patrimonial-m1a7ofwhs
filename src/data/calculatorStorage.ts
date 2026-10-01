import { DEFAULT_SIMULATION_PARAMS, SimulationParams } from './calculatorEngine'

/**
 * Codifica parâmetros da simulação em query string segura e legível
 */
export function encodeSimulationParams(params: SimulationParams): string {
  const q = new URLSearchParams()
  q.set('mm', String(params.monteMor))
  q.set('uf', params.uf)
  q.set('vi', String(params.valorImoveis))
  q.set('reg', params.regimeHonorarios)
  q.set('hc', String(params.honorariosContabeisMensais))
  q.set('pz', String(params.prazoInventarioAnos))
  q.set('en', String(params.percEscriturasNotas))
  q.set('rc', String(params.percRegistroCartorio))
  q.set('cc', String(params.certidoesCartorarias))
  q.set('cj', String(params.percCustasJudiciarias))
  q.set('vb', params.venderBensParaCustear ? '1' : '0')
  q.set('des', String(params.desagioVendaForcadaPerc))
  q.set('vvf', String(params.valorVendaForcada))
  q.set('gc', String(params.ganhoDeCapitalVenda))
  q.set('ir', String(params.aliquotaIrpfGanhoCapital))
  q.set('itbi', String(params.aliquotaItbiIntegralizacao))
  q.set('ch', String(params.custoConstituicaoHolding))
  q.set('hch', String(params.honorariosContabeisHoldingMensal))
  if (params.reservaLiquidezFamilia !== undefined) {
    q.set('liq', String(params.reservaLiquidezFamilia))
  }
  if (params.aliquotaItcmdHerancaCustom !== undefined) {
    q.set('ith', String(params.aliquotaItcmdHerancaCustom))
  }
  if (params.aliquotaItcmdDoacaoCustom !== undefined) {
    q.set('itd', String(params.aliquotaItcmdDoacaoCustom))
  }
  return q.toString()
}

/**
 * Decodifica query string da URL para restaurar simulação
 */
export function decodeSimulationParams(search: string): Partial<SimulationParams> {
  const q = new URLSearchParams(search)
  const result: Partial<SimulationParams> = {}

  const mm = q.get('mm')
  if (mm && !isNaN(Number(mm))) result.monteMor = Number(mm)

  const uf = q.get('uf')
  if (uf) result.uf = uf.toUpperCase()

  const vi = q.get('vi')
  if (vi && !isNaN(Number(vi))) result.valorImoveis = Number(vi)

  const reg = q.get('reg')
  if (reg === 'extrajudicial' || reg === 'litigioso') result.regimeHonorarios = reg

  const hc = q.get('hc')
  if (hc && !isNaN(Number(hc))) result.honorariosContabeisMensais = Number(hc)

  const pz = q.get('pz')
  if (pz && !isNaN(Number(pz))) result.prazoInventarioAnos = Number(pz)

  const en = q.get('en')
  if (en && !isNaN(Number(en))) result.percEscriturasNotas = Number(en)

  const rc = q.get('rc')
  if (rc && !isNaN(Number(rc))) result.percRegistroCartorio = Number(rc)

  const cc = q.get('cc')
  if (cc && !isNaN(Number(cc))) result.certidoesCartorarias = Number(cc)

  const cj = q.get('cj')
  if (cj && !isNaN(Number(cj))) result.percCustasJudiciarias = Number(cj)

  const vb = q.get('vb')
  if (vb !== null) result.venderBensParaCustear = vb === '1'

  const des = q.get('des')
  if (des && !isNaN(Number(des))) result.desagioVendaForcadaPerc = Number(des)

  const vvf = q.get('vvf')
  if (vvf && !isNaN(Number(vvf))) result.valorVendaForcada = Number(vvf)

  const gc = q.get('gc')
  if (gc && !isNaN(Number(gc))) result.ganhoDeCapitalVenda = Number(gc)

  const ir = q.get('ir')
  if (ir && !isNaN(Number(ir))) result.aliquotaIrpfGanhoCapital = Number(ir)

  const itbi = q.get('itbi')
  if (itbi && !isNaN(Number(itbi))) result.aliquotaItbiIntegralizacao = Number(itbi)

  const ch = q.get('ch')
  if (ch && !isNaN(Number(ch))) result.custoConstituicaoHolding = Number(ch)

  const hch = q.get('hch')
  if (hch && !isNaN(Number(hch))) result.honorariosContabeisHoldingMensal = Number(hch)

  const liq = q.get('liq')
  if (liq && !isNaN(Number(liq))) result.reservaLiquidezFamilia = Number(liq)

  const ith = q.get('ith')
  if (ith && !isNaN(Number(ith))) result.aliquotaItcmdHerancaCustom = Number(ith)

  const itd = q.get('itd')
  if (itd && !isNaN(Number(itd))) result.aliquotaItcmdDoacaoCustom = Number(itd)

  return result
}

export interface CalculatorLeadData {
  name: string
  email: string
  phone: string
  newsletter: boolean
  simulatedAt: string
  monteMor: number
  uf: string
}

const STORAGE_LEAD_KEY = 'ds_calculator_lead'
const STORAGE_PARAMS_KEY = 'ds_calculator_last_params'

export function getSavedLead(): CalculatorLeadData | null {
  try {
    const raw = localStorage.getItem(STORAGE_LEAD_KEY)
    if (!raw) return null
    return JSON.parse(raw) as CalculatorLeadData
  } catch {
    return null
  }
}

export function saveLead(lead: CalculatorLeadData): void {
  try {
    localStorage.setItem(STORAGE_LEAD_KEY, JSON.stringify(lead))
  } catch {
    // ignorar falha se storage restrito
  }
}

export function getSavedParams(): SimulationParams {
  try {
    const raw = localStorage.getItem(STORAGE_PARAMS_KEY)
    if (!raw) return DEFAULT_SIMULATION_PARAMS
    const parsed = JSON.parse(raw)
    return { ...DEFAULT_SIMULATION_PARAMS, ...parsed }
  } catch {
    return DEFAULT_SIMULATION_PARAMS
  }
}

export function saveParams(params: SimulationParams): void {
  try {
    localStorage.setItem(STORAGE_PARAMS_KEY, JSON.stringify(params))
  } catch {
    // ignorar falha
  }
}
