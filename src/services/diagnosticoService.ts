/**
 * Serviço de Persistência e Validação de Leads do Diagnóstico Patrimonial
 * Escritório Damasceno Santos Advocacia
 *
 * Arquitetura preparada para migração futura ao Supabase:
 * - Validação rigorosa dos campos no cliente e na camada de serviço
 * - Persistência em localStorage enquanto o Supabase não estiver conectado
 * - Quando o cliente Supabase for configurado futuramente, basta descomentar a chamada
 *   à tabela `diagnostico_leads` com o mesmo payload validado.
 */

import { DiagnosticoRespostas, DiagnosticoCalculado } from '@/data/diagnosticoScoring'

export interface DiagnosticoLeadPayload {
  nome: string
  whatsapp: string
  escolha: string
  respostas: {
    formulario: DiagnosticoRespostas
    resultado?: {
      topInstrumentos: string[]
      necessidadesAtencao: string[]
    }
  }
}

export interface DiagnosticoLeadRecord extends DiagnosticoLeadPayload {
  id: string
  created_at: string
}

export interface ValidationResult {
  isValid: boolean
  errors: {
    nome?: string
    whatsapp?: string
    escolha?: string
  }
}

const STORAGE_KEY_RESPOSTAS = 'damasceno_diagnostico_respostas_v1'
const STORAGE_KEY_STEP = 'damasceno_diagnostico_step_v1'
const STORAGE_KEY_LEADS = 'damasceno_diagnostico_leads_v1'

/**
 * Validação rigorosa de Nome e WhatsApp
 */
export function validarLead(nome: string, whatsapp: string, escolha?: string): ValidationResult {
  const errors: { nome?: string; whatsapp?: string; escolha?: string } = {}

  const cleanNome = (nome || '').trim()
  if (!cleanNome) {
    errors.nome = 'Por favor, informe seu nome completo.'
  } else if (cleanNome.length < 3) {
    errors.nome = 'O nome deve ter no mínimo 3 caracteres.'
  } else if (!cleanNome.includes(' ')) {
    errors.nome = 'Por favor, informe ao menos um sobrenome.'
  }

  const rawDigits = (whatsapp || '').replace(/\D/g, '')
  if (!rawDigits) {
    errors.whatsapp = 'Por favor, informe seu número de WhatsApp com DDD.'
  } else if (rawDigits.length < 10 || rawDigits.length > 11) {
    errors.whatsapp = 'Número inválido. Use o padrão (DDD) 9XXXX-XXXX.'
  }

  if (escolha !== undefined && !escolha.trim()) {
    errors.escolha = 'Por favor, selecione como deseja seguir.'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}

/**
 * Aplica máscara de telefone brasileiro (DDD) 9XXXX-XXXX
 */
export function formatWhatsAppMask(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11)
  if (!digits) return ''
  if (digits.length <= 2) return `(${digits}`
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`
}

/**
 * Camada de Persistência do Lead
 * Retorna uma Promise para ser compatível com chamadas remotas de banco de dados
 */
export async function salvarDiagnosticoLead(
  payload: DiagnosticoLeadPayload,
): Promise<DiagnosticoLeadRecord> {
  // Validação idêntica de camada de persistência
  const validation = validarLead(payload.nome, payload.whatsapp, payload.escolha)
  if (!validation.isValid) {
    const errorMessages = Object.values(validation.errors).filter(Boolean).join(' ')
    throw new Error(`Dados do lead inválidos: ${errorMessages}`)
  }

  const record: DiagnosticoLeadRecord = {
    id:
      typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    nome: payload.nome.trim(),
    whatsapp: payload.whatsapp.trim(),
    escolha: payload.escolha.trim(),
    respostas: payload.respostas,
    created_at: new Date().toISOString(),
  }

  // 1. Persistência real em localStorage (fallback oficial sem backend Supabase conectado)
  try {
    const rawList = localStorage.getItem(STORAGE_KEY_LEADS)
    const list: DiagnosticoLeadRecord[] = rawList ? JSON.parse(rawList) : []
    list.push(record)
    localStorage.setItem(STORAGE_KEY_LEADS, JSON.stringify(list))
  } catch (err) {
    console.error('Falha ao persistir lead no localStorage:', err)
    throw new Error('Não foi possível gravar o lead localmente.')
  }

  // 2. Mock de conexão futura com Supabase (pronto para ser ativado quando o cliente for injetado):
  // if (supabaseClient) {
  //   const { data, error } = await supabaseClient.from('diagnostico_leads').insert([{
  //     nome: record.nome,
  //     whatsapp: record.whatsapp,
  //     escolha: record.escolha,
  //     respostas: record.respostas,
  //   }]).select().single()
  //   if (error) throw error
  // }

  return record
}

/**
 * Gerenciamento de Estado do Wizard no Navegador
 */
export function salvarRespostasTemporarias(respostas: DiagnosticoRespostas, step: number): void {
  try {
    localStorage.setItem(STORAGE_KEY_RESPOSTAS, JSON.stringify(respostas))
    localStorage.setItem(STORAGE_KEY_STEP, String(step))
  } catch {
    // Ignora quota de localStorage
  }
}

export function carregarRespostasTemporarias(): {
  respostas: DiagnosticoRespostas | null
  step: number
} {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_RESPOSTAS)
    const rawStep = localStorage.getItem(STORAGE_KEY_STEP)
    const step = rawStep ? parseInt(rawStep, 10) : 0
    if (!raw) return { respostas: null, step: isNaN(step) ? 0 : step }
    return {
      respostas: JSON.parse(raw) as DiagnosticoRespostas,
      step: isNaN(step) ? 0 : step,
    }
  } catch {
    return { respostas: null, step: 0 }
  }
}

export function limparRespostasTemporarias(): void {
  try {
    localStorage.removeItem(STORAGE_KEY_RESPOSTAS)
    localStorage.removeItem(STORAGE_KEY_STEP)
  } catch {
    // Noop
  }
}
