import InsightBadge from '@/components/InsightBadge'

interface KpiCardProps {
  label: string
  value: string
  sub1?: string
  sub1Label?: string
  sub2?: string
  sub2Label?: string
  delta?: number
  badge?: string
  wide?: boolean
  insight?: string
}

function DeltaBadge({ delta }: { delta: number }) {
  const up = delta >= 0
  return (
    <span className={`text-xs font-bold ${up ? 'text-bi-green' : 'text-slate'}`}>
      {up ? '▲' : '▼'} {up ? '+' : ''}{delta.toFixed(1).replace('.', ',')}%
    </span>
  )
}

export default function KpiCard({ label, value, sub1, sub1Label, sub2, sub2Label, delta, badge, wide, insight }: KpiCardProps) {
  return (
    <div className={`bg-white border border-gray-line rounded-md p-3.5 relative ${wide ? 'col-span-2' : ''}`}>
      <div className="flex items-center gap-1.5 mb-1">
        <p className="text-[10px] uppercase tracking-wide font-semibold text-gray-txt">{label}</p>
        {insight && <InsightBadge text={insight} />}
      </div>
      <p className="text-xl font-bold text-dark leading-tight">{value}</p>
      {(sub1 || sub2) && (
        <div className="flex gap-4 mt-1.5">
          {sub1 && (
            <div>
              <p className="text-[9px] text-gray-txt uppercase">{sub1Label}</p>
              <p className="text-xs font-semibold text-dark">{sub1}</p>
            </div>
          )}
          {sub2 && (
            <div>
              <p className="text-[9px] text-gray-txt uppercase">{sub2Label}</p>
              <p className="text-xs font-semibold text-dark">{sub2}</p>
            </div>
          )}
        </div>
      )}
      {delta !== undefined && (
        <div className="mt-1.5">
          <DeltaBadge delta={delta} />
        </div>
      )}
      {badge && (
        <span className="absolute top-2.5 right-2.5 text-[9px] font-bold bg-blue-light text-navy px-2 py-0.5 rounded-full">
          {badge}
        </span>
      )}
    </div>
  )
}
