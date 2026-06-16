'use client'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'

interface Row { name: string; value: number; color?: string }
interface Props { data: Row[]; height?: number; unit?: string; color?: string }

export default function HBarChart({ data, height, unit = '', color = '#005EB8' }: Props) {
  const h = height ?? Math.max(180, data.length * 32)
  return (
    <ResponsiveContainer width="100%" height={h}>
      <BarChart data={data} layout="vertical" margin={{ top: 4, right: 24, left: 4, bottom: 4 }} barSize={14}>
        <CartesianGrid strokeDasharray="3 3" stroke="#DDE2EA" horizontal={false} />
        <XAxis type="number" tick={{ fontSize: 10, fill: '#5A6375' }} />
        <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: '#1C2333' }} width={100} />
        <Tooltip
          contentStyle={{ fontSize: 11, border: '1px solid #DDE2EA', borderRadius: 4 }}
          formatter={(v: number) => [`${v}${unit}`, '']}
        />
        <Bar dataKey="value" radius={[0,2,2,0]}>
          {data.map((d, i) => <Cell key={i} fill={d.color ?? color} />)}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
