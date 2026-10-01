import { useState, useEffect, useRef } from 'react'
import {
  MessageSquare,
  X,
  RotateCcw,
  Calendar,
  Send,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { buildWhatsAppUrl, OFFICE_CONTACT } from '@/config/contact'
import { CHAT_NODES, CHAT_INITIAL_NODE_ID, type QuickReplyOption } from '@/data/chatBotData'

export interface ChatMessage {
  id: string
  sender: 'bot' | 'user'
  text: string
  timestamp: string
}

interface ChatBotWidgetProps {
  onScheduleClick?: () => void
}

const STORAGE_KEY_NODE = 'damasceno_chat_node_id'
const STORAGE_KEY_HISTORY = 'damasceno_chat_history'

function getInitialTime(): string {
  const d = new Date()
  return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`
}

function buildMessagesForNode(nodeId: string): ChatMessage[] {
  const node = CHAT_NODES[nodeId] || CHAT_NODES[CHAT_INITIAL_NODE_ID]
  const time = getInitialTime()
  return node.messages.map((m, idx) => ({
    id: `bot-${nodeId}-${idx}-${Date.now()}`,
    sender: 'bot',
    text: m,
    timestamp: time,
  }))
}

export function ChatBotWidget({ onScheduleClick }: ChatBotWidgetProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentNodeId, setCurrentNodeId] = useState<string>(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY_NODE)
      return saved && CHAT_NODES[saved] ? saved : CHAT_INITIAL_NODE_ID
    } catch {
      return CHAT_INITIAL_NODE_ID
    }
  })

  const [history, setHistory] = useState<ChatMessage[]>(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY_HISTORY)
      if (saved) {
        const parsed = JSON.parse(saved) as ChatMessage[]
        if (Array.isArray(parsed) && parsed.length > 0) return parsed
      }
    } catch {
      // ignore
    }
    return buildMessagesForNode(CHAT_INITIAL_NODE_ID)
  })

  const [isTyping, setIsTyping] = useState(false)
  const [unreadCount, setUnreadCount] = useState<number>(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  // Salvar estado em sessionStorage
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY_NODE, currentNodeId)
      sessionStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(history))
    } catch {
      // ignore
    }
  }, [currentNodeId, history])

  // Scroll automático para a última mensagem
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [history, isTyping, isOpen])

  // Notificação inicial sutil após 4s caso não esteja aberto
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) {
        setUnreadCount(1)
      }
    }, 4000)
    return () => clearTimeout(timer)
  }, [isOpen])

  // Abertura do widget
  const handleOpen = () => {
    setIsOpen(true)
    setUnreadCount(0)
  }

  // Fechamento
  const handleClose = () => {
    setIsOpen(false)
  }

  // Reiniciar conversa
  const handleRestart = () => {
    setIsTyping(true)
    setTimeout(() => {
      setCurrentNodeId(CHAT_INITIAL_NODE_ID)
      setHistory(buildMessagesForNode(CHAT_INITIAL_NODE_ID))
      setIsTyping(false)
    }, 300)
  }

  // Clicar em uma opção pré-definida (Quick Reply)
  const handleSelectOption = (opt: QuickReplyOption) => {
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: opt.label,
      timestamp: getInitialTime(),
    }
    setHistory((prev) => [...prev, userMsg])
    setIsTyping(true)

    setTimeout(() => {
      const targetNode = CHAT_NODES[opt.targetNodeId] || CHAT_NODES[CHAT_INITIAL_NODE_ID]
      setCurrentNodeId(opt.targetNodeId)
      const botMessages = targetNode.messages.map((m, idx) => ({
        id: `bot-${opt.targetNodeId}-${idx}-${Date.now()}`,
        sender: 'bot' as const,
        text: m,
        timestamp: getInitialTime(),
      }))
      setHistory((prev) => [...prev, ...botMessages])
      setIsTyping(false)
    }, 450)
  }

  // Clicar no agendamento pelo formulário
  const handleScrollToForm = () => {
    handleClose()
    if (onScheduleClick) {
      onScheduleClick()
    } else {
      const target = document.getElementById('contato')
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  const currentNode = CHAT_NODES[currentNodeId] || CHAT_NODES[CHAT_INITIAL_NODE_ID]
  const currentWhatsAppMsg =
    currentNode.ctaWhatsAppMessage ||
    'Olá! Vim pelo chat do site e quero agendar a reunião diagnóstica sobre holding familiar.'
  const whatsappUrl = buildWhatsAppUrl(currentWhatsAppMsg)

  return (
    <>
      {/* BOTÃO FLUTUANTE DO CHAT NO CANTO INFERIOR DIREITO */}
      {!isOpen && (
        <div className="fixed bottom-5 right-5 z-40">
          <button
            type="button"
            onClick={handleOpen}
            className="group relative flex items-center gap-3 rounded-full border border-accent/40 bg-primary px-4 py-3 text-primary-foreground shadow-2xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-accent hover:shadow-accent/25 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
            aria-label="Abrir chat de dúvidas sobre holding familiar"
          >
            {/* Ícone com animação de pulso se houver unread */}
            <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-sm">
              <MessageSquare className="h-4 w-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground ring-2 ring-primary">
                  {unreadCount}
                </span>
              )}
            </div>

            <div className="flex flex-col text-left">
              <span className="text-[10px] font-bold uppercase tracking-wider text-accent">
                Dúvidas Rápidas
              </span>
              <span className="font-serif text-xs sm:text-sm font-semibold text-primary-foreground">
                Fale com o Escritório
              </span>
            </div>

            <span className="hidden sm:inline-flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse ml-1" />
          </button>
        </div>
      )}

      {/* PAINEL DO CHAT (MOBILE-FIRST RESPONSIVO) */}
      {isOpen && (
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Assistente Virtual de Dúvidas Damasceno Santos Advocacia"
          className="fixed inset-x-3 bottom-3 z-50 flex h-[85vh] max-h-[640px] flex-col overflow-hidden rounded-2xl border border-accent/30 bg-card shadow-2xl sm:inset-auto sm:bottom-5 sm:right-5 sm:h-[620px] sm:w-[420px]"
        >
          {/* CABEÇALHO DO CHAT (NAVY + DOURADO) */}
          <header className="relative flex items-center justify-between border-b border-border/80 bg-primary px-4 py-3 text-primary-foreground sm:px-5">
            <div className="flex items-center gap-3">
              <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/20 border border-accent/40 text-accent">
                <ShieldCheck className="h-5 w-5" />
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-primary" />
              </div>
              <div className="text-left">
                <div className="flex items-center gap-2">
                  <h3 className="font-serif text-sm font-bold leading-tight sm:text-base">
                    Damasceno Santos
                  </h3>
                  <Badge
                    variant="outline"
                    className="border-accent/40 bg-accent/10 text-[9px] font-medium text-accent px-1.5 py-0"
                  >
                    Holding Familiar
                  </Badge>
                </div>
                <p className="text-[11px] text-primary-foreground/75 flex items-center gap-1">
                  <Sparkles className="h-3 w-3 text-accent" />
                  Atendimento Digital • Respostas Imediatas
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={handleRestart}
                title="Voltar ao início da conversa"
                aria-label="Voltar ao início da conversa"
                className="h-8 w-8 text-primary-foreground/80 hover:bg-white/10 hover:text-primary-foreground"
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={handleClose}
                aria-label="Fechar chat de dúvidas"
                className="h-8 w-8 text-primary-foreground/80 hover:bg-white/10 hover:text-primary-foreground"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </header>

          {/* HISTÓRICO DE MENSAGENS COM ROLAGEM */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-background/50">
            {/* Aviso de confidencialidade e tom sóbrio */}
            <div className="mx-auto my-1 max-w-[90%] text-center">
              <span className="inline-block rounded-full bg-muted/80 px-3 py-1 text-[11px] text-muted-foreground border border-border/60">
                🔒 Ambiente informativo e confidencial • OAB/SP
              </span>
            </div>

            {history.map((msg) => {
              const isUser = msg.sender === 'user'
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[88%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed shadow-sm whitespace-pre-line ${
                      isUser
                        ? 'bg-accent text-accent-foreground rounded-br-xs font-medium'
                        : 'bg-card border border-border/80 text-foreground rounded-bl-xs'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="mt-1 px-1 text-[10px] text-muted-foreground">
                    {msg.timestamp}
                  </span>
                </div>
              )
            })}

            {/* Indicador de digitando */}
            {isTyping && (
              <div className="flex items-start">
                <div className="flex items-center gap-1.5 rounded-2xl border border-border/80 bg-card px-4 py-2.5 text-xs text-muted-foreground shadow-sm rounded-bl-xs">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-accent" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-accent [animation-delay:0.15s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-accent [animation-delay:0.3s]" />
                  <span className="ml-1 text-[11px] font-medium text-foreground/80">
                    Digitando...
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* ÁREA DE INTERAÇÃO (QUICK REPLIES DETERMINÍSTICAS + CTAS) */}
          <footer className="border-t border-border/80 bg-card p-3 sm:p-4 space-y-2.5">
            {/* Quick replies disponíveis no nó atual */}
            {currentNode.options && currentNode.options.length > 0 && !isTyping && (
              <div className="space-y-1.5">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground block">
                  Escolha uma das opções abaixo:
                </span>
                <div className="flex flex-col gap-1.5 max-h-44 overflow-y-auto pr-0.5">
                  {currentNode.options.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => handleSelectOption(opt)}
                      className="group flex items-center justify-between rounded-xl border border-accent/30 bg-accent/5 px-3 py-2 text-left text-xs font-medium text-foreground transition-all duration-150 hover:bg-accent hover:text-accent-foreground hover:border-accent focus:outline-none focus:ring-2 focus:ring-accent"
                    >
                      <span className="flex items-center gap-2">
                        {opt.badge && (
                          <span className="rounded bg-accent/20 px-1.5 py-0.5 text-[10px] font-bold text-accent group-hover:bg-accent-foreground/20 group-hover:text-accent-foreground">
                            {opt.badge}
                          </span>
                        )}
                        <span>{opt.label}</span>
                      </span>
                      <ChevronRight className="h-3.5 w-3.5 text-accent group-hover:text-accent-foreground shrink-0 transition-transform group-hover:translate-x-0.5" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* CTAS DE CONDUÇÃO: WHATSAPP E/OU AGENDAR REUNIÃO */}
            <div className="pt-1 flex flex-col sm:flex-row gap-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold text-white shadow-sm transition-all hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                aria-label={`Conversar no WhatsApp (${OFFICE_CONTACT.phoneDisplay})`}
              >
                <Send className="h-3.5 w-3.5" />
                <span>Falar no WhatsApp</span>
                <ExternalLink className="h-3 w-3 opacity-70" />
              </a>

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleScrollToForm}
                className="flex items-center justify-center gap-1.5 border-accent/50 text-accent hover:bg-accent/10 text-xs font-semibold py-2 h-auto"
                aria-label="Ir até o formulário para agendar reunião diagnóstica"
              >
                <Calendar className="h-3.5 w-3.5" />
                <span>Agendar no site</span>
              </Button>
            </div>

            {/* Rodapé com botão de reiniciar rápido */}
            <div className="flex items-center justify-between text-[10px] text-muted-foreground pt-1 border-t border-border/50">
              <span>{OFFICE_CONTACT.phoneDisplay}</span>
              <button
                type="button"
                onClick={handleRestart}
                className="flex items-center gap-1 text-accent hover:underline focus:outline-none"
              >
                <RotateCcw className="h-3 w-3" />
                <span>Voltar ao início</span>
              </button>
            </div>
          </footer>
        </div>
      )}
    </>
  )
}
