'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV = [
  {
    group: 'Principal',
    items: [
      { href: '/executivo',  icon: '📊', label: 'Painel Executivo',      sub: 'Executive Scorecard' },
    ],
  },
  {
    group: 'Receita',
    items: [
      { href: '/receita',    icon: '💰', label: 'Receita e Faturamento',  sub: 'B2B · B2C · Produtos' },
      { href: '/b2b',        icon: '🤝', label: 'B2B e Parceiros',        sub: 'Campanhas · Bancos · Varejo' },
    ],
  },
  {
    group: 'Clientes e Produtos',
    items: [
      { href: '/clientes',   icon: '👥', label: 'Clientes e Tiers',       sub: 'Base · Ativação · Ciclo de Vida' },
      { href: '/clube',      icon: '🔁', label: 'Clube Fidelidade',        sub: 'Recorrência · Churn · ARPU' },
      { href: '/aic',        icon: '💳', label: 'AIC / Cobranded',         sub: 'Cartão Itaú · Earn · Base' },
    ],
  },
  {
    group: 'Economia do Programa',
    items: [
      { href: '/earn-burn',  icon: '⚖️', label: 'Earn, Burn e Liability',  sub: 'Passivo · Breakage · Aging · Regras' },
      { href: '/resgates',   icon: '✈️', label: 'Resgates',                sub: 'Aéreo · APM · Shopping' },
    ],
  },
  {
    group: 'Governança',
    items: [
      { href: '/governanca', icon: '🏛️', label: 'Qualidade e Governança', sub: 'Portfólio · Métricas · DQ' },
    ],
  },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-56 shrink-0 bg-navy flex flex-col h-screen sticky top-0 overflow-y-auto">
      {/* Logo */}
      <div className="px-4 py-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="text-2xl">✈</span>
          <div>
            <p className="text-white text-sm font-bold leading-none">Azul</p>
            <p className="text-white/60 text-[10px] tracking-widest uppercase">Fidelidade</p>
          </div>
        </div>
        <p className="text-white/40 text-[9px] mt-1.5 uppercase tracking-widest">Inteligência de Negócio</p>
      </div>

      {/* Nav groups */}
      <nav className="flex-1 px-2 py-3 space-y-4">
        {NAV.map(group => (
          <div key={group.group}>
            <p className="text-white/30 text-[9px] font-bold uppercase tracking-widest px-2 mb-1">
              {group.group}
            </p>
            <div className="space-y-0.5">
              {group.items.map(item => {
                const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2.5 px-2.5 py-2 rounded-md transition-colors group ${
                      active
                        ? 'bg-white/15 text-white'
                        : 'text-white/60 hover:bg-white/8 hover:text-white/90'
                    }`}
                  >
                    <span className="text-base shrink-0">{item.icon}</span>
                    <div className="overflow-hidden">
                      <p className={`text-[12px] font-semibold leading-tight truncate ${active ? 'text-white' : ''}`}>
                        {item.label}
                      </p>
                      <p className="text-[9px] text-white/40 truncate">{item.sub}</p>
                    </div>
                    {active && (
                      <span className="ml-auto w-1 h-5 bg-accent rounded-full shrink-0" />
                    )}
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-white/10">
        <p className="text-white/30 text-[9px] text-center">Mockup · Jun 2025</p>
      </div>
    </aside>
  )
}
