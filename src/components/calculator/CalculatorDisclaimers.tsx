import { AlertCircle, Scale, Building2, Info } from 'lucide-react'

export function CalculatorDisclaimers() {
  return (
    <div className="space-y-3 pt-6 text-xs leading-relaxed text-muted-foreground border-t border-border/60">
      {/* Observação Global Institucional de Escritório */}
      <div className="flex items-start gap-2.5 rounded-lg border-2 border-accent/40 bg-accent/5 p-4 text-foreground shadow-sm">
        <AlertCircle className="h-4 w-4 shrink-0 text-accent mt-0.5" />
        <div>
          <strong className="font-semibold text-foreground">
            Observação Geral e Diretriz Legal:
          </strong>{' '}
          Todos os valores são estimativas e estão de acordo com as regras legais vigentes; os
          custos efetivos podem variar conforme a complexidade do caso, o estado e o município
          envolvidos. As projeções têm caráter informativo para subsidiar o planejamento sucessório
          e não dispensam a análise documental individualizada em consulta jurídica formal.
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
            ITBI na Integralização e STF Tema 1.348 (CF/88, art. 156, § 2º, I):
          </strong>{' '}
          Na holding patrimonial pura, o ITBI é zerado com base no art. 156 da CF/88 (a incorporação
          de bens ao patrimônio de pessoa jurídica em realização de capital não configura fato
          gerador do ITBI). Exceções para empresas com atividade preponderantemente imobiliária
          (compra, venda ou locação de bens) e a tese em debate no STF (Tema 1.348) serão avaliadas
          caso a caso. O simulador permite ajustar a alíquota de ITBI caso a família deseje ponderar
          cenários com exigência municipal.
        </div>
      </div>
    </div>
  )
}
