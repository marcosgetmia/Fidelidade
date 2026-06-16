import PageHeader from '@/components/PageHeader'
import KpiCard from '@/components/KpiCard'
import SectionLabel from '@/components/SectionLabel'
import TrendChart from '@/components/charts/TrendChart'
import BarGroupChart from '@/components/charts/BarGroupChart'
import { aicMensal } from '@/lib/mockData'

export default function AICView() {
  return (
    <div>
      <PageHeader icon="💳" title="AIC / COBRANDED" subtitle="Cartão Co-branded Itaú · Base · Earn · Ativação" />
      <div className="bg-white border border-gray-line border-t-0 rounded-b-md p-5 space-y-5">

        <div className="grid grid-cols-4 gap-3">
          <KpiCard label="Base AIC Ativa" value={`${aicMensal[aicMensal.length-1].base} Mi`} sub1="18,7%" sub1Label="da base Fidelidade" delta={9.1} />
          <KpiCard label="Novos Cartões MTD" value="43,2 Mil" sub1="482 Mil" sub1Label="YTD" delta={11.4} />
          <KpiCard label="Earn AIC MTD" value={`${aicMensal[aicMensal.length-1].earnMi} Bi pts`} sub1="1,87 Tri pts" sub1Label="YTD" delta={8.7} />
          <KpiCard label="Receita AIC MTD" value="R$ 13,8 Mi" sub1="R$ 147 Mi" sub1Label="YTD" delta={9.1} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <SectionLabel icon="📈" title="Evolução Base AIC" period="Jun/24 – Mai/25 · Mi cartões" />
            <TrendChart
              data={aicMensal}
              series={[{ key: 'base', label: 'Base AIC', color: '#003087' }]}
              unit=" Mi"
            />
          </div>
          <div>
            <SectionLabel icon="⚡" title="Earn AIC Mensal" period="R$ Mi" />
            <TrendChart
              data={aicMensal}
              series={[{ key: 'earnMi', label: 'Earn (Mi R$)', color: '#005EB8' }]}
              unit=" Mi"
            />
          </div>
        </div>

        <div>
          <SectionLabel icon="📊" title="Novos Cartões vs Earn Mensal" period="Mil cartões / Bi pontos" />
          <BarGroupChart
            data={aicMensal.map(r => ({
              month: r.month,
              novos: +(r.novosCartoes / 1000).toFixed(1),
              earn:  r.earnMi,
            }))}
            series={[
              { key: 'novos', label: 'Novos Cartões (Mil)', color: '#003087' },
              { key: 'earn',  label: 'Earn (Mi R$)',         color: '#0096D6' },
            ]}
            height={200}
          />
        </div>

        {/* Tiers AIC */}
        <div>
          <SectionLabel icon="⭐" title="Perfil AIC por Tier Fidelidade" period="Base atual" />
          <div className="grid grid-cols-4 gap-3">
            {[
              { label:'AIC em Safira+',     value:'187 Mil', sub1:'5,4% da base AIC',  delta: 18.2 },
              { label:'AIC em Diamante+',   value:' 48 Mil', sub1:'1,4% da base AIC',  delta: 24.1 },
              { label:'AIC em Topázio',     value:'620 Mil', sub1:'18,0% da base AIC', delta:  7.3 },
              { label:'AIC em Fidelidade',  value:'2,57 Mi', sub1:'74,8% da base AIC', delta:  8.4 },
            ].map(t => (
              <KpiCard key={t.label} label={t.label} value={t.value} sub1={t.sub1} delta={t.delta} />
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
