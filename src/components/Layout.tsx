import { type ReactNode, useEffect, useState } from 'react'
import { Mail, Menu, Moon, Phone, Sun, Linkedin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import logo from '@/assets/fundo-transparente-editedimage1788967093128-bae21.png'

export interface NavItem {
  label: string
  href: string
}

export const navItems: NavItem[] = [
  { label: 'O que é', href: '/#o-que-e' },
  { label: 'Calculadora', href: '/#calculadora' },
  { label: 'Segmentos', href: '/#segmentos' },
  { label: 'Diferenciais', href: '/#diferenciais' },
  { label: 'Áreas de atuação', href: '/#areas-de-atuacao' },
  { label: 'Sobre', href: '/#sobre' },
  { label: 'Contato', href: '/#contato' },
]

function ThemeToggle() {
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains('dark'))

  const toggleTheme = () => {
    const nextIsDark = !isDark
    document.documentElement.classList.toggle('dark', nextIsDark)
    document.documentElement.style.colorScheme = nextIsDark ? 'dark' : 'light'
    localStorage.setItem('theme', nextIsDark ? 'dark' : 'light')
    setIsDark(nextIsDark)
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label="Alternar tema claro/escuro"
      className="relative shrink-0"
    >
      <Sun
        className={`theme-icon absolute h-4 w-4 ${isDark ? 'scale-0 -rotate-90 opacity-0' : 'scale-100 rotate-0 opacity-100'}`}
      />
      <Moon
        className={`theme-icon absolute h-4 w-4 ${isDark ? 'scale-100 rotate-0 opacity-100' : 'scale-0 rotate-90 opacity-0'}`}
      />
    </Button>
  )
}

function NavLink({
  item,
  mobile = false,
  onNavigate,
}: {
  item: NavItem
  mobile?: boolean
  onNavigate?: () => void
}) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (window.location.pathname === '/' || window.location.pathname === '') {
      const hash = item.href.replace('/#', '#')
      const target = document.querySelector(hash)
      if (target) {
        e.preventDefault()
        target.scrollIntoView({ behavior: 'smooth' })
        window.history.replaceState(null, '', hash)
      }
    }
    if (onNavigate) {
      onNavigate()
    }
  }

  const link = (
    <a
      href={item.href}
      onClick={handleClick}
      className={`nav-link focus-ring ${mobile ? 'py-3 text-lg' : 'text-sm'}`}
    >
      {item.label}
    </a>
  )
  return mobile ? <SheetClose asChild>{link}</SheetClose> : link
}

export function Layout({ children }: { children: ReactNode }) {
  const [elevated, setElevated] = useState(false)

  useEffect(() => {
    const handleScroll = () => setElevated(window.scrollY > 8)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header
        className={`fixed inset-x-0 top-0 z-50 h-[72px] border-b bg-background/95 backdrop-blur-sm transition-shadow duration-200 ${elevated ? 'border-border shadow-md' : 'border-border/70 shadow-none'}`}
      >
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
          <a
            href="/"
            className="focus-ring max-w-[220px] font-serif text-lg font-semibold leading-tight sm:max-w-none sm:text-xl"
          >
            Damasceno Santos Advocacia
          </a>
          <div className="hidden items-center gap-5 md:flex">
            <nav aria-label="Navegação principal" className="flex items-center gap-5">
              {navItems.map((item) => (
                <NavLink key={item.label} item={item} />
              ))}
            </nav>
            <ThemeToggle />
            <Button
              type="button"
              className="button-motion"
              onClick={() => {
                const target = document.getElementById('contato')
                if (target) {
                  target.scrollIntoView({ behavior: 'smooth' })
                } else {
                  window.location.href = '/#contato'
                }
              }}
            >
              Agendar reunião
            </Button>
          </div>
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button type="button" variant="ghost" size="icon" aria-label="Abrir menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="flex w-[86vw] max-w-sm flex-col bg-background px-6"
              >
                <SheetHeader className="text-left">
                  <SheetTitle className="font-serif text-xl">Damasceno Santos Advocacia</SheetTitle>
                </SheetHeader>
                <nav aria-label="Navegação móvel" className="mt-8 flex flex-col">
                  {navItems.map((item) => (
                    <NavLink key={item.label} item={item} mobile />
                  ))}
                </nav>
                <div className="mt-auto flex items-center gap-3 border-t border-border py-6">
                  <ThemeToggle />
                  <SheetClose asChild>
                    <Button
                      type="button"
                      className="button-motion flex-1"
                      onClick={() => {
                        setTimeout(() => {
                          const target = document.getElementById('contato')
                          if (target) {
                            target.scrollIntoView({ behavior: 'smooth' })
                          } else {
                            window.location.href = '/#contato'
                          }
                        }, 250)
                      }}
                    >
                      Agendar reunião
                    </Button>
                  </SheetClose>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="pt-[72px]">{children}</main>

      <footer className="border-t border-accent/25 bg-primary py-14 text-primary-foreground sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-[1.1fr_0.9fr_1.25fr] lg:px-8">
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <img
              src={logo}
              alt="Marca Proteção Patrimonial e Holding"
              className="mb-5 h-auto w-28"
            />
            <h2 className="font-serif text-xl font-semibold">Damasceno Santos Advocacia</h2>
            <p className="mt-2 text-sm opacity-80">Por uma sociedade mais justa!</p>
          </div>
          <div>
            <h2 className="text-base font-semibold">Contato</h2>
            <ul className="mt-5 space-y-4 text-sm">
              <li>
                <a href="mailto:contato@damascenosantos.adv.br" className="footer-link">
                  <Mail className="h-4 w-4 text-accent" />
                  contato@damascenosantos.adv.br
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/5511957697373?text=Ol%C3%A1!%20Gostaria%20de%20agendar%20uma%20reuni%C3%A3o%20diagn%C3%B3stica%20sobre%20holding%20familiar."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  <Phone className="h-4 w-4 text-accent" />
                  (11) 95769-7373 (WhatsApp)
                </a>
              </li>
              <li>
                <a href="/#calculadora" className="footer-link">
                  <span className="h-2 w-2 rounded-full bg-accent" />
                  Calculadora de Custos v2
                </a>
              </li>
            </ul>
            <p className="mt-4 text-xs opacity-65">Damasceno Santos Advocacia • São Paulo / SP</p>
          </div>
          <div>
            <h2 className="text-base font-semibold">Aviso legal</h2>
            <p className="mt-5 text-sm leading-relaxed opacity-80">
              O conteúdo deste site possui caráter exclusivamente informativo e educacional, não
              constitui aconselhamento jurídico nem substitui a análise individualizada de um
              profissional habilitado. As informações apresentadas não representam promessa ou
              garantia de resultados, pois cada situação depende de suas circunstâncias e da
              legislação aplicável.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
