'use client'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts'

interface Slice { name: string; value: number; color: string }
interface Props { data: Slice[]; height?: number; unit?: string; innerRadius?: number }

export default function DonutChart({ data, height = 210, unit = '', innerRadius = 55 }: Props) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={innerRadius}
          outerRadius={80}
          dataKey="value"
          paddingAngle={2}
        >
          {data.map((d, i) => <Cell key={i} fill={d.color} />)}
        </Pie>
        <Tooltip
          contentStyle={{ fontSize: 11, border: '1px solid #DDE2EA', borderRadius: 4 }}
          formatter={(v: number) => [`${v}${unit}`, '']}
        />
        <Legend
          wrapperStyle={{ fontSize: 10 }}
          formatter={(value) => <span style={{ color: '#5A6375' }}>{value}</span>}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}
