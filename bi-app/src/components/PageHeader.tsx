interface Props {
  icon: string
  title: string
  subtitle?: string
}

export default function PageHeader({ icon, title, subtitle }: Props) {
  const today = new Date().toLocaleDateString('pt-BR')
  return (
    <div className="flex items-center justify-between bg-navy px-5 py-3 rounded-t-md">
      <div className="flex items-center gap-3 text-white">
        <span className="text-xl">{icon}</span>
        <div>
          <p className="text-base font-bold tracking-wide">{title}</p>
          {subtitle && <p className="text-[11px] text-white/60 mt-0.5">{subtitle}</p>}
        </div>
      </div>
      <div className="text-right">
        <p className="text-[10px] text-white/50 uppercase tracking-widest">Azul</p>
        <p className="text-sm font-bold text-white">Fidelidade</p>
        <p className="text-[10px] text-white/50 mt-0.5">{today}</p>
      </div>
    </div>
  )
}
