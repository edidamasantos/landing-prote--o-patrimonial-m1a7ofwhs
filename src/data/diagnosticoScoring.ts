/**
 * Motor de Pontuação e Configurações Estáticas da Matriz de Decisão Patrimonial
 * Escritório Damasceno Santos Advocacia
 */

export type NecessidadeKey =
  | 'liquidez'
  | 'sucessao'
  | 'governanca'
  | 'preservacao'
  | 'eficienciaTributaria'

export interface NecessidadeMeta {
  key: NecessidadeKey
  label: string
  descricao: string
}

export const NECESSIDADES: Record<NecessidadeKey, NecessidadeMeta> = {
  liquidez: {
    key: 'liquidez',
    label: 'Liquidez Imediata',
    descricao:
      'Capacidade financeira rápida para despesas e tributos sem queimar ativos com deságio.',
  },
  sucessao: {
    key: 'sucessao',
    label: 'Sucessão Pacífica',
    descricao:
      'Transmissão harmoniosa e planejada de quotas e imóveis sem paralisação em inventário.',
  },
  governanca: {
    key: 'governanca',
    label: 'Governança e Controle',
    descricao:
      'Regras societárias claras, liderança delimitada e proteção contra desentendimentos.',
  },
  preservacao: {
    key: 'preservacao',
    label: 'Preservação Patrimonial',
    descricao: 'Proteção dos ativos contra contingências operacionais e riscos de terceiros.',
  },
  eficienciaTributaria: {
    key: 'eficienciaTributaria',
    label: 'Eficiência Tributária',
    descricao: 'Otimização legal da carga fiscal sobre doação, locação e ganho de capital.',
  },
}

export type NivelNecessidade = 'atencao' | 'cautela' | 'adequado'

export interface NecessidadeStatus {
  key: NecessidadeKey
  label: string
  descricao: string
  pontos: number // 0 a 100
  nivel: NivelNecessidade
  cor: 'vermelho' | 'ambar' | 'verde'
  statusTexto: string
}

export interface InstrumentoPatrimonial {
  id: string
  nome: string
  categoria: string
  perfil: Record<NecessidadeKey, number> // 0 a 5
  oQueResolve: string
  oQueNaoResolve: string
}

export const INSTRUMENTOS_PATRIMONIAIS: InstrumentoPatrimonial[] = [
  {
    id: 'holding-familiar',
    nome: 'Holding Familiar',
    categoria: 'Estruturação Societária',
    perfil: {
      liquidez: 2,
      sucessao: 5,
      governanca: 5,
      preservacao: 5,
      eficienciaTributaria: 5,
    },
    oQueResolve:
      'Centraliza bens em pessoa jurídica, evita inventário moroso, blinda patrimônio contra riscos operacionais e reduz carga de ITCMD e locação.',
    oQueNaoResolve:
      'Não substitui liquidez imediata em dinheiro para emergências e não elimina a necessidade de cumprir formalidades contábeis anuais.',
  },
  {
    id: 'seguro-de-vida',
    nome: 'Seguro de Vida Resgatável / Sucessório',
    categoria: 'Proteção e Liquidez',
    perfil: {
      liquidez: 5,
      sucessao: 4,
      governanca: 1,
      preservacao: 4,
      eficienciaTributaria: 4,
    },
    oQueResolve:
      'Injeta capital líquido e isento de ITCMD e imposto de renda nas contas dos beneficiários em poucos dias, custeando impostos e sustentando a família.',
    oQueNaoResolve:
      'Não estabelece regras societárias nem define o destino ou a administração de imóveis e empresas da família.',
  },
  {
    id: 'vgbl',
    nome: 'Previdência Privada VGBL',
    categoria: 'Investimento e Transmissão',
    perfil: {
      liquidez: 4,
      sucessao: 4,
      governanca: 1,
      preservacao: 3,
      eficienciaTributaria: 3,
    },
    oQueResolve:
      'Permite indicação direta de beneficiários sem inventário tradicional, garantindo liberação rápida de recursos financeiros.',
    oQueNaoResolve:
      'Sofre crescente questionamento tributário sobre incidência de ITCMD em diversos estados e não protege patrimônio físico ou societário.',
  },
  {
    id: 'reserva-financeira',
    nome: 'Reserva Financeira Estratégica',
    categoria: 'Caixa e Contingência',
    perfil: {
      liquidez: 5,
      sucessao: 2,
      governanca: 2,
      preservacao: 3,
      eficienciaTributaria: 2,
    },
    oQueResolve:
      'Mantém caixa disponível para honrar compromissos emergenciais e despesas de manutenção da família sem endividamento.',
    oQueNaoResolve:
      'Pode sofrer bloqueio judicial temporário no inventário se mantida em contas individuais da pessoa física falecida.',
  },
  {
    id: 'carteira-liquida',
    nome: 'Carteira Líquida de Investimentos',
    categoria: 'Mercado Financeiro',
    perfil: {
      liquidez: 5,
      sucessao: 2,
      governanca: 2,
      preservacao: 3,
      eficienciaTributaria: 3,
    },
    oQueResolve:
      'Proporciona rentabilidade real acima da inflação e diversificação em ativos financeiros de resgate rápido.',
    oQueNaoResolve:
      'Se titulada em pessoa física, passa integralmente por inventário e fica inacessível aos herdeiros até alvará judicial.',
  },
  {
    id: 'testamento',
    nome: 'Testamento Público',
    categoria: 'Direito Sucessório',
    perfil: {
      liquidez: 1,
      sucessao: 4,
      governanca: 3,
      preservacao: 2,
      eficienciaTributaria: 1,
    },
    oQueResolve:
      'Expressa a vontade do titular sobre a parte disponível (até 50%), define legados específicos e pode nomear tutor para filhos menores.',
    oQueNaoResolve:
      'Torna o inventário judicialmente obrigatório na maioria das comarcas, não gera economia de impostos e não provê liquidez.',
  },
  {
    id: 'doacao-usufruto',
    nome: 'Doação de Bens com Reserva de Usufruto',
    categoria: 'Planejamento em Vida',
    perfil: {
      liquidez: 1,
      sucessao: 5,
      governanca: 3,
      preservacao: 4,
      eficienciaTributaria: 3,
    },
    oQueResolve:
      'Transfere a nua-propriedade aos herdeiros mantendo renda e administração total com os doadores por toda a vida.',
    oQueNaoResolve:
      'Pode ter custo imediato de ITCMD e cartório elevado e não cria uma estrutura dinâmica de gestão societária para novos negócios.',
  },
  {
    id: 'acordo-socios',
    nome: 'Acordo de Sócios / Acionista',
    categoria: 'Governança Corporativa',
    perfil: {
      liquidez: 2,
      sucessao: 4,
      governanca: 5,
      preservacao: 4,
      eficienciaTributaria: 2,
    },
    oQueResolve:
      'Regula regras de entrada e saída de herdeiros na empresa, direito de preferência, avaliação de quotas e quóruns de deliberação.',
    oQueNaoResolve:
      'Não cuida de patrimônio imobiliário desvinculado da empresa e não soluciona a sucessão de bens pessoais da família.',
  },
]

export interface InstrumentoResultado {
  instrumento: InstrumentoPatrimonial
  score: number // 0 a 100
}

export interface DiagnosticoRespostas {
  q1: string // Pergunta 1: Família
  q2: string // Pergunta 2: Patrimônio
  q3: string // Pergunta 3: Concentração
  q4: string // Pergunta 4: Liquidez 30 dias
  q5: string[] // Pergunta 5: Situações (múltipla)
  q6: string[] // Pergunta 6: Prioridades (múltipla max 2)
  q7: string // Pergunta 7: Próximo passo
}

export const DIAGNOSTICO_DEFAULT_RESPOSTAS: DiagnosticoRespostas = {
  q1: '',
  q2: '',
  q3: '',
  q4: '',
  q5: [],
  q6: [],
  q7: '',
}

export interface DiagnosticoCalculado {
  necessidades: Record<NecessidadeKey, NecessidadeStatus>
  topInstrumentos: InstrumentoResultado[]
  todasAderencias: InstrumentoResultado[]
  pesosNecessidades: Record<NecessidadeKey, number>
}

/**
 * Calcula os pesos e a aderência de cada instrumento a partir das respostas do usuário
 */
export function calcularDiagnostico(respostas: DiagnosticoRespostas): DiagnosticoCalculado {
  // 1. Pesos base de cada necessidade (escala de 1 a 10)
  const pesos: Record<NecessidadeKey, number> = {
    liquidez: 3,
    sucessao: 3,
    governanca: 3,
    preservacao: 3,
    eficienciaTributaria: 3,
  }

  // Pergunta 1: Família
  if (
    respostas.q1 === 'Casado(a) ou em união estável, com filhos' ||
    respostas.q1 === 'Separado(a) ou divorciado(a), com filhos' ||
    respostas.q1 === 'Solteiro(a) ou viúvo(a), com filhos'
  ) {
    pesos.sucessao += 3
    pesos.governanca += 2
  } else if (respostas.q1 === 'Separado(a) ou divorciado(a), sem filhos') {
    pesos.preservacao += 2
    pesos.sucessao += 1
  }

  // Pergunta 2: Onde está o patrimônio
  if (respostas.q2 === 'Imóveis') {
    pesos.eficienciaTributaria += 3
    pesos.preservacao += 2
  } else if (respostas.q2 === 'Participações em empresas') {
    pesos.governanca += 4
    pesos.preservacao += 3
  } else if (respostas.q2 === 'Investimentos financeiros') {
    pesos.liquidez += 2
    pesos.eficienciaTributaria += 2
  } else if (respostas.q2 === 'Propriedade rural') {
    pesos.governanca += 3
    pesos.preservacao += 3
    pesos.sucessao += 2
  } else if (respostas.q2 === 'Distribuído entre esses tipos') {
    pesos.governanca += 3
    pesos.eficienciaTributaria += 2
  }

  // Pergunta 3: Concentração de ativos
  if (respostas.q3 === 'Praticamente tudo, mais de 80 por cento') {
    pesos.preservacao += 4
    pesos.liquidez += 3
  } else if (respostas.q3 === 'A maior parte, entre 50 e 80 por cento') {
    pesos.preservacao += 2
    pesos.liquidez += 2
  }

  // Pergunta 4: Liquidez em 30 dias (define fortemente a necessidade de Liquidez)
  if (respostas.q4 === 'Até R$ 50 mil') {
    pesos.liquidez += 7
    pesos.preservacao += 2
  } else if (respostas.q4 === 'Entre R$ 50 mil e R$ 200 mil') {
    pesos.liquidez += 5
    pesos.preservacao += 1
  } else if (respostas.q4 === 'Entre R$ 200 mil e R$ 700 mil') {
    pesos.liquidez += 3
  } else if (respostas.q4 === 'Entre R$ 700 mil e R$ 1,5 milhão') {
    pesos.liquidez += 1
  } else if (respostas.q4 === 'Mais de R$ 1,5 milhão') {
    pesos.liquidez += 0
  } else if (respostas.q4 === 'Não sei informar') {
    pesos.liquidez += 4
  }

  // Pergunta 5: Situações existentes (múltipla escolha)
  const q5 = respostas.q5 || []
  if (q5.includes('Filhos de diferentes relacionamentos')) {
    pesos.sucessao += 5
    pesos.governanca += 4
  }
  if (q5.includes('Possível conflito entre herdeiros')) {
    pesos.sucessao += 6
    pesos.governanca += 5
  }
  if (q5.includes('Herdeiros menores ou com necessidades especiais')) {
    pesos.sucessao += 4
    pesos.preservacao += 4
    pesos.liquidez += 3
  }
  if (q5.includes('Empresa com sócios não familiares')) {
    pesos.governanca += 6
    pesos.preservacao += 3
  }

  // Pergunta 6: Prioridades máximas (até 2 opções elevam drasticamente o peso)
  const q6 = respostas.q6 || []
  if (q6.includes('Manter os imóveis na família por gerações')) {
    pesos.preservacao += 7
    pesos.sucessao += 4
  }
  if (q6.includes('Garantir dinheiro imediato para a família')) {
    pesos.liquidez += 8
  }
  if (q6.includes('Evitar conflitos entre herdeiros')) {
    pesos.sucessao += 8
    pesos.governanca += 5
  }
  if (q6.includes('Proteger o patrimônio dos riscos do negócio')) {
    pesos.preservacao += 8
    pesos.governanca += 4
  }
  if (q6.includes('Reduzir custos e impostos na transferência')) {
    pesos.eficienciaTributaria += 8
    pesos.sucessao += 3
  }

  // 2. Mapeamento de intensidade da necessidade para o mapa visual (0 a 100)
  // Quanto maior o peso acumulado, maior o nível de criticidade
  const maxPesoObservavel = 24
  const minPesoObservavel = 3

  const necessidadesResult: Record<NecessidadeKey, NecessidadeStatus> = {} as Record<
    NecessidadeKey,
    NecessidadeStatus
  >

  const keys: NecessidadeKey[] = [
    'liquidez',
    'sucessao',
    'governanca',
    'preservacao',
    'eficienciaTributaria',
  ]

  for (const k of keys) {
    const p = pesos[k]
    // Normalizar de 0 a 100
    const ratio = Math.max(
      0,
      Math.min(1, (p - minPesoObservavel) / (maxPesoObservavel - minPesoObservavel)),
    )
    const pontos = Math.round(ratio * 100)

    let nivel: NivelNecessidade = 'adequado'
    let cor: 'vermelho' | 'ambar' | 'verde' = 'verde'
    let statusTexto = 'Quadro estável'

    if (pontos >= 60) {
      nivel = 'atencao'
      cor = 'vermelho'
      statusTexto = 'Atenção prioritária'
    } else if (pontos >= 35) {
      nivel = 'cautela'
      cor = 'ambar'
      statusTexto = 'Exige cautela'
    } else {
      nivel = 'adequado'
      cor = 'verde'
      statusTexto = 'Adequado'
    }

    necessidadesResult[k] = {
      key: k,
      label: NECESSIDADES[k].label,
      descricao: NECESSIDADES[k].descricao,
      pontos,
      nivel,
      cor,
      statusTexto,
    }
  }

  // 3. Cálculo de Aderência por Instrumento:
  // Soma(nota do instrumento * peso da necessidade) / Soma(5 * peso da necessidade) * 100
  const somaPesosMaxPossivel = keys.reduce((acc, k) => acc + 5 * pesos[k], 0)

  const aderencias: InstrumentoResultado[] = INSTRUMENTOS_PATRIMONIAIS.map((inst) => {
    const somaPonderada = keys.reduce((acc, k) => {
      const notaInstrumento = inst.perfil[k] || 0
      return acc + notaInstrumento * pesos[k]
    }, 0)

    const score = Math.min(100, Math.round((somaPonderada / somaPesosMaxPossivel) * 100))

    return {
      instrumento: inst,
      score,
    }
  })

  // Ordena por score decrescente
  aderencias.sort((a, b) => b.score - a.score)

  const topInstrumentos = aderencias.slice(0, 3)

  return {
    necessidades: necessidadesResult,
    topInstrumentos,
    todasAderencias: aderencias,
    pesosNecessidades: pesos,
  }
}
