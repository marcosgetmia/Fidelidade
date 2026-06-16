'use client'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface Series { key: string; label: string; color: string }
interface Props {
  data: Record<string, string | number>[]
  series: Series[]
  height?: number
  unit?: string
  stacked?: boolean
}

export default function BarGroupChart({ data, series, height = 210, unit = '', stacked }: Props) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 6, right: 16, left: -10, bottom: 0 }} barSize={stacked ? undefined : 12}>
        <CartesianGrid strokeDasharray="3 3" stroke="#DDE2EA" vertical={false} />
        <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#5A6375' }} />
        <YAxis tick={{ fontSize: 10, fill: '#5A6375' }} />
        <Tooltip
          contentStyle={{ fontSize: 11, border: '1px solid #DDE2EA', borderRadius: 4 }}
          formatter={(v: number) => [`${v}${unit}`, '']}
        />
        <Legend wrapperStyle={{ fontSize: 11, paddingTop: 4 }} />
        {series.map(s => (
          <Bar key={s.key} dataKey={s.key} name={s.label} fill={s.color} stackId={stacked ? 'a' : undefined} radius={stacked ? undefined : [2,2,0,0]} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  )
}
