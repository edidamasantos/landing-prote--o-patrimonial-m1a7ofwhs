import {
  Building2,
  Stethoscope,
  Tractor,
  TrendingUp,
  ShieldCheck,
  Scale,
  FileCheck2,
  Users2,
  Award,
  Globe2,
  Landmark,
  BadgeCheck,
} from 'lucide-react'
import type { ElementType } from 'react'

export interface Segmento {
  id: string
  title: string
  subtitle: string
  icon: ElementType
  tag: string
  problem: string
  solution: string
  highlights: string[]
}

export const segmentosData: Segmento[] = [
  {
    id: 'empresarios',
    title: 'Empresários e PMEs',
    subtitle: 'Sociedades operacionais, holdings de participações e patrimônio imobiliário',
    icon: Building2,
    tag: 'Empresas Familiares & Sócios',
    problem:
      'Vulnerabilidade patrimonial física a passivos trabalhistas, fiscais ou comerciais da operação, conflitos entre herdeiros na continuidade do negócio e fragmentação do controle societário.',
    solution:
      'Blindagem lícita entre pessoa física e pessoa jurídica, separação entre patrimônio imobiliário e risco da operação comercial, regras claras de governança e acordo de acionistas/quotistas.',
    highlights: [
      'Isolamento de risco entre holding pura de bens e empresa operacional',
      'Acordo de sócios prevendo regras de entrada, saída e sucessão de herdeiros',
      'Continuidade imediata da administração sem congelamento judicial de contas',
    ],
  },
  {
    id: 'medicos',
    title: 'Médicos e Profissionais de Saúde',
    subtitle: 'Clínicas, consultórios, participações societárias e patrimônio acumulado',
    icon: Stethoscope,
    tag: 'Profissionais Liberais de Alta Renda',
    problem:
      'Exposição direta a litígios indenizatórios e alegações de erro profissional, alta tributação sobre rendimentos do trabalho (IRPF de até 27,5% ou livro-caixa) e partilha desorganizada de bens.',
    solution:
      'Estruturação societária de proteção de bens contra litígios cíveis, redução substancial da carga tributária na locação e venda de imóveis e transmissão hereditária com reserva de usufruto.',
    highlights: [
      'Segregação jurídica entre o patrimônio familiar e o risco do exercício da medicina',
      'Otimização fiscal na gestão de aluguéis (tributação reduzida de ~11,33% a 14,5%)',
      'Preservação do usufruto vitalício e plenos poderes de gestão pelos pais',
    ],
  },
  {
    id: 'agro',
    title: 'Produtores Rurais e Agronegócio',
    subtitle: 'Fazendas, maquinários, contratos de arrendamento e terras produtivas',
    icon: Tractor,
    tag: 'Famílias do Agro & Sucessão Rural',
    problem:
      'Divisão física ou litígio judicial de terras em inventários demorados, perda de eficiência e escala produtiva, disputa entre herdeiros da terra e herdeiros urbanos, e alta mordida do ITCMD sobre avaliação fiscal.',
    solution:
      'Holding rural familiar com cotas indivisíveis da exploração da terra, preservando a unidade produtiva, organizando a gestão do arrendamento ou plantio e reduzindo custos sucessórios.',
    highlights: [
      'Manutenção da integridade e continuidade da atividade agropecuária',
      'Governança entre herdeiros gestores da terra e herdeiros com rendimento de dividendos',
      'Redução drástica do impacto tributário e de custas em relação ao inventário convencional',
    ],
  },
  {
    id: 'investidores',
    title: 'Investidores e Gestores Patrimoniais',
    subtitle: 'Carteiras imobiliárias, fundos, participações e ativos financeiros',
    icon: TrendingUp,
    tag: 'Patrimônio Imobiliário & Financeiro',
    problem:
      'Bitributação de rendimentos, custo elevado no ganho de capital na pessoa física e burocracia excessiva na administração e partilha de múltiplos imóveis ou participações societárias.',
    solution:
      'Estruturação de holding patrimonial imobiliária para centralização de receitas de aluguel, planejamento de ganho de capital e integração contábil e jurídica harmoniosa.',
    highlights: [
      'Tributação de locação drasticamente menor do que a tabela progressiva do IRPF',
      'Facilidade de transmissão de cotas sem necessidade de averbação individual de cada imóvel',
      'Planejamento societário adaptado às diretrizes da Reforma Tributária',
    ],
  },
]

export interface Beneficio {
  title: string
  description: string
  icon: ElementType
}

export const beneficiosHolding: Beneficio[] = [
  {
    title: 'Proteção Patrimonial Lícita',
    description:
      'Segregação prévia e legal dos bens pessoais e familiares em relação aos riscos do dia a dia empresarial, contratos ou passivos operacionais futuros.',
    icon: ShieldCheck,
  },
  {
    title: 'Sucessão Sem Traumas (Evita Inventário)',
    description:
      'Abertura de sucessão programada em vida, evitando o processo judicial de inventário, bloqueio temporário de bens, honorários e desavenças familiares.',
    icon: Users2,
  },
  {
    title: 'Otimização Fiscal e Tributária',
    description:
      'Aproveitamento das melhores alíquotas legais para receitas de locação e ganhos patrimoniais, reduzindo a incidência do IRPF e antecipando o ITCMD de forma vantajosa.',
    icon: Scale,
  },
  {
    title: 'Governança Familiar e Acordo de Sócios',
    description:
      'Regras claras e formalizadas sobre a administração dos bens, distribuição de lucros, entrada de genros e noras, e poderes decisórios protegidos.',
    icon: FileCheck2,
  },
]

export interface Diferencial {
  title: string
  tagline: string
  description: string
  icon: ElementType
}

export const diferenciaisData: Diferencial[] = [
  {
    title: 'Mais de 30 anos de solidez e vivência sênior',
    tagline: 'Maturidade técnica comprovada',
    description:
      'Histórico de mais de três décadas de atuação jurídica com postura preventiva e estratégica, liderando negociações de alta complexidade e construindo estruturas duradouras.',
    icon: Award,
  },
  {
    title: 'Passagem por Bancos Internacionais e Compliance na Saúde',
    tagline: 'Rigor regulatório de nível corporativo',
    description:
      'Expertise forjada em ambientes financeiros rigorosos e governança de saúde suplementar e hospitalar, garantindo precisão documental e blindagem institucional contra contingências.',
    icon: Landmark,
  },
  {
    title: 'Profunda vivência no Agronegócio',
    tagline: 'Entendimento das particularidades do campo',
    description:
      'Conhecimento prático da dinâmica do produtor rural: sucessão de terras produtivas, contratos agrários, parcerias rurais e proteção da atividade geradora de riqueza da família.',
    icon: Globe2,
  },
  {
    title: 'Rede Interdisciplinar de Especialistas',
    tagline: 'Jurídico, contábil e fiscal integrados',
    description:
      'Trabalho articulado com tributaristas, contadores e avaliadores para que a holding não seja apenas um contrato social padrão, mas uma arquitetura completa de preservação.',
    icon: BadgeCheck,
  },
]

export interface AreaAtuacao {
  title: string
  subtitle: string
  items: string[]
}

export const areasAtuacaoData: AreaAtuacao[] = [
  {
    title: 'Holding Familiar e Patrimonial',
    subtitle: 'Estruturação completa da entidade gestora dos bens da família',
    items: [
      'Constituição de holding pura de bens e holding mista',
      'Integralização de imóveis, cotas e participações sem bitributação',
      'Elaboração de Estatutos Sociais e Contratos com cláusulas restritivas (incomunicabilidade, impenhorabilidade, inalienabilidade e reversão)',
      'Planejamento de doação de cotas com reserva de usufruto vitalício',
    ],
  },
  {
    title: 'Planejamento Sucessório e Societário',
    subtitle: 'Organização da governança entre gerações',
    items: [
      'Acordo de Quotistas/Acionistas e Protocolo Familiar',
      'Regras para blindagem contra regimes de casamento de herdeiros',
      'Mecanismos de resolução de impasses societários e sucessão de administradores',
      'Testamentos, doações planejadas e pactos antenupciais',
    ],
  },
  {
    title: 'Planejamento Tributário Patrimonial',
    subtitle: 'Eficiência fiscal sob o manto da legalidade',
    items: [
      'Análise comparativa de alíquotas IRPF x IRPJ (Lucro Presumido) para locações',
      'Estudo preventivo de ITCMD diante da Reforma Tributária progressiva',
      'Imunidade de ITBI na integralização de capital conforme jurisprudência dos Tribunais Superiores',
      'Redução de carga fiscal no ganho de capital na alienação de imóveis',
    ],
  },
  {
    title: 'Consultoria Contratual e Imobiliária',
    subtitle: 'Segurança preventiva para os ativos do núcleo familiar',
    items: [
      'Auditoria jurídica patrimonial (due diligence prévia de contingências)',
      'Contratos agrários de arrendamento e parceria rural',
      'Regularização de registros imobiliários e cadeia dominial',
      'Defesa preventiva de sócios e administradores',
    ],
  },
]

export interface FaqItem {
  question: string
  answer: string
}

export const faqsData: FaqItem[] = [
  {
    question: 'O que é exatamente uma holding familiar?',
    answer:
      'A holding familiar é uma empresa (geralmente sociedade limitada) criada especificamente para deter, administrar e proteger o patrimônio de uma mesma família (imóveis, terras, aplicações e participações em outras empresas). Em vez de os bens estarem dispersos no CPF das pessoas físicas, eles passam a ser integralizados na pessoa jurídica, facilitando a governança, a economia fiscal e a transmissão pacífica de bens.',
  },
  {
    question: 'Por que a holding é melhor do que deixar para o inventário?',
    answer:
      'O inventário tradicional no Brasil pode consumir entre 10% e 20% do valor total do patrimônio (somando ITCMD, custas judiciais/cartorárias e honorários), além de demorar meses ou anos, deixando contas bancárias bloqueadas e bens congelados. Na holding familiar, a sucessão é antecipada em vida mediante doação das cotas com reserva de usufruto: quando ocorre o falecimento, os herdeiros já são os titulares e a administração transita sem processo de inventário nem paralisia dos negócios.',
  },
  {
    question: 'Como fica o controle dos bens após a criação da holding?',
    answer:
      'Os patriarcas mantêm 100% do controle da holding e dos bens enquanto viverem, por meio da reserva de usufruto vitalício e cláusulas que garantem o direito de voto, administração exclusiva, recebimento integral dos dividendos e faculdade de vender ou dispor dos bens a seu critério exclusivo.',
  },
  {
    question: 'Qual o patrimônio mínimo necessário para justificar uma holding familiar?',
    answer:
      'Não há um valor mínimo formal em lei. Na prática, a holding familiar torna-se altamente vantajosa quando a família possui dois ou mais imóveis geradores de renda ou quando o patrimônio imobiliário/operacional ultrapassa R$ 1,5 milhão a R$ 2 milhões, momento em que o custo do inventário e a mordida do IRPF sobre locações tornam a holding economicamente imperativa.',
  },
  {
    question: 'A holding protege contra qualquer tipo de dívida?',
    answer:
      'A holding proporciona uma blindagem lícita e estrutural para o patrimônio da família quando implementada de forma preventiva, com planejamento prévio e antes do surgimento de qualquer passivo ou execução. Não tem o propósito e nem deve ser usada para fraudes contra credores. O segredo é fazê-la enquanto o cenário financeiro e operacional está saudável.',
  },
]
