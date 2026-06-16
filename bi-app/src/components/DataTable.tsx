interface Column<T> {
  key: keyof T
  label: string
  align?: 'left' | 'right' | 'center'
  render?: (val: T[keyof T], row: T) => React.ReactNode
}

interface Props<T> {
  columns: Column<T>[]
  rows: T[]
  striped?: boolean
}

export default function DataTable<T extends Record<string, unknown>>({ columns, rows, striped = true }: Props<T>) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr>
            {columns.map(c => (
              <th
                key={String(c.key)}
                className={`bg-navy text-white font-bold px-3 py-2 text-left uppercase tracking-wide whitespace-nowrap ${
                  c.align === 'right' ? 'text-right' : c.align === 'center' ? 'text-center' : 'text-left'
                }`}
              >
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={striped && i % 2 === 1 ? 'bg-gray-bg' : 'bg-white'}>
              {columns.map(c => (
                <td
                  key={String(c.key)}
                  className={`px-3 py-2 border-b border-gray-line text-dark ${
                    c.align === 'right' ? 'text-right' : c.align === 'center' ? 'text-center' : 'text-left'
                  }`}
                >
                  {c.render ? c.render(row[c.key], row) : String(row[c.key] ?? '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
