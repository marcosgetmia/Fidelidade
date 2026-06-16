import PageHeader from '@/components/PageHeader'
import KpiCard from '@/components/KpiCard'
import SectionLabel from '@/components/SectionLabel'
import TrendChart from '@/components/charts/TrendChart'
import BarGroupChart from '@/components/charts/BarGroupChart'
import DonutChart from '@/components/charts/DonutChart'
import { kpiExec, receitaMensal, earnBurnMensal, tierDist, prioridades2026, top10Kpis } from '@/lib/mockData'

export default function ExecutivoView() {
  const totalMensal = receitaMensal.map(r => ({
    month: r.month,
    total: +(r.b2b + r.b2c + r.clube + r.aic).toFixed(1),
    meta:  +(r.b2b + r.b2c + r.clube + r.aic + 6).toFixed(1),
  }))

  return (
    <div>
      <PageHeader icon="📊" title="PAINEL EXECUTIVO — FIDELIDADE" subtitle="Executive Scorecard · Top 10 KPIs priorizados" />

      <div className="bg-white border border-gray-line border-t-0 rounded-b-md p-5 space-y-5">

        {/* Faturamento destaque */}
        <div className="flex items-center justify-center">
          <div className="text-center border border-gray-line rounded-md px-10 py-4 bg-gray-bg">
            <p className="text-[10px] uppercase tracking-widest text-gray-txt mb-1">Faturamento Fidelidade (D-1)</p>
            <p className="text-4xl font-bold text-navy">R$ 176,8 Mi</p>
            <div className="flex gap-8 justify-center mt-2 text-sm">
              <div>
                <p className="text-[9px] text-gray-txt uppercase">MTD</p>
                <p className="font-semibold text-dark">R$ 176,8 Mi</p>
                <p className="text-[11px] text-slate">▼ -1,8%</p>
              </div>
              <div>
                <p className="text-[9px] text-gray-txt uppercase">YTD</p>
                <p className="font-semibold text-dark">R$ 1,92 Bi</p>
                <p className="text-[11px] text-bi-green">▲ +6,3%</p>
              </div>
            </div>
          </div>
        </div>

        {/* KPI Grid — Segmentos */}
        <div>
          <SectionLabel icon="📦" title="Segmentos" period="MTD Jun/25" insight="Segmentos mantidos e reordenados para aderir ao novo scorecard executivo." />
          <div className="grid grid-cols-4 gap-3">
            <KpiCard label="B2B (D-1)" value={kpiExec.b2b.mtd} sub1={kpiExec.b2b.ytd} sub1Label="YTD" delta={kpiExec.b2b.delta} insight="Confirmado como frente-chave para performance comercial e receita." />
            <KpiCard label="B2C (D-1)" value={kpiExec.b2c.mtd} sub1={kpiExec.b2c.ytd} sub1Label="YTD" delta={kpiExec.b2c.delta} insight="Mantido no scorecard por relevancia de receita recorrente e valor percebido." />
            <KpiCard label="Clube (D-1)" value={kpiExec.clube.mtd} sub1={kpiExec.clube.ytd} sub1Label="YTD" delta={kpiExec.clube.delta} insight="Clube reforcado como motor de previsibilidade de caixa." />
            <KpiCard label="AIC" value={kpiExec.aic.base} sub1={kpiExec.aic.earn} sub1Label="Earn MTD" delta={kpiExec.aic.delta} insight="AIC priorizado por impacto em engajamento e valor de cliente." />
          </div>
        </div>

        {/* KPI Grid — Clientes */}
        <div>
          <SectionLabel icon="👥" title="Clientes" period="Jun/25" insight="Leitura de base alterada para enfatizar clientes ativos em 12 meses e high value." />
          <div className="grid grid-cols-4 gap-3">
            <KpiCard label="Clientes Ativos 12m" value={kpiExec.ativos12m.val} sub1={kpiExec.ativos30.val} sub1Label="Ativos 30d" delta={kpiExec.ativos12m.delta} insight="Novo corte oficial de base ativa: janela anual (12 meses)." />
            <KpiCard label="High Value (Safira+)" value={kpiExec.highValue.total} sub1={kpiExec.highValue.safiraPlus} sub1Label="Safira e acima" delta={kpiExec.highValue.delta} insight="High value confirmado como prioridade estrategica #1." />
            <KpiCard label="Receita Total" value={kpiExec.receitaTotal.mtd} sub1={kpiExec.receitaTotal.ytd} sub1Label="YTD" delta={kpiExec.receitaTotal.delta} insight="Receita mantida no topo, com leitura conjunta de rentabilidade." />
            <KpiCard label="Rentabilidade" value={kpiExec.rentabilidade.val} sub1={kpiExec.vsMeta.pct} sub1Label="Atingimento" delta={kpiExec.rentabilidade.delta} insight="Novo destaque no scorecard com foco em crescimento eficiente." />
          </div>
        </div>

        {/* KPI Grid — Earn/Burn/Passivo */}
        <div>
          <SectionLabel icon="⚖️" title="Earn · Burn · Passivo" period="Jun/25" insight="Regras economicas atualizadas: burn/earn 85%, passivo 12 meses e breakage alvo de 15%." />
          <div className="grid grid-cols-4 gap-3">
            <KpiCard label="Earn (Pontos Acumulados)" value={kpiExec.earn.mtd} sub1={kpiExec.earn.ytd} sub1Label="YTD" delta={kpiExec.earn.delta} insight="Mantido como pilar da saude economica do programa." />
            <KpiCard label="Burn (Pontos Resgatados)" value={kpiExec.burn.mtd} sub1={kpiExec.burn.ytd} sub1Label="YTD" delta={kpiExec.burn.delta} insight="Monitorado com alerta para janela acumulada de 3 meses." />
            <KpiCard label="Liability / Saldo Passivo" value={kpiExec.liability.total} sub1={kpiExec.liability.var} sub1Label="Var. mês" delta={kpiExec.liability.delta} insight="Controle reforcado para limite de 12 meses de resgates futuros." />
            <KpiCard label="Breakage Realizado" value={kpiExec.breakage.real} sub1={kpiExec.breakage.proj} sub1Label="Projetado" sub2={kpiExec.breakage.pct} sub2Label="Atingimento" delta={kpiExec.breakage.delta} insight="Breakage tratado como receita e indicador de valor percebido." />
          </div>
        </div>

        <div>
          <SectionLabel icon="🧭" title="Prioridades Estrategicas 2026" insight="Nova camada adicionada a partir dos insights consolidados da lideranca." />
          <div className="grid grid-cols-3 gap-3">
            {prioridades2026.map(p => (
              <div key={p.rank} className="border border-gray-line rounded-md p-3 bg-gray-bg">
                <p className="text-[10px] uppercase tracking-wider text-gray-txt">Prioridade {p.rank}</p>
                <p className="text-xs font-bold text-navy mt-1">{p.titulo}</p>
                <p className="text-[11px] text-dark mt-1">{p.detalhe}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <SectionLabel icon="✅" title="Top 10 KPIs Priorizados" insight="Lista executiva oficial incorporada ao painel." />
          <div className="grid grid-cols-5 gap-2">
            {top10Kpis.map((kpi) => (
              <div key={kpi} className="border border-gray-line rounded-md bg-white px-2 py-1.5 text-[11px] font-semibold text-dark">
                {kpi}
              </div>
            ))}
          </div>
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <SectionLabel icon="📈" title="Receita Mensal vs Meta" period="Jun/24 – Mai/25" />
            <TrendChart
              data={totalMensal}
              series={[
                { key: 'total', label: 'Realizado', color: '#003087' },
                { key: 'meta',  label: 'Meta',      color: '#0096D6', dashed: true },
              ]}
              unit=" Mi"
            />
          </div>
          <div>
            <SectionLabel icon="🎯" title="Distribuição por Tier" period="Base atual" />
            <DonutChart data={tierDist} unit=" Mi" />
          </div>
        </div>

        {/* Earn x Burn */}
        <div>
          <SectionLabel icon="⚡" title="Earn vs Burn Mensal" period="Jun/24 – Mai/25 · Bi pontos" />
          <BarGroupChart
            data={earnBurnMensal}
            series={[
              { key: 'earn', label: 'Earn', color: '#003087' },
              { key: 'burn', label: 'Burn', color: '#0096D6' },
            ]}
            unit=" Bi pts"
          />
        </div>

      </div>
    </div>
  )
}
