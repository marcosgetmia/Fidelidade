'use client'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface Series { key: string; label: string; color: string; dashed?: boolean }
interface Props {
  data: Record<string, string | number>[]
  series: Series[]
  height?: number
  unit?: string
  yDomain?: [number | 'auto', number | 'auto']
}

export default function TrendChart({ data, series, height = 210, unit = '', yDomain }: Props) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 6, right: 16, left: -10, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#DDE2EA" />
        <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#5A6375' }} />
        <YAxis tick={{ fontSize: 10, fill: '#5A6375' }} domain={yDomain} />
        <Tooltip
          contentStyle={{ fontSize: 11, border: '1px solid #DDE2EA', borderRadius: 4 }}
          formatter={(v: number) => [`${v}${unit}`, '']}
        />
        <Legend wrapperStyle={{ fontSize: 11, paddingTop: 4 }} />
        {series.map(s => (
          <Line
            key={s.key}
            type="monotone"
            dataKey={s.key}
            name={s.label}
            stroke={s.color}
            strokeWidth={2}
            strokeDasharray={s.dashed ? '5 3' : undefined}
            dot={false}
            activeDot={{ r: 4 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  )
}
