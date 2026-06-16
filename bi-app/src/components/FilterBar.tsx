'use client'
import { useState } from 'react'

interface Filter {
  label: string
  options: string[]
}

interface Props {
  filters: Filter[]
  period?: boolean
}

export default function FilterBar({ filters, period = true }: Props) {
  const [active, setActive] = useState<Record<string, string>>({})

  return (
    <div className="flex flex-wrap gap-3 mb-4 p-3 bg-gray-bg border border-gray-line rounded-md">
      {period && (
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-semibold text-gray-txt uppercase">Período</span>
          <div className="flex">
            {['MTD','YTD','L3M','L12M'].map(p => (
              <button
                key={p}
                onClick={() => setActive(a => ({ ...a, period: p }))}
                className={`text-[11px] px-2.5 py-1 border border-gray-line first:rounded-l last:rounded-r -ml-px font-semibold transition-colors ${
                  (active.period ?? 'MTD') === p
                    ? 'bg-navy text-white border-navy z-10'
                    : 'bg-white text-gray-txt hover:bg-blue-light'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      )}
      {filters.map(f => (
        <div key={f.label} className="flex items-center gap-1.5">
          <span className="text-[10px] font-semibold text-gray-txt uppercase">{f.label}</span>
          <select
            className="text-[11px] border border-gray-line rounded px-2 py-1 bg-white text-dark focus:outline-none focus:border-bi-blue"
            value={active[f.label] ?? ''}
            onChange={e => setActive(a => ({ ...a, [f.label]: e.target.value }))}
          >
            <option value="">Todos</option>
            {f.options.map(o => <option key={o}>{o}</option>)}
          </select>
        </div>
      ))}
    </div>
  )
}
