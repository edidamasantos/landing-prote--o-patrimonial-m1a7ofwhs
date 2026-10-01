/**
 * Constantes globais do escritório Damasceno Santos Advocacia
 */
export const OFFICE_CONTACT = {
  name: 'Damasceno Santos Advocacia',
  phoneDisplay: '(11) 95769-7373',
  phoneRaw: '11957697373',
  whatsappCountry: '55',
  whatsappFullNumber: '5511957697373',
  email: 'contato@damascenosantos.adv.br',
  sedeUf: 'SP',
  sedeCidade: 'São Paulo',
} as const

/**
 * Monta URL direta do WhatsApp com mensagem pré-formatada
 */
export function buildWhatsAppUrl(message?: string): string {
  const defaultMsg =
    'Vim pela calculadora de custos e quero agendar a reunião diagnóstica sobre holding familiar.'
  const text = encodeURIComponent(message || defaultMsg)
  return `https://wa.me/${OFFICE_CONTACT.whatsappFullNumber}?text=${text}`
}
