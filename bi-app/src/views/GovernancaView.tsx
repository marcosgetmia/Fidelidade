import PageHeader from '@/components/PageHeader'
import KpiCard from '@/components/KpiCard'
import SectionLabel from '@/components/SectionLabel'
import DataTable from '@/components/DataTable'
import { portfolioBI, fontesPriorizadas } from '@/lib/mockData'

const acaoColor: Record<string, string> = {
  Manter:      'bg-blue-light text-navy',
  Redesenhar:  'bg-yellow-50 text-yellow-800 border border-yellow-200',
  Consolidar:  'bg-indigo-50 text-indigo-800',
  Arquivar:    'bg-gray-100 text-gray-500',
  Substituir:  'bg-slate/10 text-slate',
  Certificar:  'bg-green-50 text-bi-green',
}

const foruns = [
  { forum:'Executivo Fidelidade',       pauta:'Performance e resultado do Fidelidade', freq:'Mensal',    prox:'10/07/2025' },
  { forum:'Gerencial — Métricas',       pauta:'KPIs, desvios e plano de ação',         freq:'Quinzenal', prox:'18/06/2025' },
  { forum:'Técnico — Dados e DQ',       pauta:'Carga, qualidade, backlog',             freq:'Semanal',   prox:'09/06/2025' },
  { forum:'Comitê de Metricas',         pauta:'Oficialização de definições',           freq:'Mensal',    prox:'10/07/2025' },
]

export default function GovernancaView() {
  const total       = portfolioBI.length
  const manter      = portfolioBI.filter(p => p.acao === 'Manter').length
  const redesenhar  = portfolioBI.filter(p => p.acao === 'Redesenhar').length
  const arquivar    = portfolioBI.filter(p => p.acao === 'Arquivar').length
  const semOwner    = portfolioBI.filter(p => p.owner === 'Indefinido').length

  return (
    <div>
      <PageHeader icon="🏛️" title="QUALIDADE E GOVERNANÇA" subtitle="Portfólio de BI · Métricas · Fóruns · Data Quality" />
      <div className="bg-white border border-gray-line border-t-0 rounded-b-md p-5 space-y-5">

        <div className="grid grid-cols-4 gap-3">
          <KpiCard label="Painéis no Portfólio" value={String(total)} sub1={String(manter)} sub1Label="Certificados" delta={0} />
          <KpiCard label="Painéis p/ Redesenhar" value={String(redesenhar)} sub1="2 prioritários" delta={0} />
          <KpiCard label="Painéis p/ Arquivar" value={String(arquivar)} sub1="0 owners definidos" delta={0} />
          <KpiCard label="Métricas Oficializadas" value="10 / 42" sub1="24% cobertura" delta={0} badge="Atualizado" insight="Cobertura ajustada para refletir os Top 10 KPIs oficiais priorizados." />
        </div>

        {/* Alertas de governança */}
        {semOwner > 0 && (
          <div className="border border-gray-line rounded-md bg-blue-light p-3 flex items-center gap-3">
            <span className="text-lg">⚠️</span>
            <p className="text-sm text-navy font-semibold">
              {semOwner} {semOwner === 1 ? 'painel sem' : 'painéis sem'} owner definido — requer ação imediata de alocação de responsabilidade.
            </p>
          </div>
        )}

        {/* Portfolio table */}
        <div>
          <SectionLabel icon="📋" title="Inventário do Portfólio" period={`${total} painéis mapeados`} insight="Inventario mantido com foco de racionalizacao em 90 dias." />
          <DataTable
            columns={[
              { key: 'painel',  label: 'Painel' },
              { key: 'dominio', label: 'Domínio' },
              { key: 'nivel',   label: 'Nível' },
              { key: 'owner',   label: 'Owner',
                render: (v) => (
                  <span className={v === 'Indefinido' ? 'text-slate font-bold' : ''}>{String(v)}</span>
                )
              },
              { key: 'atualiz', label: 'Atualiz.' },
              { key: 'acao',    label: 'Ação',
                render: (v) => (
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${acaoColor[String(v)] ?? ''}`}>
                    {String(v)}
                  </span>
                )
              },
            ]}
            rows={portfolioBI as unknown as Record<string, unknown>[]}
          />
        </div>

        <div>
          <SectionLabel icon="🗄️" title="Fontes Priorizadas" insight="Fontes oficiais adicionadas conforme novo direcionamento executivo." />
          <div className="grid grid-cols-5 gap-2">
            {fontesPriorizadas.map((fonte) => (
              <div key={fonte} className="border border-gray-line rounded-md px-2.5 py-2 bg-white text-xs font-semibold text-dark text-center">
                {fonte}
              </div>
            ))}
          </div>
        </div>

        {/* Fóruns */}
        <div>
          <SectionLabel icon="📅" title="Fóruns de Governança" />
          <DataTable
            columns={[
              { key: 'forum',  label: 'Fórum' },
              { key: 'pauta',  label: 'Pauta Principal' },
              { key: 'freq',   label: 'Frequência' },
              { key: 'prox',   label: 'Próxima data' },
            ]}
            rows={foruns as unknown as Record<string, unknown>[]}
          />
        </div>

        {/* Regras */}
        <div>
          <SectionLabel icon="🔒" title="Regras Inegociáveis do BI" />
          <div className="grid grid-cols-2 gap-3">
            {[
              'Nenhuma métrica crítica sem definição oficial no catálogo',
              'Nenhuma métrica com mais de uma regra em painéis distintos',
              'Todo painel aponta para camada certificada do DW Fidelidade',
              'Todo painel tem dono, público e decisão de negócio definidos',
              'Processo formal para criar, alterar ou desativar qualquer painel',
              'Monitoramento ativo de carga e SLA para todos os painéis certificados',
            ].map((r, i) => (
              <div key={i} className="flex items-start gap-3 border border-gray-line rounded-md p-3 bg-gray-bg">
                <span className="text-navy font-bold text-sm mt-0.5">✓</span>
                <p className="text-xs text-dark">{r}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
