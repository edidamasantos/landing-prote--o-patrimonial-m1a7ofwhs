/**
 * Configuração centralizada de SEO do projeto Damasceno Santos Advocacia.
 * Facilita a migração para domínio próprio futuro sem espalhar URLs no código.
 */
import { OFFICE_CONTACT } from './contact'

export const SITE_URL = 'https://damascenosantosadv.com.br'

export interface SeoConfig {
  title: string
  description: string
  canonicalUrl: string
  noindex?: boolean
  ogType?: 'website' | 'article'
  ogImage?: string
  ogImageAlt?: string
  keywords?: string[]
}

export const SEO_HOME: SeoConfig = {
  title: 'Holding Familiar e Proteção Patrimonial em SP | Damasceno Santos Advocacia',
  description:
    'Especialistas em holding familiar, proteção patrimonial e planejamento sucessório no Estado de São Paulo. Evite inventário custoso, reduza impostos legalmente e proteja seu legado.',
  canonicalUrl: `${SITE_URL}/`,
  ogType: 'website',
  ogImage: `${SITE_URL}/og-image.png`,
  ogImageAlt: 'Damasceno Santos Advocacia - Holding Familiar e Proteção Patrimonial',
  keywords: [
    'Holding Familiar',
    'Proteção Patrimonial',
    'Planejamento Sucessório',
    'Inventário vs Holding',
    'Blindagem Patrimonial Lícita',
    'Redução ITCMD',
    'Advogado Holding São Paulo',
    'Damasceno Santos Advocacia',
    'Doação com Reserva de Usufruto',
    'Governança Familiar',
  ],
}

export const SEO_OBRIGADO: SeoConfig = {
  title: 'Contato Confirmado | Damasceno Santos Advocacia',
  description:
    'Agradecemos pelo seu contato. Em breve nossa equipe jurídica retornará para agendar sua reunião diagnóstica de holding familiar.',
  canonicalUrl: `${SITE_URL}/obrigado`,
  noindex: true,
  ogType: 'website',
  ogImage: `${SITE_URL}/og-image.png`,
  ogImageAlt: 'Damasceno Santos Advocacia',
}

/**
 * Estrutura Schema.org JSON-LD (LegalService / Attorney)
 * Segue as especificações de schema.org para escritórios de advocacia.
 */
export const LEGAL_SERVICE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'LegalService',
  '@id': `${SITE_URL}/#legal-service`,
  name: OFFICE_CONTACT.name,
  legalName: OFFICE_CONTACT.name,
  url: SITE_URL,
  logo: `${SITE_URL}/src/assets/fundo-transparente-editedimage1788967093128-bae21.png`,
  image: `${SITE_URL}/og-image.png`,
  description:
    'Escritório de advocacia especializado em holding familiar, proteção patrimonial, planejamento sucessório e tributário patrimonial no Estado de São Paulo.',
  telephone: `+${OFFICE_CONTACT.whatsappFullNumber}`,
  email: OFFICE_CONTACT.email,
  inLanguage: 'pt-BR',
  priceRange: '$$$$',
  address: {
    '@type': 'PostalAddress',
    addressLocality: OFFICE_CONTACT.sedeCidade,
    addressRegion: OFFICE_CONTACT.sedeUf,
    addressCountry: 'BR',
  },
  areaServed: {
    '@type': 'AdministrativeArea',
    name: 'Estado de São Paulo',
    alternateName: 'SP',
  },
  knowsAbout: [
    'Holding Familiar',
    'Proteção Patrimonial',
    'Planejamento Sucessório',
    'Direito Tributário Patrimonial',
    'Inventário e Partilha',
    'Governança Corporativa e Familiar',
    'Doação com Reserva de Usufruto',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Serviços Jurídicos Patrimoniais',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Constituição de Holding Familiar',
          description:
            'Estruturação completa de pessoa jurídica cofre para gestão, proteção e sucessão patrimonial.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Planejamento Sucessório em Vida',
          description:
            'Transferência antecipada com reserva de usufruto, afastando os custos e litígios de inventário.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Proteção Patrimonial Lícita',
          description:
            'Segregação de riscos entre operação empresarial e patrimônio pessoal da família.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Otimização Tributária de Imóveis e ITCMD',
          description:
            'Estruturação com alíquotas reduzidas na locação e fixação de ITCMD antes da reforma tributária.',
        },
      },
    ],
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: `+${OFFICE_CONTACT.whatsappFullNumber}`,
    contactType: 'customer support',
    availableLanguage: ['Portuguese'],
    areaServed: 'BR',
  },
}
