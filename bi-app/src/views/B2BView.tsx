import PageHeader from '@/components/PageHeader'
import KpiCard from '@/components/KpiCard'
import SectionLabel from '@/components/SectionLabel'
import FilterBar from '@/components/FilterBar'
import DataTable from '@/components/DataTable'
import HBarChart from '@/components/charts/HBarChart'
import TrendChart from '@/components/charts/TrendChart'
import { b2bParceiros, b2bPorTipo, receitaMensal } from '@/lib/mockData'

const b2bMensal = receitaMensal.map(r => ({ month: r.month, b2b: r.b2b }))

export default function B2BView() {
  return (
    <div>
      <PageHeader icon="🤝" title="B2B E PARCEIROS" subtitle="Campanhas · Bancos · Varejo · Digital" />
      <div className="bg-white border border-gray-line border-t-0 rounded-b-md p-5 space-y-5">

        <FilterBar
          filters={[
            { label: 'Parceiro', options: b2bParceiros.map(p => p.parceiro) },
            { label: 'Tipo',     options: ['Banco','Varejo','Digital','Seguros'] },
          ]}
        />

        <div className="grid grid-cols-4 gap-3">
          <KpiCard label="Receita B2B MTD" value="R$ 90,2 Mi" sub1="R$ 961 Mi" sub1Label="YTD" delta={3.9} />
          <KpiCard label="Parceiros Ativos" value="47" sub1="12" sub1Label="Novos 2025" delta={14.6} />
          <KpiCard label="Pontos Emitidos B2B" value="98,4 Bi pts" sub1="1,01 Tri pts" sub1Label="YTD" delta={7.2} />
          <KpiCard label="Clientes Impactados" value="3,8 Mi" sub1="18,7%" sub1Label="da base ativa" delta={5.1} />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <SectionLabel icon="🏆" title="Top Parceiros" period="MTD Jun/25 · R$ Mi" />
            <DataTable
              columns={[
                { key: 'parceiro', label: 'Parceiro' },
                { key: 'tipo',     label: 'Tipo' },
                { key: 'mtd',      label: 'MTD (Mi)', align: 'right',
                  render: (v) => `R$ ${String(v)} Mi` },
                { key: 'ytd',      label: 'YTD (Mi)', align: 'right',
                  render: (v) => `R$ ${v} Mi` },
                { key: 'delta',    label: 'Var. %', align: 'right',
                  render: (v) => {
                    const n = Number(v)
                    return (
                      <span className={n >= 0 ? 'text-bi-green font-bold' : 'text-slate font-bold'}>
                        {n >= 0 ? '▲ +' : '▼ '}{Math.abs(n).toFixed(1).replace('.',',')}%
                      </span>
                    )
                  }
                },
              ]}
              rows={b2bParceiros as unknown as Record<string, unknown>[]}
            />
          </div>
          <div>
            <SectionLabel icon="📊" title="Receita por Tipo" period="MTD · R$ Mi" />
            <HBarChart
              data={b2bPorTipo.map(d => ({ name: d.tipo, value: d.valor }))}
              unit=" Mi"
            />
          </div>
        </div>

        <div>
          <SectionLabel icon="📈" title="Evolução B2B Mensal" period="Jun/24 – Mai/25 · R$ Mi" />
          <TrendChart
            data={b2bMensal}
            series={[{ key: 'b2b', label: 'Receita B2B', color: '#003087' }]}
            unit=" Mi"
            height={180}
          />
        </div>

        {/* Campanhas */}
        <div>
          <SectionLabel icon="🎯" title="Campanhas Ativas" period="Jun/25" />
          <div className="grid grid-cols-3 gap-3">
            {[
              { label:'Campanha Bradesco Verao', status:'Ativa', conv:'4,2%', rec:'R$ 2,1 Mi', delta: 12.3 },
              { label:'Duplo de Pontos Varejo',  status:'Ativa', conv:'6,8%', rec:'R$ 3,4 Mi', delta: 28.7 },
              { label:'Nubank Premiado',         status:'Ativa', conv:'3.1%', rec:'R$ 1,7 Mi', delta: 44.2 },
            ].map(c => (
              <div key={c.label} className="border border-gray-line rounded-md p-3 bg-gray-bg">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-bold text-dark">{c.label}</p>
                  <span className="text-[9px] font-bold bg-blue-light text-navy px-2 py-0.5 rounded-full">{c.status}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div><p className="text-gray-txt text-[9px]">Conversão</p><p className="font-semibold">{c.conv}</p></div>
                  <div><p className="text-gray-txt text-[9px]">Receita</p><p className="font-semibold">{c.rec}</p></div>
                </div>
                <p className="text-[11px] text-bi-green font-bold mt-1">▲ +{c.delta.toFixed(1).replace('.',',')}%</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
