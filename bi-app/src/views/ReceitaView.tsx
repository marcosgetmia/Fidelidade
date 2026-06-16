import PageHeader from '@/components/PageHeader'
import KpiCard from '@/components/KpiCard'
import SectionLabel from '@/components/SectionLabel'
import FilterBar from '@/components/FilterBar'
import TrendChart from '@/components/charts/TrendChart'
import BarGroupChart from '@/components/charts/BarGroupChart'
import { kpiExec, receitaMensal } from '@/lib/mockData'

const forecastData = receitaMensal.map((r, i) => ({
  month: r.month,
  realizado: +(r.b2b + r.b2c + r.clube + r.aic).toFixed(1),
  forecast:  +(r.b2b + r.b2c + r.clube + r.aic + (Math.sin(i * 0.4) * 4 + 5)).toFixed(1),
}))

export default function ReceitaView() {
  return (
    <div>
      <PageHeader icon="💰" title="RECEITA E FATURAMENTO" subtitle="Consolidado B2B · B2C · Clube · AIC · PMD" />
      <div className="bg-white border border-gray-line border-t-0 rounded-b-md p-5 space-y-5">

        <FilterBar
          filters={[
            { label: 'Produto', options: ['Buy Points','Renew','Transfer','Clube','MGM','AIC'] },
            { label: 'Canal',   options: ['Digital','Call Center','Parceiro','Banco'] },
          ]}
        />

        {/* KPI cards */}
        <div className="grid grid-cols-4 gap-3">
          <KpiCard label="Receita Total MTD" value={kpiExec.receitaTotal.mtd} sub1={kpiExec.receitaTotal.ytd} sub1Label="YTD" delta={kpiExec.receitaTotal.delta} insight="Receita e indicador oficial da camada executiva." />
          <KpiCard label="Receita B2B" value={kpiExec.b2b.mtd} sub1={kpiExec.b2b.ytd} sub1Label="YTD" delta={kpiExec.b2b.delta} insight="B2B reforcado como alavanca de crescimento com parceiros." />
          <KpiCard label="Receita B2C" value={kpiExec.b2c.mtd} sub1={kpiExec.b2c.ytd} sub1Label="YTD" delta={kpiExec.b2c.delta} insight="B2C priorizado por valor percebido e recorrencia." />
          <KpiCard label="PMD" value={kpiExec.pmd.val} sub1={kpiExec.rentabilidade.val} sub1Label="Rentabilidade" delta={kpiExec.pmd.delta} insight="PMD incluido no Top 10 como indicador de valorizacao economica." />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <SectionLabel icon="📊" title="Receita por Segmento" period="Mensal · R$ Mi" />
            <BarGroupChart
              data={receitaMensal}
              series={[
                { key: 'b2b',   label: 'B2B',   color: '#003087' },
                { key: 'b2c',   label: 'B2C',   color: '#005EB8' },
                { key: 'clube', label: 'Clube',  color: '#0096D6' },
                { key: 'aic',   label: 'AIC',    color: '#A8D8F5' },
              ]}
              stacked
              unit=" Mi"
            />
          </div>
          <div>
            <SectionLabel icon="🎯" title="Realizado vs Forecast" period="R$ Mi" insight="Previsibilidade de caixa confirmada como prioridade estrategica." />
            <TrendChart
              data={forecastData}
              series={[
                { key: 'realizado', label: 'Realizado', color: '#003087' },
                { key: 'forecast',  label: 'Forecast',  color: '#0096D6', dashed: true },
              ]}
              unit=" Mi"
            />
          </div>
        </div>

        {/* B2C Products */}
        <div>
          <SectionLabel icon="🛍️" title="Receita B2C por Produto" period="MTD Jun/25 · R$ Mi" />
          <div className="grid grid-cols-5 gap-3">
            {[
              { label:'Clube',      value:'R$ 22,4 Mi', delta: 18.2 },
              { label:'Buy Points', value:'R$ 24,8 Mi', delta: 8.7  },
              { label:'Renew',      value:'R$ 12,3 Mi', delta:-3.1  },
              { label:'Transfer',   value:'R$ 9,1 Mi',  delta: 5.4  },
              { label:'MGM',        value:'R$ 5,5 Mi',  delta: 31.2 },
            ].map(p => (
              <KpiCard key={p.label} label={p.label} value={p.value} delta={p.delta} />
            ))}
          </div>
        </div>

        {/* Ticket médio */}
        <div>
          <SectionLabel icon="🎟️" title="Ticket Médio por Produto" period="MTD Jun/25" />
          <div className="grid grid-cols-4 gap-3">
            {[
              { label:'Buy Points — Ticket Médio', value:'R$ 184,20', delta: 3.1 },
              { label:'Renew — Ticket Médio',      value:'R$ 67,40',  delta:-1.4 },
              { label:'Clube — ARPU',              value:'R$ 38,90',  delta: 4.2 },
              { label:'Transfer — Ticket Médio',   value:'R$ 52,30',  delta: 2.8 },
            ].map(p => (
              <KpiCard key={p.label} label={p.label} value={p.value} delta={p.delta} />
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
