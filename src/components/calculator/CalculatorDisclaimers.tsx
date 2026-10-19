import { AlertCircle, Scale, Building2, Info } from 'lucide-react'

export function CalculatorDisclaimers() {
  return (
    <div className="space-y-3 pt-6 text-xs leading-relaxed text-muted-foreground border-t border-border/60">
      {/* Observação Global Institucional de Custos (Estimativas Educativas) */}
      <div className="flex items-start gap-2.5 rounded-lg border-2 border-accent/40 bg-accent/5 p-4 text-foreground shadow-sm">
        <AlertCircle className="h-4 w-4 shrink-0 text-accent mt-0.5" />
        <div>
          <strong className="font-semibold text-foreground">
            Observação Global de Custos e Natureza Educativa:
          </strong>{' '}
          Todos os valores calculados nesta simulação representam estimativas educativas e
          preliminares, desenvolvidas com base nas normas gerais, tabelas regimentais da OAB e
          alíquotas de referência vigentes. Custos reais de cartórios, tributos municipais e
          honorários podem variar conforme a complexidade societária, a localidade dos imóveis e o
          desfecho documental. A presente ferramenta não vincula honorários contratuais nem
          constitui parecer definitivo, sendo indispensável a análise individualizada do caso
          concreto com os advogados do escritório.
        </div>
      </div>

      <div className="flex items-start gap-2.5 rounded-lg border border-border/80 bg-muted/40 p-3.5">
        <Info className="h-4 w-4 shrink-0 text-accent mt-0.5" />
        <div>
          <strong className="font-semibold text-foreground">
            Caráter Informativo e Não Vinculante:
          </strong>{' '}
          A presente calculadora constitui ferramenta educacional e preliminar para fins de projeção
          comparativa. Os valores finais dependem de exame documental dos títulos imobiliários,
          passivos societários, certidões negativas e arranjo societário individual. Não substitui
          consulta jurídica formal nem parecer de advogado habilitado na OAB.
        </div>
      </div>

      <div className="flex items-start gap-2.5 rounded-lg border border-border/80 bg-muted/40 p-3.5">
        <Scale className="h-4 w-4 shrink-0 text-accent mt-0.5" />
        <div>
          <strong className="font-semibold text-foreground">
            Alíquotas do ITCMD e Reforma Tributária (EC 132/2023 e LC 227/2026):
          </strong>{' '}
          As alíquotas das 27 UFs refletem o levantamento legislativo vigente e em transição de
          progressividade obrigatória. O Estado de São Paulo e outras unidades federativas possuem
          projetos de lei e decretos em debate com base na LC 227/2026. A confirmação da alíquota
          exata aplicável à sua comarca e data de transmissão deve ser confirmada em reunião técnica
          com o escritório.
        </div>
      </div>

      <div className="flex items-start gap-2.5 rounded-lg border border-border/80 bg-muted/40 p-3.5">
        <Building2 className="h-4 w-4 shrink-0 text-accent mt-0.5" />
        <div>
          <strong className="font-semibold text-foreground">
            ITBI Zerado na Constituição da Holding (CF/88, art. 156, § 2º, I):
          </strong>{' '}
          Na composição de custos da constituição da holding familiar, o ITBI é considerado ZERADO
          com fundamento expresso na imunidade constitucional conferida pela transferência de bens
          para integralização do capital social de pessoa jurídica (CF/88, art. 156, § 2º, I).
          Particularidades fáticas relativas à preponderância de atividade imobiliária ou exigências
          administrativas municipais são examinadas pontualmente em consulta jurídica especializada.
        </div>
      </div>
    </div>
  )
}
