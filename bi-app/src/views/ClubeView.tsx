import PageHeader from '@/components/PageHeader'
import KpiCard from '@/components/KpiCard'
import SectionLabel from '@/components/SectionLabel'
import TrendChart from '@/components/charts/TrendChart'
import BarGroupChart from '@/components/charts/BarGroupChart'
import { clubeMensal } from '@/lib/mockData'

const churnRate = clubeMensal.map(r => ({
  month: r.month,
  churnPct: +((r.cancelamentos / r.base) * 100).toFixed(2),
  arpu: r.arpu,
}))

export default function ClubeView() {
  return (
    <div>
      <PageHeader icon="🔁" title="CLUBE FIDELIDADE" subtitle="Assinaturas · Recorrência · Churn · ARPU" />
      <div className="bg-white border border-gray-line border-t-0 rounded-b-md p-5 space-y-5">

        <div className="grid grid-cols-4 gap-3">
          <KpiCard label="Base Clube MTD" value="1,95 Mi" sub1="R$ 22,4 Mi" sub1Label="Receita MTD" delta={18.2} />
          <KpiCard label="Novas Adesões MTD" value="55,8 Mil" sub1="618 Mil" sub1Label="YTD" delta={14.6} />
          <KpiCard label="Cancelamentos MTD" value="14,2 Mil" sub1="7,3%" sub1Label="Taxa Churn" delta={-3.1} />
          <KpiCard label="ARPU Clube" value="R$ 39,10" sub1="R$ 469" sub1Label="ARPU Anual" delta={4.2} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <SectionLabel icon="📈" title="Evolução da Base Clube" period="Jun/24 – Mai/25 · Mil assinantes" />
            <TrendChart
              data={clubeMensal.map(r => ({ month: r.month, base: +(r.base / 1000).toFixed(0) }))}
              series={[{ key: 'base', label: 'Base Clube', color: '#003087' }]}
              unit=" Mil"
            />
          </div>
          <div>
            <SectionLabel icon="🔄" title="Adesões vs Cancelamentos" period="Mensal" />
            <BarGroupChart
              data={clubeMensal.map(r => ({
                month: r.month,
                adesoes:       +(r.adesoes / 1000).toFixed(1),
                cancelamentos: +(r.cancelamentos / 1000).toFixed(1),
              }))}
              series={[
                { key: 'adesoes',       label: 'Adesões',        color: '#003087' },
                { key: 'cancelamentos', label: 'Cancelamentos',   color: '#A8D8F5' },
              ]}
              unit=" Mil"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <SectionLabel icon="💸" title="ARPU Mensal" period="R$" />
            <TrendChart
              data={churnRate}
              series={[{ key: 'arpu', label: 'ARPU (R$)', color: '#005EB8' }]}
              unit=" R$"
              height={180}
            />
          </div>
          <div>
            <SectionLabel icon="📉" title="Taxa de Churn Mensal" period="%" />
            <TrendChart
              data={churnRate}
              series={[{ key: 'churnPct', label: 'Churn %', color: '#2C4A7C' }]}
              unit="%"
              height={180}
            />
          </div>
        </div>

        {/* Upgrades/Downgrades */}
        <div>
          <SectionLabel icon="⬆️" title="Upgrades e Downgrades" period="MTD Jun/25" />
          <div className="grid grid-cols-4 gap-3">
            {[
              { label:'Upgrade Bronze → Prata',   value:'8.420',  delta: 12.3 },
              { label:'Upgrade Prata → Ouro',     value:'3.180',  delta:  8.7 },
              { label:'Downgrade Prata → Bronze',  value:'2.640',  delta: -5.2 },
              { label:'Reativações',               value:'6.910',  delta: 22.4 },
            ].map(u => (
              <KpiCard key={u.label} label={u.label} value={u.value} delta={u.delta} />
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
