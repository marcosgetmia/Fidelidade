import InsightBadge from '@/components/InsightBadge'

interface Props {
  icon?: string
  title: string
  period?: string
  insight?: string
}

export default function SectionLabel({ icon, title, period, insight }: Props) {
  return (
    <div className="flex items-center gap-2 border-l-4 border-bi-blue bg-blue-light px-3 py-1.5 rounded-r mb-3">
      {icon && <span className="text-sm">{icon}</span>}
      <span className="text-xs font-bold uppercase tracking-wide text-navy">{title}</span>
      {insight && <InsightBadge text={insight} />}
      {period && (
        <span className="text-xs text-gray-txt ml-1">| {period}</span>
      )}
    </div>
  )
}
