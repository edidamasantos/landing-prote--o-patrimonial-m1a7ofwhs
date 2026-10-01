/**
 * Árvore de regras e nós de decisão do assistente virtual de dúvidas
 * Damasceno Santos Advocacia — Holding Familiar & Proteção Patrimonial
 *
 * Totalmente determinístico (sem IA, sem API externa).
 * Textos alinhados com o inventário, usufruto vitalício, reforma tributária e honorários.
 */

export interface QuickReplyOption {
  id: string
  label: string
  targetNodeId: string
  badge?: string
}

export interface ChatNode {
  id: string
  messages: string[]
  options?: QuickReplyOption[]
  // Se definido, exibe CTA contextual de WhatsApp ou rolagem ao formulário
  ctaType?: 'whatsapp' | 'contact_form' | 'both'
  ctaWhatsAppMessage?: string
  canRestart?: boolean
}

export const CHAT_INITIAL_NODE_ID = 'inicio'

export const CHAT_NODES: Record<string, ChatNode> = {
  inicio: {
    id: 'inicio',
    messages: [
      'Olá! Seja muito bem-vindo(a) ao atendimento do Damasceno Santos Advocacia.',
      'Sou o assistente digital do escritório. Especializamo-nos em proteção patrimonial preventiva, estruturação de holding familiar e sucessão segura sem os custos e conflitos do inventário.',
      'Como posso orientar você hoje? Escolha um tema abaixo:',
    ],
    options: [
      {
        id: 'opt_o_que_e',
        label: 'O que é uma Holding Familiar?',
        targetNodeId: 'o_que_e',
      },
      {
        id: 'opt_custos',
        label: 'Quanto custa o planejamento?',
        targetNodeId: 'quanto_custa',
      },
      {
        id: 'opt_prazos',
        label: 'Quais os prazos de execução?',
        targetNodeId: 'quais_prazos',
      },
      {
        id: 'opt_meu_caso',
        label: 'A holding serve para o meu caso?',
        targetNodeId: 'serve_meu_caso',
      },
      {
        id: 'opt_reuniao',
        label: 'Como funciona a primeira reunião?',
        targetNodeId: 'como_funciona_reuniao',
      },
    ],
  },

  // 1) O que é uma Holding Familiar?
  o_que_e: {
    id: 'o_que_e',
    messages: [
      'A holding familiar é uma empresa (sociedade empresária ou simples) constituída exclusivamente para abrigar, organizar e blindar os bens da família: imóveis, terras produtivas, participações societárias e aplicações financeiras.',
      'Em vez de os bens ficarem dispersos na pessoa física, eles são integralizados na pessoa jurídica. Os pais realizam a doação das cotas aos herdeiros mantendo 100% da administração e dos frutos por meio do usufruto vitalício.',
      'Principais vantagens:\n• Não passa por inventário judicial ou extrajudicial quando os patriarcas falecem.\n• Redução legal de impostos sobre aluguéis (de até 27,5% no IRPF para ~11,33% no Lucro Presumido).\n• Proteção contra passivos futuros e regras claras para blindar contra uniões/divórcios de genros e noras.',
    ],
    options: [
      {
        id: 'opt_o_que_e_usufruto',
        label: 'Como funciona o usufruto vitalício?',
        targetNodeId: 'usufruto_vitalicio',
      },
      {
        id: 'opt_o_que_e_reforma',
        label: 'Como a Reforma Tributária afeta?',
        targetNodeId: 'reforma_tributaria',
      },
      {
        id: 'opt_o_que_e_custos',
        label: 'Qual a economia em relação ao inventário?',
        targetNodeId: 'quanto_custa',
      },
    ],
    ctaType: 'both',
    ctaWhatsAppMessage:
      'Olá! Vim pelo chat do site e gostaria de saber mais sobre como funciona a holding familiar para a minha família.',
    canRestart: true,
  },

  // Sub-ramo: Usufruto vitalício
  usufruto_vitalicio: {
    id: 'usufruto_vitalicio',
    messages: [
      'Com o usufruto vitalício, os patriarcas continuam mandando em tudo: mantêm plenos poderes de voto, administração irrevogável e direito de receber 100% dos aluguéis e dividendos gerados pelos bens.',
      'Além disso, inserimos no contrato cláusulas de incomunicabilidade (os bens não se misturam com genros/noras), impenhorabilidade e cláusula de reversão (se um herdeiro falecer antes, o bem retorna aos pais).',
      'Ou seja: a herança fica resolvida em vida, mas ninguém mexe no patrimônio sem o consentimento dos pais.',
    ],
    options: [
      {
        id: 'opt_usuf_prazos',
        label: 'Entendi! Quais os prazos para montar?',
        targetNodeId: 'quais_prazos',
      },
      {
        id: 'opt_usuf_meu_caso',
        label: 'Quero ver se serve para o meu perfil',
        targetNodeId: 'serve_meu_caso',
      },
    ],
    ctaType: 'both',
    ctaWhatsAppMessage:
      'Olá! Li no chat sobre usufruto vitalício e cláusulas de proteção e quero agendar a reunião diagnóstica com o escritório.',
    canRestart: true,
  },

  // Sub-ramo: Reforma tributária
  reforma_tributaria: {
    id: 'reforma_tributaria',
    messages: [
      'A Emenda Constitucional da Reforma Tributária tornou obrigatória a progressividade do ITCMD (imposto de herança) em todos os Estados brasileiros, com alíquotas que podem chegar a 16% (projeto de resolução no Senado).',
      'Hoje, Estados como São Paulo ainda praticam alíquota fixa de 4%, mas o projeto de lei paulista já prevê escalonamento de até 8%.',
      'Quem estrutura a holding antes da vigência plena das novas alíquotas congela as regras atuais, garantindo uma economia que pode superar centenas de milhares de reais.',
    ],
    options: [
      {
        id: 'opt_ref_custos',
        label: 'Quanto custa planejar agora?',
        targetNodeId: 'quanto_custa',
      },
      {
        id: 'opt_ref_reuniao',
        label: 'Como agendar a reunião inicial?',
        targetNodeId: 'como_funciona_reuniao',
      },
    ],
    ctaType: 'both',
    ctaWhatsAppMessage:
      'Olá! Gostaria de antecipar a estruturação da holding antes do aumento do ITCMD da Reforma Tributária.',
    canRestart: true,
  },

  // 2) Quanto custa o planejamento?
  quanto_custa: {
    id: 'quanto_custa',
    messages: [
      'Para entender o custo da holding, é essencial olhar para o que ela evita: o inventário tradicional consome de 10% a 20% do valor total do patrimônio da família (somando ITCMD de 4% a 8%, honorários da OAB de 6% a 10%, custas de cartório/tribunal e registros).',
      'No planejamento preventivo com holding, os custos são planejados, amortizados e podem gerar até 60% de economia fiscal total.',
      'Os honorários do escritório são orçados de maneira transparente após a Reunião Diagnóstica, onde avaliamos a complexidade do patrimônio (número de imóveis, existência de empresas operacionais ou dívidas ativas).',
    ],
    options: [
      {
        id: 'opt_custos_simulador',
        label: 'Quero simular na calculadora de 27 UFs',
        targetNodeId: 'ir_calculadora',
      },
      {
        id: 'opt_custos_reuniao',
        label: 'Como funciona a reunião de orçamento?',
        targetNodeId: 'como_funciona_reuniao',
      },
      {
        id: 'opt_custos_prazos',
        label: 'Quanto tempo leva o processo?',
        targetNodeId: 'quais_prazos',
      },
    ],
    ctaType: 'both',
    ctaWhatsAppMessage:
      'Olá! Gostaria de entender os custos estimados para estruturar a holding da minha família.',
    canRestart: true,
  },

  // Ramo auxiliar: Direcionar para a calculadora
  ir_calculadora: {
    id: 'ir_calculadora',
    messages: [
      'Perfeito! Nossa landing page conta com uma Calculadora Comparativa de Custos completa.',
      'Ela calcula automaticamente o ITCMD progressivo do seu Estado (todas as 27 UFs), honorários da OAB e risco de liquidez familiar.',
      'Você pode rolar até a seção da calculadora no site ou falar diretamente com nosso advogado no WhatsApp.',
    ],
    options: [
      {
        id: 'opt_calc_reuniao',
        label: 'Prefiro agendar a reunião de diagnóstico',
        targetNodeId: 'como_funciona_reuniao',
      },
      {
        id: 'opt_calc_perfil',
        label: 'Ver se a holding serve para meu perfil',
        targetNodeId: 'serve_meu_caso',
      },
    ],
    ctaType: 'both',
    ctaWhatsAppMessage:
      'Olá! Gostaria de avaliar os números e custos da holding com o time do Damasceno Santos Advocacia.',
    canRestart: true,
  },

  // 3) Quais os prazos de execução?
  quais_prazos: {
    id: 'quais_prazos',
    messages: [
      'A estruturação completa de uma holding familiar pelo Damasceno Santos Advocacia segue 3 fases bem definidas:',
      '1️⃣ Fase de Diagnóstico e Auditoria (2 a 3 semanas): Levantamento de matrículas imobiliárias, certidões fiscais e definição da arquitetura societária ideal.',
      '2️⃣ Fase de Constituição e Integralização (3 a 5 semanas): Registro na Junta Comercial, obtenção do CNPJ e pedido de não-incidência/imunidade de ITBI perante o município.',
      '3️⃣ Fase de Governança e Doação (2 a 4 semanas): Escritura de doação das cotas com usufruto vitalício, averbações em cartório e formalização do Acordo de Sócios.',
      'Prazo médio total: de 60 a 90 dias úteis (muito mais rápido do que um inventário que pode arrastar-se por 2 a 10 anos!).',
    ],
    options: [
      {
        id: 'opt_prazos_meu_caso',
        label: 'A holding serve para meu perfil?',
        targetNodeId: 'serve_meu_caso',
      },
      {
        id: 'opt_prazos_reuniao',
        label: 'Quero dar o primeiro passo (Reunião)',
        targetNodeId: 'como_funciona_reuniao',
      },
    ],
    ctaType: 'both',
    ctaWhatsAppMessage:
      'Olá! Vi os prazos de 60 a 90 dias da holding no chat e quero agendar a reunião diagnóstica.',
    canRestart: true,
  },

  // 4) A holding serve para o meu caso? (Menu por segmento)
  serve_meu_caso: {
    id: 'serve_meu_caso',
    messages: [
      'A holding familiar atende principalmente famílias com patrimônio imobiliário a partir de R$ 1,5 milhão a R$ 2 milhões, ou que possuam empresas ativas e risco de litígio.',
      'Para que eu possa responder com exatidão, qual é o perfil principal do seu patrimônio?',
    ],
    options: [
      {
        id: 'opt_seg_empresario',
        label: '🏢 Empresário / Dono de PME',
        targetNodeId: 'caso_empresario',
        badge: 'Negócios',
      },
      {
        id: 'opt_seg_medico',
        label: '🩺 Médico / Profissional de Saúde',
        targetNodeId: 'caso_medico',
        badge: 'Saúde',
      },
      {
        id: 'opt_seg_agro',
        label: '🚜 Produtor Rural / Agronegócio',
        targetNodeId: 'caso_agro',
        badge: 'Campo',
      },
      {
        id: 'opt_seg_investidor',
        label: '📈 Investidor Imobiliário / Financeiro',
        targetNodeId: 'caso_investidor',
        badge: 'Ativos',
      },
    ],
    canRestart: true,
  },

  // Sub-ramo: Empresário / PME
  caso_empresario: {
    id: 'caso_empresario',
    messages: [
      'Para empresários e donos de PME, o maior perigo é a mistura do patrimônio da família com os riscos da empresa operacional (trabalhistas, tributários e cíveis).',
      'Nossa estratégia para você:\n• Criar uma holding pura para abrigar imóveis e ativos, blindando-os dos passivos operacionais da empresa.\n• Elaborar Acordo de Quotistas prevendo regras de continuidade do negócio sem brigas de herdeiros ou paralisação de contas bancárias.',
    ],
    options: [
      {
        id: 'opt_emp_custos',
        label: 'Quais os custos e prazos?',
        targetNodeId: 'quanto_custa',
      },
      {
        id: 'opt_emp_reuniao',
        label: 'Agendar reunião para o meu negócio',
        targetNodeId: 'como_funciona_reuniao',
      },
      {
        id: 'opt_emp_outro_perfil',
        label: 'Consultar outro segmento',
        targetNodeId: 'serve_meu_caso',
      },
    ],
    ctaType: 'both',
    ctaWhatsAppMessage:
      'Olá! Sou empresário/sócio de PME, vim pelo chat do site e quero agendar a reunião diagnóstica para proteger os bens da minha família.',
    canRestart: true,
  },

  // Sub-ramo: Médico / Profissional de Saúde
  caso_medico: {
    id: 'caso_medico',
    messages: [
      'Médicos e profissionais de saúde enfrentam dois grandes gargalos:\n1. Exposição pessoal a ações indenizatórias por erro médico ou responsabilidade civil.\n2. Alta carga tributária: aluguéis de consultórios e imóveis tributados em até 27,5% no IRPF.',
      'Com a holding patrimonial:\n• Seus imóveis e investimentos ficam segregados do seu CPF profissional.\n• A tributação sobre aluguéis cai para ~11,33% a 14,5% no Lucro Presumido.\n• Você garante a transmissão tranquila do patrimônio aos filhos com usufruto vitalício.',
    ],
    options: [
      {
        id: 'opt_med_tributos',
        label: 'Como funciona a economia de aluguéis?',
        targetNodeId: 'o_que_e',
      },
      {
        id: 'opt_med_reuniao',
        label: 'Agendar diagnóstico médico/saúde',
        targetNodeId: 'como_funciona_reuniao',
      },
      {
        id: 'opt_med_outro_perfil',
        label: 'Consultar outro segmento',
        targetNodeId: 'serve_meu_caso',
      },
    ],
    ctaType: 'both',
    ctaWhatsAppMessage:
      'Olá! Sou profissional da área da saúde, vim pelo chat do site e quero entender como a holding protege meu patrimônio e reduz impostos.',
    canRestart: true,
  },

  // Sub-ramo: Agro / Produtor Rural
  caso_agro: {
    id: 'caso_agro',
    messages: [
      'No agronegócio, o inventário tradicional costuma ser fatal: divide a terra em glebas menores inviáveis, gera litígios entre herdeiros da cidade e herdeiros do campo e paralisa o crédito rural junto a bancos e cooperativas.',
      'Com a holding rural familiar estruturada pelo nosso escritório:\n• A terra e a operação mantêm-se indivisíveis, garantindo a escala produtiva.\n• Diferenciamos as cotas de gestão das cotas de dividendos.\n• Economia expressiva no ITCMD e proteção de contratos de arrendamento/parceria.',
    ],
    options: [
      {
        id: 'opt_agro_reuniao',
        label: 'Agendar diagnóstico para patrimônio rural',
        targetNodeId: 'como_funciona_reuniao',
      },
      {
        id: 'opt_agro_prazos',
        label: 'Quais os prazos da holding rural?',
        targetNodeId: 'quais_prazos',
      },
      {
        id: 'opt_agro_outro_perfil',
        label: 'Consultar outro segmento',
        targetNodeId: 'serve_meu_caso',
      },
    ],
    ctaType: 'both',
    ctaWhatsAppMessage:
      'Olá! Sou produtor rural/família do agro, vim pelo chat e quero conversar sobre sucessão da fazenda e holding familiar.',
    canRestart: true,
  },

  // Sub-ramo: Investidores
  caso_investidor: {
    id: 'caso_investidor',
    messages: [
      'Para investidores imobiliários e detentores de patrimônio financeiro expressivo, a holding é uma ferramenta de escala e eficiência tributária.',
      'Principais vantagens:\n• Centralização das receitas de aluguel com recolhimento fiscal otimizado (Lucro Presumido).\n• Redução legal do ganho de capital na alienação de imóveis.\n• Transmissão de cotas societárias aos sucessores sem custo de averbação cartorária imóvel por imóvel.',
    ],
    options: [
      {
        id: 'opt_inv_reuniao',
        label: 'Agendar reunião com advogado sênior',
        targetNodeId: 'como_funciona_reuniao',
      },
      {
        id: 'opt_inv_calculadora',
        label: 'Fazer uma simulação dos custos',
        targetNodeId: 'ir_calculadora',
      },
      {
        id: 'opt_inv_outro_perfil',
        label: 'Consultar outro segmento',
        targetNodeId: 'serve_meu_caso',
      },
    ],
    ctaType: 'both',
    ctaWhatsAppMessage:
      'Olá! Tenho patrimônio imobiliário/investimentos e gostaria de agendar a reunião diagnóstica de holding.',
    canRestart: true,
  },

  // 5) Como funciona a primeira reunião?
  como_funciona_reuniao: {
    id: 'como_funciona_reuniao',
    messages: [
      'A Reunião Diagnóstica Inicial é uma consulta estruturada, confidencial e sem compromisso de contratação.',
      'Como ela transcorre:\n1. Conversamos com o titular ou casal para mapear os bens (imóveis, empresas, dívidas e herdeiros).\n2. Identificamos as principais vulnerabilidades jurídicas e fiscais da família.\n3. Apresentamos a viabilidade real da holding, o comparativo contra o inventário e o plano de ação sugerido.',
      'Pode ser realizada por videoconferência segura (Google Meet) para todo o Brasil ou presencialmente em nosso escritório em São Paulo.',
    ],
    options: [
      {
        id: 'opt_reuniao_o_que_e',
        label: 'Relembrar o que é a holding',
        targetNodeId: 'o_que_e',
      },
      {
        id: 'opt_reuniao_custos',
        label: 'Quanto custa em média?',
        targetNodeId: 'quanto_custa',
      },
    ],
    ctaType: 'both',
    ctaWhatsAppMessage:
      'Olá! Vim pelo chat do site e quero agendar a reunião diagnóstica sobre holding familiar.',
    canRestart: true,
  },
}
