import { AlertCircle, Scale, Building2, Info } from 'lucide-react'

export function CalculatorDisclaimers() {
  return (
    <div className="space-y-3 pt-6 text-xs leading-relaxed text-muted-foreground border-t border-border/60">
      <div className="flex items-start gap-2.5 rounded-lg border border-border/80 bg-muted/40 p-3.5">
        <Info className="h-4 w-4 shrink-0 text-accent mt-0.5" />
        <div>
          <strong className="font-semibold text-foreground">
            Caráter Informativo e Não Vinculante:
          </strong>{' '}
          A presente calculadora constitui ferramenta puramente educacional e preliminar para fins
          de projeção comparativa. Os valores finais dependem de exame documental dos títulos
          imobiliários, passivos societários, certidões negativas e arranjo societário individual.
          Não substitui consulta jurídica formal nem parecer de advogado habilitado na OAB.
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
            STF Tema 1.348 (Imunidade do ITBI na Integralização de Capital):
          </strong>{' '}
          O Supremo Tribunal Federal discute o alcance da imunidade constitucional do ITBI (art.
          156, § 2º, I da CF) para empresas com atividade preponderantemente imobiliária (compra,
          venda ou locação de bens). A taxa de ITBI inserida nesta simulação parte do pressuposto
          conservador de exigência municipal (2% a 3%) ou de imunidade total a depender do modelo
          societário desenhado.
        </div>
      </div>
    </div>
  )
}
