import PageHeader from '@/components/PageHeader'
import KpiCard from '@/components/KpiCard'
import SectionLabel from '@/components/SectionLabel'
import FilterBar from '@/components/FilterBar'
import TrendChart from '@/components/charts/TrendChart'
import DonutChart from '@/components/charts/DonutChart'
import BarGroupChart from '@/components/charts/BarGroupChart'
import DataTable from '@/components/DataTable'
import { resgatesMix, resgatesMensal } from '@/lib/mockData'

const topDestinos = [
  { destino:'GRU – Guarulhos', pontos:'8,4 Bi', pax:'68.200', custo:'R$ 3,2 Mi' },
  { destino:'CGH – Congonhas', pontos:'6,1 Bi', pax:'52.100', custo:'R$ 2,3 Mi' },
  { destino:'BSB – Brasília',  pontos:'4,8 Bi', pax:'41.400', custo:'R$ 1,8 Mi' },
  { destino:'SSA – Salvador',  pontos:'3,9 Bi', pax:'33.700', custo:'R$ 1,5 Mi' },
  { destino:'REC – Recife',    pontos:'3,2 Bi', pax:'27.600', custo:'R$ 1,2 Mi' },
  { destino:'MIA – Miami',     pontos:'2,8 Bi', pax:'11.200', custo:'R$ 2,8 Mi' },
  { destino:'ORLando – MCO',   pontos:'2,1 Bi', pax:' 8.400', custo:'R$ 2,1 Mi' },
]

export default function ResgatesView() {
  return (
    <div>
      <PageHeader icon="✈️" title="RESGATES" subtitle="Aéreo Azul · APM · Shopping · Espaço Azul · Daily Bookings" />
      <div className="bg-white border border-gray-line border-t-0 rounded-b-md p-5 space-y-5">

        <FilterBar
          filters={[
            { label: 'Tipo',    options: ['Passagem Azul','Azul Pelo Mundo','Shopping','Espaço Azul','Bagagem'] },
            { label: 'Tier',    options: ['Fidelidade','Topázio','Safira','Diamante+'] },
            { label: 'Origem',  options: ['Nacional','Internacional'] },
          ]}
        />

        <div className="grid grid-cols-4 gap-3">
          <KpiCard label="Burn Total MTD" value="124 Bi pts" sub1="1,27 Tri pts" sub1Label="YTD" delta={12.6} />
          <KpiCard label="Resgates Aéreos Azul" value="58,4%" sub1="72,4 Bi pts" sub1Label="MTD" delta={8.3} />
          <KpiCard label="Custo Total de Resgate" value="R$ 48,2 Mi" sub1="R$ 512 Mi" sub1Label="YTD" delta={11.2} />
          <KpiCard label="Cancelamentos MTD" value="4.820" sub1="3,9% dos resgates" delta={-6.4} />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <SectionLabel icon="🥧" title="Mix de Resgates" period="% do volume total" />
            <DonutChart data={resgatesMix} unit="%" />
          </div>
          <div className="col-span-2">
            <SectionLabel icon="📊" title="Volume por Tipo" period="Bi pontos / mês" />
            <BarGroupChart
              data={resgatesMensal}
              series={[
                { key: 'aereoAzul', label: 'Aéreo Azul', color: '#003087' },
                { key: 'apm',       label: 'APM',         color: '#005EB8' },
                { key: 'shopping',  label: 'Shopping',    color: '#0096D6' },
                { key: 'outros',    label: 'Outros',      color: '#A8D8F5' },
              ]}
              stacked
              unit=" Bi pts"
            />
          </div>
        </div>

        {/* Top destinos */}
        <div>
          <SectionLabel icon="🗺️" title="Top Destinos Resgatados" period="MTD Jun/25" />
          <DataTable
            columns={[
              { key: 'destino', label: 'Destino' },
              { key: 'pontos',  label: 'Pontos Resgatados', align: 'right' },
              { key: 'pax',     label: 'PAX',               align: 'right' },
              { key: 'custo',   label: 'Custo Estimado',    align: 'right' },
            ]}
            rows={topDestinos as unknown as Record<string, unknown>[]}
          />
        </div>

        {/* Tipos adicionais */}
        <div>
          <SectionLabel icon="📈" title="Evolução Aéreo Azul vs APM" period="Bi pontos" />
          <TrendChart
            data={resgatesMensal}
            series={[
              { key: 'aereoAzul', label: 'Aéreo Azul', color: '#003087' },
              { key: 'apm',       label: 'APM',         color: '#0096D6' },
            ]}
            unit=" Bi pts"
            height={180}
          />
        </div>

      </div>
    </div>
  )
}
