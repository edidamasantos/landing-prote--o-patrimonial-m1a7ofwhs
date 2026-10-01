import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Calculator, Sparkles, X, ChevronRight } from 'lucide-react'
import { PatrimonialCalculator } from './PatrimonialCalculator'

interface FloatingCalculatorTriggerProps {
  onContactClick?: () => void
}

export function FloatingCalculatorTrigger({ onContactClick }: FloatingCalculatorTriggerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  // O botão flutuante surge suavemente após scroll de 150px para não poluir o hero inicial
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 150)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Permite abrir o modal caso a hash da URL seja #calculadora-modal
  useEffect(() => {
    if (window.location.hash === '#calculadora-modal') {
      setIsOpen(true)
    }
  }, [])

  return (
    <>
      {/* CARD / BOTÃO FLUTUANTE DISCRETO COM CTA */}
      <div
        className={`fixed bottom-5 right-5 z-40 transition-all duration-300 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0 pointer-events-none'
        }`}
      >
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-3 rounded-full border border-accent/40 bg-card/95 pl-3.5 pr-4 py-2.5 shadow-2xl backdrop-blur-md transition-all duration-200 hover:scale-105 hover:border-accent hover:shadow-accent/20 focus:outline-none focus:ring-2 focus:ring-accent"
          aria-label="Abrir Calculadora Comparativa de Custos: Inventário × Holding"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-sm">
            <Calculator className="h-4 w-4" />
          </div>

          <div className="flex flex-col text-left">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-accent">
              Simule Agora
            </span>
            <span className="font-serif text-xs sm:text-sm font-bold text-foreground">
              Inventário × Holding
            </span>
          </div>

          <div className="hidden sm:flex items-center text-accent pl-1">
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </button>
      </div>

      {/* MODAL / DIALOG RESPONSIVO COM A CALCULADORA COMPLETA */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent
          className="max-h-[92vh] w-[95vw] max-w-5xl overflow-y-auto p-4 sm:p-8 bg-background border-border"
          aria-describedby="dialog-desc-calculadora"
        >
          <DialogHeader className="text-left pb-3 border-b border-border/60">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-accent">
              <Sparkles className="h-3.5 w-3.5" />
              Calculadora Comparativa v2
            </div>
            <DialogTitle className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
              Inventário Convencional × Holding Familiar
            </DialogTitle>
            <DialogDescription
              id="dialog-desc-calculadora"
              className="text-xs sm:text-sm text-muted-foreground"
            >
              Simule os custos exatos nas 27 UFs com honorários advocatícios da OAB, ITCMD
              progressivo e veredito de liquidez patrimonial.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <PatrimonialCalculator
              onContactClick={() => {
                setIsOpen(false)
                if (onContactClick) {
                  onContactClick()
                } else {
                  const target = document.getElementById('contato')
                  if (target) target.scrollIntoView({ behavior: 'smooth' })
                }
              }}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
