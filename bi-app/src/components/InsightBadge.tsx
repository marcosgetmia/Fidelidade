interface InsightBadgeProps {
  text: string
}

export default function InsightBadge({ text }: InsightBadgeProps) {
  return (
    <span
      className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-blue-light text-navy text-[10px] font-bold border border-bi-blue"
      title={text}
      aria-label={text}
    >
      i
    </span>
  )
}
