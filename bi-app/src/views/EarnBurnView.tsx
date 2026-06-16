import PageHeader from '@/components/PageHeader'
import KpiCard from '@/components/KpiCard'
import SectionLabel from '@/components/SectionLabel'
import TrendChart from '@/components/charts/TrendChart'
import BarGroupChart from '@/components/charts/BarGroupChart'
import DonutChart from '@/components/charts/DonutChart'
import { earnBurnMensal, liabilityMensal, kpiExec, agingPontos, regrasEconomicas } from '@/lib/mockData'

const ratioData = earnBurnMensal.map(r => ({
  month: r.month,
  earn: r.earn,
  burn: r.burn,
  ratio: +(r.earn / r.burn).toFixed(2),
}))

export default function EarnBurnView() {
  return (
    <div>
      <PageHeader icon="⚖️" title="EARN, BURN E LIABILITY" subtitle="Passivo · Breakage · Aging · Equilíbrio econômico" />
      <div className="bg-white border border-gray-line border-t-0 rounded-b-md p-5 space-y-5">

        <div className="grid grid-cols-4 gap-3">
          <KpiCard label="Earn MTD" value={kpiExec.earn.mtd} sub1={kpiExec.earn.ytd} sub1Label="YTD" delta={kpiExec.earn.delta} insight="Mantido como eixo estrutural da saude economica do programa." />
          <KpiCard label="Burn MTD" value={kpiExec.burn.mtd} sub1={kpiExec.burn.ytd} sub1Label="YTD" delta={kpiExec.burn.delta} insight="Alerta em janela acumulada quando burn supera earn." />
          <KpiCard label="Burn/Earn (3m)" value={kpiExec.burnEarn.atual} sub1={`Meta ${kpiExec.burnEarn.meta}`} delta={kpiExec.burnEarn.delta} insight="Nova referencia oficial: burn x earn em 85%." />
          <KpiCard label="Saldo de Pontos Ativos" value="4,82 Tri pts" sub1="+3,2% vs mai/25" delta={3.2} insight="Indicador reforca sustentabilidade futura de resgates." />
        </div>

        <div className="grid grid-cols-4 gap-3">
          <KpiCard label="Liability Total" value={kpiExec.liability.total} sub1={kpiExec.liability.var} sub1Label="Var. mês" delta={kpiExec.liability.delta} />
          <KpiCard label="Breakage Realizado YTD" value={kpiExec.breakage.real} sub1={kpiExec.breakage.proj} sub1Label="Projetado" delta={kpiExec.breakage.delta} />
          <KpiCard label="Aging >24 meses" value="17,0%" sub1="820 Bi pts" sub1Label="Volume em risco" delta={-2.4} />
          <KpiCard label="Pontos a Expirar (90d)" value="142 Bi pts" sub1="R$ 46 Mi" sub1Label="Impacto est." delta={4.8} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <SectionLabel icon="📊" title="Earn vs Burn Mensal" period="Bi pontos" />
            <BarGroupChart
              data={earnBurnMensal}
              series={[
                { key: 'earn', label: 'Earn', color: '#003087' },
                { key: 'burn', label: 'Burn', color: '#0096D6' },
              ]}
              unit=" Bi pts"
            />
          </div>
          <div>
            <SectionLabel icon="📈" title="Ratio Earn/Burn Mensal" period="x vezes" />
            <TrendChart
              data={ratioData}
              series={[{ key: 'ratio', label: 'Earn/Burn', color: '#003087' }]}
              unit="x"
              yDomain={[1.2, 1.8]}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <SectionLabel icon="💰" title="Evolução do Liability" period="R$ Mi" />
            <TrendChart
              data={liabilityMensal}
              series={[{ key: 'liability', label: 'Liability (R$ Mi)', color: '#2C4A7C' }]}
              unit=" Mi"
            />
          </div>
          <div>
            <SectionLabel icon="⏳" title="Aging dos Pontos" period="% do saldo total" />
            <DonutChart data={agingPontos.map(a => ({ name: a.faixa, value: a.pct, color: a.color }))} unit="%" />
          </div>
        </div>

        {/* Breakage */}
        <div>
          <SectionLabel icon="📉" title="Breakage Mensal" period="R$ Mi" insight="Breakage com faixa saudavel alvo de 15% (+/- 5 p.p.)." />
          <TrendChart
            data={liabilityMensal}
            series={[{ key: 'breakage', label: 'Breakage (R$ Mi)', color: '#005EB8' }]}
            unit=" Mi"
            height={170}
          />
        </div>

        <div>
          <SectionLabel icon="📌" title="Regras Economicas Oficiais" insight="Bloco adicionado com os novos parametros de saude definidos pela lideranca." />
          <div className="grid grid-cols-2 gap-3">
            {regrasEconomicas.map((regra) => (
              <div key={regra} className="flex items-start gap-3 border border-gray-line rounded-md p-3 bg-gray-bg">
                <span className="text-navy font-bold text-sm mt-0.5">•</span>
                <p className="text-xs text-dark">{regra}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
