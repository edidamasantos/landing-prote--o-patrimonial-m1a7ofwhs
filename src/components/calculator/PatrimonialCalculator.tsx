import { useState, useEffect, useRef } from 'react'
import {
  SimulationParams,
  SimulationResult,
  calculateSimulation,
  DEFAULT_SIMULATION_PARAMS,
} from '@/data/calculatorEngine'
import {
  getSavedLead,
  getSavedParams,
  saveParams,
  decodeSimulationParams,
  CalculatorLeadData,
} from '@/data/calculatorStorage'
import { CalculatorForm } from './CalculatorForm'
import { CalculatorLeadGate } from './CalculatorLeadGate'
import { CalculatorResultsView } from './CalculatorResultsView'

interface PatrimonialCalculatorProps {
  onContactClick?: () => void
  initialOpenResults?: boolean
}

export function PatrimonialCalculator({
  onContactClick,
  initialOpenResults = false,
}: PatrimonialCalculatorProps) {
  // Inicialização com query params ou saved params
  const [params, setParams] = useState<SimulationParams>(() => {
    if (typeof window !== 'undefined') {
      const decoded = decodeSimulationParams(window.location.search)
      const saved = getSavedParams()
      return { ...saved, ...decoded }
    }
    return DEFAULT_SIMULATION_PARAMS
  })

  const [lead, setLead] = useState<CalculatorLeadData | null>(() => {
    if (typeof window !== 'undefined') {
      return getSavedLead()
    }
    return null
  })

  // Se o usuário já informou o lead antes, permitimos ver o resultado diretamente
  const [hasCalculated, setHasCalculated] = useState<boolean>(() => {
    if (initialOpenResults) return true
    if (typeof window !== 'undefined') {
      // Se a URL trouxe parâmetros de simulação (?mm=...), pode já iniciar calculado
      const params = new URLSearchParams(window.location.search)
      if (params.has('mm')) return true
    }
    return false
  })

  const [showForm, setShowForm] = useState<boolean>(!hasCalculated)

  const containerRef = useRef<HTMLDivElement>(null)

  const handleCalculate = () => {
    saveParams(params)
    setHasCalculated(true)
    setShowForm(false)
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const handleLeadSuccess = (savedLead: CalculatorLeadData) => {
    setLead(savedLead)
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const handleRecalculate = () => {
    setShowForm(true)
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const result: SimulationResult = calculateSimulation(params)

  return (
    <div ref={containerRef} className="w-full space-y-6">
      {/* Exibição do Formulário de Entrada */}
      {showForm && (
        <CalculatorForm
          params={params}
          onChange={(newParams) => {
            setParams(newParams)
            saveParams(newParams)
          }}
          onCalculate={handleCalculate}
        />
      )}

      {/* Se clicou em calcular mas ainda não preencheu o Gate de Lead */}
      {hasCalculated && !showForm && !lead && (
        <div className="space-y-4">
          <CalculatorLeadGate params={params} onSuccess={handleLeadSuccess} />
          <div className="text-center">
            <button
              type="button"
              onClick={handleRecalculate}
              className="text-xs text-muted-foreground hover:text-accent underline underline-offset-4"
            >
              ← Voltar e ajustar valores patrimoniais
            </button>
          </div>
        </div>
      )}

      {/* Se calculou e o lead está liberado (ou já cadastrado) */}
      {hasCalculated && !showForm && lead && (
        <CalculatorResultsView
          result={result}
          onRecalculate={handleRecalculate}
          onContactClick={onContactClick}
        />
      )}
    </div>
  )
}
