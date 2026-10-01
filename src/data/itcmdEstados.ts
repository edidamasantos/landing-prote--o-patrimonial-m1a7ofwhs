export interface UfItcmdData {
  uf: string
  nome: string
  regiao: 'Norte' | 'Nordeste' | 'Centro-Oeste' | 'Sudeste' | 'Sul'
  regime: 'fixo' | 'progressivo'
  herancaMin: number // Alíquota mínima percentual para herança (ex: 2 para 2%)
  herancaMax: number // Alíquota máxima percentual para herança (ex: 8 para 8%)
  doacaoMin: number // Alíquota mínima percentual para doação
  doacaoMax: number // Alíquota máxima percentual para doação
  descricao: string
  baseLegal: string
  faixas?: {
    ate?: number // limite superior em R$ (undefined se acima)
    aliquotaHeranca: number
    aliquotaDoacao?: number
  }[]
}

/**
 * Tabela das 27 Unidades da Federação com as regras do ITCMD atualizadas (cenário 2024-2026 / EC 132 e LC 227/2026).
 * São Paulo (sede do escritório) e demais estados.
 * AVISO: Alíquotas sujeitas a alterações legislativas estaduais e regulamentação complementar da Reforma Tributária.
 */
export const ITCMD_ESTADOS: Record<string, UfItcmdData> = {
  SP: {
    uf: 'SP',
    nome: 'São Paulo (Sede)',
    regiao: 'Sudeste',
    regime: 'progressivo',
    herancaMin: 2,
    herancaMax: 8,
    doacaoMin: 2,
    doacaoMax: 4,
    descricao:
      'SP em transição com a Reforma Tributária (EC 132/2023 e LC 227/2026): alíquota histórica linear de 4% com projetos e adequação progressiva entre 2% e 8% para causa mortis e 2% a 4% para doações.',
    baseLegal: 'Lei Estadual 10.705/2000 em adequação à EC 132/2023 e LC 227/2026',
    faixas: [
      { ate: 500000, aliquotaHeranca: 2, aliquotaDoacao: 2 },
      { ate: 2000000, aliquotaHeranca: 4, aliquotaDoacao: 3 },
      { ate: 5000000, aliquotaHeranca: 6, aliquotaDoacao: 4 },
      { aliquotaHeranca: 8, aliquotaDoacao: 4 },
    ],
  },
  RJ: {
    uf: 'RJ',
    nome: 'Rio de Janeiro',
    regiao: 'Sudeste',
    regime: 'progressivo',
    herancaMin: 4,
    herancaMax: 8,
    doacaoMin: 4,
    doacaoMax: 8,
    descricao: 'Tabela progressiva de 4% a 8% por faixas de UFIR-RJ.',
    baseLegal: 'Lei Estadual 7.174/2015 e Lei 7.786/2017',
    faixas: [
      { ate: 350000, aliquotaHeranca: 4, aliquotaDoacao: 4 },
      { ate: 1200000, aliquotaHeranca: 5, aliquotaDoacao: 5 },
      { ate: 2500000, aliquotaHeranca: 6, aliquotaDoacao: 6 },
      { ate: 5000000, aliquotaHeranca: 7, aliquotaDoacao: 7 },
      { aliquotaHeranca: 8, aliquotaDoacao: 8 },
    ],
  },
  MG: {
    uf: 'MG',
    nome: 'Minas Gerais',
    regiao: 'Sudeste',
    regime: 'fixo',
    herancaMin: 5,
    herancaMax: 5,
    doacaoMin: 5,
    doacaoMax: 5,
    descricao: 'Alíquota única de 5% (com adequação progressiva em tramitação).',
    baseLegal: 'Lei Estadual 14.941/2003',
  },
  ES: {
    uf: 'ES',
    nome: 'Espírito Santo',
    regiao: 'Sudeste',
    regime: 'fixo',
    herancaMin: 4,
    herancaMax: 4,
    doacaoMin: 4,
    doacaoMax: 4,
    descricao: 'Alíquota linear de 4% para herança e doação.',
    baseLegal: 'Lei Estadual 10.011/2013',
  },
  PR: {
    uf: 'PR',
    nome: 'Paraná',
    regiao: 'Sul',
    regime: 'fixo',
    herancaMin: 4,
    herancaMax: 4,
    doacaoMin: 4,
    doacaoMax: 4,
    descricao: 'Alíquota única de 4% (transição para progressividade em debate).',
    baseLegal: 'Lei Estadual 18.573/2015',
  },
  SC: {
    uf: 'SC',
    nome: 'Santa Catarina',
    regiao: 'Sul',
    regime: 'progressivo',
    herancaMin: 1,
    herancaMax: 7,
    doacaoMin: 1,
    doacaoMax: 7,
    descricao: 'Progressivo de 1% a 7% calculado por parcela de patrimônio.',
    baseLegal: 'Lei Estadual 13.136/2004 e Lei 19.053/2024',
    faixas: [
      { ate: 20000, aliquotaHeranca: 1, aliquotaDoacao: 1 },
      { ate: 50000, aliquotaHeranca: 3, aliquotaDoacao: 3 },
      { ate: 150000, aliquotaHeranca: 5, aliquotaDoacao: 5 },
      { aliquotaHeranca: 7, aliquotaDoacao: 7 },
    ],
  },
  RS: {
    uf: 'RS',
    nome: 'Rio Grande do Sul',
    regiao: 'Sul',
    regime: 'progressivo',
    herancaMin: 3,
    herancaMax: 6,
    doacaoMin: 3,
    doacaoMax: 4,
    descricao: 'Herança progressiva de 3% a 6%; doação de 3% a 4%.',
    baseLegal: 'Lei Estadual 8.821/1989 e Lei 16.244/2024',
    faixas: [
      { ate: 300000, aliquotaHeranca: 3, aliquotaDoacao: 3 },
      { ate: 1000000, aliquotaHeranca: 4, aliquotaDoacao: 4 },
      { ate: 3000000, aliquotaHeranca: 5, aliquotaDoacao: 4 },
      { aliquotaHeranca: 6, aliquotaDoacao: 4 },
    ],
  },
  BA: {
    uf: 'BA',
    nome: 'Bahia',
    regiao: 'Nordeste',
    regime: 'progressivo',
    herancaMin: 4,
    herancaMax: 8,
    doacaoMin: 3,
    doacaoMax: 4,
    descricao: 'Herança de 4% a 8%; doação de 3% a 4% (Lei 14.802/2024).',
    baseLegal: 'Lei Estadual 14.802/2024 que alterou a Lei 4.826/1989',
    faixas: [
      { ate: 200000, aliquotaHeranca: 4, aliquotaDoacao: 3 },
      { ate: 300000, aliquotaHeranca: 6, aliquotaDoacao: 3.5 },
      { aliquotaHeranca: 8, aliquotaDoacao: 4 },
    ],
  },
  PE: {
    uf: 'PE',
    nome: 'Pernambuco',
    regiao: 'Nordeste',
    regime: 'progressivo',
    herancaMin: 2,
    herancaMax: 8,
    doacaoMin: 2,
    doacaoMax: 8,
    descricao: 'Progressivo de 2% a 8% com parcelas a deduzir (LC 563/2025).',
    baseLegal: 'Lei Complementar Estadual 563/2025',
    faixas: [
      { ate: 350000, aliquotaHeranca: 2, aliquotaDoacao: 2 },
      { ate: 550000, aliquotaHeranca: 4, aliquotaDoacao: 4 },
      { ate: 750000, aliquotaHeranca: 6, aliquotaDoacao: 6 },
      { aliquotaHeranca: 8, aliquotaDoacao: 8 },
    ],
  },
  CE: {
    uf: 'CE',
    nome: 'Ceará',
    regiao: 'Nordeste',
    regime: 'progressivo',
    herancaMin: 2,
    herancaMax: 8,
    doacaoMin: 2,
    doacaoMax: 4,
    descricao: 'Herança progressiva de 2% a 8%; doação progressiva até 4%.',
    baseLegal: 'Lei Estadual 15.812/2015',
    faixas: [
      { ate: 250000, aliquotaHeranca: 2, aliquotaDoacao: 2 },
      { ate: 600000, aliquotaHeranca: 4, aliquotaDoacao: 3 },
      { ate: 1200000, aliquotaHeranca: 6, aliquotaDoacao: 4 },
      { aliquotaHeranca: 8, aliquotaDoacao: 4 },
    ],
  },
  PB: {
    uf: 'PB',
    nome: 'Paraíba',
    regiao: 'Nordeste',
    regime: 'progressivo',
    herancaMin: 2,
    herancaMax: 8,
    doacaoMin: 2,
    doacaoMax: 8,
    descricao: 'Tabela progressiva de 2% a 8% por decomposição em faixas.',
    baseLegal: 'Lei Estadual 5.123/1989 e Lei 13.347/2024',
    faixas: [
      { ate: 125000, aliquotaHeranca: 2, aliquotaDoacao: 2 },
      { ate: 400000, aliquotaHeranca: 4, aliquotaDoacao: 4 },
      { ate: 1000000, aliquotaHeranca: 6, aliquotaDoacao: 6 },
      { aliquotaHeranca: 8, aliquotaDoacao: 8 },
    ],
  },
  RN: {
    uf: 'RN',
    nome: 'Rio Grande do Norte',
    regiao: 'Nordeste',
    regime: 'progressivo',
    herancaMin: 3,
    herancaMax: 6,
    doacaoMin: 3,
    doacaoMax: 6,
    descricao: 'Tabela progressiva de 3% a 6% por faixas de valor (Lei 12.025/2024).',
    baseLegal: 'Lei Estadual 5.887/1989 com alteração da Lei 12.025/2024',
    faixas: [
      { ate: 500000, aliquotaHeranca: 3, aliquotaDoacao: 3 },
      { ate: 1000000, aliquotaHeranca: 4, aliquotaDoacao: 4 },
      { ate: 3000000, aliquotaHeranca: 5, aliquotaDoacao: 5 },
      { aliquotaHeranca: 6, aliquotaDoacao: 6 },
    ],
  },
  AL: {
    uf: 'AL',
    nome: 'Alagoas',
    regiao: 'Nordeste',
    regime: 'progressivo',
    herancaMin: 4,
    herancaMax: 8,
    doacaoMin: 1,
    doacaoMax: 2,
    descricao: 'Herança progressiva de 4% a 8%; doação escalonada até 2%.',
    baseLegal: 'Lei Estadual 5.077/1989 e Lei 9.440/2024',
    faixas: [
      { ate: 1000000, aliquotaHeranca: 4, aliquotaDoacao: 1 },
      { ate: 10000000, aliquotaHeranca: 6, aliquotaDoacao: 1.5 },
      { aliquotaHeranca: 8, aliquotaDoacao: 2 },
    ],
  },
  SE: {
    uf: 'SE',
    nome: 'Sergipe',
    regiao: 'Nordeste',
    regime: 'progressivo',
    herancaMin: 4,
    herancaMax: 8,
    doacaoMin: 2,
    doacaoMax: 4,
    descricao: 'Herança progressiva de 4% a 8%; doação progressiva de 2% a 4%.',
    baseLegal: 'Lei Estadual 7.724/2013',
    faixas: [
      { ate: 500000, aliquotaHeranca: 4, aliquotaDoacao: 2 },
      { ate: 1500000, aliquotaHeranca: 6, aliquotaDoacao: 3 },
      { aliquotaHeranca: 8, aliquotaDoacao: 4 },
    ],
  },
  MA: {
    uf: 'MA',
    nome: 'Maranhão',
    regiao: 'Nordeste',
    regime: 'progressivo',
    herancaMin: 3,
    herancaMax: 7,
    doacaoMin: 2,
    doacaoMax: 4,
    descricao: 'Herança progressiva de 3% a 7%; doações de 2% a 4%.',
    baseLegal: 'Lei Estadual 7.799/2002',
    faixas: [
      { ate: 300000, aliquotaHeranca: 3, aliquotaDoacao: 2 },
      { ate: 1000000, aliquotaHeranca: 5, aliquotaDoacao: 3 },
      { aliquotaHeranca: 7, aliquotaDoacao: 4 },
    ],
  },
  PI: {
    uf: 'PI',
    nome: 'Piauí',
    regiao: 'Nordeste',
    regime: 'progressivo',
    herancaMin: 2,
    herancaMax: 6,
    doacaoMin: 2,
    doacaoMax: 4,
    descricao: 'Herança de 2% a 6%; doação de 2% a 4% (Lei 8.558/2024 e LC 327/2025).',
    baseLegal: 'Lei Estadual 4.261/1989 e Lei 8.558/2024',
    faixas: [
      { ate: 250000, aliquotaHeranca: 2, aliquotaDoacao: 2 },
      { ate: 1500000, aliquotaHeranca: 4, aliquotaDoacao: 4 },
      { aliquotaHeranca: 6, aliquotaDoacao: 4 },
    ],
  },
  DF: {
    uf: 'DF',
    nome: 'Distrito Federal',
    regiao: 'Centro-Oeste',
    regime: 'progressivo',
    herancaMin: 4,
    herancaMax: 6,
    doacaoMin: 4,
    doacaoMax: 6,
    descricao: 'Tabela progressiva de 4% a 6% por faixas de valor.',
    baseLegal: 'Lei Distrital 3.804/2006 e Ato SUREC 25/2025',
    faixas: [
      { ate: 1650000, aliquotaHeranca: 4, aliquotaDoacao: 4 },
      { ate: 3300000, aliquotaHeranca: 5, aliquotaDoacao: 5 },
      { aliquotaHeranca: 6, aliquotaDoacao: 6 },
    ],
  },
  GO: {
    uf: 'GO',
    nome: 'Goiás',
    regiao: 'Centro-Oeste',
    regime: 'progressivo',
    herancaMin: 2,
    herancaMax: 8,
    doacaoMin: 2,
    doacaoMax: 8,
    descricao: 'Progressivo de 2% a 8% tanto para herança quanto doação.',
    baseLegal: 'Lei Estadual 11.651/1991 e Lei 19.021/2015',
    faixas: [
      { ate: 25000, aliquotaHeranca: 2, aliquotaDoacao: 2 },
      { ate: 200000, aliquotaHeranca: 4, aliquotaDoacao: 4 },
      { ate: 600000, aliquotaHeranca: 6, aliquotaDoacao: 6 },
      { aliquotaHeranca: 8, aliquotaDoacao: 8 },
    ],
  },
  MT: {
    uf: 'MT',
    nome: 'Mato Grosso',
    regiao: 'Centro-Oeste',
    regime: 'progressivo',
    herancaMin: 2,
    herancaMax: 8,
    doacaoMin: 2,
    doacaoMax: 8,
    descricao: 'Progressivo de 2% a 8% por faixas de UPF-MT.',
    baseLegal: 'Lei Estadual 7.850/2002',
    faixas: [
      { ate: 300000, aliquotaHeranca: 2, aliquotaDoacao: 2 },
      { ate: 1200000, aliquotaHeranca: 4, aliquotaDoacao: 4 },
      { ate: 3000000, aliquotaHeranca: 6, aliquotaDoacao: 6 },
      { aliquotaHeranca: 8, aliquotaDoacao: 8 },
    ],
  },
  MS: {
    uf: 'MS',
    nome: 'Mato Grosso do Sul',
    regiao: 'Centro-Oeste',
    regime: 'fixo',
    herancaMin: 6,
    herancaMax: 6,
    doacaoMin: 3,
    doacaoMax: 3,
    descricao: 'Alíquotas fixas diferenciadas: herança 6% e doação 3%.',
    baseLegal: 'Lei Estadual 1.810/1997 e Lei 6.074/2023',
  },
  AM: {
    uf: 'AM',
    nome: 'Amazonas',
    regiao: 'Norte',
    regime: 'progressivo',
    herancaMin: 2,
    herancaMax: 4,
    doacaoMin: 2,
    doacaoMax: 4,
    descricao: 'Progressivo de 2% a 4% (LC Estadual 269/2024).',
    baseLegal: 'LC Estadual 269/2024 (altera LC 19/1997)',
    faixas: [
      { ate: 2000000, aliquotaHeranca: 2, aliquotaDoacao: 2 },
      { ate: 6000000, aliquotaHeranca: 3, aliquotaDoacao: 3 },
      { aliquotaHeranca: 4, aliquotaDoacao: 4 },
    ],
  },
  PA: {
    uf: 'PA',
    nome: 'Pará',
    regiao: 'Norte',
    regime: 'fixo',
    herancaMin: 4,
    herancaMax: 4,
    doacaoMin: 4,
    doacaoMax: 4,
    descricao: 'Alíquota linear de 4% para herança e doação.',
    baseLegal: 'Lei Estadual 5.529/1989',
  },
  RO: {
    uf: 'RO',
    nome: 'Rondônia',
    regiao: 'Norte',
    regime: 'progressivo',
    herancaMin: 2,
    herancaMax: 4,
    doacaoMin: 2,
    doacaoMax: 4,
    descricao: 'Progressivo de 2% a 4% por faixas de UPF-RO.',
    baseLegal: 'Lei Estadual 959/2000',
    faixas: [
      { ate: 160000, aliquotaHeranca: 2, aliquotaDoacao: 2 },
      { ate: 770000, aliquotaHeranca: 3, aliquotaDoacao: 3 },
      { aliquotaHeranca: 4, aliquotaDoacao: 4 },
    ],
  },
  RR: {
    uf: 'RR',
    nome: 'Roraima',
    regiao: 'Norte',
    regime: 'fixo',
    herancaMin: 4,
    herancaMax: 4,
    doacaoMin: 4,
    doacaoMax: 4,
    descricao: 'Alíquota linear de 4% para herança e doação.',
    baseLegal: 'Lei Estadual 59/1993 (CTE-RR)',
  },
  TO: {
    uf: 'TO',
    nome: 'Tocantins',
    regiao: 'Norte',
    regime: 'progressivo',
    herancaMin: 2,
    herancaMax: 8,
    doacaoMin: 2,
    doacaoMax: 8,
    descricao: 'Progressivo de 2% a 8% por faixas.',
    baseLegal: 'Lei Estadual 1.287/2001 e Decreto 5.425/2016',
    faixas: [
      { ate: 100000, aliquotaHeranca: 2, aliquotaDoacao: 2 },
      { ate: 500000, aliquotaHeranca: 4, aliquotaDoacao: 4 },
      { ate: 2000000, aliquotaHeranca: 6, aliquotaDoacao: 6 },
      { aliquotaHeranca: 8, aliquotaDoacao: 8 },
    ],
  },
  AC: {
    uf: 'AC',
    nome: 'Acre',
    regiao: 'Norte',
    regime: 'progressivo',
    herancaMin: 4,
    herancaMax: 7,
    doacaoMin: 2,
    doacaoMax: 8,
    descricao: 'Herança progressiva de 4% a 7%; doações de 2% a 8%.',
    baseLegal: 'LC Estadual 373/2020',
    faixas: [
      { ate: 250000, aliquotaHeranca: 4, aliquotaDoacao: 2 },
      { ate: 1000000, aliquotaHeranca: 5, aliquotaDoacao: 4 },
      { ate: 3000000, aliquotaHeranca: 6, aliquotaDoacao: 6 },
      { aliquotaHeranca: 7, aliquotaDoacao: 8 },
    ],
  },
  AP: {
    uf: 'AP',
    nome: 'Amapá',
    regiao: 'Norte',
    regime: 'progressivo',
    herancaMin: 2,
    herancaMax: 6,
    doacaoMin: 2,
    doacaoMax: 4,
    descricao: 'Herança de 2% a 6%; doação de 2% a 4% (Lei 3.149/2024).',
    baseLegal: 'Lei Estadual 3.149/2024',
    faixas: [
      { ate: 200000, aliquotaHeranca: 2, aliquotaDoacao: 2 },
      { ate: 800000, aliquotaHeranca: 3, aliquotaDoacao: 3 },
      { ate: 2000000, aliquotaHeranca: 4, aliquotaDoacao: 4 },
      { ate: 4000000, aliquotaHeranca: 5, aliquotaDoacao: 4 },
      { aliquotaHeranca: 6, aliquotaDoacao: 4 },
    ],
  },
}

/**
 * Calcula a alíquota efetiva do ITCMD estimada para um dado patrimônio (monte-mor)
 * para a herança (inventário) e para a doação em vida (holding).
 */
export function calcularAliquotasUf(
  ufKey: string,
  monteMor: number,
): { aliquotaHeranca: number; aliquotaDoacao: number } {
  const dados = ITCMD_ESTADOS[ufKey] || ITCMD_ESTADOS['SP']

  if (dados.regime === 'fixo' || !dados.faixas || dados.faixas.length === 0) {
    return {
      aliquotaHeranca: dados.herancaMax,
      aliquotaDoacao: dados.doacaoMax,
    }
  }

  // Tabela com faixas progressivas
  let aliquotaH = dados.herancaMin
  let aliquotaD = dados.doacaoMin

  for (const f of dados.faixas) {
    if (f.ate === undefined || monteMor <= f.ate) {
      aliquotaH = f.aliquotaHeranca
      aliquotaD = f.aliquotaDoacao ?? dados.doacaoMax
      break
    }
  }

  return {
    aliquotaHeranca: aliquotaH,
    aliquotaDoacao: aliquotaD,
  }
}
