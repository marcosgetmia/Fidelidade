'use client'
import { useState, useEffect } from 'react'
import PageHeader from '@/components/PageHeader'
import SectionLabel from '@/components/SectionLabel'
import StatusSignal from '@/components/StatusSignal'
import {
  copilotoDesvios,
  copilotoCausas,
  copilotoAlavancas,
  copilotoNarrativa,
} from '@/lib/mockData'

const TOTAL = 5

const SEV_CLS: Record<string, string> = {
  'Atenção':  'bg-amber-100 text-amber-700 border border-amber-200',
  'Monitorar':'bg-blue-50  text-bi-blue  border border-blue-200',
}

const PRI_CLS: Record<string, string> = {
  'Alta':  'bg-red-100  text-red-700',
  'Média': 'bg-amber-100 text-amber-700',
}

export default function CopilotoView() {
  const [visible,   setVisible]   = useState(TOTAL)
  const [analyzing, setAnalyzing] = useState(false)

  useEffect(() => {
    if (!analyzing) return
    if (visible >= TOTAL) { setAnalyzing(false); return }
    const t = setTimeout(() => setVisible(v => v + 1), 700)
    return () => clearTimeout(t)
  }, [analyzing, visible])

  function handleGenerate() {
    setVisible(0)
    setAnalyzing(true)
  }

  return (
    <div>
      <PageHeader
        icon="✦"
        title="COPILOTO DE PERFORMANCE"
        subtitle="Diagnóstico executivo · Snapshot MTD Jun/25"
      />

      <div className="bg-white border border-gray-line border-t-0 rounded-b-md p-5 space-y-5">

        {/* ── Barra de status ── */}
        <div className="flex items-center justify-between border border-gray-line rounded-md px-4 py-3 bg-gray-bg">
          <div className="flex items-center gap-5">
            <div>
              <p className="text-[10px] text-gray-txt uppercase tracking-wide">Última análise</p>
              <p className="text-xs font-semibold text-dark">Hoje às 09:14 · MTD Jun/25</p>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <p className="text-[10px] text-gray-txt">Fontes:</p>
              {['Comarch', 'DW_Azul', 'P&L', 'Mapa Contábil'].map(f => (
                <span key={f} className="text-[9px] font-bold bg-blue-light text-navy px-2 py-0.5 rounded-full">
                  {f}
                </span>
              ))}
            </div>
          </div>
          <button
            onClick={handleGenerate}
            disabled={analyzing}
            className={`text-xs font-bold px-4 py-2 rounded-md transition-colors ${
              analyzing
                ? 'bg-gray-line text-gray-txt cursor-not-allowed'
                : 'bg-navy text-white hover:bg-navy-mid'
            }`}
          >
            {analyzing ? '◌  Analisando...' : '▶  Gerar Diagnóstico'}
          </button>
        </div>

        {/* ── Seção 1 — Sinais Econômicos ── */}
        {visible >= 1 && (
          <div className="animate-fade-in">
            <SectionLabel icon="🔍" title="Sinais Econômicos" period="MTD Jun/25 · Status atual" />
            <div className="grid grid-cols-4 gap-3">
              <StatusSignal
                label="Burn / Earn"
                value="84,7%"
                reference="Referência: 85,0%"
                status="warn"
                detail="0,3 p.p. abaixo da referência"
              />
              <StatusSignal
                label="Passivo (meses resgate)"
                value="12 meses"
                reference="Teto: 12 meses"
                status="ok"
                detail="Dentro do limite controlado"
              />
              <StatusSignal
                label="Breakage (atingimento)"
                value="92,5%"
                reference="Meta: R$ 53 Mi"
                status="warn"
                detail="Gap de R$ 4 Mi vs projetado"
              />
              <StatusSignal
                label="Receita vs Meta"
                value="96,6%"
                reference="Meta: R$ 183,0 Mi"
                status="warn"
                detail="Gap de R$ 6,2 Mi no MTD"
              />
            </div>
          </div>
        )}

        {/* ── Seção 2 — Desvios ── */}
        {visible >= 2 && (
          <div className="animate-fade-in">
            <SectionLabel icon="⚡" title="Desvios Identificados" period={`${copilotoDesvios.length} desvios detectados · Jun/25`} />
            <div className="space-y-2">
              {copilotoDesvios.map(d => (
                <div key={d.id} className="border border-gray-line rounded-md p-3 bg-gray-bg flex items-center gap-4">
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full shrink-0 ${SEV_CLS[d.severidade]}`}>
                    {d.severidade}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-dark">{d.titulo}</p>
                    <p className="text-[11px] text-gray-txt">
                      Realizado: <strong>{d.valor}</strong>
                      {' · '}Meta/Ref.: <strong>{d.meta}</strong>
                      {' · '}Desvio: <strong>{d.gap}</strong>
                    </p>
                  </div>
                  <span className="text-[9px] font-bold text-accent bg-blue-light px-2 py-0.5 rounded-full shrink-0">
                    {d.dominio}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Seção 3 — Causas ── */}
        {visible >= 3 && (
          <div className="animate-fade-in">
            <SectionLabel icon="🧠" title="Possíveis Causas" period="Hipóteses identificadas pelo Copiloto" />
            <div className="space-y-3">
              {copilotoDesvios.map(d => (
                <div key={d.id} className="border border-gray-line rounded-md p-3.5 bg-gray-bg">
                  <p className="text-[10px] font-bold text-navy uppercase tracking-wide mb-2">{d.titulo}</p>
                  <ul className="space-y-1.5">
                    {copilotoCausas[d.id].map((causa, i) => (
                      <li key={i} className="flex gap-2 text-[12px] text-dark leading-snug">
                        <span className="text-accent font-bold shrink-0 mt-0.5">›</span>
                        <span>{causa}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Seção 4 — Alavancas ── */}
        {visible >= 4 && (
          <div className="animate-fade-in">
            <SectionLabel icon="🎯" title="Alavancas Sugeridas" period="Priorizadas por impacto esperado" />
            <div className="grid grid-cols-2 gap-3">
              {copilotoAlavancas.map((a, i) => (
                <div key={i} className="border border-gray-line rounded-md p-3.5 bg-gray-bg">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${PRI_CLS[a.prioridade]}`}>
                      {a.prioridade}
                    </span>
                    <span className="text-[9px] font-bold text-accent bg-blue-light px-2 py-0.5 rounded-full">
                      {a.dominio}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-dark mb-1">{a.titulo}</p>
                  <p className="text-[11px] text-gray-txt leading-relaxed">{a.detalhe}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Seção 5 — Narrativa Executiva ── */}
        {visible >= 5 && (
          <div className="animate-fade-in">
            <SectionLabel icon="✦" title="Narrativa Executiva" period="Diagnóstico consolidado · Copiloto Jun/25" />
            <div className="border-l-4 border-accent bg-gray-bg rounded-r-md p-5">
              <p className="text-[10px] font-bold text-accent uppercase tracking-widest mb-3">
                Copiloto de Performance · MTD Jun/25
              </p>
              <p className="text-sm text-dark leading-relaxed">{copilotoNarrativa}</p>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
