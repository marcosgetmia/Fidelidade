import PageHeader from '@/components/PageHeader'
import KpiCard from '@/components/KpiCard'
import SectionLabel from '@/components/SectionLabel'
import FilterBar from '@/components/FilterBar'
import TrendChart from '@/components/charts/TrendChart'
import DonutChart from '@/components/charts/DonutChart'
import BarGroupChart from '@/components/charts/BarGroupChart'
import { clientesMensal, tierDist, kpiExec } from '@/lib/mockData'

const aquisicaoChurn = clientesMensal.map(r => ({
  month: r.month,
  novos:  +r.novos,
  churn: +(Number(r.novos) * 0.32 + Math.random() * 10).toFixed(0),
}))

export default function ClientesView() {
  return (
    <div>
      <PageHeader icon="👥" title="CLIENTES E TIERS" subtitle="Base · Ativação · Ciclo de Vida · High Value" />
      <div className="bg-white border border-gray-line border-t-0 rounded-b-md p-5 space-y-5">

        <FilterBar
          filters={[
            { label: 'Tier',    options: ['Fidelidade','Topázio','Safira','Diamante','D. Unique','Azul One'] },
            { label: 'Estado',  options: ['SP','RJ','MG','RS','PR','BA'] },
            { label: 'Safra',   options: ['2025','2024','2023','2022','Anterior'] },
          ]}
        />

        <div className="grid grid-cols-4 gap-3">
          <KpiCard label="Clientes Cadastrados" value="20,3 Mi" sub1="4,27 Mi" sub1Label="Ativos 30d" delta={4.4} />
          <KpiCard label="Clientes Ativos 90d" value={kpiExec.ativos30.d90} sub1="10,1 Mi" sub1Label="Ativos 365d" delta={3.8} />
          <KpiCard label="High Value (Safira+)" value={kpiExec.highValue.total} sub1={kpiExec.highValue.safiraPlus} sub1Label="Safira" delta={kpiExec.highValue.delta} />
          <KpiCard label="Novos Cadastrados MTD" value="182 Mil" sub1="2,1 Mi" sub1Label="YTD" delta={6.2} />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <SectionLabel icon="📈" title="Evolução de Clientes Ativos" period="Jun/24 – Mai/25 · Mi" />
            <TrendChart
              data={clientesMensal}
              series={[
                { key: 'ativos30', label: 'Ativos 30d', color: '#003087' },
                { key: 'ativos90', label: 'Ativos 90d', color: '#0096D6' },
              ]}
              unit=" Mi"
            />
          </div>
          <div>
            <SectionLabel icon="🎯" title="Distribuição por Tier" />
            <DonutChart data={tierDist} unit=" Mi" />
          </div>
        </div>

        {/* Tiers KPIs */}
        <div>
          <SectionLabel icon="⭐" title="Base por Tier" period="Jun/25" />
          <div className="grid grid-cols-6 gap-2">
            {[
              { tier:'Fidelidade', base:'15,80 Mi', delta:  3.1 },
              { tier:'Topázio',    base:' 2,92 Mi', delta:  5.8 },
              { tier:'Safira',     base:' 1,10 Mi', delta:  8.4 },
              { tier:'Diamante',   base:'380 Mil',  delta: 11.2 },
              { tier:'D. Unique',  base:' 92 Mil',  delta: 14.7 },
              { tier:'Azul One',   base:' 28 Mil',  delta: 22.1 },
            ].map(t => (
              <KpiCard key={t.tier} label={t.tier} value={t.base} delta={t.delta} />
            ))}
          </div>
        </div>

        {/* Aquisição e churn */}
        <div>
          <SectionLabel icon="🔄" title="Novos vs Cancelamentos Estimados" period="Mil clientes/mês" />
          <BarGroupChart
            data={aquisicaoChurn}
            series={[
              { key: 'novos', label: 'Novos Cadastrados', color: '#003087' },
              { key: 'churn', label: 'Inativos Estimados', color: '#A8D8F5' },
            ]}
            unit=" Mil"
            height={190}
          />
        </div>

        {/* Migração */}
        <div>
          <SectionLabel icon="⬆️" title="Migração entre Tiers" period="MTD Jun/25" />
          <div className="grid grid-cols-4 gap-3">
            {[
              { label:'Upgrades Topázio → Safira',   value:'4.820',  delta: 18.3 },
              { label:'Upgrades Safira → Diamante',  value:'1.240',  delta: 22.7 },
              { label:'Downgrades Safira → Topázio', value:'2.180',  delta:-4.2  },
              { label:'Novos Safira+',               value:'6.060',  delta: 14.8 },
            ].map(m => (
              <KpiCard key={m.label} label={m.label} value={m.value} delta={m.delta} />
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
