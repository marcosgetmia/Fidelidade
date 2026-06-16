interface StatusSignalProps {
  label: string
  value: string
  reference?: string
  status: 'ok' | 'warn' | 'alert'
  detail?: string
}

const CFG = {
  ok:    { border: 'border-bi-green',  icon: '✓', iconColor: 'text-bi-green',  pill: 'bg-green-100 text-bi-green',   pillLabel: 'Normal'  },
  warn:  { border: 'border-amber-500', icon: '⚠', iconColor: 'text-amber-600', pill: 'bg-amber-100 text-amber-700',  pillLabel: 'Atenção' },
  alert: { border: 'border-red-500',   icon: '✕', iconColor: 'text-red-600',   pill: 'bg-red-100   text-red-700',    pillLabel: 'Alerta'  },
} as const

export default function StatusSignal({ label, value, reference, status, detail }: StatusSignalProps) {
  const c = CFG[status]
  return (
    <div className={`border-2 ${c.border} bg-white rounded-md p-3.5`}>
      <div className="flex items-center justify-between mb-1">
        <p className="text-[10px] uppercase tracking-wide font-semibold text-gray-txt">{label}</p>
        <span className={`text-sm font-bold ${c.iconColor}`}>{c.icon}</span>
      </div>
      <p className="text-xl font-bold text-dark leading-tight">{value}</p>
      {reference && <p className="text-[11px] text-gray-txt mt-1">Ref.: {reference}</p>}
      {detail    && <p className="text-[11px] text-gray-txt mt-0.5">{detail}</p>}
      <span className={`inline-block mt-2 text-[9px] font-bold px-2 py-0.5 rounded-full ${c.pill}`}>
        {c.pillLabel}
      </span>
    </div>
  )
}
